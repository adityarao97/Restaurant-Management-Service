package com.restaurant.service;

import com.restaurant.model.Restaurant;
import java.util.List;

public interface ZipCodeSearchStrategy {
    List<Restaurant> searchByZipCode(String zipCode);
}

