package com.example.userservice.service;

import com.example.userservice.entity.User;
import com.example.userservice.entity.UserType;
import com.example.userservice.repository.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTypeServiceImpl implements UserTypeService{

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Override
    public void createOrUpdate(UserType userType) {

    }

    @Override
    public UserType getUserTypeByUser(User user) {
        return null;
    }

    @Override
    public void deleteUserType(UserType userType) {

    }
}
