package com.web.n7.dto;

import lombok.Data;

@Data
public class MatchResponse {
    private Long id;
    private String competitionName;
    private String homeTeamName;
    private String awayTeamName;
    private String matchDate;
    private String location;
    private Integer homeScore;
    private Integer awayScore;
    private String status;
    private String createdAt;
    private String updatedAt;
}