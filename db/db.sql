-- Création des tables pour le système de gestion de compétitions sportives

-- Table des utilisateurs (base)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    user_name VARCHAR(255),
    first_name VARCHAR(255) NOT NULL,
    sur_name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table des équipes
CREATE TABLE teams (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    category VARCHAR(255) NOT NULL,
    coach_id BIGINT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (coach_id) REFERENCES users(id)
);

-- Table des joueurs (hérite de users)
CREATE TABLE players (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    license_number VARCHAR(255) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    team_id BIGINT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Table des compétitions
CREATE TABLE competitions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_deadline DATE,
    location VARCHAR(255) NOT NULL,
    max_teams INTEGER,
    competition_type ENUM('LEAGUE', 'TOURNAMENT', 'CUP') NOT NULL,
    competition_status ENUM('UPCOMING', 'REGISTRATION', 'ONGOING', 'COMPLETED', 'CANCELLED') NOT NULL,
    organizer_id BIGINT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- Table de liaison entre compétitions et équipes
CREATE TABLE competition_teams (
    competition_id BIGINT NOT NULL,
    team_id BIGINT NOT NULL,
    PRIMARY KEY (competition_id, team_id),
    FOREIGN KEY (competition_id) REFERENCES competitions(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Table des matchs
CREATE TABLE matches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    competition_id BIGINT NOT NULL,
    home_team_id BIGINT NOT NULL,
    away_team_id BIGINT NOT NULL,
    match_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    home_score INTEGER,
    away_score INTEGER,
    match_status ENUM('SCHEDULED', 'ONGOING', 'COMPLETED', 'POSTPONED', 'CANCELLED') NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id),
    FOREIGN KEY (home_team_id) REFERENCES teams(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id)
);

-- Table des feuilles de match
CREATE TABLE match_sheets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    match_id BIGINT NOT NULL UNIQUE,
    is_validated BOOLEAN,
    validation_date TIMESTAMP,
    strategy TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id)
);

-- Table des participations des joueurs
CREATE TABLE player_participations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    match_sheet_id BIGINT NOT NULL,
    player_id BIGINT NOT NULL,
    shirt_number INTEGER,
    player_status ENUM('STARTER', 'SUBSTITUTE', 'ENTERED', 'NOT_PLAYED', 'INJURED', 'EXPELLED') NOT NULL,
    position VARCHAR(255),
    goals_scored INTEGER,
    yellow_cards INTEGER,
    red_cards INTEGER,
    minutes_played INTEGER,
    substitution_in_time INTEGER,
    substitution_out_time INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (match_sheet_id) REFERENCES match_sheets(id),
    FOREIGN KEY (player_id) REFERENCES players(id)
);

-- Table de l'historique des joueurs
CREATE TABLE player_histories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    player_id BIGINT NOT NULL,
    match_id BIGINT NOT NULL,
    goals_scored INTEGER,
    assists INTEGER,
    minutes_played INTEGER,
    yellow_cards INTEGER,
    red_cards INTEGER,
    player_status ENUM('STARTER', 'SUBSTITUTE', 'ENTERED', 'NOT_PLAYED', 'INJURED', 'EXPELLED') NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (match_id) REFERENCES matches(id)
);

-- Table des classements
CREATE TABLE standings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    competition_id BIGINT NOT NULL,
    team_id BIGINT NOT NULL,
    matches_played INTEGER,
    matches_won INTEGER,
    matches_drawn INTEGER,
    matches_lost INTEGER,
    goals_for INTEGER,
    goals_against INTEGER,
    goal_difference INTEGER,
    points INTEGER,
    rank INTEGER,
    updated_at TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id),
    FOREIGN KEY (team_id) REFERENCES teams(id),
    UNIQUE (competition_id, team_id)
);

-- Table des médias
CREATE TABLE media (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    media_type ENUM('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT') NOT NULL,
    competition_id BIGINT,
    match_id BIGINT,
    uploaded_by BIGINT NOT NULL,
    created_at TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id),
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Table des notifications
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN,
    notification_type ENUM('COMPETITION_REGISTRATION', 'MATCH_REMINDER', 'RESULT_UPDATE', 'SYSTEM_MESSAGE') NOT NULL,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
