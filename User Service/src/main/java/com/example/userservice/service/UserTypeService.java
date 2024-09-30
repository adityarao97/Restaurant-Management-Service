package com.example.userservice.service;

import com.example.userservice.entity.User;
import com.example.userservice.entity.UserType;

public interface UserTypeService {
    public void createOrUpdate(UserType userType);
    public UserType getUserTypeByUser(User user);
    public void deleteUserType(UserType userType);
}
