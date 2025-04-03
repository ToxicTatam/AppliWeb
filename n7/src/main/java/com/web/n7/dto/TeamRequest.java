package com.web.n7.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class TeamRequest {
    @NotBlank
    private String name;

    private String logo;

    @NotBlank
    private String category; // Juniors, Seniors, etc.

    @NotBlank
    private Long coachId; // Associated coach
}