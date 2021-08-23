package com.example.FinalProject.controller;

import com.example.FinalProject.Entity.Movie;
import com.example.FinalProject.Entity.Show;
import com.example.FinalProject.Request.ShowRequest;
import com.example.FinalProject.response.Response;
import com.example.FinalProject.service.ShowService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/show")
public class ShowController {

    @Autowired
    private ShowService showService;

    // Get all shows
    @GetMapping
    public List<Show> getShows() {
        List<Show> shows = showService.getShows();
        return shows;
    }

    // Get a show by id
    @GetMapping(path = "/{showId}")
    public Show getShow(@PathVariable("showId") Integer showId) {
        Show show = showService.getShow(showId);
        return show;
    }

    // Add show to DB
    @PostMapping
    public String addShow(@RequestBody ShowRequest showRequest) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Response response = showService.addShow(showRequest);
        return mapper.writeValueAsString(response);
    }

    // Update show by id
    @PutMapping(path = "{showId}")
    public String updateShow(
            @PathVariable("showId") Integer showId,
            @RequestParam(required = false) String cinema,
            @RequestParam(required = false) Movie movie,
            @RequestParam(required = false) String showDay,
            @RequestParam(required = false) String showTime) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Response response = showService.editShow(showId, cinema, movie, showDay, showTime);
        return mapper.writeValueAsString(response);
    }

    // Delete show by id
    @DeleteMapping(path = "{showId}")
    public String deleteShow(@PathVariable("showId") Integer showId) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Response response = showService.deleteShow(showId);
        return mapper.writeValueAsString(response);
    }

}