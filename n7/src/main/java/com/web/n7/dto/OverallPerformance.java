package com.web.n7.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OverallPerformance {
    private int matchesPlayed;
    private int goalsScored;
    private int assists;
    private int minutesPlayed;
    private int yellowCards;
    private int redCards;


}