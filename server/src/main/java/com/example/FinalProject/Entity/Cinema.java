package com.example.FinalProject.Entity;

public enum Cinema {
    CINEMA_ONE("Cinema One", 150),
    CINEMA_TWO("Cinema Two", 100),
    CINEMA_THREE("Cinema Three", 120);

    private final String cinemaName;
    private final int numberOfSeats;

    Cinema(final String cinemaName, final int numberOfSeats) {
        this.cinemaName = cinemaName;
        this.numberOfSeats = numberOfSeats;
    }

    public String getCinemaName(){
        return this.cinemaName;
    }
    public int getNumberOfSeats(){
        return this.numberOfSeats;
    }
}
