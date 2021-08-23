package com.example.FinalProject.service;

import com.example.FinalProject.Entity.Cinema;
import com.example.FinalProject.Entity.Movie;
import com.example.FinalProject.Entity.Show;
import com.example.FinalProject.Entity.User;
import com.example.FinalProject.Request.BookingRequest;
import com.example.FinalProject.Request.ShowRequest;
import com.example.FinalProject.repository.MovieRepository;
import com.example.FinalProject.repository.ShowRepository;
import com.example.FinalProject.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class ShowService {

    private ShowRepository showRepository;
    private MovieRepository movieRepository;

    public Response addShow(ShowRequest showRequest) {

        Cinema cinema = processCinemaInput(showRequest.getCinema());
        Show show = new Show(
                cinema,
                showRequest.getMovie(),
                cinema.getNumberOfSeats(),
                showRequest.getShowDay(),
                showRequest.getShowTime());
        boolean isTaken = checkShowAvailability(0,cinema, showRequest.getShowDay(), showRequest.getShowTime());

        if(isTaken){
            return new Response(false, "Show time already taken on this cinema!");
        }else{
            // Add the show on Movie collection
            Movie mMovie = movieRepository.getById(showRequest.getMovie().getId());
            mMovie.setShow(show);
            // Set show
            showRepository.save(show);
            return new Response(true, "Show added successfully!");
        }
    }

    private Cinema processCinemaInput(String cinema) {
        for (Cinema c : Cinema.values()) {
            if (c.getCinemaName().equals(cinema)) {
                return c;
            }
        }
        return null;
    }

    public boolean checkShowAvailability(int showId,Cinema cinema, String showDay, String showTime) {
        List<Show> shows = showRepository.findAll();
        boolean isTaken = false;
        for (Show sh : shows) {
            if (sh.getCinema().equals(cinema) &&
                    sh.getShowDay().equals(showDay) &&
                    sh.getShowTime().equals(showTime) && showId != sh.getId()) {
                isTaken = true;
                break;
            }
        }
        return isTaken;
    }

    public List<Show> getShows() {
        List<Show> shows = showRepository.findAll();
        return shows;
    }

    public Show getShow(Integer showId) {
        Show show = showRepository.findById(showId).get();
        return show;
    }

    public Response editShow(Integer showId, String cinema, Movie movie, String showDay, String showTime) {
        Show show = showRepository.findById(showId).get();
        boolean showExists = showRepository.existsById(showId);
        boolean isTaken = false;

        if(!showExists){
            return new Response(false, "Show does not exist!");
        }

        // Process cinema input
        Cinema cin = processCinemaInput(cinema);
        // Check if showtime with that specific cinema already exists before updating
        isTaken = checkShowAvailability(showId, cin, showDay, showTime);
        if(isTaken){
            return new Response(false, "Show time already taken on this cinema!");
        }else{
            if(cin != null && !Objects.equals(show.getCinema(), cin)){

                show.setCinema(cin);
            }
            if(movie != null && !show.getMovie().getId().equals(movie.getId())){
                show.setMovie(movie);
            }
            if(showDay != null && !Objects.equals(show.getShowDay(), showDay)){
                show.setShowDay(showDay);
            }
            if(showTime != null && !Objects.equals(show.getShowTime(), showTime)){
                show.setShowTime(showTime);
            }
            showRepository.save(show);
            return new Response(true, "Show updated successfully!");
        }
    }

    public Response deleteShow(Integer showId) {
        boolean showExists = showRepository.existsById(showId);

        if(showExists){
            showRepository.deleteById(showId);
            return new Response(true, "Show deleted successfully!");
        }else{
            return new Response(false, "Show does not exist!");
        }
    }

    public Response bookShow(BookingRequest bookingRequest) {
        // Check if there is a seat in the cinema
        Show show = showRepository.findById(bookingRequest.getShow().getId()).get();

        // Get the number of seats left in the cinema for that specific show
        int seatsLeft = show.getLeftNumberOfSeats();

        // Optionally we can use getAvailableSeats() method to get seats left on the cinema
        // int seatsLeft = show.getAvailableSeats();

        if(show != null){
            if(seatsLeft > 0){
                // Check if the user has already booked for the show
                boolean alreadyBooked = checkBookedUser(bookingRequest.getUser(), show);
                if(alreadyBooked){
                    return new Response(false, "User has already booked!");
                }else{
                    // Add the user in show
                    show.setUsers(bookingRequest.getUser());
                    // Add show in user
                    bookingRequest.getUser().setShow(show);
                    show.bookASeat();
                    return new Response(true, "you have booked for "+show.getMovie().getTitle()+" successfully");
                }
            }else{
                return new Response(false, "There are no seats available for this show!");
            }
        }else{
            return new Response(false, "Show does not exist!");
        }
    }

    private boolean checkBookedUser(User user, Show show) {
        List<User> users = show.getUsers();
        boolean exists = false;
        for(User u: users){
            if(u.equals(user)){
                exists = true;
                break;
            }
        }

        // Alternatively
//        if(user.getShow().equals(show)){
//            exists = true;
//        }

        return exists;
    }

}
