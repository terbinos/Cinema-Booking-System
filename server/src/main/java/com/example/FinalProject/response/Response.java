package com.example.FinalProject.response;

public class Response {
    private boolean success;
    private String message;

    public Response (boolean success, String message){
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
