package com.example.FinalProject.response;

public class AuthResponse {
    private boolean success;
    private String token;

    public AuthResponse (boolean success, String token){
        this.success = success;
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getToken() {
        return token;
    }

}
