package com.example.userservice.processor;

import com.example.userservice.entity.User;
import com.example.userservice.entity.UserType;

public interface UserTypeProcessor {
    public void createOrUpdate(UserType userType);
    public UserType getUserTypeByUser(User user);
    public void deleteUserType(UserType userType);
}
