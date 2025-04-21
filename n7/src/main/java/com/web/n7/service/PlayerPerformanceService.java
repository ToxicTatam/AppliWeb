package com.web.n7.service;

import com.web.n7.dto.CompetitionPerformance;
import com.web.n7.dto.OverallPerformance;
import com.web.n7.dto.PlayerPerformanceResponse;
import com.web.n7.model.PlayerHistory;
import com.web.n7.repository.CompetitionRepository;
import com.web.n7.repository.PlayerHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PlayerPerformanceService {

    private final PlayerHistoryRepository playerHistoryRepository;


    public PlayerPerformanceService(PlayerHistoryRepository playerHistoryRepository){
        this.playerHistoryRepository = playerHistoryRepository;

    }

    /**
     * Retrieves the performance statistics of a player, optionally filtered by a specific competition.
     *
     * @param playerId the ID of the player whose performance data is to be retrieved
     * @param competitionId the ID of the competition to filter the performance data; if null, retrieves data for all competitions
     * @return a PlayerPerformanceResponse object containing the player's performance statistics grouped by competition
     */
    public PlayerPerformanceResponse getPlayerPerformances(Long playerId, Long competitionId) {
        // Récupérer les performances globales par joueur
        List<PlayerHistory> playerHistories = competitionId != null
                ? playerHistoryRepository.findByPlayerIdAndCompetitionId(playerId, competitionId)
                : playerHistoryRepository.findByPlayerId(playerId);

        // Grouper les performances par compétition
//        Map<Long, CompetitionPerformance> performancesByCompetition = playerHistories.stream()
//                .collect(Collectors.groupingBy(
//                        history -> history.getMatch().getCompetition().getId(), // Get competitionId from Match
//                        Collectors.collectingAndThen(Collectors.toList(), this::mapToCompetitionPerformance)
//                ));

         CompetitionPerformance performancesByCompetition = playerHistories.stream()
                .collect(
                        Collectors.collectingAndThen(Collectors.toList(), this::mapToCompetitionPerformance)
                );



        // Résumer les performances globales
        OverallPerformance overallStats = calculateOverallPerformance(playerHistories);

        return new PlayerPerformanceResponse(playerId, performancesByCompetition, overallStats);
    }

    /**
     * Maps a list of player history entries to a CompetitionPerformance object.
     * This method aggregates data such as matches played, goals scored, assists,
     * minutes played, yellow cards, and red cards for a specific competition based on the input list.
     *
     * @param histories a list of PlayerHistory objects representing a player's performance in a specific competition.
     *                  It is assumed that all entries in the list are associated with the same competition.
     * @return a CompetitionPerformance object containing the aggregated performance statistics for the competition.
     */
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



    /**
     * Retrieves the match history of a specific player.
     *
     * @param playerId the unique identifier of the player whose match history is to be retrieved
     * @return a list of PlayerHistory objects representing the player's performance data across matches
     */
    // Récupérer l'historique d’un joueur spécifique
    public List<PlayerHistory> getPlayerHistory(Long playerId) {
        return playerHistoryRepository.findByPlayerId(playerId);
    }

    /**
     * Retrieves the match history for a specific match, identified by the match ID.
     *
     * @param matchId the unique identifier of the match whose history is to be retrieved
     * @return a list of PlayerHistory objects representing the performance data of players in the match
     */
    // Récupérer l’historique par match
    public List<PlayerHistory> getMatchHistory(Long matchId) {
        return playerHistoryRepository.findByMatchId(matchId);
    }


    /**
     * Calculates and compiles statistical data related to a player's performance across all matches.
     * This method aggregates data such as total goals scored, total minutes played, total yellow cards,
     * total red cards, and the number of matches played for a specific player.
     *
     * @param playerId The unique identifier of the player whose statistical data is to be calculated.
     * @return A map containing key-value pairs where the keys represent statistical categories
     *         (e.g., "totalGoals", "totalMinutes", "yellowCards", "redCards", "matchesPlayed")
     *         and the values represent the corresponding aggregated data.
     */
    public Map<String, Object> calculatePlayerStatistics(Long playerId) {
        List<PlayerHistory> histories = playerHistoryRepository.findByPlayerId(playerId);

        int totalGoals = histories.stream().mapToInt(PlayerHistory::getGoalsScored).sum();
        int totalMinutes = histories.stream().mapToInt(PlayerHistory::getMinutesPlayed).sum();
        int yellowCards = histories.stream().mapToInt(PlayerHistory::getYellowCards).sum();
        int redCards = histories.stream().mapToInt(PlayerHistory::getRedCards).sum();
        int totalMatches = histories.size();
        int assists=  histories.stream().mapToInt(PlayerHistory::getAssists).sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalGoals", totalGoals);
        stats.put("assists", assists);
        stats.put("totalMinutes", totalMinutes);
        stats.put("yellowCards", yellowCards);
        stats.put("redCards", redCards);
        stats.put("matchesPlayed", totalMatches);

        return stats;
    }

    /**
     * Calculates the overall performance of a player based on a list of player history records.
     * This method aggregates data such as the number of matches played, goals scored, assists,
     * minutes played, yellow cards, and red cards.
     *
     * @param playerHistories a list of PlayerHistory objects representing the performance data of a player
     *                        across various matches.
     * @return an OverallPerformance object containing the aggregated performance statistics.
     */
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