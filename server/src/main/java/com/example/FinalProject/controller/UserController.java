package com.example.FinalProject.controller;

import com.example.FinalProject.Entity.AuthRequest;
import com.example.FinalProject.Entity.User;
import com.example.FinalProject.Request.LoggedInUserRequest;
import com.example.FinalProject.Request.RegistrationRequest;
import com.example.FinalProject.response.AuthResponse;
import com.example.FinalProject.response.Response;
import com.example.FinalProject.service.LoginService;
import com.example.FinalProject.service.RegistrationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/api")
public class UserController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private LoginService loginService;

    @GetMapping("/")
    public String welcome() {
        return "Welcome to My Tickets Cinema Booking System !!";
    }

    // Authenticate user by email and password , does the same thing as login
    @PostMapping("/authenticate")
    public String login(@RequestBody AuthRequest authRequest) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        AuthResponse response = loginService.authenticate(authRequest);
        return mapper.writeValueAsString(response);

    }

    // Registers or Adds user to DB
    @PostMapping("/registration")
    public String register(@RequestBody RegistrationRequest request) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Response response = registrationService.register(request);
        return mapper.writeValueAsString(response);
    }

    // Retrieves the current logged in user
    @PostMapping(path = "/current")
    public User loggedInUser(@RequestBody LoggedInUserRequest request) throws Exception {
        User user = loginService.loggedInUser(request);
        return user;

    }

}
