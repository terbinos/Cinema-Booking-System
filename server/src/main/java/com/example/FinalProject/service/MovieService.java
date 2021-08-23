package com.example.FinalProject.service;

import com.example.FinalProject.Entity.Movie;
import com.example.FinalProject.Request.MovieRequest;
import com.example.FinalProject.repository.MovieRepository;
import com.example.FinalProject.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;


@Service
@AllArgsConstructor
public class MovieService {

    private MovieRepository movieRepository;

    public Response addMovie(MovieRequest request) {
        String res = addMovieHelper(new Movie(
                request.getTitle(),
                request.getGenre(),
                request.getDescription(),
                request.getTrailerUrl(),
                request.getImageUrl()));
        if(res.equals("Movie title already taken")){
            return new Response(false, res);
        }else{
            return new Response(true, res);
        }
    }

    public String addMovieHelper(Movie movie){
        Movie titleExists = movieRepository.findByTitle(movie.getTitle());
        if(titleExists != null){
            return "Movie title already taken";
        }else {
            movieRepository.save(movie);
            return "Movie added Successfully";
        }
    }

    public List<Movie> getMovies() {
        List<Movie> movies = movieRepository.findAll();
        return movies;
    }

    public Response deleteMovie(Integer movieId) {
        boolean movieExists = movieRepository.existsById(movieId);

        if(movieExists){
            movieRepository.deleteById(movieId);
            return new Response(true, "Movie deleted successfully!");
        }else{
            return new Response(false, "Movie does not exist!");
        }
    }

    @Transactional
    public Response updateMovie(Integer movieId, String title, String genre, String description, String trailerUrl,String imageUrl) {
        Movie movie = movieRepository.findById(movieId).get();
        boolean movieExists = movieRepository.existsById(movieId);
        System.out.println("Image url"+ imageUrl);
        if(!movieExists){
            return new Response(false, "Movie does not exist!");
        }else{
            if(title != null && title.length() > 0 && !Objects.equals(movie.getTitle(), title)){
                movie.setTitle(title);
            }
            if(genre != null && genre.length() > 0 && !Objects.equals(movie.getGenre(), genre)){
                movie.setGenre(genre);
            }
            if(description != null && description.length() > 0 && !Objects.equals(movie.getDescription(), description)){
                movie.setDescription(description);
            }
            if(trailerUrl != null && trailerUrl.length() > 0 && !Objects.equals(movie.getTrailerUrl(), trailerUrl)){
                movie.setTrailerUrl(trailerUrl);
            }
            if(imageUrl != null && !imageUrl.equals("")){
                movie.setImageUrl(imageUrl);
            }else{
                movie.setImageUrl(movie.getImageUrl());
            }

            return new Response(true, "Movie updated successfully!");
        }

    }

    public Movie getMovie(Integer movieId) {
        Movie movie = movieRepository.findById(movieId).get();
        return movie;
    }

}


