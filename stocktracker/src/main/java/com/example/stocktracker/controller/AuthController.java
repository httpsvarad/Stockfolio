package com.example.stocktracker.controller;

import com.example.stocktracker.model.User;
import com.example.stocktracker.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://stockfolio-ochre.vercel.app/", allowCredentials = "true")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return authService.login(user.getEmail(), user.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
