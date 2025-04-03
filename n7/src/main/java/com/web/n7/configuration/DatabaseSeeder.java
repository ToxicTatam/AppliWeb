package com.web.n7.configuration;

import com.web.n7.model.*;
import com.web.n7.model.enumeration.CompetitionStatus;
import com.web.n7.model.enumeration.CompetitionType;
import com.web.n7.model.enumeration.MatchStatus;
import com.web.n7.model.enumeration.Role;
import com.web.n7.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/*JUSTE POUR TESTER LES REQUETES */
@Configuration
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final CompetitionRepository competitionRepository;
    private final MatchRepository matchRepository;
    private final MatchSheetRepository matchSheetRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          TeamRepository teamRepository,
                          CompetitionRepository competitionRepository,
                          MatchRepository matchRepository,
                          MatchSheetRepository matchSheetRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.competitionRepository = competitionRepository;
        this.matchRepository = matchRepository;
        this.matchSheetRepository = matchSheetRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Supprimer les anciennes données si nécessaire
        matchSheetRepository.deleteAll();
        matchRepository.deleteAll();
        competitionRepository.deleteAll();
        teamRepository.deleteAll();
        userRepository.deleteAll();

        // Création des utilisateurs (coach, organisateur, joueur)
        User organizer = new User();
        organizer.setEmail("organizer@example.com");
        organizer.setPassword(passwordEncoder.encode("password"));
        organizer.setFirstName("John");
        organizer.setLastName("Doe");
        organizer.setRole(Role.ORGANIZER.name());
        organizer.setCreatedAt(LocalDateTime.now());
        organizer.setUpdatedAt(LocalDateTime.now());
        userRepository.save(organizer);

        User coach = new User();
        coach.setEmail("coach@example.com");
        coach.setPassword(passwordEncoder.encode("password"));
        coach.setFirstName("Alice");
        coach.setLastName("Smith");
        coach.setRole(Role.COACH.name());
        coach.setCreatedAt(LocalDateTime.now());
        coach.setUpdatedAt(LocalDateTime.now());
        userRepository.save(coach);

        // Création des équipes
        Team team1 = new Team();
        team1.setName("Team Alpha");
        team1.setCategory("Juniors");
        team1.setCoach(coach);
        team1.setCreatedAt(LocalDateTime.now());
        team1.setUpdatedAt(LocalDateTime.now());
        teamRepository.save(team1);

        Team team2 = new Team();
        team2.setName("Team Beta");
        team2.setCategory("Seniors");
        team2.setCoach(coach);
        team2.setCreatedAt(LocalDateTime.now());
        team2.setUpdatedAt(LocalDateTime.now());
        teamRepository.save(team2);

        // Création d’une compétition
        Competition competition = new Competition();
        competition.setName("Spring Tournament");
        competition.setDescription("Annual Spring Football Tournament");
        competition.setStartDate(LocalDate.now().plusDays(7));
        competition.setEndDate(LocalDate.now().plusDays(14));
        competition.setRegistrationDeadline(LocalDate.now().plusDays(3));
        competition.setLocation("Stadium A");
        competition.setMaxTeams(16);
        competition.setCompetitionType(CompetitionType.LEAGUE);
        competition.setStatus(CompetitionStatus.UPCOMING);
        competition.setOrganizer(organizer);
        competition.setCreatedAt(LocalDateTime.now());
        competition.setUpdatedAt(LocalDateTime.now());
        competition.getTeams().addAll(List.of(team1, team2));
        competitionRepository.save(competition);

        // Création des matchs
        Match match1 = new Match();
        match1.setCompetition(competition);
        match1.setHomeTeam(team1);
        match1.setAwayTeam(team2);
        match1.setMatchDate(LocalDateTime.now().plusDays(8));
        match1.setLocation("Stadium A - Field 1");
        match1.setHomeScore(null);
        match1.setAwayScore(null);
        match1.setStatus(MatchStatus.SCHEDULED);
        match1.setCreatedAt(LocalDateTime.now());
        match1.setUpdatedAt(LocalDateTime.now());
        matchRepository.save(match1);

        // Création de la feuille de match
        MatchSheet matchSheet = new MatchSheet();
        matchSheet.setMatch(match1);
        matchSheet.setHomeStrategy("Standard 4-4-2");
        matchSheet.setAwayStrategy("Standard 4-3-3");
        matchSheet.setCreatedAt(LocalDateTime.now());
        matchSheet.setUpdatedAt(LocalDateTime.now());
        matchSheetRepository.save(matchSheet);

        System.out.println("### Base de données initialisée avec succès !");
    }
}