package com.example.FinalProject.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SHOW_TBL")
public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_id", unique = true, nullable = false)
    private Integer id;

    private Cinema cinema;

    @JsonManagedReference
    @OneToOne(mappedBy="show")
    private Movie movie;

    @ManyToMany(mappedBy="show")
    private List<User> users;

    private int leftNumberOfSeats;

    private String showDay;
    private String showTime;

    public Show(Cinema cinema, Movie movie, int leftNumberOfSeats, String showDay, String showTime) {
        this.cinema = cinema;
        this.movie = movie;
        this.leftNumberOfSeats = leftNumberOfSeats;
        this.showDay = showDay;
        this.showTime = showTime;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public void setUsers(User user) {
        this.users.add(user);
    }

    public void setLeftNumberOfSeats(int leftNumberOfSeats) {
        this.leftNumberOfSeats = leftNumberOfSeats;
    }

    public void setShowDay(String showDay) {
        this.showDay = showDay;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public Movie getMovie() {
        return movie;
    }

    public List<User> getUser() {
        return users;
    }

    public int getLeftNumberOfSeats(){
        return  this.leftNumberOfSeats;
    }

    public String getShowDay() {
        return showDay;
    }

    public String getShowTime() {
        return showTime;
    }

    public void bookASeat(){
        setLeftNumberOfSeats(this.leftNumberOfSeats - 1);
    }

    // Optional method to calculate the available seats on the cinema
    public int getAvailableSeats() {
        int numberOfBookedUsers = users.size();
        return this.cinema.getNumberOfSeats() - numberOfBookedUsers;
    }

}
