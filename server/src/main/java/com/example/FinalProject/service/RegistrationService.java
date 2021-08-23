package com.example.FinalProject.service;

import com.example.FinalProject.Entity.AppUserRole;
import com.example.FinalProject.Entity.User;
import com.example.FinalProject.Request.RegistrationRequest;
import com.example.FinalProject.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private UserService appUserService;
    public Response register(RegistrationRequest request) {
        String res = appUserService.signUpUser(new User(
                request.getUserName(),
                request.getPassword(),
                request.getEmail(),
                AppUserRole.USER));
        if(res.equals("Email already taken")){
            return new Response(false, res);
        }else{
            return new Response(true, "Registration completed successfully");
        }
    }
}
