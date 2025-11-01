package com.openlecture.controller;

import com.openlecture.model.User;
import com.openlecture.payload.LoginRequest;
import com.openlecture.payload.RegisterRequest;
import com.openlecture.security.JwtTokenProvider;
import com.openlecture.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            userService.registerUser(registerRequest);
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Authenticate user (login)
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userService.findByEmail(loginRequest.getEmail());
            String jwt = tokenProvider.generateToken(user.getEmail());

            return ResponseEntity.ok(Map.of(
                    "token", jwt,
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "message", "Login successful"
            ));
        } catch (Exception e) {
            e.printStackTrace(); // log exact cause
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid email or password: " + e.getMessage()));
        }
    }
}
