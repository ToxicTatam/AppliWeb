package com.web.n7.filter;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MatchFilter {
    private String status;
    private String title;
    private String competitionName;
    private String teamName;
    private LocalDate startDate;
    private LocalDate endDate;



}