package com.web.n7.configuration;

import com.web.n7.model.*;
import com.web.n7.model.enumeration.Role;
import com.web.n7.model.enumeration.competition.CompetitionStatus;
import com.web.n7.model.enumeration.competition.CompetitionTeamStatus;
import com.web.n7.model.enumeration.competition.CompetitionType;
import com.web.n7.model.enumeration.match.MatchRole;
import com.web.n7.model.enumeration.match.MatchStatus;
import com.web.n7.model.enumeration.player.PlayerStatus;
import com.web.n7.model.users.Admin;
import com.web.n7.model.users.Coach;
import com.web.n7.model.users.Organizer;
import com.web.n7.model.users.Player;
import com.web.n7.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final CoachRepository coachRepository;
    private final PlayerRepository playerRepository;
    private final OrganizerRepository organizerRepository;
    private final TeamRepository teamRepository;
    private final CompetitionRepository competitionRepository;
    private final CompetitionTeamRepository competitionTeamRepository;
    private final TeamStandingRepository teamStandingRepository;
    private final MatchRepository matchRepository;
    private final MatchParticipantRepository matchParticipantRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Initialisation des données de test...");
        
        // Vérifier si des données existent déjà
        if (userRepository.count() > 0) {
            log.info("La base de données contient déjà des données. Initialisation ignorée.");
            return;
        }

        // Création d'un Admin
        Admin admin = createAdmin();

        // Création des Organisateurs
        List<Organizer> organizers = createOrganizers();

        // Création des Coachs
        List<Coach> coaches = createCoaches();

        // Création des Équipes
        List<Team> teams = createTeams(coaches);

        // Création des Joueurs
        List<Player> players = createPlayers(teams);

        // Création des Compétitions
        List<Competition> competitions = createCompetitions(organizers);

        // Ajout des Équipes aux Compétitions
        addTeamsToCompetitions(competitions, teams);

        // Création des Matchs
        createMatches(competitions);

        log.info("Initialisation des données de test terminée !");
    }

    private Admin createAdmin() {
        Admin admin = new Admin();
        admin.setEmail("admin@n7.com");
        admin.setPassword(passwordEncoder.encode("password"));
        admin.setFirstName("Admin");
        admin.setLastName("Super");
        admin.setUserName("admin");
        admin.setPhone("+33612345678");
        admin.setRole(Role.ADMIN);
        admin.setContactDetails("Contact de l'administrateur système");
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        return adminRepository.save(admin);
    }

    private List<Organizer> createOrganizers() {
        List<Organizer> organizers = new ArrayList<>();

        for (int i = 1; i <= 3; i++) {
            Organizer organizer = new Organizer();
            organizer.setEmail("organizer" + i + "@n7.com");
            organizer.setPassword(passwordEncoder.encode("password"));
            organizer.setFirstName("Organizer");
            organizer.setLastName("User" + i);
            organizer.setUserName("organizer" + i);
            organizer.setPhone("+3361234567" + i);
            organizer.setRole(Role.ORGANIZER);
            organizer.setSpecialization("Football");
            organizer.setOrganization("N7 League Organization " + i);
            organizer.setContactDetails("Contact details for organizer " + i);
            organizer.setCreatedAt(LocalDateTime.now());
            organizer.setUpdatedAt(LocalDateTime.now());
            organizers.add(organizerRepository.save(organizer));
        }

        return organizers;
    }

    private List<Coach> createCoaches() {
        List<Coach> coaches = new ArrayList<>();

        for (int i = 1; i <= 10; i++) {
            Coach coach = new Coach();
            coach.setEmail("coach" + i + "@n7.com");
            coach.setPassword(passwordEncoder.encode("password"));
            coach.setFirstName("Coach");
            coach.setLastName("User" + i);
            coach.setUserName("coach" + i);
            coach.setPhone("+3362234567" + i);
            coach.setRole(Role.COACH);
            coach.setLicenseNumber("COACH" + (1000 + i));
            coach.setSpecialization(i % 2 == 0 ? "Attaque" : "Défense");
            coach.setYearsOfExperience(5 + i);
            coach.setContactDetails("Contact details for coach " + i);
            coach.setOrganization("Club " + i);
            coach.setBiography("Biographie du coach " + i);
            coach.setCreatedAt(LocalDateTime.now());
            coach.setUpdatedAt(LocalDateTime.now());
            coaches.add(coachRepository.save(coach));
        }

        return coaches;
    }

    private List<Team> createTeams(List<Coach> coaches) {
        List<Team> teams = new ArrayList<>();
        String[] categories = {"SENIOR", "JUNIOR", "CADET"};

        for (int i = 0; i < coaches.size(); i++) {
            Coach coach = coaches.get(i);
            
            Team team = Team.builder()
                    .name("Team " + (i + 1))
                    .description("Description de l'équipe " + (i + 1))
                    .category(categories[i % categories.length])
                    .coach(coach)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            
            Team savedTeam = teamRepository.save(team);
            
            // Initialiser la liste des équipes du coach si nécessaire
            if (coach.getTeams() == null) {
                coach.setTeams(new ArrayList<>());
            }
            coach.getTeams().add(savedTeam);
            coachRepository.save(coach);
            
            teams.add(savedTeam);
        }

        return teams;
    }

    private List<Player> createPlayers(List<Team> teams) {
        List<Player> allPlayers = new ArrayList<>();
        String[] positions = {"FORWARD", "MIDFIELDER", "DEFENDER", "GOALKEEPER"};
        
        for (Team team : teams) {
            // Créer 15 joueurs par équipe
            for (int i = 1; i <= 15; i++) {
                Player player = new Player();
                player.setEmail("player_" + team.getId() + "_" + i + "@n7.com");
                player.setPassword(passwordEncoder.encode("password"));
                player.setFirstName("Player");
                player.setLastName("Team" + team.getId() + "_" + i);
                player.setUserName("player_" + team.getId() + "_" + i);
                player.setPhone("+3363234" + team.getId() + i);
                player.setRole(Role.PLAYER);
                player.setLicenseNumber("PLAYER" + team.getId() + "00" + i);
                player.setDateOfBirth(LocalDate.now().minusYears(18 + (i % 10)));
                player.setPosition(positions[i % positions.length]);
                player.setStatus(i <= 11 ? PlayerStatus.STARTER : PlayerStatus.SUBSTITUTE);
                player.setTeam(team);
                player.setCreatedAt(LocalDateTime.now());
                player.setUpdatedAt(LocalDateTime.now());
                
                Player savedPlayer = playerRepository.save(player);
                allPlayers.add(savedPlayer);
                
                // Nous vérifions que l'équipe a bien sa liste de joueurs initialisée
                if (team.getPlayers() == null) {
                    team.setPlayers(new ArrayList<>());
                }
                team.getPlayers().add(savedPlayer);
                teamRepository.save(team);
            }
        }

        return allPlayers;
    }

    private List<Competition> createCompetitions(List<Organizer> organizers) {
        List<Competition> competitions = new ArrayList<>();
        
        // Championnat
        Organizer leagueOrganizer = organizers.get(0);
        Competition league = Competition.builder()
                .name("Championnat N7 2023")
                .description("Championnat principal de la saison 2023")
                .type(CompetitionType.LEAGUE)
                .status(CompetitionStatus.IN_PROGRESS)
                .startDate(LocalDate.now().minusMonths(1))
                .endDate(LocalDate.now().plusMonths(5))
                .registrationDeadline(LocalDate.now().minusMonths(2))
                .location("Toulouse")
                .maxTeams(10)
                .organizer(leagueOrganizer)
                .category("SENIOR")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Competition savedLeague = competitionRepository.save(league);
        
        // Ajouter la compétition à la liste des compétitions de l'organisateur
        if (leagueOrganizer.getCompetitions() == null) {
            leagueOrganizer.setCompetitions(new ArrayList<>());
        }
        leagueOrganizer.getCompetitions().add(savedLeague);
        organizerRepository.save(leagueOrganizer);
        
        competitions.add(savedLeague);
        
        // Tournoi
        Organizer tournamentOrganizer = organizers.get(1);
        Competition tournament = Competition.builder()
                .name("Tournoi N7 Open")
                .description("Tournoi ouvert à toutes les équipes")
                .type(CompetitionType.TOURNAMENT)
                .status(CompetitionStatus.UPCOMING)
                .startDate(LocalDate.now().plusMonths(1))
                .endDate(LocalDate.now().plusMonths(1).plusDays(7))
                .registrationDeadline(LocalDate.now().plusDays(15))
                .location("Bordeaux")
                .maxTeams(8)
                .organizer(tournamentOrganizer)
                .category("JUNIOR")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Competition savedTournament = competitionRepository.save(tournament);
        
        // Ajouter la compétition à la liste des compétitions de l'organisateur
        if (tournamentOrganizer.getCompetitions() == null) {
            tournamentOrganizer.setCompetitions(new ArrayList<>());
        }
        tournamentOrganizer.getCompetitions().add(savedTournament);
        organizerRepository.save(tournamentOrganizer);
        
        competitions.add(savedTournament);
        
        // Coupe
        Organizer cupOrganizer = organizers.get(2);
        Competition cup = Competition.builder()
                .name("Coupe N7 2023")
                .description("Compétition à élimination directe")
                .type(CompetitionType.CUP)
                .status(CompetitionStatus.REGISTRATION)
                .startDate(LocalDate.now().plusMonths(2))
                .endDate(LocalDate.now().plusMonths(4))
                .registrationDeadline(LocalDate.now().plusMonths(1))
                .location("Paris")
                .maxTeams(16)
                .organizer(cupOrganizer)
                .category("SENIOR")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Competition savedCup = competitionRepository.save(cup);
        
        // Ajouter la compétition à la liste des compétitions de l'organisateur
        if (cupOrganizer.getCompetitions() == null) {
            cupOrganizer.setCompetitions(new ArrayList<>());
        }
        cupOrganizer.getCompetitions().add(savedCup);
        organizerRepository.save(cupOrganizer);
        
        competitions.add(savedCup);

        return competitions;
    }

    private void addTeamsToCompetitions(List<Competition> competitions, List<Team> teams) {
        Random random = new Random();
        
        // Pour le championnat (première compétition) - tous les équipes de catégorie SENIOR
        Competition league = competitions.get(0);
        int rank = 1;
        
        for (Team team : teams) {
            if ("SENIOR".equals(team.getCategory())) {
                // Ajouter l'équipe à la compétition
                CompetitionTeam competitionTeam = CompetitionTeam.builder()
                        .competition(league)
                        .team(team)
                        .status(CompetitionTeamStatus.ACTIVE)
                        .build();
                CompetitionTeam savedCompetitionTeam = competitionTeamRepository.save(competitionTeam);
                
                // Mettre à jour les listes de relations
                if (team.getCompetitionTeams() == null) {
                    team.setCompetitionTeams(new ArrayList<>());
                }
                team.getCompetitionTeams().add(savedCompetitionTeam);
                teamRepository.save(team);
                
                if (league.getCompetitionTeams() == null) {
                    league.setCompetitionTeams(new ArrayList<>());
                }
                league.getCompetitionTeams().add(savedCompetitionTeam);
                competitionRepository.save(league);
                
                // Créer un classement pour cette équipe
                TeamStanding standing = TeamStanding.builder()
                        .team(team)
                        .competition(league)
                        .rank(rank++)
                        .playedMatches(random.nextInt(5) + 5)
                        .wins(random.nextInt(5) + 2)
                        .draws(random.nextInt(3))
                        .losses(random.nextInt(4))
                        .goalsFor(random.nextInt(20) + 10)
                        .goalsAgainst(random.nextInt(15) + 5)
                        .points((random.nextInt(5) + 2) * 3 + random.nextInt(3))
                        .goalDifference(0)
                        .homeWins(random.nextInt(3) + 1)
                        .homeDraws(random.nextInt(2))
                        .homeLosses(random.nextInt(2))
                        .awayWins(random.nextInt(2) + 1)
                        .awayDraws(random.nextInt(2))
                        .awayLosses(random.nextInt(2))
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();
                
                // Calculer la différence de buts
                standing.setGoalDifference(standing.getGoalsFor() - standing.getGoalsAgainst());
                
                teamStandingRepository.save(standing);
            }
        }
        
        // Pour le tournoi (deuxième compétition) - équipes JUNIOR
        Competition tournament = competitions.get(1);
        rank = 1;
        
        for (Team team : teams) {
            if ("JUNIOR".equals(team.getCategory())) {
                CompetitionTeam competitionTeam = CompetitionTeam.builder()
                        .competition(tournament)
                        .team(team)
                        .status(CompetitionTeamStatus.ACTIVE)
                        .build();
                CompetitionTeam savedCompetitionTeam = competitionTeamRepository.save(competitionTeam);
                
                // Mettre à jour les listes de relations
                if (team.getCompetitionTeams() == null) {
                    team.setCompetitionTeams(new ArrayList<>());
                }
                team.getCompetitionTeams().add(savedCompetitionTeam);
                teamRepository.save(team);
                
                if (tournament.getCompetitionTeams() == null) {
                    tournament.setCompetitionTeams(new ArrayList<>());
                }
                tournament.getCompetitionTeams().add(savedCompetitionTeam);
                competitionRepository.save(tournament);
            }
        }
        
        // Pour la coupe (troisième compétition) - quelques équipes aléatoires
        Competition cup = competitions.get(2);
        
        for (int i = 0; i < Math.min(8, teams.size()); i++) {
            Team team = teams.get(random.nextInt(teams.size()));
            
            // Vérifier si l'équipe est déjà inscrite
            if (competitionTeamRepository.findByCompetitionIdAndTeamId(cup.getId(), team.getId()) == null) {
                CompetitionTeam competitionTeam = CompetitionTeam.builder()
                        .competition(cup)
                        .team(team)
                        .status(CompetitionTeamStatus.ACTIVE)
                        .build();
                CompetitionTeam savedCompetitionTeam = competitionTeamRepository.save(competitionTeam);
                
                // Mettre à jour les listes de relations
                if (team.getCompetitionTeams() == null) {
                    team.setCompetitionTeams(new ArrayList<>());
                }
                team.getCompetitionTeams().add(savedCompetitionTeam);
                teamRepository.save(team);
                
                if (cup.getCompetitionTeams() == null) {
                    cup.setCompetitionTeams(new ArrayList<>());
                }
                cup.getCompetitionTeams().add(savedCompetitionTeam);
                competitionRepository.save(cup);
            }
        }
    }

    private void createMatches(List<Competition> competitions) {
        Random random = new Random();
        
        // Pour le championnat (première compétition)
        Competition league = competitions.get(0);
        List<Team> leagueTeams = teamRepository.findByCompetitionsId(league.getId());
        
        // Créer quelques matchs terminés
        for (int i = 0; i < 10; i++) {
            // Sélectionner deux équipes aléatoires différentes
            int homeIndex = random.nextInt(leagueTeams.size());
            int awayIndex;
            do {
                awayIndex = random.nextInt(leagueTeams.size());
            } while (homeIndex == awayIndex);
            
            Team homeTeam = leagueTeams.get(homeIndex);
            Team awayTeam = leagueTeams.get(awayIndex);
            
            // Créer le match
            Match match = Match.builder()
                    .title(homeTeam.getName() + " vs " + awayTeam.getName())
                    .description("Match de championnat")
                    .competition(league)
                    .matchDate(LocalDateTime.now().minusDays(random.nextInt(20) + 1))
                    .location("Stade de " + homeTeam.getName())
                    .homeScore(random.nextInt(5))
                    .awayScore(random.nextInt(5))
                    .status(MatchStatus.COMPLETED)
                    .round(1 + random.nextInt(3))
                    .createdAt(LocalDateTime.now().minusDays(30))
                    .updatedAt(LocalDateTime.now())
                    .build();
            match = matchRepository.save(match);
            
            // Ajouter les participants
            MatchParticipant homeParticipant = MatchParticipant.builder()
                    .match(match)
                    .team(homeTeam)
                    .role(MatchRole.HOME)
                    .build();
            MatchParticipant savedHomeParticipant = matchParticipantRepository.save(homeParticipant);
            
            MatchParticipant awayParticipant = MatchParticipant.builder()
                    .match(match)
                    .team(awayTeam)
                    .role(MatchRole.AWAY)
                    .build();
            MatchParticipant savedAwayParticipant = matchParticipantRepository.save(awayParticipant);
            
            // S'assurer que la liste des participants du match est correctement initialisée
            if (match.getParticipants() == null) {
                match.setParticipants(new ArrayList<>());
            }
            match.getParticipants().add(savedHomeParticipant);
            match.getParticipants().add(savedAwayParticipant);
            matchRepository.save(match);
        }
        
        // Créer quelques matchs programmés
        for (int i = 0; i < 5; i++) {
            // Sélectionner deux équipes aléatoires différentes
            int homeIndex = random.nextInt(leagueTeams.size());
            int awayIndex;
            do {
                awayIndex = random.nextInt(leagueTeams.size());
            } while (homeIndex == awayIndex);
            
            Team homeTeam = leagueTeams.get(homeIndex);
            Team awayTeam = leagueTeams.get(awayIndex);
            
            // Créer le match
            Match match = Match.builder()
                    .title(homeTeam.getName() + " vs " + awayTeam.getName())
                    .description("Match de championnat à venir")
                    .competition(league)
                    .matchDate(LocalDateTime.now().plusDays(random.nextInt(30) + 1))
                    .location("Stade de " + homeTeam.getName())
                    .status(MatchStatus.SCHEDULED)
                    .round(4 + random.nextInt(2))
                    .createdAt(LocalDateTime.now().minusDays(15))
                    .updatedAt(LocalDateTime.now())
                    .build();
            match = matchRepository.save(match);
            
            // Ajouter les participants
            MatchParticipant homeParticipant = MatchParticipant.builder()
                    .match(match)
                    .team(homeTeam)
                    .role(MatchRole.HOME)
                    .build();
            MatchParticipant savedHomeParticipant = matchParticipantRepository.save(homeParticipant);
            
            MatchParticipant awayParticipant = MatchParticipant.builder()
                    .match(match)
                    .team(awayTeam)
                    .role(MatchRole.AWAY)
                    .build();
            MatchParticipant savedAwayParticipant = matchParticipantRepository.save(awayParticipant);
            
            // S'assurer que la liste des participants du match est correctement initialisée
            if (match.getParticipants() == null) {
                match.setParticipants(new ArrayList<>());
            }
            match.getParticipants().add(savedHomeParticipant);
            match.getParticipants().add(savedAwayParticipant);
            matchRepository.save(match);
        }
        
        // Pour le tournoi (deuxième compétition)
        Competition tournament = competitions.get(1);
        List<Team> tournamentTeams = teamRepository.findByCompetitionsId(tournament.getId());
        
        // Créer quelques matchs programmés pour le tournoi
        for (int i = 0; i < Math.min(3, tournamentTeams.size() / 2); i++) {
            int homeIndex = i * 2;
            int awayIndex = i * 2 + 1;
            
            if (homeIndex < tournamentTeams.size() && awayIndex < tournamentTeams.size()) {
                Team homeTeam = tournamentTeams.get(homeIndex);
                Team awayTeam = tournamentTeams.get(awayIndex);
                
                // Créer le match
                Match match = Match.builder()
                        .title(homeTeam.getName() + " vs " + awayTeam.getName())
                        .description("Match de tournoi, premier tour")
                        .competition(tournament)
                        .matchDate(LocalDateTime.now().plusMonths(1).plusDays(random.nextInt(5)))
                        .location("Stade du tournoi")
                        .status(MatchStatus.SCHEDULED)
                        .round(1)
                        .createdAt(LocalDateTime.now().minusDays(5))
                        .updatedAt(LocalDateTime.now())
                        .build();
                match = matchRepository.save(match);
                
                // Ajouter les participants
                MatchParticipant homeParticipant = MatchParticipant.builder()
                        .match(match)
                        .team(homeTeam)
                        .role(MatchRole.HOME)
                        .build();
                MatchParticipant savedHomeParticipant = matchParticipantRepository.save(homeParticipant);
                
                MatchParticipant awayParticipant = MatchParticipant.builder()
                        .match(match)
                        .team(awayTeam)
                        .role(MatchRole.AWAY)
                        .build();
                MatchParticipant savedAwayParticipant = matchParticipantRepository.save(awayParticipant);
                
                // S'assurer que la liste des participants du match est correctement initialisée
                if (match.getParticipants() == null) {
                    match.setParticipants(new ArrayList<>());
                }
                match.getParticipants().add(savedHomeParticipant);
                match.getParticipants().add(savedAwayParticipant);
                matchRepository.save(match);
            }
        }
    }
} 