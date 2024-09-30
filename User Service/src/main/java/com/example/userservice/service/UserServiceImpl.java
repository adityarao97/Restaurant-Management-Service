package com.example.userservice.service;

import com.example.userservice.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public void createOrUpdate(User user) {
    }

    @Override
    public User getUser(User user) {
        return null;
    }

    @Override
    public void deleteUser(User user) {

    }
}
