package com.web.n7.service;

import com.web.n7.model.Team;
import com.web.n7.model.User;
import com.web.n7.model.enumeration.Role;
import com.web.n7.repository.*;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public TeamService(TeamRepository teamRepository, UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    public Team create(Team team, Long coachId) {
        User coach = userRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Coach non trouvé"));

        if ( !Role.COACH.name().equals(coach.getRole())) {
            throw new RuntimeException("L'utilisateur n'est pas un coach");
        }


        team.setCoach(coach);
        team.setCreatedAt(LocalDateTime.now());
        team.setUpdatedAt(LocalDateTime.now());

        return teamRepository.save(team);
    }

    public Optional<Team> findById(Long id) {
        return teamRepository.findById(id);
    }

    public List<Team> findByCoachId(Long coachId) {
        return teamRepository.findByCoachId(coachId);
    }

    public List<Team> findByCategory(String category) {
        return teamRepository.findByCategory(category);
    }

    public List<Team> findByCompetition(Long competitionId) {
        return teamRepository.findByCompetitionsId(competitionId);
    }

    public Team update(Team team) {
        team.setUpdatedAt(LocalDateTime.now());
        return teamRepository.save(team);
    }

    public void delete(Long id) {
        teamRepository.deleteById(id);
    }

    public List<Team> findAll() {
        return teamRepository.findAll();
    }
}