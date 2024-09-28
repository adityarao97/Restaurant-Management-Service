package com.example.userservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String id;
    String userId;
    String jwtToken;
    String refreshToken;
    Timestamp createdDate;
    Timestamp modifiedDate;
    Timestamp expiresAt;
}
