package com.web.n7.dto;

import lombok.Data;

@Data
public class PlayerResponse {
    private Long id;
    private String licenseNumber;
    private String fullName;
    private String email;
    private String dateOfBirth;
    private String teamName;
    private Long teamId;
    private String createdAt;
    private String updatedAt;
}
