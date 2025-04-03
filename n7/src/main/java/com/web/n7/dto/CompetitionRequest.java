package com.web.n7.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
public class CompetitionRequest {
    private String name;
    private String description;

    @NotBlank
    private LocalDate startDate;

    @NotBlank
    private LocalDate endDate;

    private LocalDate registrationDeadline;
    private String location;
    private Integer maxTeams;
    private String competitionType; // LEAGUE, CUP, TOURNAMENT
    private String status; // UPCOMING, ONGOING, COMPLETED, etc.
}