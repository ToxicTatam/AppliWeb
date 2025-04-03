package com.web.n7.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompetitionPerformance {
    private Long competitionId;
    private String competitionName;
    private int matchesPlayed;
    private int goalsScored;
    private int assists;
    private int minutesPlayed;
    private int yellowCards;
    private int redCards;

    
}