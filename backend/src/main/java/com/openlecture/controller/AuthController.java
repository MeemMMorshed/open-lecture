// src/main/java/com/openlecture/controller/AuthController.java
package com.openlecture.controller;

import com.openlecture.model.User;
import com.openlecture.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React dev server
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        User user = authService.registerUser(body.get("username"), body.get("email"), body.get("password"));
        return ResponseEntity.ok(Map.of("message", "User registered successfully", "user", user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        User user = authService.loginUser(body.get("email"), body.get("password"));
        return ResponseEntity.ok(Map.of("message", "Login successful", "user", user));
    }
}
