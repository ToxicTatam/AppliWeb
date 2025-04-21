package com.web.n7.dto;

import com.web.n7.model.PlayerParticipation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO (Data Transfer Object) to handle player participation and strategy updates
 * for a specific match sheet.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipationAndStrategyRequest {

    // List of player participation details to be updated
    private List<PlayerParticipation> playerParticipations;
    
    // The strategy (e.g., offensive, defensive) provided for the team
    private String strategy;
    
    // Indicates whether the update is for the home team or away team
    private boolean homeTeam;
}