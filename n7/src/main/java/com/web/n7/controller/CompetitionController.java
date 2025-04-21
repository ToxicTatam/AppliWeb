package com.web.n7.controller;



import com.web.n7.model.Competition;
import com.web.n7.model.Match;
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

    /**
     * Creates a new competition and assigns it to an organizer.
     *
     * @param competition the competition entity containing details about the competition to be created
     * @param organizerId the ID of the user proposed as the organizer of the competition
     * @return a response entity containing the created competition object
     */
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZER')")
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition, @RequestParam Long organizerId) {
        Competition createdCompetition = competitionService.create(competition, organizerId);
        return ResponseEntity.ok(createdCompetition);
    }

    /**
     * Retrieves a competition by its unique identifier.
     *
     * @param id the unique identifier of the competition to be retrieved
     * @return a ResponseEntity containing the competition if found, or a not found response if not available
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<Competition> getCompetitionById(@PathVariable Long id) {
        Optional<Competition> competition = competitionService.findById(id);
        return competition.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves a list of all competitions available in the system.
     *
     * @return a {@code ResponseEntity} containing a list of {@code Competition} objects
     */
    @GetMapping("/all")
    public ResponseEntity<List<Competition>> getAllCompetitions() {
        List<Competition> competitions = competitionService.findAll();
        return ResponseEntity.ok(competitions);
    }

    /**
     * Updates an existing competition with new details.
     * The competition to be updated is identified by the provided ID,
     * and the updated details are provided in the request body.
     *
     * @param id the ID of the competition to be updated
     * @param competition the competition object containing updated details
     * @return a {@code ResponseEntity} containing the updated competition if the update
     *         was successful, or an appropriate HTTP response if not
     */
    @PutMapping("/{id}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable Long id, @RequestBody Competition competition) {
        competition.setId(id);
        Competition updatedCompetition = competitionService.update(competition);
        return ResponseEntity.ok(updatedCompetition);
    }

    /**
     * Deletes a competition identified by its unique ID.
     *
     * @param id the unique identifier of the competition to be deleted
     * @return a ResponseEntity with no content, indicating the competition was successfully deleted
     */
    @DeleteMapping("/deletion/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZER')")
    public ResponseEntity<Void> deleteCompetition(@PathVariable Long id) {
        competitionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Registers a team to a competition identified by its ID. The competition must be open for registration
     * and must not have reached its maximum number of allowed teams. If successful, the updated competition
     * object is returned.
     *
     * @param competitionId the ID of the competition to which the team should be registered
     * @param teamId the ID of the team to be registered
     * @return a ResponseEntity containing the updated competition object
     */
    @PostMapping("/{competitionId}/register-team")
    public ResponseEntity<Competition> registerTeamToCompetition(@PathVariable Long competitionId, @RequestParam Long teamId) {
        Competition competition = competitionService.registerTeam(competitionId, teamId);
        return ResponseEntity.ok(competition);
    }

    /**
     * Unregisters a team from a specific competition. The competition must be in the registration phase
     * for the removal to be allowed. The team is removed from the competition's list of registered teams.
     *
     * @param competitionId the unique identifier of the competition from which the team is unregistered
     * @param teamId the unique identifier of the team to be unregistered from the competition
     * @return a ResponseEntity containing the updated Competition object after the team has been unregistered
     */
    @PostMapping("/{competitionId}/unregister-team")
    public ResponseEntity<Competition> unregisterTeamFromCompetition(@PathVariable Long competitionId, @RequestParam Long teamId) {
        Competition competition = competitionService.unregisterTeam(competitionId, teamId);
        return ResponseEntity.ok(competition);
    }



    /**
     * Retrieves the list of teams registered for a specific competition.
     *
     * @param id the unique identifier of the competition for which the registered teams are to be retrieved
     * @return a {@code ResponseEntity} containing a list of {@code Team} objects registered in the competition
     */
    @GetMapping("/{id}/teams")
    public ResponseEntity<List<Team>> getRegisteredTeams(@PathVariable Long id) {
        List<Team> teams = competitionService.getTeamsByCompetitionId(id);
        return ResponseEntity.ok(teams);
    }

    /**
     * Retrieves a list of matches associated with a specific competition.
     *
     * @param id the unique identifier of the competition for which the matches are to be retrieved
     * @return a {@code ResponseEntity} containing a list of {@code Match} objects associated with the competition
     */
    @GetMapping("/{id}/matches")
    public ResponseEntity<List<Match>> getMatchesByCompetition(@PathVariable Long id) {
        List<Match> matches = competitionService.getMatchesByCompetition(id);
        return ResponseEntity.ok(matches);
    }
}