package com.web.n7.service;


import com.web.n7.model.*;
import com.web.n7.model.enumeration.CompetitionStatus;
import com.web.n7.model.enumeration.CompetitionType;
import com.web.n7.model.enumeration.NotificationType;
import com.web.n7.model.enumeration.Role;
import com.web.n7.repository.CompetitionRepository;
import com.web.n7.repository.TeamRepository;
import com.web.n7.repository.UserRepository;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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

    public Optional<Competition> findById(Long id) {
        return competitionRepository.findById(id);
    }

    public List<Competition> findByOrganizerId(Long organizerId) {
        return competitionRepository.findByOrganizerId(organizerId);
    }

    public List<Competition> findByStatus(CompetitionStatus status) {
        return competitionRepository.findByStatus(status);
    }

    public List<Competition> findUpcoming() {
        return competitionRepository.findByStartDateAfter(LocalDate.now());
    }

    public List<Competition> findPast() {
        return competitionRepository.findByEndDateBefore(LocalDate.now());
    }

    public List<Competition> findByType(CompetitionType type) {
        return competitionRepository.findByCompetitionType(type);
    }

    public Competition update(Competition competition) {
        competition.setUpdatedAt(LocalDateTime.now());
        return competitionRepository.save(competition);
    }

    public void delete(Long id) {
        competitionRepository.deleteById(id);
    }

    public List<Competition> findAll() {
        return competitionRepository.findAll();
    }

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



}
