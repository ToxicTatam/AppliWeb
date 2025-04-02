package com.web.n7.controller;



import com.web.n7.model.Competition;
import com.web.n7.model.Team;
import com.web.n7.service.CompetitionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition, @RequestParam Long organizerId) {
        Competition createdCompetition = competitionService.create(competition, organizerId);
        return ResponseEntity.ok(createdCompetition);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Competition> getCompetitionById(@PathVariable Long id) {
        Optional<Competition> competition = competitionService.findById(id);
        return competition.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Competition>> getAllCompetitions() {
        List<Competition> competitions = competitionService.findAll();
        return ResponseEntity.ok(competitions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable Long id, @RequestBody Competition competition) {
        competition.setId(id);
        Competition updatedCompetition = competitionService.update(competition);
        return ResponseEntity.ok(updatedCompetition);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompetition(@PathVariable Long id) {
        competitionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{competitionId}/register-team")
    public ResponseEntity<Competition> registerTeamToCompetition(@PathVariable Long competitionId, @RequestParam Long teamId) {
        Competition competition = competitionService.registerTeam(competitionId, teamId);
        return ResponseEntity.ok(competition);
    }

    @PostMapping("/{competitionId}/unregister-team")
    public ResponseEntity<Competition> unregisterTeamFromCompetition(@PathVariable Long competitionId, @RequestParam Long teamId) {
        Competition competition = competitionService.unregisterTeam(competitionId, teamId);
        return ResponseEntity.ok(competition);
    }
}