package com.example.FinalProject.Request;

import com.example.FinalProject.Entity.Movie;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ShowRequest {
    private final Movie movie;
    private final String cinema;
    private final String showDay;
    private final String showTime;
}