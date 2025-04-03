package com.web.n7.dto;

import lombok.Data;

@Data
public class PlayerParticipationRequest {
    private Long playerId;
    private Integer shirtNumber;
    private String position;
    private Integer goalsScored;
    private Integer yellowCards;
    private Integer redCards;
    private Integer minutesPlayed;
    private Integer substitutionInTime;
    private Integer substitutionOutTime;
}