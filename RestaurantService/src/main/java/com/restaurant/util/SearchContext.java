package com.restaurant.util;

import com.restaurant.model.Restaurant;
import com.restaurant.service.ZipCodeSearchStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SearchContext {

    private final Map<String, ZipCodeSearchStrategy> strategies;

    @Autowired
    public SearchContext(Map<String, ZipCodeSearchStrategy> strategies) {
        this.strategies = strategies;
    }

    public List<Restaurant> search(String strategyName, String zipCode) {
        ZipCodeSearchStrategy strategy = strategies.get(strategyName);
        if (strategy == null) {
            throw new IllegalArgumentException("No strategy found for: " + strategyName);
        }
        return strategy.searchByZipCode(zipCode);
    }
}
