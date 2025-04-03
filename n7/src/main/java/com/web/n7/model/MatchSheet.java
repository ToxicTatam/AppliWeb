package com.web.n7.model;

import com.web.n7.model.enumeration.MatchSheetStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "match_sheets")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MatchSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;


    @Column(name = "match_sheet_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private MatchSheetStatus status;

    @Column(name = "validation_date")
    private LocalDateTime validationDate;

    @OneToMany(mappedBy = "matchSheet", cascade = CascadeType.ALL)
    private List<PlayerParticipation> playerParticipations = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name="home_strategy")
    private String homeStrategy;

    @Column(name="away_strategy")
    private String awayStrategy;


}