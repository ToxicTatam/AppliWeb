package com.web.n7.dto;

import lombok.Data;

import java.util.List;

@Data
public class MatchSheetResponse {
    private Long id;
    private Long matchId;
    private String matchDetails;
    private String status;
    private List<PlayerParticipationResponse> playerParticipations; // Nested DTO
    private String strategyHome;
    private String strategyAway;
    private String validationDate;
    private String createdAt;
    private String updatedAt;
}