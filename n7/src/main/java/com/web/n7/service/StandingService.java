package com.web.n7.service;

import com.web.n7.model.Competition;
import com.web.n7.model.Match;
import com.web.n7.model.Standing;
import com.web.n7.model.Team;
import com.web.n7.repository.StandingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class StandingService {

    private final StandingRepository standingRepository;

    /**
     * Constructs a new instance of the StandingService.
     *
     * @param standingRepository the repository used to manage standings in the database
     */
    public StandingService(StandingRepository standingRepository) {
        this.standingRepository = standingRepository;
    }

    /**
     * Updates the standings of the respective teams after a match has been played.
     * Adjusts the number of wins, losses, draws, goals scored, goals conceded,
     * and other statistics for both the home team and the away team.
     *
     * @param match The match object containing details about the teams, competition,
     *              and the result (home and away scores) to use for updating standings.
     */
    public void updateStandingsAfterMatch(Match match) {
        Team homeTeam = match.getHomeTeam();
        Team awayTeam = match.getAwayTeam();
        Competition competition = match.getCompetition();

        Standing homeStanding = getOrCreateStanding(competition, homeTeam);
        Standing awayStanding = getOrCreateStanding(competition, awayTeam);

        Integer homeScore = match.getHomeScore();
        Integer awayScore = match.getAwayScore();

        if (homeScore != null && awayScore != null) {
            if (homeScore > awayScore) {
                // Home team wins
                homeStanding.addWin();
                awayStanding.addLoss();
            } else if (homeScore < awayScore) {
                // Away team wins
                awayStanding.addWin();
                homeStanding.addLoss();
            } else {
                // Draw
                homeStanding.addDraw();
                awayStanding.addDraw();
            }

            // Update goals and goal differences
            homeStanding.addGoalsFor(homeScore);
            homeStanding.addGoalsAgainst(awayScore);
            awayStanding.addGoalsFor(awayScore);
            awayStanding.addGoalsAgainst(homeScore);

            // Save changes
            standingRepository.save(homeStanding);
            standingRepository.save(awayStanding);
        }
    }

    /**
     * Retrieves an existing standing for the specified competition and team.
     * If no standing exists, it creates a new standing with default values and returns it.
     *
     * @param competition the competition for which the standing is being retrieved or created
     * @param team the team for which the standing is being retrieved or created
     * @return the existing or newly created standing for the specified competition and team
     */
    private Standing getOrCreateStanding(Competition competition, Team team) {
        return standingRepository.findByCompetitionIdAndTeamId(competition.getId(), team.getId())
                .orElseGet(() -> Standing.builder()
                        .competition(competition)
                        .team(team)
                        .matchesPlayed(0)
                        .matchesWon(0)
                        .matchesDrawn(0)
                        .matchesLost(0)
                        .goalsFor(0)
                        .goalsAgainst(0)
                        .goalDifference(0)
                        .points(0)
                        .updatedAt(LocalDateTime.now())
                        .build());
    }


}