package com.techtitans.service;

import com.techtitans.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
} 