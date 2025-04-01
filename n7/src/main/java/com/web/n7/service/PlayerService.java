package com.web.n7.service;

import com.web.n7.model.Player;
import com.web.n7.model.Team;
import com.web.n7.repository.*;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    public PlayerService(PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    public Player create(Player player, Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Équipe non trouvée"));

        player.setTeam(team);
        player.setCreatedAt(LocalDateTime.now());
        player.setUpdatedAt(LocalDateTime.now());

        return playerRepository.save(player);
    }

    public Optional<Player> findById(Long id) {
        return playerRepository.findById(id);
    }

    public Optional<Player> findByLicenseNumber(String licenseNumber) {
        return playerRepository.findByLicenseNumber(licenseNumber);
    }

    public List<Player> findByTeamId(Long teamId) {
        return playerRepository.findByTeamId(teamId);
    }

    public Player update(Player player) {
        player.setUpdatedAt(LocalDateTime.now());
        return playerRepository.save(player);
    }

    public void delete(Long id) {
        playerRepository.deleteById(id);
    }

    public List<Player> findAll() {
        return playerRepository.findAll();
    }
}
