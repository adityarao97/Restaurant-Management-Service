package com.restaurant.service;

import com.restaurant.model.Restaurant;
import com.restaurant.model.Review;
import com.restaurant.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;

    public void saveRestaurant(Restaurant restaurant) {
        restaurantRepository.save(restaurant);
    }

    public void saveAllRestaurant(List<Restaurant> restaurants) {
        restaurantRepository.saveAll(restaurants);
    }

    public List<Restaurant> findAllRestaurants() {
       return restaurantRepository.findAll();
    }

    public List<Restaurant> findByNameContainingIgnoreCase(String name) {
        return restaurantRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Restaurant> findByCategoriesIn(List<String> categories) {
        return restaurantRepository.findByCategoriesIn(categories);
    }

    public List<Restaurant> findByNameAndCategories(String name, List<String> categories) {
        return restaurantRepository.findByNameAndCategories(name, categories);
    }

    @Override
    public Restaurant getRestaurantDetails(String id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + id));
    }

    @Override
    public Restaurant addReview(String restaurantId, Review review) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + restaurantId));

        // Add the new review to the list
        restaurant.getReviews().add(review);

        // Update average rating
        double averageRating = restaurant.getReviews().stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);
        restaurant.setAverageRating(averageRating);

        return restaurantRepository.save(restaurant); // Save and return updated restaurant
    }

}
