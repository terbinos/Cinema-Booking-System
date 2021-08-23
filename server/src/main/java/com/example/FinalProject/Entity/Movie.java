package com.example.FinalProject.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Setter
@Getter
@Table(name = "MOVIE_TBL")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id", unique = true, nullable = false)
    private Integer id;
    private String title;
    private String genre;
    private String description;
    private String trailerUrl;
    private String imageUrl;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(name="show_id", referencedColumnName = "show_id")
    @JsonBackReference
    private Show show;

    @OneToMany(mappedBy="movie")
    private List<Rating> ratings;

    public Movie(String title, String genre, String description, String trailerUrl, String imageUrl) {
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.imageUrl = imageUrl;
        this.trailerUrl = trailerUrl;
    }

}