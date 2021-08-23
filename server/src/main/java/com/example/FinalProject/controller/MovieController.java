package com.example.FinalProject.controller;

import com.example.FinalProject.Entity.Movie;
import com.example.FinalProject.Request.MovieRequest;
import com.example.FinalProject.response.Response;
import com.example.FinalProject.service.MovieService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path="/api/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    // Get all movies
    @GetMapping
    public List<Movie> getMovies() throws Exception {
        List<Movie> movies = movieService.getMovies();
        return movies;
    }

    // Get a movie by id
    @GetMapping(path = "/{movieId}")
    public Movie getMovie(@PathVariable("movieId") Integer movieId) throws Exception {
        Movie movie = movieService.getMovie(movieId);
        return movie;
    }

    // Add movie to DB
    @PostMapping
    public String addMovie(@RequestBody MovieRequest movieRequest) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Response response = movieService.addMovie(movieRequest);
        return mapper.writeValueAsString(response);
    }

    // Update movie by id
    @PutMapping(path = "{movieId}")
    public String updateMovie(
            @PathVariable("movieId") Integer movieId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String trailerUrl,
            @RequestParam(required = false) String imageUrl) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Response response = movieService.updateMovie(movieId, title, genre, description, trailerUrl,imageUrl);
        return mapper.writeValueAsString(response);
    }

    // Delete movie by id
    @DeleteMapping(path = "{movieId}")
    public String deleteMovie(@PathVariable("movieId") Integer movieId) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Response response = movieService.deleteMovie(movieId);
        return mapper.writeValueAsString(response);
    }

}