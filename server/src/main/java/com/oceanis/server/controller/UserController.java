package com.oceanis.server.controller;

import com.oceanis.server.entity.User;
import com.oceanis.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Register API
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    // Login API
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user);
    }
}