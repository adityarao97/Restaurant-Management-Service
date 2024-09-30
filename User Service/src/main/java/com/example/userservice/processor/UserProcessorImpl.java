package com.example.userservice.processor;

import com.example.userservice.entity.User;
import com.example.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProcessorImpl implements UserProcessor{

    @Autowired
    private UserRepository userRepository;

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
