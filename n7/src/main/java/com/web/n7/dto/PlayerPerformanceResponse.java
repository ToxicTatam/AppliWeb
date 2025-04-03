
package com.web.n7.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerPerformanceResponse {
    private Long playerId;
    private Map<Long, CompetitionPerformance> performancesByCompetition;
    private OverallPerformance overallStats;

}


