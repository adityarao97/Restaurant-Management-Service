package com.example.userservice.service;

import com.example.userservice.entity.User;

public interface UserService {
    public void createOrUpdate(User user);
    public User getUser(User user);
    public void deleteUser(User user);
}
