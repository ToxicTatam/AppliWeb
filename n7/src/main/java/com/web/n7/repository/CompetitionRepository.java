package com.web.n7.repository;

import com.web.n7.model.Competition;
import com.web.n7.model.enumeration.CompetitionStatus;
import com.web.n7.model.enumeration.CompetitionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    List<Competition> findByOrganizerId(Long organizerId);
    List<Competition> findByStatus(CompetitionStatus status);
    List<Competition> findByStartDateAfter(LocalDate date);
    List<Competition> findByEndDateBefore(LocalDate date);
    List<Competition> findByCompetitionType(CompetitionType type);
}