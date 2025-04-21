package com.web.n7.service;


import com.web.n7.model.Competition;
import com.web.n7.model.Match;
import com.web.n7.model.Team;
import com.web.n7.model.enumeration.MatchStatus;
import com.web.n7.model.enumeration.NotificationType;
import com.web.n7.repository.CompetitionRepository;
import com.web.n7.repository.MatchRepository;
import com.web.n7.repository.TeamRepository;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {
    private final MatchRepository matchRepository;
    private final CompetitionRepository competitionRepository;
    private final TeamRepository teamRepository;
    private final NotificationService notificationService;
    private final StandingService standingService;

    public MatchService(
            MatchRepository matchRepository,
            CompetitionRepository competitionRepository,
            TeamRepository teamRepository,
            NotificationService notificationService,
            StandingService standingService
    ) {
        this.matchRepository = matchRepository;
        this.competitionRepository = competitionRepository;
        this.teamRepository = teamRepository;
        this.notificationService = notificationService;
        this.standingService = standingService;
    }

    /**
     * Creates and saves a new match with the provided details, associates it with a competition,
     * home team, and away team, and sends notifications to the respective team coaches.
     *
     * @param match the match object containing match details to be saved
     * @param competitionId the ID of the competition to associate the match with
     * @param homeTeamId the ID of the home team participating in the match
     * @param awayTeamId the ID of the away team participating in the match
     * @return the saved match object
     */
    public Match create(Match match, Long competitionId, Long homeTeamId, Long awayTeamId) {
        Competition competition = competitionRepository.findById(competitionId)
                .orElseThrow(() -> new RuntimeException("Compétition non trouvée"));

        Team homeTeam = teamRepository.findById(homeTeamId)
                .orElseThrow(() -> new RuntimeException("Équipe à domicile non trouvée"));

        Team awayTeam = teamRepository.findById(awayTeamId)
                .orElseThrow(() -> new RuntimeException("Équipe à l'extérieur non trouvée"));

        match.setCompetition(competition);
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setCreatedAt(LocalDateTime.now());
        match.setUpdatedAt(LocalDateTime.now());

        Match savedMatch = matchRepository.save(match);

        // Envoyer des notifications aux coachs
        notificationService.sendNotification(
                homeTeam.getCoach(),
                "Nouveau match programmé",
                "Un match contre " + awayTeam.getName() + " a été programmé le " + match.getMatchDate(),
                NotificationType.MATCH_REMINDER
        );

        notificationService.sendNotification(
                awayTeam.getCoach(),
                "Nouveau match programmé",
                "Un match contre " + homeTeam.getName() + " a été programmé le " + match.getMatchDate(),
                NotificationType.MATCH_REMINDER
        );

        return savedMatch;
    }

    /**
     * Finds a match by its unique identifier.
     *
     * @param id the unique identifier of the match to be retrieved
     * @return an {@code Optional} containing the found match, or an empty {@code Optional} if no match is found
     */
    public Optional<Match> findById(Long id) {
        return matchRepository.findById(id);
    }

    /**
     * Retrieves a list of matches associated with a specific competition ID.
     *
     * @param competitionId the ID of the competition to find matches for
     * @return a list of matches belonging to the specified competition
     */
    public List<Match> findByCompetitionId(Long competitionId) {
        return matchRepository.findByCompetitionId(competitionId);
    }

    /**
     * Retrieves a list of matches where the specified team is either the home team or the away team.
     *
     * @param teamId the ID of the team whose matches are to be retrieved
     * @return a list of matches associated with the given team
     */
    public List<Match> findByTeamId(Long teamId) {
        return matchRepository.findByHomeTeamIdOrAwayTeamId(teamId, teamId);
    }

    /**
     * Retrieves a list of matches that occurred within the specified date and time range.
     *
     * @param start the start date and time of the range
     * @param end the end date and time of the range
     * @return a list of matches that have a match date between the specified start and end dates
     */
    public List<Match> findByDateRange(LocalDateTime start, LocalDateTime end) {
        return matchRepository.findByMatchDateBetween(start, end);
    }

    /**
     * Retrieves a list of matches filtered by the specified match status.
     *
     * @param status the status of the matches to filter by; must not be null
     * @return a list of matches matching the given status, or an empty list if no matches are found
     */
    public List<Match> findByStatus(MatchStatus status) {
        return matchRepository.findByStatus(status);
    }
    /**
     * Updates the score of a match, sets its status to completed, logs the update time,
     * and triggers updates for standings and notifications for both team coaches.
     *
     * @param matchId the identifier of the match to update
     * @param homeScore the new score for the home team
     * @param awayScore the new score for the away team
     * @return the updated Match object after persistence
     */
    public Match updateScore(Long matchId, Integer homeScore, Integer awayScore) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match non trouvé"));

        match.setHomeScore(homeScore);
        match.setAwayScore(awayScore);
        match.setStatus(MatchStatus.COMPLETED);
        match.setUpdatedAt(LocalDateTime.now());

        Match updatedMatch = matchRepository.save(match);

        // Mettre à jour les classements
        // (Cette partie serait implémentée dans un StandingService)
        standingService.updateStandingsAfterMatch(updatedMatch);

        // Envoyer des notifications aux coachs
        String resultMessage = "Résultat du match: " + match.getHomeTeam().getName() + " " +
                homeScore + " - " + awayScore + " " + match.getAwayTeam().getName();

        notificationService.sendNotification(
                match.getHomeTeam().getCoach(),
                "Résultat du match",
                resultMessage,
                NotificationType.RESULT_UPDATE
        );

        notificationService.sendNotification(
                match.getAwayTeam().getCoach(),
                "Résultat du match",
                resultMessage,
                NotificationType.RESULT_UPDATE
        );

        return updatedMatch;
    }


    /**
     * Updates the details of an existing match in the repository and sets the updated timestamp.
     *
     * @param match the Match object to be updated
     * @return the updated Match object persisted in the repository
     */
    public Match update(Match match) {
        match.setUpdatedAt(LocalDateTime.now());
        return matchRepository.save(match);
    }


    /**
     * Deletes a match record from the repository based on the provided match ID.
     *
     * @param id the unique identifier of the match to be deleted
     */
    public void delete(Long id) {
        matchRepository.deleteById(id);
    }

    /**
     * Retrieves all Match entities from the data source.
     *
     * @return a list of all matches available in the repository.
     */
    public List<Match> findAll() {
        return matchRepository.findAll();
    }
}