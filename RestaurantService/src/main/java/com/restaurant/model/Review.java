package com.restaurant.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
public class Review {
    private String userId;
    private String userName;
    private String comment;
    private int rating;
    private LocalDateTime timestamp;
    public Review() {
        this.timestamp = ZonedDateTime.now(ZoneId.of("America/Los_Angeles")).toLocalDateTime();
    }
}


