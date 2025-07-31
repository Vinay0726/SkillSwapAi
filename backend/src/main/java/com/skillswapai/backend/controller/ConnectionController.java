package com.skillswapai.backend.controller;

import com.skillswapai.backend.model.User;
import com.skillswapai.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {

    @Autowired
    private UserRepository userRepository;

    // GET /api/connections/{userClerkId}
    @GetMapping("/{userClerkId}")
    public List<User> getConnections(@PathVariable String userClerkId) {
        List<User> users = userRepository.findAll();
        // Defensive: if requesting user doesn't exist, return []
        boolean userExists = users.stream().anyMatch(u -> u.getClerkId().equals(userClerkId));
        if (!userExists) {
            return List.of();
        }
        // return all other users except myself
        return users.stream()
                .filter(u -> !u.getClerkId().equals(userClerkId))
                .toList();
    }
}
