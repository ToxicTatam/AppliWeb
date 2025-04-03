package com.web.n7.dto;

import jakarta.persistence.Column;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class MatchRequest {
    @NotNull
    private Long competitionId;

    @NotNull
    private Long homeTeamId;

    @NotNull
    private Long awayTeamId;

    @NotNull
    private String matchDate; // ISO format or LocalDateTime

    private String location;
    private String status; // SCHEDULED, ONGOING, COMPLETED, etc.
    private Integer homeScore;
    private Integer awayScore;

}