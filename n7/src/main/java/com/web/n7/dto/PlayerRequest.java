package com.web.n7.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Data
public class PlayerRequest {
    @NotBlank
    private String licenseNumber;

    @NotNull
    private LocalDate dateOfBirth;

    @NotBlank
    private Long teamId;
}