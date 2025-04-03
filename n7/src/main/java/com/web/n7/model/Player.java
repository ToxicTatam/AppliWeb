package com.web.n7.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "players")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Player extends User {

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;  //pertinence j'en suis pas sur sauf si les joueurs mentent sur leur age ,mdr

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

}
