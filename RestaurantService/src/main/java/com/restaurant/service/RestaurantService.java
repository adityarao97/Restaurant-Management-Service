package com.restaurant.service;

import com.restaurant.model.Restaurant;
import com.restaurant.model.Review;
import org.springframework.scheduling.annotation.Async;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {

    void saveRestaurant(Restaurant restaurant);

    @Async
    void saveAllRestaurant(List<Restaurant> restaurants);

    List<Restaurant> findAllRestaurants();

    List<Restaurant> findByNameContainingIgnoreCase(String name);

    List<Restaurant> findByCategoriesIn(List<String> categories);

    void deleteRestaurantById(String id);

    Restaurant getRestaurantDetails(String id);

    Restaurant addReview(String restaurantId, Review review);

    List<Restaurant> searchRestaurants(Optional<String> name, Optional<String> zipCode, Optional<List<String>> categories, Optional<Double> averageRating);

    List<Restaurant> findByBusinessOwnerId(String businessOwnerId);
}
