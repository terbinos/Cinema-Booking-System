package com.example.FinalProject.Request;

import com.example.FinalProject.Entity.Show;
import com.example.FinalProject.Entity.User;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class BookingRequest {
    private final User user;
    private final Show show;
}