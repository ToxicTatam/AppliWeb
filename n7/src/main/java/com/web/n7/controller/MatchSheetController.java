package com.web.n7.controller;


import com.web.n7.model.MatchSheet;
import com.web.n7.dto.ParticipationAndStrategyRequest;
import com.web.n7.model.PlayerParticipation;
import com.web.n7.service.MatchSheetService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/match-sheets")
public class MatchSheetController {

    private final MatchSheetService matchSheetService;

    public MatchSheetController(MatchSheetService matchSheetService) {
        this.matchSheetService = matchSheetService;
    }

    @PostMapping("/create")
    public ResponseEntity<MatchSheet> createMatchSheet(@RequestParam Long matchId) {
        MatchSheet matchSheet = matchSheetService.create(matchId);
        return ResponseEntity.ok(matchSheet);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchSheet> getMatchSheetById(@PathVariable Long id) {
        Optional<MatchSheet> matchSheet = matchSheetService.findById(id);
        return matchSheet.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Updates player participation details and strategy for a match.
     *
     * @param matchSheetId the ID of the match sheet to update
     * @param coachId the ID of the coach making the update
     * @param request the request body containing updated participations and strategy details
     * @return the updated match sheet
     */
    @PutMapping("/{matchSheetId}/participation-strategy")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<MatchSheet> updateParticipationAndStrategy(
            @PathVariable Long matchSheetId,
            @RequestParam Long coachId,
            @RequestBody ParticipationAndStrategyRequest request
    ) {
        MatchSheet updatedMatchSheet = matchSheetService.updateParticipationAndStrategy(
                matchSheetId,
                coachId,
                request.getPlayerParticipations(),
                request.getStrategy(),
                request.isHomeTeam()
        );
        return ResponseEntity.ok(updatedMatchSheet);
    }

    /**
     * Updates player participation details, such as goals, minutes played, etc.
     * Works only if the match is ongoing.
     *
     * @param matchSheetId the ID of the match sheet
     * @param updatedParticipations the list of updated player participation details
     * @return the updated match sheet
     */
    @PutMapping("/{matchSheetId}/participation-details")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<MatchSheet> updateParticipationDetails(
            @PathVariable Long matchSheetId,
            @RequestBody List<PlayerParticipation> updatedParticipations
    ) {
        MatchSheet updatedMatchSheet = matchSheetService.updateParticipationDetails(
                matchSheetId,
                updatedParticipations
        );
        return ResponseEntity.ok(updatedMatchSheet);
    }

    /**
     * Validates or invalidates a match sheet. Only the organizer of
     * the competition is allowed to perform this action.
     *
     * @param matchSheetId the ID of the match sheet to validate/invalidate
     * @param validateFlag true for validation, false for invalidation
     * @param organizerId the ID of the organizer attempting the action
     * @return the updated match sheet
     */
    @PutMapping("/{matchSheetId}/validate")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    public ResponseEntity<MatchSheet> validateMatchSheet(
            @PathVariable Long matchSheetId,
            @RequestParam boolean validateFlag,
            @RequestParam Long organizerId
    ) {
        MatchSheet validatedMatchSheet = matchSheetService.validateMatchSheet(matchSheetId, validateFlag, organizerId);
        return ResponseEntity.ok(validatedMatchSheet);
    }

    /**
     * Finds a match sheet by the associated match's ID.
     *
     * @param matchId the ID of the match
     * @return optional match sheet if found
     */
    @GetMapping("/by-match/{matchId}")
    public ResponseEntity<MatchSheet> findMatchSheetByMatchId(@PathVariable Long matchId) {
        Optional<MatchSheet> matchSheet = matchSheetService.findByMatchId(matchId);
        return matchSheet.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }




}