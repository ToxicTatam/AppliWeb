package com.web.n7.controller;


import com.web.n7.model.MatchSheet;
import com.web.n7.service.MatchSheetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/match-sheets")
public class MatchSheetController {

    private final MatchSheetService matchSheetService;

    public MatchSheetController(MatchSheetService matchSheetService) {
        this.matchSheetService = matchSheetService;
    }

    @PostMapping
    public ResponseEntity<MatchSheet> createMatchSheet(@RequestParam Long matchId) {
        MatchSheet matchSheet = matchSheetService.create(matchId);
        return ResponseEntity.ok(matchSheet);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchSheet> getMatchSheetById(@PathVariable Long id) {
        Optional<MatchSheet> matchSheet = matchSheetService.findById(id);
        return matchSheet.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/validate")
    public ResponseEntity<MatchSheet> validateMatchSheet(@PathVariable Long id) {
        MatchSheet validatedSheet = matchSheetService.validate(id);
        return ResponseEntity.ok(validatedSheet);
    }
}