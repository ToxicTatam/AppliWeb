package com.web.n7.model;

import com.web.n7.model.enumeration.PlayerStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "player_histories")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//stat of a player
public class PlayerHistory {

    /**
     * Unique identifier of the PlayerHistory entity.
     * This ID is autogenerated using the {@link GenerationType#IDENTITY} strategy.
     * It serves as the primary key for the player_histories table in the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Represents the associated player for a specific player history entry.
     * This field establishes a many-to-one relationship between the PlayerHistory
     * entity and the Player entity.
     *
     * Mapped to the "player_id" column in the database and cannot be null.
     */
    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    /**
     * Represents the association between a player's performance history and the match
     * during which the performance occurred. This property is part of the PlayerHistory
     * entity and establishes a many-to-one relationship with the Match entity.
     *
     * The match is identified by the "match_id" column in the database and is a mandatory
     * field as specified by the nullable = false constraint.
     */
    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    /**
     * Represents the number of goals scored by a player in a given match.
     * This variable is associated with the column "goals_scored" in the database table.
     * It is stored as an integer value.
     */
    @Column(name = "goals_scored")
    private Integer goalsScored;

    /**
     * Represents the number of assists made by a player during a match.
     * This field is mapped to the "assists" column in the "player_histories" database table.
     */
    @Column(name = "assists")
    private Integer assists;

    /**
     * Represents the total number of minutes a player has actively participated
     * in a specific match. This value is intended to track the time a player spent
     * on the field during a game.
     *
     * Mapped to the "minutes_played" column in the database.
     */
    @Column(name = "minutes_played")
    private Integer minutesPlayed;

    /**
     * Represents the number of yellow cards received by a player during a specific match.
     * This field is part of the PlayerHistory entity and is mapped to the yellow_cards column
     * in the database. A yellow card typically serves as a warning to the player for unsportsmanlike behavior.
     */
    @Column(name = "yellow_cards")
    private Integer yellowCards;

    /**
     * Represents the number of red cards a player has received during a match.
     *
     * This field is part of the `PlayerHistory` entity, which tracks various statistics
     * and events related to a player's performance in a match.
     *
     * Mapped to the `red_cards` column in the database.
     */
    @Column(name = "red_cards")
    private Integer redCards;

    /**
     * Represents the status of a player during a match, stored as a string in the database.
     * The player status can take various enum values such as STARTER, SUBSTITUTE, ENTERED, etc.
     * This field is mandatory and directly mapped to the database column "player_status".
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "player_status", nullable = false)
    private PlayerStatus status;

    /**
     * Represents the timestamp when the entity was created.
     * This field is automatically mapped to the "created_at" column in the database.
     * Typically used for tracking the creation time of the record.
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Represents the timestamp when the record was last updated in the database.
     * This field is automatically managed to reflect the most recent modification time,
     * ensuring consistency with the most current data.
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}