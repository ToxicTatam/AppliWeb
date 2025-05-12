package com.web.n7.controller;

import com.web.n7.dto.users.UserDTO;
import com.web.n7.model.users.*;
import com.web.n7.service.CustomUserDetailsService;
import com.web.n7.service.UserServiceImpl;
import com.web.n7.util.CustomUserDetails;
import java.util.Date;

import com.web.n7.util.RoleMapDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.web.n7.dto.LoginResponse;
import com.web.n7.dto.LoginRequest;
import com.web.n7.util.JwtUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserServiceImpl userService;
    private final CustomUserDetailsService userDetailsService;
  

    @PostMapping("/login")
    public ResponseEntity<LoginResponse>  login(@Valid  @RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            final CustomUserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            final String token = jwtUtil.generateToken(userDetails.getUsername(),userDetails.getUserEntity().getId(), userDetails.getUserEntity().getRole().name());

            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setUser(RoleMapDTO.ToDTO(userDetails.getUserEntity()));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(null);
        }
    }



    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserDTO user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }




    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        try {
            userService.initiatePasswordReset(email);
            return ResponseEntity.ok("Password reset email sent successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error initiating password reset.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token,
                                                @RequestBody String newPassword) {
        try {
            userService.resetPassword(token, newPassword);
            return ResponseEntity.ok("Password reset successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Invalid reset token or error resetting password.");
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(@RequestParam("refreshToken") String refreshToken) {
        try {
            String newAccessToken = jwtUtil.refreshToken(refreshToken);
            return ResponseEntity.ok(newAccessToken);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error refreshing token.");
        }
    }

    // @PostMapping("/logout")
    // public ResponseEntity<String> logout(@RequestParam("token") String token) {
    //             // Extraire les informations du jeton
    //             Date expiration = jwtUtil.getExpirationDateFromToken(token);

    //             // Ajouter le jeton à une liste noire
    //             jwtUtil.addTokenToBlacklist(token, expiration);
    //             return ResponseEntity.ok("Déconnexion réussie");
    // }

    @PostMapping("/logout")
   public ResponseEntity<String> logout(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        String token = authHeader.substring(7);
        Date expiration = jwtUtil.getExpirationDateFromToken(token);
        jwtUtil.addTokenToBlacklist(token, expiration);
        return ResponseEntity.ok("Déconnexion réussie");
    }
    return ResponseEntity.badRequest().body("Token non fourni");
}


    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        try {
            userService.verifyEmail(token);
            return ResponseEntity.ok("Email verified successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Invalid token or verification error.");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser() {
        try {
            CustomUserDetails userDetails = userService.getCurrentUserDetails();
            Object userDTO = RoleMapDTO.ToDTO(userDetails.getUserEntity());
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unauthorized or error fetching user details.");
        }
    }


}
