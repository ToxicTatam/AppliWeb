package com.web.n7.service;



import com.web.n7.model.*;
import com.web.n7.model.enumeration.MatchSheetStatus;
import com.web.n7.model.enumeration.MatchStatus;
import com.web.n7.repository.MatchRepository;
import com.web.n7.repository.MatchSheetRepository;
import com.web.n7.repository.PlayerHistoryRepository;
import com.web.n7.repository.PlayerParticipationRepository;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MatchSheetService {
    private final MatchSheetRepository matchSheetRepository;
    private final MatchRepository matchRepository;
    private final PlayerParticipationRepository playerParticipationRepository;
    private final PlayerHistoryRepository playerHistoryRepository;

    public MatchSheetService(
            MatchSheetRepository matchSheetRepository,
            MatchRepository matchRepository,
            PlayerParticipationRepository playerParticipationRepository,
            PlayerHistoryRepository playerHistoryRepository
    ) {
        this.matchSheetRepository = matchSheetRepository;
        this.matchRepository = matchRepository;
        this.playerParticipationRepository = playerParticipationRepository;
        this.playerHistoryRepository = playerHistoryRepository;
    }

    /**
     * Creates a new match sheet for the specified match ID. If a match sheet
     * already exists for the given match or the match cannot be found, an
     * exception is thrown.
     *
     * @param matchId the ID of the match for which the match sheet is to be created
     * @return the created MatchSheet instance
     */
    public MatchSheet create(Long matchId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match non trouvé"));

        if (matchSheetRepository.findByMatchId(matchId).isPresent()) {
            throw new RuntimeException("Une feuille de match existe déjà pour ce match");
        }

        MatchSheet matchSheet = new MatchSheet();
        matchSheet.setMatch(match);
        matchSheet.setStatus(MatchSheetStatus.ONGOING);
        matchSheet.setCreatedAt(LocalDateTime.now());
        matchSheet.setUpdatedAt(LocalDateTime.now());

        return matchSheetRepository.save(matchSheet);
    }

    /**
     * Retrieves a MatchSheet by its unique identifier.
     *
     * @param id the unique identifier of the MatchSheet
     * @return an Optional containing the MatchSheet if found, or an empty Optional if not found
     */
    public Optional<MatchSheet> findById(Long id) {
        return matchSheetRepository.findById(id);
    }

    /**
     * Retrieves an Optional containing a MatchSheet associated with the given match ID,
     * if such a MatchSheet exists.
     *
     * @param matchId the unique identifier of the match for which the MatchSheet is to be retrieved
     * @return an Optional containing the MatchSheet if found, or an empty Optional if not found
     */
    public Optional<MatchSheet> findByMatchId(Long matchId) {
        return matchSheetRepository.findByMatchId(matchId);
    }


    /**
     * Validates or invalidates a match sheet based on the given parameters. Only the organizer
     * associated with the match's competition is authorized to perform this operation.
     *
     * @param matchSheetId the unique identifier of the match sheet to be validated or invalidated
     * @param validateFlag a flag indicating whether to validate (true) or invalidate (false) the match sheet
     * @param organizerId the unique identifier of the organizer attempting to validate or invalidate the match sheet
     * @return the updated MatchSheet entity after applying the validation changes
     */
    public MatchSheet validateMatchSheet(Long matchSheetId, boolean validateFlag, Long organizerId) {
        MatchSheet matchSheet = matchSheetRepository.findById(matchSheetId)
                .orElseThrow(() -> new RuntimeException("Match Sheet non trouvé"));

        Match match = matchSheet.getMatch();
        if (!match.getCompetition().getOrganizer().getId().equals(organizerId)) {
            throw new RuntimeException("Seul les organisateurs peuvent valider/invalider les feuilles de match");
        }

        matchSheet.setStatus(validateFlag ? MatchSheetStatus.VALIDATED : MatchSheetStatus.UNVALIDATED);
        matchSheet.setValidationDate(validateFlag ? LocalDateTime.now() : null);
        matchSheet.setUpdatedAt(LocalDateTime.now());

        return matchSheetRepository.save(matchSheet);
    }

    /**
     * Updates the player participation details and strategy for a specific team in a match sheet.
     * The method replaces existing participation details for the specified team
     * and updates the strategy associated with the team (home or away).
     *
     * @param matchSheetId the ID of the match sheet to be updated
     * @param coachId the ID of the coach making the update request
     * @param playerParticipations the list of new participations for players in the team
     * @param strategy the updated strategy for the team
     * @param isHomeTeam true if updating the home team's information, false for the away team
     * @return the updated MatchSheet object after modifications
     */
    public MatchSheet updateParticipationAndStrategy(Long matchSheetId, Long coachId, List<PlayerParticipation> playerParticipations
            , String strategy, boolean isHomeTeam) {
        MatchSheet matchSheet = matchSheetRepository.findById(matchSheetId)
                .orElseThrow(() -> new RuntimeException("Match Sheet non trouvé"));

        if (matchSheet.getStatus().equals(MatchSheetStatus.VALIDATED)) {
            throw new RuntimeException("Ne peut pas modifier la feuille de match car déjà validé.");
        }

        // Validate that the coach owns one of the teams in the match
        Match match = matchSheet.getMatch();
        Team team = isHomeTeam ? match.getHomeTeam() : match.getAwayTeam();
        if (!team.getCoach().getId().equals(coachId)) {
            throw new RuntimeException("Vous ne pouvez pas modifier les participations d'un autre coach.");
        }

        List<PlayerParticipation> existingParticipations = matchSheet.getPlayerParticipations()
                .stream()
                .filter(participation -> participation.getPlayer().getTeam().getId().equals(team.getId()))
                .toList();


        // Remove the old participations for this team
        playerParticipationRepository.deleteAll(existingParticipations);

        // Save the new participations for the team
        for (PlayerParticipation participation : playerParticipations) {
            participation.setMatchSheet(matchSheet);
        }
        playerParticipationRepository.saveAll(playerParticipations);


        // Update strategy
        if (isHomeTeam) {
            matchSheet.setHomeStrategy(strategy);
        } else {
            matchSheet.setAwayStrategy(strategy);
        }
        matchSheet.setUpdatedAt(LocalDateTime.now());

        return matchSheetRepository.save(matchSheet);
    }

    /**
     * Updates player participation details for a specific match sheet.
     * Updates are only allowed if the match is currently ongoing.
     * Changes to participation details are logged as history before being applied.
     *
     * @param matchSheetId the ID of the match sheet to update
     * @param updatedParticipations a list of updated player participation details to apply
     * @return the updated match sheet after applying the changes
     */
    public MatchSheet updateParticipationDetails(Long matchSheetId, List<PlayerParticipation> updatedParticipations) {
        MatchSheet matchSheet = matchSheetRepository.findById(matchSheetId)
                .orElseThrow(() -> new RuntimeException("Match sheet non trouvé"));

        Match match = matchSheet.getMatch();

        // Check if the associated match is ONGOING
        if (match.getStatus() != MatchStatus.ONGOING) {
            throw new RuntimeException("Les details du joeur ne peuvent être mis à jour que pour les matchs en cours.");
        }

        // Update participations and log history for each change
        for (PlayerParticipation updatedParticipation : updatedParticipations) {
            PlayerParticipation existingParticipation = playerParticipationRepository.findById(updatedParticipation.getId())
                    .orElseThrow(() -> new RuntimeException("Player participation non trouvé"));

            // Log history before applying updates
            PlayerHistory history = existingParticipation.toHistory(match);
            playerHistoryRepository.save(history);

            // Apply updates
            existingParticipation.setGoalsScored(updatedParticipation.getGoalsScored());
            existingParticipation.setYellowCards(updatedParticipation.getYellowCards());
            existingParticipation.setRedCards(updatedParticipation.getRedCards());
            existingParticipation.setMinutesPlayed(updatedParticipation.getMinutesPlayed());
            existingParticipation.setStatus(updatedParticipation.getStatus());
            existingParticipation.setUpdatedAt(LocalDateTime.now());

            playerParticipationRepository.save(existingParticipation);
        }

        matchSheet.setUpdatedAt(LocalDateTime.now());
        return matchSheetRepository.save(matchSheet);
    }


}