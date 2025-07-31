package com.skillswapai.backend.dto.request;

import lombok.Data;
import java.util.List;

// This DTO defines what the frontend can send to update a profile.
@Data
public class UserUpdateRequest {
    private String name;
    private String email;
    private String profileImgLink;
    private String role;
    private String description;
    private List<String> skills;
}
