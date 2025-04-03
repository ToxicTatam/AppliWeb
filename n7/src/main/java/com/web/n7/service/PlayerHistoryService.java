package com.web.n7.service;

import com.web.n7.model.PlayerHistory;
import com.web.n7.repository.PlayerHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlayerHistoryService {
    private final PlayerHistoryRepository playerHistoryRepository;

    public PlayerHistoryService(PlayerHistoryRepository playerHistoryRepository) {
        this.playerHistoryRepository = playerHistoryRepository;
    }

    // Récupérer l'historique d’un joueur spécifique
    public List<PlayerHistory> getPlayerHistory(Long playerId) {
        return playerHistoryRepository.findByPlayerId(playerId);
    }

    // Récupérer l’historique par match
    public List<PlayerHistory> getMatchHistory(Long matchId) {
        return playerHistoryRepository.findByMatchId(matchId);
    }

    public Map<String, Object> calculatePlayerStatistics(Long playerId) {
        List<PlayerHistory> histories = playerHistoryRepository.findByPlayerId(playerId);

        int totalGoals = histories.stream().mapToInt(PlayerHistory::getGoalsScored).sum();
        int totalMinutes = histories.stream().mapToInt(PlayerHistory::getMinutesPlayed).sum();
        int yellowCards = histories.stream().mapToInt(PlayerHistory::getYellowCards).sum();
        int redCards = histories.stream().mapToInt(PlayerHistory::getRedCards).sum();
        int totalMatches = histories.size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalGoals", totalGoals);
        stats.put("totalMinutes", totalMinutes);
        stats.put("yellowCards", yellowCards);
        stats.put("redCards", redCards);
        stats.put("matchesPlayed", totalMatches);

        return stats;
    }
}