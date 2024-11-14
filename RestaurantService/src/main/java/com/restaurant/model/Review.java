package com.restaurant.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Review {
    private String userId;
    private String userName;
    private String comment;
    private int rating;
    private LocalDateTime timestamp;
}


