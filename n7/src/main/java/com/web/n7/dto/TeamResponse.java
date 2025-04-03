package com.web.n7.dto;

import lombok.Data;

@Data
public class TeamResponse {
    private Long id;
    private String name;
    private String logo;
    private String category;
    private String coachName;
    private String createdAt;
    private String updatedAt;
}