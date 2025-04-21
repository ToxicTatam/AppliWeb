package com.web.n7.controller;
import com.web.n7.model.Player;
import com.web.n7.model.Team;
import com.web.n7.service.PlayerService;
import com.web.n7.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
//@PreAuthorize("hasAnyRole('ADMIN', 'ORGANIZER', 'COACH')")
public class TeamController {

    private final TeamService teamService;

    private final PlayerService playerService;

    public TeamController(TeamService teamService,PlayerService playerService) {
        this.teamService = teamService;
        this.playerService = playerService;


    }

    /**
     * Creates a new team and associates it with a coach.
     *
     * @param team the team to be created
     * @param coachId the ID of the coach to be associated with the team
     * @return a ResponseEntity containing the created team
     */
    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team, @RequestParam Long coachId) {
        Team createdTeam = teamService.create(team, coachId);
        return ResponseEntity.ok(createdTeam);
    }

    /**
     * Retrieves the details of a team based on its ID.
     *
     * @param id the ID of the team to be retrieved
     * @return a ResponseEntity containing the team details if found, or a not found response if the team does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        Optional<Team> team = teamService.findById(id);
        return team.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves a list of all teams.
     *
     * @return a ResponseEntity containing a list of all teams
     */
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.findAll();
        return ResponseEntity.ok(teams);
    }

    /**
     * Retrieves a list of teams associated with a specific coach.
     *
     * @param coachId the ID of the coach whose teams are to be retrieved
     * @return a ResponseEntity containing a list of teams associated with the specified coach
     */
    @GetMapping("/coach/{coachId}")
    public ResponseEntity<List<Team>> getTeamsByCoach(@PathVariable Long coachId) {
        List<Team> teams = teamService.findByCoachId(coachId);
        return ResponseEntity.ok(teams);
    }

    /**
     * Updates the details of an existing team based on the provided team ID and updated team details.
     *
     * @param teamId the ID of the team to be updated
     * @param team the updated details of the team
     * @return a ResponseEntity containing the updated team
     */
    @PutMapping("/{teamId}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long teamId, @RequestBody Team team) {
        team.setId(teamId);
        Team updatedTeam = teamService.update(team);
        return ResponseEntity.ok(updatedTeam);
    }

    /**
     * Deletes a team based on its ID.
     *
     * @param teamId the ID of the team to be deleted
     * @return a ResponseEntity with no content status indicating successful deletion
     */
    @DeleteMapping("/{teamId}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long teamId) {
        teamService.delete(teamId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get all players in a team
     * Endpoint: GET /api/teams/{teamId}/players
     */
    @GetMapping("/{teamId}/players")
    public ResponseEntity<List<Player>> getPlayersByTeam(@PathVariable Long teamId) {
        List<Player> players = playerService.findByTeamId(teamId);
        return ResponseEntity.ok(players);
    }

    /**
     * Add a player to a team
     * Endpoint: POST /api/teams/{teamId}/players
     */
    @PostMapping("/add/{teamId}/players")
    public ResponseEntity<Player> addPlayerToTeam(@RequestBody Player player, @PathVariable Long teamId) {
        Player createdPlayer = playerService.create(player, teamId);
        return ResponseEntity.ok(createdPlayer);
    }

    /**
     * Retrieves a list of teams participating in a specific competition.
     *
     * @param competitionId the ID of the competition for which the teams are to be retrieved
     * @return a ResponseEntity containing a list of teams if found, or a no content response if no teams are associated with the given competition ID
     */
    @GetMapping("/competition/{competitionId}")
    public ResponseEntity<List<Team>> getTeamsByCompetition(@PathVariable Long competitionId) {
        List<Team> teams = teamService.findByCompetition(competitionId);
        if (teams.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(teams);
    }




}