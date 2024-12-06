package com.techtitans.service.impl;

import com.techtitans.model.Restaurant;
import com.techtitans.repository.RestaurantRepository;
import com.techtitans.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    
    private final RestaurantRepository restaurantRepository;
    
    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    
    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }
    
    @Override
    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }
    
    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }
    
    @Override
    public List<Restaurant> searchRestaurants(String query) {
        return restaurantRepository.findByNameContainingIgnoreCase(query);
    }
    
    @Override
    public List<Restaurant> getRestaurantsByCuisine(String cuisine) {
        return restaurantRepository.findByCuisine(cuisine);
    }
    
    @Override
    public List<Restaurant> getTopRatedRestaurants(Double minRating) {
        return restaurantRepository.findByAverageRatingGreaterThanEqual(minRating);
    }
    
    @Override
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {
        return restaurantRepository.findById(id)
            .map(existingRestaurant -> {
                existingRestaurant.setName(restaurant.getName());
                existingRestaurant.setAddress(restaurant.getAddress());
                existingRestaurant.setCuisine(restaurant.getCuisine());
                existingRestaurant.setPhoneNumber(restaurant.getPhoneNumber());
                existingRestaurant.setDescription(restaurant.getDescription());
                existingRestaurant.setAverageRating(restaurant.getAverageRating());
                return restaurantRepository.save(existingRestaurant);
            })
            .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }
    
    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }
} 