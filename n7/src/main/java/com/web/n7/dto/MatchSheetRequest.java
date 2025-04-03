package com.web.n7.dto;

import lombok.Data;
import java.util.List;

@Data
public class MatchSheetRequest {
    private Long matchId;
    private String status; // VALIDATED, UNVALIDATED, ONGOING
    private List<PlayerParticipationRequest> playerParticipations; // Nested DTO
    private String strategyHome;
    private String strategyAway;
}