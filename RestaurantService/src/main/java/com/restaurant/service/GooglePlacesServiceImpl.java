package com.restaurant.service;

import com.restaurant.model.Restaurant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class GooglePlacesServiceImpl implements GooglePlacesService {

    private static final Logger logger = Logger.getLogger(GooglePlacesServiceImpl.class.getName());

    @Value("${google.places.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Restaurant> searchRestaurantsByZipCode(String zipCode) {
        // Construct the Google Places API URL
        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/place/textsearch/json")
                .queryParam("query", "restaurants in " + zipCode)
                .queryParam("key", apiKey)
                .toUriString();

        // Log the request URL
        logger.info("Making request to Google Places API with URL: " + url);

        // Make the API request and get the response
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        // Log the raw response
        if (response != null) {
            logger.info("Received response from Google Places API: " + response);
        } else {
            logger.warning("Received null response from Google Places API");
        }

        // Parse the response into a list of Restaurant objects
        return parseGooglePlacesResponse(response, zipCode);
    }

    private List<Restaurant> parseGooglePlacesResponse(Map<String, Object> response, String zipCode) {
        List<Restaurant> restaurants = new ArrayList<>();

        if (response == null || response.get("results") == null) {
            logger.warning("No results found in the response from Google Places API");
            return restaurants;
        }

        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        logger.info("Parsing " + results.size() + " results from Google Places API");

        for (Map<String, Object> place : results) {
            Restaurant restaurant = new Restaurant();

            // Set basic restaurant details from Google Places fields
            restaurant.setName((String) place.get("name"));
            restaurant.setAddress((String) place.get("formatted_address"));
            restaurant.setPriceLevel((Integer) place.get("price_level"));
            restaurant.setUserRatingsTotal((Integer) place.get("user_ratings_total"));

            // Set opening hours (if available)
            Map<String, Object> openingHours = (Map<String, Object>) place.get("opening_hours");
            if (openingHours != null && openingHours.containsKey("open_now")) {
                restaurant.setOpenNow((Boolean) openingHours.get("open_now"));
            }

            // Set rating and zip code
            Object ratingObject = place.getOrDefault("rating", 0.0);
            double averageRating = 0.0;

            if (ratingObject instanceof Number) {
                averageRating = ((Number) ratingObject).doubleValue();
            }
            restaurant.setAverageRating(averageRating);
            restaurant.setZipCode(zipCode);

            // Add to list
            restaurants.add(restaurant);
        }

        logger.info("Parsed " + restaurants.size() + " restaurants from Google Places API response");
        return restaurants;
    }
}
