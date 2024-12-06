package com.techtitans.controller;

import com.techtitans.model.Restaurant;
import com.techtitans.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    
    private final RestaurantService restaurantService;
    
    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }
    
    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        return ResponseEntity.ok(restaurantService.createRestaurant(restaurant));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam String query) {
        return ResponseEntity.ok(restaurantService.searchRestaurants(query));
    }
    
    @GetMapping("/cuisine/{cuisine}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByCuisine(@PathVariable String cuisine) {
        return ResponseEntity.ok(restaurantService.getRestaurantsByCuisine(cuisine));
    }
    
    @GetMapping("/top-rated")
    public ResponseEntity<List<Restaurant>> getTopRatedRestaurants(@RequestParam(defaultValue = "4.0") Double minRating) {
        return ResponseEntity.ok(restaurantService.getTopRatedRestaurants(minRating));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurant) {
        return ResponseEntity.ok(restaurantService.updateRestaurant(id, restaurant));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.ok().build();
    }
} 