package com.web.n7.controller;

import com.web.n7.model.PlayerHistory;
import com.web.n7.service.PlayerHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerHistoryService playerHistoryService;

    public PlayerController(PlayerHistoryService playerHistoryService) {
        this.playerHistoryService = playerHistoryService;
    }

    @GetMapping("/{playerId}/history")
    public ResponseEntity<List<PlayerHistory>> getPlayerHistory(@PathVariable Long playerId) {
        List<PlayerHistory> history = playerHistoryService.getPlayerHistory(playerId);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/matches/{matchId}/history")
    public ResponseEntity<List<PlayerHistory>> getMatchPlayerHistory(@PathVariable Long matchId) {
        List<PlayerHistory> history = playerHistoryService.getMatchHistory(matchId);
        return ResponseEntity.ok(history);
    }
}