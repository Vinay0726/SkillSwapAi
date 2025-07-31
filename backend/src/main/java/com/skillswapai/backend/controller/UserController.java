package com.skillswapai.backend.controller;

import com.skillswapai.backend.dto.request.UserUpdateRequest;
import com.skillswapai.backend.dto.response.UserResponse;
import com.skillswapai.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {


    @Autowired
    private UserService userService;

    // GET /api/users/{clerkId}?name=...&email=...
    @GetMapping("/{clerkId}")
    public ResponseEntity<UserResponse> getOrCreateUser(
            @PathVariable String clerkId,
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String profileImgLink) {

        UserResponse userResponse = userService.getOrCreateUser(clerkId, name, email, profileImgLink);
        return ResponseEntity.ok(userResponse);
    }

    // PUT /api/users/{clerkId}
    @PutMapping("/{clerkId}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable String clerkId,
            @RequestBody UserUpdateRequest updateRequest) {

        UserResponse updatedUser = userService.updateUser(clerkId, updateRequest);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers(
            @RequestParam(required = false) String excludeClerkId) {
        List<UserResponse> users = userService.getAllUsers(excludeClerkId);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/profile/{clerkId}")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable String clerkId) {
        // This assumes you have a method in your UserService to find a user by clerkId
        // and convert it to a UserResponse. If not, you'll need to add it.
        UserResponse user = userService.getUserByClerkId(clerkId); // We will create this service method next
        return ResponseEntity.ok(user);
    }
}
