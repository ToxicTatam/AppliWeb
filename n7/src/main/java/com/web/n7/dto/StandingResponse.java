package com.web.n7.dto;

import lombok.Data;

@Data
public class StandingResponse {
    private Long teamId;
    private String teamName;
    private Integer matchesPlayed;
    private Integer matchesWon;
    private Integer matchesDrawn;
    private Integer matchesLost;
    private Integer goalsFor;
    private Integer goalsAgainst;
    private Integer goalDifference;
    private Integer points;
    private Integer rank;
}