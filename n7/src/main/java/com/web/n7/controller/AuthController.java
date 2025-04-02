package com.web.n7.controller;



import com.web.n7.model.User;
import com.web.n7.service.CustomUserDetailsService;
import com.web.n7.service.UserService;
import com.web.n7.util.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final UserService userService;
    CustomUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse>  login(@Valid  @RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            final CustomUserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            final String token = jwtUtil.generateToken(userDetails.getUsername(),userDetails.getId(), userDetails.getRole());

            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setEmail(loginRequest.getEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(null);
        }
    }



    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
