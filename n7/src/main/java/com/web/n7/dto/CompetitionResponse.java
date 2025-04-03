package com.web.n7.dto;

import lombok.Data;

@Data
public class CompetitionResponse {
    private Long id;
    private String name;
    private String description;
    private String startDate;
    private String endDate;
    private String registrationDeadline;
    private String location;
    private Integer maxTeams;
    private String competitionType;
    private String status;
    private String organizerName; // Organizer information
    private String createdAt;
    private String updatedAt;
}
