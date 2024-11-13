package com.restaurant.service;

import com.restaurant.model.Restaurant;
import com.restaurant.processor.FourSquareParser;
import com.restaurant.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service
public class FourSquareServiceImpl implements FourSquareService {

    @Value("${foursquare.api.key}")
    private String apiKey;

    @Autowired
    RestaurantService restaurantService;

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private FourSquareParser foursquareParser;

    public List<Restaurant> searchRestaurantsByZipCode(String zipCode) {
        String url = UriComponentsBuilder.fromHttpUrl("https://api.foursquare.com/v3/places/search")
                .queryParam("query", "restaurant")
                .queryParam("near", zipCode)
//                .queryParam("categories", "13065") // Category ID for restaurants
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        // Get results from the response body
        List<Map<String, Object>> places = (List<Map<String, Object>>) response.getBody().get("results");

        JsonUtil.printAsJson(places);
        // Convert places to List<Restaurant> using FoursquareParser
        List<Restaurant> restaurants = foursquareParser.parseFoursquareResponseToRestaurants(places);

        restaurantService.saveAllRestaurant(restaurants);

        return restaurants;
    }
}