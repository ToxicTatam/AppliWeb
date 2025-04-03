package com.web.n7.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "standings")
@Builder
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

    public void addGoalsFor(int goals) {
        if (this.goalsFor == null) {
            this.goalsFor = 0;
        }
        this.goalsFor += goals;
        updateGoalDifference();
        updateTimestamp();

    }

    public void addGoalsAgainst(int goals) {
        if (this.goalsAgainst == null) {
            this.goalsAgainst = 0;
        }
        this.goalsAgainst += goals;
        updateGoalDifference();
        updateTimestamp();
    }

    public void addWin() {
        if (this.matchesWon == null) {
            this.matchesWon = 0;
        }
        if (this.matchesPlayed == null) {
            this.matchesPlayed = 0;
        }
        if (this.points == null) {
            this.points = 0;
        }

        this.matchesWon += 1;
        this.matchesPlayed += 1;
        this.points += 3;
        updateTimestamp();

    }

    public void addLoss() {
        if (this.matchesLost == null) {
            this.matchesLost = 0;
        }
        if (this.matchesPlayed == null) {
            this.matchesPlayed = 0;
        }

        this.matchesLost += 1;
        this.matchesPlayed += 1;
        updateTimestamp();

    }

    public void addDraw() {
        if (this.matchesDrawn == null) {
            this.matchesDrawn = 0;
        }
        if (this.matchesPlayed == null) {
            this.matchesPlayed = 0;
        }
        if (this.points == null) {
            this.points = 0;
        }

        this.matchesDrawn += 1;
        this.matchesPlayed += 1;
        this.points += 1;
        updateTimestamp();

    }

    public void updateGoalDifference() {
        if (this.goalsFor == null) {
            this.goalsFor = 0;
        }
        if (this.goalsAgainst == null) {
            this.goalsAgainst = 0;
        }
        this.goalDifference = this.goalsFor - this.goalsAgainst;
    }

    private void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }


}