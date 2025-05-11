package com.web.n7.filter;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CompetitionFilter {
    private String status;
    private String name; //recherche partielle
    private String category;
    private String organizerName;//recherche partielle
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;

}
