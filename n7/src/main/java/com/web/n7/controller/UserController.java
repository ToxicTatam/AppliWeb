package com.web.n7.controller;

import com.web.n7.model.User;
import com.web.n7.service.UserService;
import com.web.n7.util.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Endpoint pour récupérer le profil de l'utilisateur authentifié.
     * @param authentication Contexte d'authentification contenant le principal utilisateur
     * @return Les détails de l'utilisateur connecté
     */
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        // Récupérer l'utilisateur connecté depuis l'authentification
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Optional<User> userOptional = userService.findById(userDetails.getId());

        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Endpoint pour récupérer les détails d'un utilisateur par son id.
     * @param id ID de l'utilisateur
     * @return Détails de l'utilisateur si trouvé ou 404
     *Accessible uniquement à l'utilisateur authentifié concerné ou à un administrateur */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Endpoint pour récupérer tous les utilisateurs.
     * @return Liste de tous les utilisateurs
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    /**
     * Endpoint pour mettre à jour les informations d'un utilisateur.
     * @param id ID de l'utilisateur à mettre à jour
     * @param updatedUser Corps de la requête contenant les nouvelles données utilisateur
     * @return Utilisateur mis à jour ou erreur si non trouvé
     */
//    @PreAuthorize("hasAuthority('USER_ID_' + #id) or hasRole('ADMIN')")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setSurName(updatedUser.getSurName());
            existingUser.setRole(updatedUser.getRole());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setProfilPicture(updatedUser.getProfilPicture());
            User savedUser = userService.update(existingUser);
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Endpoint pour supprimer un utilisateur.
     * @param id ID de l'utilisateur à supprimer
     * @return Confirmation si suppression réalisée
     */
    @PreAuthorize("hasRole('ADMIN') ")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isPresent()) {
            userService.delete(id);
            return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @GetMapping("getAll")
    @PreAuthorize("hasRole('COACH') or hasRole('ORGANIZER') or hasRole('PLAYER')")
    public ResponseEntity<List<User>> getAllNonAdminUsers() {
        List<User> users = userService.findAllNonAdminUsers();
        return ResponseEntity.ok(users);
    }

}