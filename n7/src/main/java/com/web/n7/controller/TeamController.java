package com.web.n7.controller;
import com.web.n7.model.Team;
import com.web.n7.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team, @RequestParam Long coachId) {
        Team createdTeam = teamService.create(team, coachId);
        return ResponseEntity.ok(createdTeam);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        Optional<Team> team = teamService.findById(id);
        return team.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.findAll();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/coach/{coachId}")
    public ResponseEntity<List<Team>> getTeamsByCoach(@PathVariable Long coachId) {
        List<Team> teams = teamService.findByCoachId(coachId);
        return ResponseEntity.ok(teams);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody Team team) {
        team.setId(id);
        Team updatedTeam = teamService.update(team);
        return ResponseEntity.ok(updatedTeam);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamService.delete(id);
        return ResponseEntity.noContent().build();
    }
}