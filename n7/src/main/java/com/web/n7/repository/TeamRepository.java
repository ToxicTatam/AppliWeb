package com.web.n7.repository;

import com.web.n7.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByCoachId(Long coachId);
    List<Team> findByCategory(String category);
    List<Team> findByCompetitionsId(Long competitionId);
}