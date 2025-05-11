package com.web.n7.filter;

import lombok.Data;

@Data
public class MediaFilter {
    private String title;         // Filtre sur le titre du média
    private String mediaType;     // Filtre sur le type de média
    private Integer competitionName; // Filtre sur le nom de la compétition
    private String teamName;      // Filtre sur le nom de l'équipe
    private String matchTitle ; //titre du match
    private String uploaderName;  // Filtre sur le nom de l'uploader
    private String startDate;     // Filtre sur la date de début
    private String endDate;       // Filtre sur la date de fin
}
