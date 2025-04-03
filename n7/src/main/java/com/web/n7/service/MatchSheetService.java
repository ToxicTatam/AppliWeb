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

    public Optional<MatchSheet> findById(Long id) {
        return matchSheetRepository.findById(id);
    }

    public Optional<MatchSheet> findByMatchId(Long matchId) {
        return matchSheetRepository.findByMatchId(matchId);
    }


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