package com.restaurant.processor;

import com.restaurant.model.Restaurant;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FourSquareParser {

    public Restaurant parseFoursquarePlaceToRestaurant(Map<String, Object> place) {
        Restaurant restaurant = new Restaurant();

        // Set Foursquare ID as the restaurant ID
        restaurant.setId((String) place.get("fsq_id"));

        // Set name
        restaurant.setName((String) place.get("name"));

        // Set address using formatted address
        Map<String, Object> location = (Map<String, Object>) place.get("location");
        if (location != null) {
            restaurant.setAddress((String) location.get("formatted_address"));
            restaurant.setZipCode((String) location.get("postcode"));
        }

        // Set categories
        List<Map<String, Object>> categories = (List<Map<String, Object>>) place.get("categories");
        if (categories != null) {
            List<String> categoryNames = new ArrayList<>();
            for (Map<String, Object> category : categories) {
                categoryNames.add((String) category.get("name"));
            }
            restaurant.setCategories(categoryNames);
        }

        // Set other fields as null or default values since Foursquare doesn’t provide them
        restaurant.setDescription(null);
        restaurant.setAverageRating(0.0);
        restaurant.setPriceRange(0);
        restaurant.setReviews(new ArrayList<>());
        restaurant.setPhotos(new ArrayList<>());
        restaurant.setBusinessOwnerId(null);
        restaurant.setHours(null);

        return restaurant;
    }

    public List<Restaurant> parseFoursquareResponseToRestaurants(List<Map<String, Object>> places) {
        List<Restaurant> restaurants = new ArrayList<>();
        for (Map<String, Object> place : places) {
            restaurants.add(parseFoursquarePlaceToRestaurant(place));
        }
        return restaurants;
    }
}
