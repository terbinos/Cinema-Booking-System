package com.example.FinalProject.service;

import com.example.FinalProject.Entity.AuthRequest;
import com.example.FinalProject.Entity.User;
import com.example.FinalProject.Request.LoggedInUserRequest;
import com.example.FinalProject.repository.UserRepository;
import com.example.FinalProject.response.AuthResponse;
import com.example.FinalProject.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    public AuthResponse authenticate(AuthRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception ex) {
            return new AuthResponse(false, "Invalid email or password");
        }
        String token = jwtUtil.generateToken(request.getEmail());

        return new AuthResponse(true, "Bearer "+token);
    }

    public User loggedInUser(LoggedInUserRequest request) {
        User user = repository.findByEmail(request.getEmail());
        return user;
    }
}
