package com.web.n7.dto;

import lombok.Data;

@Data
public class PlayerParticipationResponse {
    private Long playerId;
    private String playerName;
    private Integer shirtNumber; // The player's jersey number
    private String position; // The position of the player on the field
    private Integer goalsScored;
    private Integer yellowCards;
    private Integer redCards;
    private Integer minutesPlayed;
    private Integer substitutionInTime; // Minute of entry into the match
    private Integer substitutionOutTime; // Minute of exit from the match
    private String playerStatus; // STARTER, SUBSTITUTE, etc.
}