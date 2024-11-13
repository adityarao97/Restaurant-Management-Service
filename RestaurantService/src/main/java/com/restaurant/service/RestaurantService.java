package com.restaurant.service;

import com.restaurant.model.Restaurant;
import com.restaurant.model.Review;
import org.springframework.scheduling.annotation.Async;

import java.util.List;

public interface RestaurantService {

    void saveRestaurant(Restaurant restaurant);

    @Async
    void saveAllRestaurant(List<Restaurant> restaurants);

    List<Restaurant> findAllRestaurants();

    List<Restaurant> findByNameContainingIgnoreCase(String name);

    List<Restaurant> findByCategoriesIn(List<String> categories);

    List<Restaurant> findByNameAndCategories(String name, List<String> categories);

    Restaurant getRestaurantDetails(String id); // New method

    Restaurant addReview(String restaurantId, Review review); // New method

}
