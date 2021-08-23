package com.example.FinalProject.Request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;


@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class MovieRequest {
    private final String title;
    private final String genre;
    private final String description;
    private final String trailerUrl;
    private final String imageUrl;
}