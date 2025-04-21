package com.web.n7.configuration;

import com.web.n7.model.*;
import com.web.n7.model.enumeration.*;
import com.web.n7.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
        // Supprimer les anciennes données pour tester à chaque lancement
        matchSheetRepository.deleteAll();
        matchRepository.deleteAll();
        competitionRepository.deleteAll();
        teamRepository.deleteAll();
        userRepository.deleteAll();

        // ########### Création des utilisateurs ###########
        User organizer = new User();
        organizer.setEmail("organizer@example.com");
        organizer.setPassword(passwordEncoder.encode("password"));
        organizer.setFirstName("John");
        organizer.setLastName("Doe");
        organizer.setRole(Role.ORGANIZER.name());
        organizer.setCreatedAt(LocalDateTime.now());
        organizer.setUpdatedAt(LocalDateTime.now());
        userRepository.save(organizer);

        User coach1 = new User();
        coach1.setEmail("coach1@example.com");
        coach1.setPassword(passwordEncoder.encode("password"));
        coach1.setFirstName("Alice");
        coach1.setLastName("Smith");
        coach1.setRole(Role.COACH.name());
        coach1.setCreatedAt(LocalDateTime.now());
        coach1.setUpdatedAt(LocalDateTime.now());
        userRepository.save(coach1);

        User coach2 = new User();
        coach2.setEmail("coach2@example.com");
        coach2.setPassword(passwordEncoder.encode("password"));
        coach2.setFirstName("Bob");
        coach2.setLastName("Johnson");
        coach2.setRole(Role.COACH.name());
        coach2.setCreatedAt(LocalDateTime.now());
        coach2.setUpdatedAt(LocalDateTime.now());
        userRepository.save(coach2);

        User admin = new User();
        admin.setEmail("admin@example.com");
        admin.setPassword(passwordEncoder.encode("adminpassword"));
        admin.setFirstName("Admin");
        admin.setLastName("User");
        admin.setRole(Role.ADMIN.name());
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        userRepository.save(admin);

        // ########### Création des équipes ###########
        Team team1 = new Team();
        team1.setName("Team Alpha");
        team1.setCategory("Juniors");
        team1.setCoach(coach1);
        team1.setCreatedAt(LocalDateTime.now());
        team1.setUpdatedAt(LocalDateTime.now());
        teamRepository.save(team1);

        Team team2 = new Team();
        team2.setName("Team Beta");
        team2.setCategory("Seniors");
        team2.setCoach(coach2);
        team2.setCreatedAt(LocalDateTime.now());
        team2.setUpdatedAt(LocalDateTime.now());
        teamRepository.save(team2);

        Team team3 = new Team();
        team3.setName("Team Gamma");
        team3.setCategory("Juniors");
        team3.setCoach(coach1);
        team3.setCreatedAt(LocalDateTime.now());
        team3.setUpdatedAt(LocalDateTime.now());
        teamRepository.save(team3);

        Team team4 = new Team();
        team4.setName("Team Delta");
        team4.setCategory("Seniors");
        team4.setCoach(coach2);
        team4.setCreatedAt(LocalDateTime.now());
        team4.setUpdatedAt(LocalDateTime.now());
        teamRepository.save(team4);

        // ########### Création des compétitions ###########
        Competition competition1 = new Competition();
        competition1.setName("Spring Tournament");
        competition1.setDescription("Annual Spring Football Tournament");
        competition1.setStartDate(LocalDate.now().plusDays(7));
        competition1.setEndDate(LocalDate.now().plusDays(14));
        competition1.setRegistrationDeadline(LocalDate.now().plusDays(3));
        competition1.setLocation("Stadium A");
        competition1.setMaxTeams(16);
        competition1.setCompetitionType(CompetitionType.LEAGUE);
        competition1.setStatus(CompetitionStatus.UPCOMING);
        competition1.setOrganizer(organizer);
        competition1.setCreatedAt(LocalDateTime.now());
        competition1.setUpdatedAt(LocalDateTime.now());
        competition1.getTeams().addAll(List.of(team1, team2));
        competitionRepository.save(competition1);

        Competition competition2 = new Competition();
        competition2.setName("Winter Cup");
        competition2.setDescription("Yearly Winter Football Championship");
        competition2.setStartDate(LocalDate.now().plusDays(30));
        competition2.setEndDate(LocalDate.now().plusDays(37));
        competition2.setRegistrationDeadline(LocalDate.now().plusDays(25));
        competition2.setLocation("Stadium B");
        competition2.setMaxTeams(8);
        competition2.setCompetitionType(CompetitionType.CUP);
        competition2.setStatus(CompetitionStatus.REGISTRATION);
        competition2.setOrganizer(organizer);
        competition2.setCreatedAt(LocalDateTime.now());
        competition2.setUpdatedAt(LocalDateTime.now());
        competition2.getTeams().addAll(List.of(team3, team4));
        competitionRepository.save(competition2);

        // ########### Création des matchs ###########
        Match match1 = new Match();
        match1.setCompetition(competition1);
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

        Match match2 = new Match();
        match2.setCompetition(competition2);
        match2.setHomeTeam(team3);
        match2.setAwayTeam(team4);
        match2.setMatchDate(LocalDateTime.now().plusDays(31));
        match2.setLocation("Stadium B - Field 2");
        match2.setHomeScore(null);
        match2.setAwayScore(null);
        match2.setStatus(MatchStatus.SCHEDULED);
        match2.setCreatedAt(LocalDateTime.now());
        match2.setUpdatedAt(LocalDateTime.now());
        matchRepository.save(match2);

        // ########### Création des feuilles de match ###########
        MatchSheet matchSheet1 = new MatchSheet();
        matchSheet1.setMatch(match1);
        matchSheet1.setStatus(MatchSheetStatus.ONGOING);
        matchSheet1.setHomeStrategy("Standard 4-4-2");
        matchSheet1.setAwayStrategy("Standard 4-3-3");
        matchSheet1.setCreatedAt(LocalDateTime.now());
        matchSheet1.setUpdatedAt(LocalDateTime.now());
        matchSheetRepository.save(matchSheet1);

        MatchSheet matchSheet2 = new MatchSheet();
        matchSheet2.setMatch(match2);
        matchSheet2.setStatus(MatchSheetStatus.UNVALIDATED);
        matchSheet2.setHomeStrategy("Offensive 3-4-3");
        matchSheet2.setAwayStrategy("Defensive 5-4-1");
        matchSheet2.setCreatedAt(LocalDateTime.now());
        matchSheet2.setUpdatedAt(LocalDateTime.now());
        matchSheetRepository.save(matchSheet2);

        System.out.println("### Base de données initialisée avec succès avec des données supplémentaires !");
    }
}