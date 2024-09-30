package com.example.userservice.processor;

import com.example.userservice.entity.User;

public interface UserProcessor {
    public void createOrUpdate(User user);
    public User getUser(User user);
    public void deleteUser(User user);
}
