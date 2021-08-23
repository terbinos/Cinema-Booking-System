package com.example.FinalProject.controller;

import com.example.FinalProject.Request.BookingRequest;
import com.example.FinalProject.response.Response;
import com.example.FinalProject.service.ShowService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/booking")
public class BookingController {

    @Autowired
    private ShowService showService;

    // Book a show
    @PostMapping
    public String bookShow(@RequestBody BookingRequest bookingRequest) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Response response = showService.bookShow(bookingRequest);
        return mapper.writeValueAsString(response);
    }
}
