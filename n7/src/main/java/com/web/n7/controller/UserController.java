package com.web.n7.controller;

import com.web.n7.dto.users.CoachDTO;
import com.web.n7.dto.users.OrganizerDTO;
import com.web.n7.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("/coaches/{coachId}")
    public ResponseEntity<CoachDTO> getCoachProfile(@PathVariable Long coachId) {
        try {
            CoachDTO coachDTO = userService.getCoachById(coachId);
            if (coachDTO == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(coachDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/coaches")
    public ResponseEntity<CoachDTO> updateCoachProfile(@RequestBody CoachDTO coachDTO) {
        try {
            CoachDTO updatedCoach = userService.updateCoach(coachDTO);
            return ResponseEntity.ok(updatedCoach);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/organizers/{organizerId}")
    public ResponseEntity<OrganizerDTO> getOrganizerProfile(@PathVariable Long organizerId) {
        try {
            OrganizerDTO organizerDTO = userService.getOrganizerById(organizerId);
            if (organizerDTO == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(organizerDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/organizers")
    public ResponseEntity<OrganizerDTO> updateOrganizerProfile(@RequestBody OrganizerDTO organizerDTO) {
        try {
            OrganizerDTO updatedOrganizer = userService.updateOrganizer(organizerDTO);
            return ResponseEntity.ok(updatedOrganizer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }



}