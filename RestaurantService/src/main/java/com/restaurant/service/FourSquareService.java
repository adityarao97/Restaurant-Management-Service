package com.restaurant.service;

import com.restaurant.model.Restaurant;

import java.util.List;

public interface FourSquareService {

    List<Restaurant> searchRestaurantsByZipCode(String zipCode);

}
