package com.restaurant.controller;

import com.restaurant.model.Restaurant;
import com.restaurant.model.Review;
import com.restaurant.processor.FourSquareParser;
import com.restaurant.service.FourSquareService;
import com.restaurant.service.GooglePlacesService;
import com.restaurant.service.RestaurantService;
import com.restaurant.util.SearchContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurants") // Base path for restaurant-related endpoints
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    SearchContext searchContext;

    // Endpoint to get all restaurants
    @GetMapping("/getRestaurants")
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.findAllRestaurants();
    }

    // Endpoint to delete a restaurant by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable String id) {
        try {
            restaurantService.deleteRestaurantById(id);
            return ResponseEntity.ok("Restaurant with ID: " + id + " has been deleted.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }


    // Endpoint to save a new restaurant
    @PostMapping("/saveRestaurant")
    public Restaurant saveRestaurant(@RequestBody Restaurant restaurant) {
        restaurantService.saveRestaurant(restaurant);
        return restaurant;
    }

    // Endpoint to search for restaurants by name (partial match, case-insensitive)
    @GetMapping("/searchByName")
    public List<Restaurant> searchByName(@RequestParam String name) {
        return restaurantService.findByNameContainingIgnoreCase(name);
    }

    // Endpoint to search for restaurants by categories (e.g., cuisine types or food types)
    @GetMapping("/searchByCategories")
    public List<Restaurant> searchByCategories(@RequestParam List<String> categories) {
        return restaurantService.findByCategoriesIn(categories);
    }

    // Endpoint to get details of a single restaurant by ID
    @GetMapping("/{id}")
    public Restaurant getRestaurantDetails(@PathVariable String id) {
        return restaurantService.getRestaurantDetails(id);
    }

    // Endpoint to add a review to a restaurant by ID
    @PostMapping("/{id}/addReview")
    public Restaurant addReview(@PathVariable String id, @RequestBody Review review) {
        return restaurantService.addReview(id, review);
    }

    @GetMapping("/searchByZipCode")
    public List<Restaurant> searchByZipCode(@RequestParam String zipCode, @RequestParam String provider) {
        return searchContext.search(provider, zipCode);
    }

    @GetMapping("/search")
    public List<Restaurant> searchRestaurants(
            @RequestParam Optional<String> name,
            @RequestParam Optional<String> zipCode,
            @RequestParam Optional<List<String>> categories,
            @RequestParam Optional<Double> averageRating) {
        if (!name.isPresent() && !zipCode.isPresent() && !categories.isPresent() && !averageRating.isPresent()) {
            throw new IllegalArgumentException("At least one search parameter must be provided");
        }
        return restaurantService.searchRestaurants(name, zipCode, categories, averageRating);
    }

    @GetMapping("/byBusinessOwner")
    public List<Restaurant> getRestaurantsByBusinessOwner(@RequestParam String businessOwnerId) {
        return restaurantService.findByBusinessOwnerId(businessOwnerId);
    }

}
