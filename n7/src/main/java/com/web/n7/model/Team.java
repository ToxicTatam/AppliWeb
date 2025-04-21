package com.web.n7.model;


import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "teams")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private String logo;

    @Column(nullable = false)
    private String category; // Par exemple: Juniors, Seniors, ou n'importe quoi du genre juste extension pas besoin d'implementer ca pour le moment.

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private User coach;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<Player> players = new ArrayList<>();

    @ManyToMany(mappedBy = "teams")
    private Set<Competition> competitions = new HashSet<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}