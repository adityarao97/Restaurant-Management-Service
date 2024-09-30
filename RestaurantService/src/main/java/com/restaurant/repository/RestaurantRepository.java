package com.restaurant.repository;

import com.restaurant.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
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

}
