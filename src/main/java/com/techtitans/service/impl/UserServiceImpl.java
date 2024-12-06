package com.techtitans.service.impl;

import com.techtitans.model.User;
import com.techtitans.repository.UserRepository;
import com.techtitans.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @Override
    public User updateUser(Long id, User user) {
        return userRepository.findById(id)
            .map(existingUser -> {
                existingUser.setUsername(user.getUsername());
                existingUser.setEmail(user.getEmail());
                if (user.getPassword() != null) {
                    existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
                }
                return userRepository.save(existingUser);
            })
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
} 