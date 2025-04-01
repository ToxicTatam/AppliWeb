package com.web.n7.service;


import com.web.n7.model.Competition;
import com.web.n7.model.Team;
import com.web.n7.model.User;
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
import java.util.List;
import java.util.Optional;

@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final NotificationService notificationService;

    public CompetitionService(
            CompetitionRepository competitionRepository,
            UserRepository userRepository,
            TeamRepository teamRepository,
            NotificationService notificationService
    ) {
        this.competitionRepository = competitionRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.notificationService = notificationService;
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
}
