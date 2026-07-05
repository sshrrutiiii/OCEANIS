package com.oceanis.server.service;

import com.oceanis.server.entity.User;
import com.oceanis.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register
    public User register(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        return userRepository.save(user);
    }

    // Login
    public User login(User user) {

        return userRepository
                .findByEmailAndPassword(user.getEmail(), user.getPassword())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password"));
    }
}