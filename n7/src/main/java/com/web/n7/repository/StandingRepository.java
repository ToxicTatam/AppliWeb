package com.web.n7.repository;

import com.web.n7.model.Standing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StandingRepository extends JpaRepository<Standing, Long> {
    List<Standing> findByCompetitionIdOrderByRankAsc(Long competitionId);
    Optional<Standing> findByCompetitionIdAndTeamId(Long competitionId, Long teamId);
}