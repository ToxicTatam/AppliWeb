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

    public Optional<Match> findById(Long id) {
        return matchRepository.findById(id);
    }

    public List<Match> findByCompetitionId(Long competitionId) {
        return matchRepository.findByCompetitionId(competitionId);
    }

    public List<Match> findByTeamId(Long teamId) {
        return matchRepository.findByHomeTeamIdOrAwayTeamId(teamId, teamId);
    }

    public List<Match> findByDateRange(LocalDateTime start, LocalDateTime end) {
        return matchRepository.findByMatchDateBetween(start, end);
    }

    public List<Match> findByStatus(MatchStatus status) {
        return matchRepository.findByStatus(status);
    }

    public Match update(Match match) {
        match.setUpdatedAt(LocalDateTime.now());
        return matchRepository.save(match);
    }

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

    public void delete(Long id) {
        matchRepository.deleteById(id);
    }

    public List<Match> findAll() {
        return matchRepository.findAll();
    }
}