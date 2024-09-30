package com.restaurant.service;

import com.restaurant.model.Restaurant;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RestaurantService {

    void saveRestaurant(Restaurant restaurant);

    List<Restaurant> findAllRestaurants();

}
