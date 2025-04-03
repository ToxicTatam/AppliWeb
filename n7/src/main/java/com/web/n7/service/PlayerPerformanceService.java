package com.web.n7.service;

import com.web.n7.dto.CompetitionPerformance;
import com.web.n7.dto.OverallPerformance;
import com.web.n7.dto.PlayerPerformanceResponse;
import com.web.n7.model.PlayerHistory;
import com.web.n7.repository.CompetitionRepository;
import com.web.n7.repository.PlayerHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PlayerPerformanceService {

    private final PlayerHistoryRepository playerHistoryRepository;
    private final CompetitionRepository competitionRepository;

    public PlayerPerformanceService(PlayerHistoryRepository playerHistoryRepository,
                                    CompetitionRepository competitionRepository) {
        this.playerHistoryRepository = playerHistoryRepository;
        this.competitionRepository = competitionRepository;
    }

    public PlayerPerformanceResponse getPlayerPerformances(Long playerId, Long competitionId) {
        // Récupérer les performances globales par joueur
        List<PlayerHistory> playerHistories = competitionId != null
                ? playerHistoryRepository.findByPlayerIdAndCompetitionId(playerId, competitionId)
                : playerHistoryRepository.findByPlayerId(playerId);

        // Grouper les performances par compétition
        Map<Long, CompetitionPerformance> performancesByCompetition = playerHistories.stream()
                .collect(Collectors.groupingBy(
                        history -> history.getMatch().getCompetition().getId(), // Get competitionId from Match
                        Collectors.collectingAndThen(Collectors.toList(), this::mapToCompetitionPerformance)
                ));


        // Résumer les performances globales
        OverallPerformance overallStats = calculateOverallPerformance(playerHistories);

        return new PlayerPerformanceResponse(playerId, performancesByCompetition, overallStats);
    }

    private CompetitionPerformance mapToCompetitionPerformance(List<PlayerHistory> histories) {
        return new CompetitionPerformance(
                histories.get(0).getMatch().getCompetition().getId(),
                histories.get(0).getMatch().getCompetition().getName(),
                histories.size(), // Matches played
                histories.stream().mapToInt(PlayerHistory::getGoalsScored).sum(),
                histories.stream().mapToInt(PlayerHistory::getAssists).sum(),
                histories.stream().mapToInt(PlayerHistory::getMinutesPlayed).sum(),
                histories.stream().mapToInt(PlayerHistory::getYellowCards).sum(),
                histories.stream().mapToInt(PlayerHistory::getRedCards).sum()
        );
    }

    private OverallPerformance calculateOverallPerformance(List<PlayerHistory> playerHistories) {
        return new OverallPerformance(
                playerHistories.size(),
                playerHistories.stream().mapToInt(PlayerHistory::getGoalsScored).sum(),
                playerHistories.stream().mapToInt(PlayerHistory::getAssists).sum(),
                playerHistories.stream().mapToInt(PlayerHistory::getMinutesPlayed).sum(),
                playerHistories.stream().mapToInt(PlayerHistory::getYellowCards).sum(),
                playerHistories.stream().mapToInt(PlayerHistory::getRedCards).sum()
        );
    }
}