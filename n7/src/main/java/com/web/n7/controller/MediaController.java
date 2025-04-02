package com.web.n7.controller;

import com.web.n7.model.Media;
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


    @PostMapping
    public ResponseEntity<Media> createMedia(@RequestBody Media media) {
        Media createdMedia = mediaService.createMedia(media);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMedia);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Media> getMediaById(@PathVariable Long id) {
        Media media = mediaService.getMediaById(id);
        return ResponseEntity.ok(media);
    }


    @GetMapping
    public ResponseEntity<List<Media>> getAllMedia() {
        List<Media> mediaList = mediaService.getAllMedia();
        return ResponseEntity.ok(mediaList);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMediaById(@PathVariable Long id) {
        mediaService.deleteMediaById(id);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Media> updateMedia(@PathVariable Long id, @RequestBody Media media) {
        Media updatedMedia = mediaService.updateMedia(id, media);
        return ResponseEntity.ok(updatedMedia);
    }
}