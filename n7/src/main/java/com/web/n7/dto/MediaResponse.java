package com.web.n7.dto;

import lombok.Data;

@Data
public class MediaResponse {
    private Long id;
    private String title;
    private String url;
    private String type;
    private String competitionName;
    private String matchDetails;
    private String uploadedBy;
    private String createdAt;
}