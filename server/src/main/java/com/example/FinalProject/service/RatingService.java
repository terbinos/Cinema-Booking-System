package com.example.FinalProject.service;

import com.example.FinalProject.Entity.Rating;
import com.example.FinalProject.Request.RatingRequest;
import com.example.FinalProject.repository.RatingRepository;
import com.example.FinalProject.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RatingService {

    private RatingRepository ratingRepository;

    public List<Rating> getRatings() {
        List<Rating> ratings = ratingRepository.findAll();
        return ratings;
    }

    public Response addRating(RatingRequest ratingRequest) {
        List<Rating> ratings = ratingRepository.findAll();
        boolean alreadyRated = false;
        for(Rating r: ratings){
            if(r.getUser().equals(ratingRequest.getUser())){
                alreadyRated = true;
                r.setValue(ratingRequest.getValue());
                break;
            }
        }
        if(!alreadyRated){
            Rating rating = new Rating(
                    ratingRequest.getMovie(),
                    ratingRequest.getUser(),
                    ratingRequest.getRatedDate(),
                    ratingRequest.getValue()
            );
            ratingRepository.save(rating);
        }

        return new Response(true, "Movie rated successfully!");
    }

    public Response removeRating(Integer ratingId) {
        boolean ratingExists = ratingRepository.existsById(ratingId);

        if(ratingExists){
            ratingRepository.deleteById(ratingId);
            return new Response(true, "Rating removed successfully!");
        }else{
            return new Response(false, "Rating does not exist!");
        }
    }
}
