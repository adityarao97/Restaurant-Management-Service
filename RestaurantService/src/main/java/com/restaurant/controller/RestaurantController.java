package com.restaurant.controller;


import com.restaurant.model.Restaurant;
import com.restaurant.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;

    @GetMapping("/getRestaurants")
    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.findAllRestaurants();
        return restaurants;
    }

    @PostMapping("/saveRestaurant")
    public Restaurant saveRestaurant(@RequestBody Restaurant restaurant) {
        restaurantService.saveRestaurant(restaurant);
        return restaurant;
    }

}
