package com.web.n7.controller;

import com.web.n7.model.Media;
import com.web.n7.model.enumeration.MediaType;
import com.web.n7.service.MediaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }


    /**
     * Creates a new media entry in the system.
     *
     * @param media the media object containing details about the media
     *              to be created, such as title, URL, type, competition,
     *              match, and the user who uploaded it
     * @return a ResponseEntity containing the created media object and
     *         a HTTP status of 201 (Created)
     */
    @PostMapping("/media/")
    public ResponseEntity<Media> createMedia(@RequestBody Media media) {
        Media createdMedia = mediaService.createMedia(media);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMedia);
    }


    /**
     * Retrieves a media entity by its unique identifier.
     *
     * @param id the unique identifier of the media to retrieve
     * @return a ResponseEntity containing the media object if found, otherwise an appropriate HTTP status
     */
    @GetMapping("/{id}")
    public ResponseEntity<Media> getMediaById(@PathVariable Long id) {
        Media media = mediaService.getMediaById(id);
        return ResponseEntity.ok(media);
    }


    /**
     * Retrieves a list of all media entries from the system.
     *
     * @return a ResponseEntity containing a list of all Media objects.
     */
    @GetMapping("/all")
    public ResponseEntity<List<Media>> getAllMedia() {
        List<Media> mediaList = mediaService.getAllMedia();
        return ResponseEntity.ok(mediaList);
    }


    /**
     * Deletes a media resource by its unique identifier.
     *
     * @param id the unique identifier of the media to be deleted
     * @return a ResponseEntity with no content if the deletion is successful
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMediaById(@PathVariable Long id) {
        mediaService.deleteMediaById(id);
        return ResponseEntity.noContent().build();
    }


    /**
     * Updates an existing media record with new data.
     *
     * @param id The unique identifier of the media to be updated.
     * @param media The new media data to update the existing record.
     * @return ResponseEntity containing the updated media object.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Media> updateMedia(@PathVariable Long id, @RequestBody Media media) {
        Media updatedMedia = mediaService.updateMedia(id, media);
        return ResponseEntity.ok(updatedMedia);
    }



    /**
     * Retrieves a list of media entities based on the provided competition or match identifier.
     *
     * @param competitionId the ID of the competition to filter media by; can be null.
     * @param matchId the ID of the match to filter media by; can be null.
     * @return a ResponseEntity containing a list of media objects that match the provided criteria.
     *         If both parameters are null, an exception will be thrown.
     */
    @GetMapping("/filter")
    public ResponseEntity<List<Media>> getMediaByCompetitionOrMatch(
            @RequestParam(required = false) Long competitionId,
            @RequestParam(required = false) Long matchId) {
        List<Media> mediaList = mediaService.getMediaByCompetitionOrMatch(competitionId, matchId);
        return ResponseEntity.ok(mediaList);
    }


    /**
     * Retrieves a list of media based on the specified media type.
     *
     * @param type the type of media to filter by (e.g., IMAGE, VIDEO, AUDIO, DOCUMENT)
     * @return a ResponseEntity containing a list of Media objects matching the specified type
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Media>> getMediaByType(@PathVariable MediaType type) {
        List<Media> mediaList = mediaService.getMediaByType(type);
        return ResponseEntity.ok(mediaList);
    }


    /**
     * Retrieves a list of media objects uploaded by a specific user.
     *
     * @param userId the ID of the user whose uploaded media are to be retrieved
     * @return a ResponseEntity containing a list of Media objects uploaded by the specified user
     */
    @GetMapping("/uploaded-by/{userId}")
    public ResponseEntity<List<Media>> getMediaByUploadedBy(@PathVariable Long userId) {
        List<Media> mediaList = mediaService.getMediaByUploadedBy(userId);
        return ResponseEntity.ok(mediaList);
    }


}