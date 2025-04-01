package com.web.n7.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;


    @Column(name = "phone_number")
    private String phoneNumber;// Pas besoin vraiment de gerer ca donc c'est nullable mais je conserve quand même

    @Column
    private String userName;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String surName;

    @Column(nullable = false)
    private String role; // COACH, ORGANISATEUR, PLAYER, ADMIN? à voir

    @Column(name = "profile_picture")
    private String profilPicture;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    //ORGANIZER
//    @OneToMany(mappedBy = "organisateur", cascade = CascadeType.ALL)
//    private List<Competition> competitions = new ArrayList<>();

    //COACH
//    @OneToMany(mappedBy = "coach", cascade = CascadeType.ALL)
//    private List<Equipe> equipes = new ArrayList<>();

}
