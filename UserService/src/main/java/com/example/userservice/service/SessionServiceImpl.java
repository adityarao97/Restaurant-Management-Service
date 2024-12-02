package com.example.userservice.service;

import com.example.userservice.config.jwt.JwtTokenGenerator;
import com.example.userservice.entity.Session;
import com.example.userservice.entity.User;
import com.example.userservice.repository.SessionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SessionServiceImpl implements SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    private final JwtTokenGenerator generator = new JwtTokenGenerator();

    @Override
    public Session createOrUpdateSession(User user) {
        Session session = new Session();
        session.setUserId(user.getId());
        session.setJwtToken(generator.generateJwtToken(user));
        session.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        session.setModifiedDate(new Timestamp(System.currentTimeMillis()));
        session.setExpiresAt(Timestamp.valueOf(LocalDateTime.now().plusHours(2)));
        return sessionRepository.save(session);
    }

    @Override
    public Session getSessionByUser(User user) {
        return null;
    }

    @Override
    public void deleteSession(String token) {
        Optional<Session> sessionOptional = sessionRepository.findByJwtToken(token);
        if(sessionOptional.isPresent()){
            sessionRepository.delete(sessionOptional.get());
        } else {
            throw new EntityNotFoundException("Session not found or already logged out");
        }
    }
}
