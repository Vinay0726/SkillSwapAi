package com.skillswapai.backend.services;


import com.skillswapai.backend.dto.request.UserUpdateRequest;
import com.skillswapai.backend.dto.response.UserResponse;
import com.skillswapai.backend.model.User;
import com.skillswapai.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // This method gets a user, OR creates them if they don't exist in our DB yet.
    public UserResponse getOrCreateUser(String clerkId, String name, String email, String profileImgLink) {
        User user = userRepository.findByClerkId(clerkId)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setClerkId(clerkId);
                    newUser.setName(name);
                    newUser.setEmail(email);
                    newUser.setProfileImgLink(profileImgLink);
                    // Set default values for new users
                    newUser.setRole("Learner");
                    newUser.setDescription("");
                    newUser.setSkills("");
                    return userRepository.save(newUser);
                });
        return convertToResponse(user);
    }

    public UserResponse updateUser(String clerkId, UserUpdateRequest updateRequest) {
        User user = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found with clerkId: " + clerkId));

        // Update with latest data from Clerk
        user.setName(updateRequest.getName());
        user.setEmail(updateRequest.getEmail());
        user.setProfileImgLink(updateRequest.getProfileImgLink());

        // Update with user's manual inputs
        user.setRole(updateRequest.getRole());
        user.setDescription(updateRequest.getDescription());

        if (updateRequest.getSkills() != null) {
            user.setSkills(String.join(",", updateRequest.getSkills()));
        }

        User updatedUser = userRepository.save(user);
        return convertToResponse(updatedUser);
    }
    public List<UserResponse> getAllUsers(String excludeClerkId) {
        return userRepository.findAll().stream()
                .filter(user -> !user.getClerkId().equals(excludeClerkId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserByClerkId(String clerkId) {
        User user = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User profile not found with clerkId: " + clerkId));
        return convertToResponse(user); // Use your existing helper method
    }

    // ... convertToResponse helper method remains the same ...
    private UserResponse convertToResponse(User user) {
        List<String> skillsList = (user.getSkills() != null && !user.getSkills().isEmpty())
                ? Arrays.asList(user.getSkills().split(","))
                : Collections.emptyList();

        return UserResponse.builder()
                .id(user.getId())
                .clerkId(user.getClerkId())
                .name(user.getName())
                .email(user.getEmail())
                .profileImgLink(user.getProfileImgLink())
                .role(user.getRole())
                .description(user.getDescription())
                .skills(skillsList)
                .build();
    }
}
