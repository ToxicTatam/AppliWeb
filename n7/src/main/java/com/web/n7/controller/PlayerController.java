package com.web.n7.controller;

import com.web.n7.model.Player;
import com.web.n7.model.PlayerHistory;
import com.web.n7.service.PlayerPerformanceService;
import com.web.n7.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerPerformanceService playerHistoryService;
    private final PlayerService playerService;


    public PlayerController(PlayerPerformanceService playerHistoryService,PlayerService playerService) {
        this.playerHistoryService = playerHistoryService;
        this.playerService=playerService;
    }

    /**
     * Retrieves the history of a specific player by their ID.
     *
     * @param playerId the ID of the player whose history is to be retrieved
     * @return a ResponseEntity containing a list of PlayerHistory objects representing the history of the specified player
     */
    @GetMapping("/{playerId}/history")
    public ResponseEntity<List<PlayerHistory>> getPlayerHistory(@PathVariable Long playerId) {
        List<PlayerHistory> history = playerHistoryService.getPlayerHistory(playerId);
        return ResponseEntity.ok(history);
    }

    /**
     * Retrieves the history of all players for a given match.
     *
     * @param matchId the ID of the match for which player histories are to be retrieved
     * @return a ResponseEntity containing a list of PlayerHistory objects that represent the history of players in the specified match
     */
    @GetMapping("/matches/{matchId}/history")
    public ResponseEntity<List<PlayerHistory>> getMatchPlayerHistory(@PathVariable Long matchId) {
        List<PlayerHistory> history = playerHistoryService.getMatchHistory(matchId);
        return ResponseEntity.ok(history);
    }

    /**
     * Update a player's information
     * Endpoint: PUT /api/players/{playerId}
     */
    @PutMapping("/players/{playerId}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long playerId, @RequestBody Player player) {
        player.setId(playerId);
        Player updatedPlayer = playerService.update(player);
        return ResponseEntity.ok(updatedPlayer);
    }

    /**
     * Get profile/statistics of a specific player
     * Endpoint: GET /api/players/{playerId}
     */
    @GetMapping("/players/{playerId}")
    public ResponseEntity<Map<String, Object>> getPlayerProfile(@PathVariable Long playerId) {
        Map<String, Object> playerStats = playerHistoryService.calculatePlayerStatistics(playerId);
        return ResponseEntity.ok(playerStats);
    }

    /**
     * Delete a player
     * Endpoint: DELETE /api/players/{playerId}
     */
    @DeleteMapping("/players/{playerId}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long playerId) {
        playerService.delete(playerId);
        return ResponseEntity.noContent().build();
    }


    /**
     * Retrieves a list of all players.
     *
     * @return a ResponseEntity containing a list of Player objects
     */
    @GetMapping("/players/all")
    public ResponseEntity<List<Player>> find() {
       return ResponseEntity.ok(playerService.findAll());

    }



}