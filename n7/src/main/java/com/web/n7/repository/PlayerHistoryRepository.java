package com.web.n7.repository;

import com.web.n7.model.PlayerHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayerHistoryRepository extends JpaRepository<PlayerHistory, Long> {
    List<PlayerHistory> findByPlayerId(Long playerId);
    List<PlayerHistory> findByMatchId(Long matchId);
   // List<PlayerHistory> findByPlayerIdAndCompetitionId(Long playerId, Long competitionId);
    @Query("SELECT ph FROM PlayerHistory ph WHERE ph.player.id = :playerId AND ph.match.competition.id = :competitionId")
     List<PlayerHistory> findByPlayerIdAndCompetitionId(@Param("playerId") Long playerId, @Param("competitionId") Long competitionId);

}
