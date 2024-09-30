package com.example.userservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String id;
    String name;
    String emailID;
    String password;
    UserType userType;
    Session session;
    Timestamp createdDate;
    Timestamp modifiedDate;
    Timestamp lastLogin;
    Boolean isActive;
    String profileImage;
    String resetPasswordToken;
    Timestamp resetPasswordExpired;
}
