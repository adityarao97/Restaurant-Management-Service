package com.restaurant.service;

import com.restaurant.model.Restaurant;

import java.util.List;

public interface GooglePlacesService {

    List<Restaurant> searchRestaurantsByZipCode(String zipCode);

}
