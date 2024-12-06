package com.techtitans.service;

import com.techtitans.model.Restaurant;
import java.util.List;
import java.util.Optional;

public interface RestaurantService {
    Restaurant createRestaurant(Restaurant restaurant);
    Optional<Restaurant> getRestaurantById(Long id);
    List<Restaurant> getAllRestaurants();
    List<Restaurant> searchRestaurants(String query);
    List<Restaurant> getRestaurantsByCuisine(String cuisine);
    List<Restaurant> getTopRatedRestaurants(Double minRating);
    Restaurant updateRestaurant(Long id, Restaurant restaurant);
    void deleteRestaurant(Long id);
} 