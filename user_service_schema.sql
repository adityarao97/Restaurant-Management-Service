CREATE DATABASE UserService;
USE UserService;

-- Table for UserType
CREATE TABLE UserType (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for User
CREATE TABLE User (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type_id CHAR(36) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN NOT NULL,
    profile_image TEXT,
    reset_password_token TEXT,
    reset_password_expires TIMESTAMP NULL,
    FOREIGN KEY (user_type_id) REFERENCES UserType(id),
    
    -- Unique constraint on email and password
	CONSTRAINT unique_email_password UNIQUE (email, password)
);

-- Table for Session
CREATE TABLE Session (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    jwt_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

