package com.example.userservice.service;

import com.example.userservice.entity.Session;
import com.example.userservice.entity.User;
import com.example.userservice.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService{

    @Autowired
    private SessionRepository sessionRepository;

    @Override
    public Session createOrUpdateSession(User user) {
        return null;
    }

    @Override
    public Session getSessionByUser(User user) {
        return null;
    }

    @Override
    public void deleteSession(Session session) {

    }
}
