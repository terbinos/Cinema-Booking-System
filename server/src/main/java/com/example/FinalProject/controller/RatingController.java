package com.example.FinalProject.controller;


import com.example.FinalProject.Entity.Movie;
import com.example.FinalProject.Entity.Rating;
import com.example.FinalProject.Request.RatingRequest;
import com.example.FinalProject.Request.ShowRequest;
import com.example.FinalProject.response.Response;
import com.example.FinalProject.service.RatingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/rate")
public class RatingController {

    @Autowired
    RatingService ratingService;

    // Get all ratings
    @GetMapping
    public List<Rating> getRatings() {
        List<Rating> ratings = ratingService.getRatings();
        return ratings;
    }

    // Add or Update rating on Rating collection
    @PostMapping
    public String addOrUpdateRating(@RequestBody RatingRequest ratingRequest) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Response response = ratingService.addRating(ratingRequest);
        return mapper.writeValueAsString(response);
    }

    // Remove rating by id
    @DeleteMapping(path = "{ratingId}")
    public String deleteRating(@PathVariable("ratingId") Integer ratingId) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Response response = ratingService.removeRating(ratingId);
        return mapper.writeValueAsString(response);
    }
}
