package com.web.n7.repository;

import com.web.n7.model.Media;
import com.web.n7.model.enumeration.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {

    List<Media> findByType(MediaType type);
    List<Media> findByUploadedById(Long userId);


    List<Media> findAllByCompetitionId(Long competitionId);

    List<Media> findAllByMatchId(Long matchId);


}