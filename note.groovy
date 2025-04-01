// 1. User (Utilisateur)
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters, setters, constructors
}

// 2. Role (Enum)
public enum Role {
    COACH,
    ORGANIZER,
    ADMIN
}

// 3. Team (Équipe)
@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    
    private String logo;
    
    @Column(nullable = false)
    private String category; // Par exemple: U10, U12, Seniors, etc.

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private User coach;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<Player> players = new ArrayList<>();

    @ManyToMany(mappedBy = "teams")
    private Set<Competition> competitions = new HashSet<>();

}

// 4. Player (Joueur)
@Entity
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "profile_picture")
    private String profilePicture;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters, setters, constructors
}

// 5. Competition
@Entity
@Table(name = "competitions")
public class Competition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "registration_deadline")
    private LocalDate registrationDeadline;

    @Column(nullable = false)
    private String location;

    @Column(name = "max_teams")
    private Integer maxTeams;

    @Column(name = "competition_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private CompetitionType competitionType;

    @Column(name = "competition_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private CompetitionStatus status;

    @ManyToOne
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;

    @ManyToMany
    @JoinTable(
        name = "competition_teams",
        joinColumns = @JoinColumn(name = "competition_id"),
        inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    private Set<Team> teams = new HashSet<>();

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL)
    private List<Match> matches = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters, setters, constructors
}

// 6. CompetitionType (Enum)
public enum CompetitionType {
    LEAGUE,     // Championnat
    TOURNAMENT, // Tournoi
    CUP         // Coupe
}

// 7. CompetitionStatus (Enum)
public enum CompetitionStatus {
    UPCOMING,       // À venir
    REGISTRATION,   // Inscriptions ouvertes
    ONGOING,        // En cours
    COMPLETED,      // Terminée
    CANCELLED       // Annulée
}

// 8. Match
@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "competition_id", nullable = false)
    private Competition competition;

    @ManyToOne
    @JoinColumn(name = "home_team_id", nullable = false)
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id", nullable = false)
    private Team awayTeam;

    @Column(name = "match_date", nullable = false)
    private LocalDateTime matchDate;

    @Column(name = "location")
    private String location;

    @Column(name = "home_score")
    private Integer homeScore;

    @Column(name = "away_score")
    private Integer awayScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "match_status", nullable = false)
    private MatchStatus status;

    @OneToOne(mappedBy = "match", cascade = CascadeType.ALL)
    private MatchSheet matchSheet;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

// 9. MatchStatus (Enum)
public enum MatchStatus {
    SCHEDULED,  // Programmé
    ONGOING,    // En cours
    COMPLETED,  // Terminé
    POSTPONED,  // Reporté
    CANCELLED   // Annulé
}

// 10. MatchSheet (Feuille de match)
@Entity
@Table(name = "match_sheets")
public class MatchSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @Column(name = "is_validated")
    private boolean isValidated;

    @Column(name = "validation_date")
    private LocalDateTime validationDate;

    @OneToMany(mappedBy = "matchSheet", cascade = CascadeType.ALL)
    private List<PlayerParticipation> playerParticipations = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name="strategy")
    private String strategy;
}

public enum PlayerStatus {
    STARTER,       // Titulaire
    SUBSTITUTE,    // Remplaçant
    ENTERED,       // Entré en jeu
    NOT_PLAYED,    // N'a pas joué
    INJURED,       // Blessé pendant le match
    EXPELLED       // Expulsé (carton rouge)
}


// 11. PlayerParticipation (Participation d'un joueur à un match)
@Entity
@Table(name = "player_participations")
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

}


// 12. Notification
@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String message;

    @Column(name = "is_read")
    private boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false)
    private NotificationType type;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Getters, setters, constructors
}

// 13. NotificationType (Enum)
public enum NotificationType {
    COMPETITION_REGISTRATION,
    MATCH_REMINDER,
    RESULT_UPDATE,
    SYSTEM_MESSAGE
}

// 14. Media (Photos, vidéos, etc.)
@Entity
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false)
    private MediaType type;

    @ManyToOne
    @JoinColumn(name = "competition_id")
    private Competition competition;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;

    @ManyToOne
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Getters, setters, constructors
}

// 15. MediaType (Enum)
public enum MediaType {
    PHOTO,
    VIDEO,
    DOCUMENT
}

// 16. Standing (Classement)
@Entity
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

// 1. UserRepository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
}

// 2. TeamRepository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByCoachId(Long coachId);
    List<Team> findByCategory(String category);
    List<Team> findByCompetitionsId(Long competitionId);
}

// 3. PlayerRepository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByTeamId(Long teamId);
    Optional<Player> findByLicenseNumber(String licenseNumber);
}

// 4. CompetitionRepository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    List<Competition> findByOrganizerId(Long organizerId);
    List<Competition> findByStatus(CompetitionStatus status);
    List<Competition> findByStartDateAfter(LocalDate date);
    List<Competition> findByEndDateBefore(LocalDate date);
    List<Competition> findByCompetitionType(CompetitionType type);
}

// 5. MatchRepository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByCompetitionId(Long competitionId);
    List<Match> findByHomeTeamIdOrAwayTeamId(Long homeTeamId, Long awayTeamId);
    List<Match> findByMatchDateBetween(LocalDateTime start, LocalDateTime end);
    List<Match> findByStatus(MatchStatus status);
}

// 6. MatchSheetRepository
public interface MatchSheetRepository extends JpaRepository<MatchSheet, Long> {
    Optional<MatchSheet> findByMatchId(Long matchId);
    List<MatchSheet> findByIsValidated(boolean isValidated);
}

// 7. PlayerParticipationRepository
public interface PlayerParticipationRepository extends JpaRepository<PlayerParticipation, Long> {
    List<PlayerParticipation> findByMatchSheetId(Long matchSheetId);
    List<PlayerParticipation> findByPlayerId(Long playerId);
}

// 8. NotificationRepository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);
    List<Notification> findByUserIdAndIsRead(Long userId, boolean isRead);
    List<Notification> findByType(NotificationType type);
}

// 9. MediaRepository
public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByCompetitionId(Long competitionId);
    List<Media> findByMatchId(Long matchId);
    List<Media> findByType(MediaType type);
    List<Media> findByUploadedById(Long userId);
}

// 10. StandingRepository
public interface StandingRepository extends JpaRepository<Standing, Long> {
    List<Standing> findByCompetitionIdOrderByRankAsc(Long competitionId);
    Optional<Standing> findByCompetitionIdAndTeamId(Long competitionId, Long teamId);
}