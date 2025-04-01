package com.web.n7.repository;

import com.web.n7.model.MatchSheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatchSheetRepository extends JpaRepository<MatchSheet, Long> {
    Optional<MatchSheet> findByMatchId(Long matchId);
    List<MatchSheet> findByIsValidated(boolean isValidated);
}