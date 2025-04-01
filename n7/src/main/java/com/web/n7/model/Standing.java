package com.web.n7.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "standings")
public class Standing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "competition_id", nullable = false)
    private Competition competition;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

//    @OneToOne
//    @JoinColumn(name = "competition_id", nullable = false)
//    private Competition competition;
//
//    @OneToMany(cascade = CascadeType.ALL)
//    private List<EquipeClassement> equipesClassement = new ArrayList<>();

    @Column(name = "matches_played")
    private Integer matchesPlayed;

    @Column(name = "matches_won")
    private Integer matchesWon;

    @Column(name = "matches_drawn")
    private Integer matchesDrawn;

    @Column(name = "matches_lost")
    private Integer matchesLost;

    @Column(name = "goals_for")
    private Integer goalsFor;

    @Column(name = "goals_against")
    private Integer goalsAgainst;

    @Column(name = "goal_difference")
    private Integer goalDifference;

    @Column(name = "points")
    private Integer points;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}