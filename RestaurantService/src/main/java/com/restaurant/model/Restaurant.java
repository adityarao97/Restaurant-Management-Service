package com.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Restaurant")
public class Restaurant {

    @Id
    private String id;
    private String name;
    private String address;
    private String contactInfo;
    private String description;
    private List<String> categories;
    private String zipCode;
    private double averageRating;
    private double priceRange;
    private List<Review> reviews;
    private List<String> photos;
    private String businessOwnerId;
    private String hours;

    // New fields
    private Integer priceLevel;
    private Boolean openNow;
    private Integer userRatingsTotal;
}
