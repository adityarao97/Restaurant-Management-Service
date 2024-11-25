package com.restaurant.service;

import com.restaurant.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("googlePlacesSearchStrategy")
public class GooglePlacesSearchStrategy implements ZipCodeSearchStrategy {

    @Autowired
    private GooglePlacesService googlePlacesService;

    @Override
    public List<Restaurant> searchByZipCode(String zipCode) {
        return googlePlacesService.searchRestaurantsByZipCode(zipCode);
    }
}
