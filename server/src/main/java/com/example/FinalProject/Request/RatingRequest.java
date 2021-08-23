package com.example.FinalProject.Request;


import com.example.FinalProject.Entity.Movie;
import com.example.FinalProject.Entity.User;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RatingRequest {
    private final Movie movie;
    private final User user;
    private final LocalDateTime ratedDate;
    private final int value;
}
