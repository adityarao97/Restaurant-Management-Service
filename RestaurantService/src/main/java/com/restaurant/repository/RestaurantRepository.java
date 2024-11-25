package com.restaurant.repository;

import com.restaurant.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    @Override
    List<Restaurant> findAll();

    @Override
    <S extends Restaurant> List<S> saveAll(Iterable<S> entities);

    @Override
    <S extends Restaurant> S save(S entity);

    List<Restaurant> findByBusinessOwnerId(String businessOwnerId);

    // Find by Name (exact or partial match)
    List<Restaurant> findByNameContainingIgnoreCase(String name);

    // Find by Cuisine or Food Type (using categories)
    @Query("{ 'categories': { $in: ?0 } }")
    List<Restaurant> findByCategoriesIn(List<String> categories);

    // Find by Name and Categories (combined search)
    @Query("{ 'name': { $regex: ?0, $options: 'i' }, 'categories': { $in: ?1 } }")
    List<Restaurant> findByNameAndCategories(String name, List<String> categories);
}