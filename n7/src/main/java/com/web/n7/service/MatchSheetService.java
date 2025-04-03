package com.web.n7.service;



import com.web.n7.model.Match;
import com.web.n7.model.MatchSheet;
import com.web.n7.repository.MatchRepository;
import com.web.n7.repository.MatchSheetRepository;
import com.web.n7.repository.PlayerHistoryRepository;
import com.web.n7.repository.PlayerParticipationRepository;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
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
        matchSheet.setValidated(false);
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

    public MatchSheet validate(Long id) {
        MatchSheet matchSheet = matchSheetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feuille de match non trouvé"));
                return matchSheet;
    }

}