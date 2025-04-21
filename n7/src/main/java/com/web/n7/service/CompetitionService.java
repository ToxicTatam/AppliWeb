package com.web.n7.service;


import com.web.n7.model.*;
import com.web.n7.model.enumeration.CompetitionStatus;
import com.web.n7.model.enumeration.CompetitionType;
import com.web.n7.model.enumeration.NotificationType;
import com.web.n7.model.enumeration.Role;
import com.web.n7.repository.CompetitionRepository;
import com.web.n7.repository.TeamRepository;
import com.web.n7.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for handling operations related to competitions.
 * Provides methods to create, retrieve, update, delete, and manage competitions,
 * teams, and standings within competitions.
 */
@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final NotificationService notificationService;
    private final MatchService matchService;



    public CompetitionService(
            CompetitionRepository competitionRepository,
            UserRepository userRepository,
            TeamRepository teamRepository,
            NotificationService notificationService,
            MatchService MatchService
    ) {
        this.competitionRepository = competitionRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.notificationService = notificationService;
        this.matchService= MatchService;
    }

    /**
     * Creates a new competition and assigns an organizer to it after validation.
     *
     * @param competition the competition entity containing details about the competition to be created
     * @param organizerId the ID of the user proposed as the organizer of the competition
     * @return the saved competition entity with associated organizer information and timestamps
     * @throws RuntimeException if the organizer is not found or does not have the correct role
     */
    public Competition create(Competition competition, Long organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new RuntimeException("Organisateur non trouvé"));


        if (!Role.ORGANIZER.name().equals(organizer.getRole()) &&
                !Role.ADMIN.name().equals(organizer.getRole())) {
            throw new RuntimeException("Acces refusé: L'utilisateur n'est pas un organisateur");
        }


        competition.setOrganizer(organizer);
        competition.setCreatedAt(LocalDateTime.now());
        competition.setUpdatedAt(LocalDateTime.now());

        return competitionRepository.save(competition);
    }

    /**
     * Retrieves a competition by its unique identifier.
     *
     * @param id the unique identifier of the competition to be retrieved
     * @return an {@code Optional<Competition>} containing the competition if found, or empty if not found
     */
    public Optional<Competition> findById(Long id) {
        return competitionRepository.findById(id);
    }

    /**
     * Retrieves a list of competitions organized by the specified organizer.
     *
     * @param organizerId the unique identifier of the organizer
     * @return a list of competitions associated with the provided organizer ID
     */
    public List<Competition> findByOrganizerId(Long organizerId) {
        return competitionRepository.findByOrganizerId(organizerId);
    }

    /**
     * Retrieves a list of competitions filtered by the specified status.
     *
     * @param status the status of the competitions to retrieve
     * @return a list of competitions that match the specified status
     */
    public List<Competition> findByStatus(CompetitionStatus status) {
        return competitionRepository.findByStatus(status);
    }

    /**
     * Finds and retrieves a list of upcoming competitions whose start dates
     * are after the current date.
     *
     * @return a list of upcoming competitions
     */
    public List<Competition> findUpcoming() {
        return competitionRepository.findByStartDateAfter(LocalDate.now());
    }

    /**
     * Retrieves a list of past competitions where the end date is before the current date.
     *
     * @return a list of {@link Competition} objects representing past competitions.
     */
    public List<Competition> findPast() {
        return competitionRepository.findByEndDateBefore(LocalDate.now());
    }

    /**
     * Finds and retrieves a list of competitions based on the specified competition type.
     *
     * @param type the type of competition to filter by; must not be null
     * @return a list of competitions that match the specified type; returns an empty list if no competitions are found
     */
    public List<Competition> findByType(CompetitionType type) {
        return competitionRepository.findByCompetitionType(type);
    }

    /**
     * Updates an existing competition with new data and updates the timestamp.
     *
     * @param competition the competition entity to be updated, containing the modified details
     * @return the updated competition entity after being saved to the repository
     */
    public Competition update(Competition competition) {
        competition.setUpdatedAt(LocalDateTime.now());
        return competitionRepository.save(competition);
    }

    /**
     * Deletes a competition by its identifier.
     *
     * @param id the unique identifier of the competition to be deleted
     */
    public void delete(Long id) {
        competitionRepository.deleteById(id);
    }

    /**
     * Retrieves all competitions from the repository.
     *
     * @return a list of all competitions available in the repository
     */
    public List<Competition> findAll() {
        return competitionRepository.findAll();
    }

    /**
     * Registers a team to a competition if the competition is open for registration and has not reached
     * the maximum number of allowed teams. Sends a notification to the team's coach upon successful registration.
     *
     * @param competitionId the ID of the competition to which the team should be registered
     * @param teamId the ID of the team to be registered
     * @return the updated competition object after the team has been added
     */
    public Competition registerTeam(Long competitionId, Long teamId) {
        Competition competition = competitionRepository.findById(competitionId)
                .orElseThrow(() -> new RuntimeException("Compétition non trouvée"));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Équipe non trouvée"));

        if (competition.getStatus() != CompetitionStatus.REGISTRATION) {
            throw new RuntimeException("Les inscriptions pour cette compétition ne sont pas ouvertes");
        }

        if (competition.getMaxTeams() != null && competition.getTeams().size() >= competition.getMaxTeams()) {
            throw new RuntimeException("Le nombre maximum d'équipes est atteint");
        }

        competition.getTeams().add(team);
        Competition updatedCompetition = competitionRepository.save(competition);

        // Envoyer une notification au coach
        notificationService.sendNotification(
                team.getCoach(),
                "Inscription à la compétition",
                "Votre équipe " + team.getName() + " a été inscrite à la compétition " + competition.getName(),
                NotificationType.COMPETITION_REGISTRATION
        );

        return updatedCompetition;
    }

    /**
     * Unregisters a team from a competition if the competition is in the registration status.
     * Removes the team from the competition's list of teams.
     *
     * @param competitionId the unique identifier of the competition
     * @param teamId the unique identifier of the team to be unregistered
     * @return the updated Competition object after the team is unregistered
     */
    public Competition unregisterTeam(Long competitionId, Long teamId) {
        Competition competition = competitionRepository.findById(competitionId)
                .orElseThrow(() -> new RuntimeException("Compétition non trouvée"));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Équipe non trouvée"));

        if (competition.getStatus() != CompetitionStatus.REGISTRATION) {
            throw new RuntimeException("Les inscriptions pour cette compétition ne sont pas ouvertes");
        }

        competition.getTeams().remove(team);
        return competitionRepository.save(competition);
    }

    /**
     * Calculates the standings for a given competition based on match results.
     * Processes the matches of the specified competition to compute the standings
     * for each team, including points, wins, losses, draws, goals scored, and goals conceded.
     *
     * @param competitionId the ID of the competition for which standings are to be calculated
     * @return a list of standings sorted by points in descending order
     */
    public List<Standing> calculateStandings(Long competitionId) {


        List<Match> matches = matchService.findByCompetitionId(competitionId);
        Map<Long, Standing> standings = new HashMap<>();

        for (Match match : matches) {
            updateTeamStanding(standings, match.getHomeTeam().getId(), match.getHomeScore(), match.getAwayScore());
            updateTeamStanding(standings, match.getAwayTeam().getId(), match.getAwayScore(), match.getHomeScore());
        }
        return new ArrayList<>(standings.values()).stream()
                .sorted(Comparator.comparingInt(Standing::getPoints).reversed())
                .collect(Collectors.toList());
    }

    /**
     * Updates the standings of a team based on the match results.
     * If the team does not exist in the standings, a new entry is created.
     * Updates goals scored, goals conceded, wins, losses, and draws accordingly.
     * Also updates the 'updatedAt' timestamp for the team's standing.
     *
     * @param standings the map containing team standings, where the key is the team ID and the value is the Standing object
     * @param teamId the unique identifier of the team whose standing needs to be updated
     * @param goalsFor the number of goals scored by the team in the match
     * @param goalsAgainst the number of goals conceded by the team in the match
     */
    private void updateTeamStanding(Map<Long, Standing> standings, Long teamId, int goalsFor, int goalsAgainst) {
        Standing standing = standings.getOrDefault(teamId, new Standing());

        standing.addGoalsFor(goalsFor);
        standing.addGoalsAgainst(goalsAgainst);
        if (goalsFor > goalsAgainst) {
            standing.addWin();
        } else if (goalsFor < goalsAgainst) {
            standing.addLoss();
        } else {
            standing.addDraw();
        }
        standing.setUpdatedAt(LocalDateTime.now());

        standings.put(teamId, standing);
    }


    /**
     * Retrieves a list of teams associated with a given competition ID.
     *
     * @param competitionId the ID of the competition whose teams are to be retrieved
     * @return a list of teams belonging to the specified competition
     */
    public List<Team> getTeamsByCompetitionId(Long competitionId) {
        Optional<Competition> competition = competitionRepository.findById(competitionId);
        return competition.map(value -> new ArrayList<>(value.getTeams())).orElse(null);
    }

    /**
     * Retrieves a list of matches associated with a given competition ID.
     *
     * @param competitionId the ID of the competition whose teams are to be retrieved
     * @return a list of teams belonging to the specified competition
     */
    public List<Match> getMatchesByCompetition(Long competitionId) {
        Optional<Competition> competition = competitionRepository.findById(competitionId);
        return competition.map(value -> new ArrayList<>(value.getMatches())).orElse(null);
    }


}
