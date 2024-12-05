package com.restaurant.service;

import com.restaurant.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("fourSquareSearchStrategy")
public class FourSquareSearchStrategy implements ZipCodeSearchStrategy {

    @Autowired
    private FourSquareService fourSquareService;

    @Override
    public List<Restaurant> searchByZipCode(String zipCode) {
        return fourSquareService.searchRestaurantsByZipCode(zipCode);
    }
}
