package com.web.n7.model;

import com.web.n7.model.enumeration.PlayerStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "player_participations")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerParticipation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "match_sheet_id", nullable = false)
    private MatchSheet matchSheet;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(name = "shirt_number")
    private Integer shirtNumber; //numero de maillot du joeur(facultatif mais je le laisse)

    @Enumerated(EnumType.STRING)
    @Column(name = "player_status", nullable = false)
    private PlayerStatus status;

    @Column(name = "position")
    private String position;

    @Column(name = "goals_scored")
    private Integer goalsScored;

    @Column(name = "yellow_cards")
    private Integer yellowCards;

    @Column(name = "red_cards")
    private Integer redCards;

    @Column(name = "minutes_played")
    private Integer minutesPlayed;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "substitution_in_time")
    private Integer substitutionInTime;  // Minute d'entrée en jeu , pas obligatoire

    @Column(name = "substitution_out_time")
    private Integer substitutionOutTime; // Minute de sortie du jeu, pas obligatoire


    public PlayerHistory toHistory(Match match) {
        return PlayerHistory.builder()
                .player(this.getPlayer())
                .match(match)
                .goalsScored(this.getGoalsScored())
                .assists(0)
                .minutesPlayed(this.getMinutesPlayed())
                .yellowCards(this.getYellowCards())
                .redCards(this.getRedCards())
                .status(this.getStatus())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

}
