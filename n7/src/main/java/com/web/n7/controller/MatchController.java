
package com.web.n7.controller;
import com.web.n7.model.Match;
import com.web.n7.model.enumeration.MatchStatus;
import com.web.n7.service.MatchService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    /**
     * Creates and saves a new match associated with a specific competition and teams.
     *
     * @param match the Match object containing details about the match to be created
     * @param competitionId the ID of the competition the match will be associated with
     * @param homeTeamId the ID of the home team participating in the match
     * @param awayTeamId the ID of the away team participating in the match
     * @return a ResponseEntity containing the created Match object
     */
    @PostMapping("/save")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZER')")
    public ResponseEntity<Match> createMatch(
            @RequestBody Match match,
            @RequestParam Long competitionId,
            @RequestParam Long homeTeamId,
            @RequestParam Long awayTeamId) {
        Match createdMatch = matchService.create(match, competitionId, homeTeamId, awayTeamId);
        return ResponseEntity.ok(createdMatch);
    }

    /**
     * Retrieves a match by its unique identifier.
     *
     * @param id the unique identifier of the match to retrieve
     * @return ResponseEntity containing the match if found, or a 404 Not Found response otherwise
     */
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        Optional<Match> match = matchService.findById(id);
        return match.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves a list of all matches.
     *
     * @return a ResponseEntity containing a list of Match objects. The response
     *         will include an HTTP status of 200 (OK) along with the list of matches.
     */
    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.findAll();
        return ResponseEntity.ok(matches);
    }

    /**
     * Updates an existing match identified by its ID with the provided match details.
     *
     * @param id the ID of the match to be updated
     * @param match the new details of the match
     * @return a ResponseEntity containing the updated Match object
     */
    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Long id, @RequestBody Match match) {
        match.setId(id);
        Match updatedMatch = matchService.update(match);
        return ResponseEntity.ok(updatedMatch);
    }

    /**
     * Deletes a match by its unique identifier.
     * This method will remove the match entry from the database and return a "204 No Content" response
     * if the deletion is successful.
     *
     * @param id The unique identifier of the match to be deleted.
     * @return A ResponseEntity with an HTTP status of 204 No Content if the deletion is successful.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.delete(id);
        return ResponseEntity.noContent().build();
    }


    /**
     * Get all matches by team ID (either as home or away team).
     */
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Match>> getMatchesByTeamId(@PathVariable Long teamId) {
        List<Match> matches = matchService.findByTeamId(teamId);
        if (matches.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(matches);
    }

    /**
     * Get matches within a specific date range.
     */
    @GetMapping("/date-range")
    public ResponseEntity<List<Match>> getMatchesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<Match> matches = matchService.findByDateRange(start, end);
        if (matches.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(matches);
    }

    /**
     * Get matches by their status.
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Match>> getMatchesByStatus(@PathVariable MatchStatus status) {
        List<Match> matches = matchService.findByStatus(status);
        if (matches.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(matches);
    }

    /**
     * Update the score of a match.
     */
    @PutMapping("/{matchId}/update-score")
    public ResponseEntity<Match> updateMatchScore(
            @PathVariable Long matchId,
            @RequestParam Integer homeScore,
            @RequestParam Integer awayScore) {
        try {
            Match updatedMatch = matchService.updateScore(matchId, homeScore, awayScore);
            return ResponseEntity.ok(updatedMatch);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}