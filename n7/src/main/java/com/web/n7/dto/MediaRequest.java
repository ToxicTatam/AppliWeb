package com.web.n7.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class MediaRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String url;

    private String type; // IMAGE, VIDEO, AUDIO, DOCUMENT
    private Long competitionId;
    private Long matchId;
    private Long uploadedById;
}