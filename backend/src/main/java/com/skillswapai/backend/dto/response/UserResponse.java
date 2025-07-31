package com.skillswapai.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

// This DTO defines the shape of the user data sent back to the frontend.
@Data
@Builder
public class UserResponse {
    private Long id;
    private String clerkId;
    private String name;
    private String email;
    private String profileImgLink;
    private String role;
    private String description;
    private List<String> skills;
}