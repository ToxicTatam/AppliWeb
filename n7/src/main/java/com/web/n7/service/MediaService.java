package com.web.n7.service;

import com.web.n7.model.Media;
import com.web.n7.repository.MediaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    // Créer un nouveau média
    public Media createMedia(Media media) {
        media.setCreatedAt(LocalDateTime.now()); // Définir l'horodatage
        return mediaRepository.save(media);
    }

    // Récupérer un média par ID
    public Media getMediaById(Long id) {
        return mediaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Media non trouvé avec un id: " + id));
    }

    // Récupérer tous les médias
    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    // Supprimer un média par ID
    public void deleteMediaById(Long id) {
        if (!mediaRepository.existsById(id)) {
            throw new RuntimeException("Media non trouvé avec un id: " + id);
        }
        mediaRepository.deleteById(id);
    }

    // Mettre à jour un média
    public Media updateMedia(Long id, Media newMediaData) {
        Media existingMedia = getMediaById(id);
        existingMedia.setTitle(newMediaData.getTitle());
        existingMedia.setUrl(newMediaData.getUrl());
        existingMedia.setType(newMediaData.getType());
        existingMedia.setCompetition(newMediaData.getCompetition());
        existingMedia.setMatch(newMediaData.getMatch());
        existingMedia.setUploadedBy(newMediaData.getUploadedBy());
        return mediaRepository.save(existingMedia);
    }
}