package com.web.n7.repository;

import com.web.n7.model.PlayerParticipation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlayerParticipationRepository extends JpaRepository<PlayerParticipation, Long> {
    List<PlayerParticipation> findByMatchSheetId(Long matchSheetId);
    List<PlayerParticipation> findByPlayerId(Long playerId);
}