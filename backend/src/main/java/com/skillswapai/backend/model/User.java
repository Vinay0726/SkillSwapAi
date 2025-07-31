package com.skillswapai.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // This is the unique ID from Clerk. It's the key to link our data.
    @Column(unique = true, nullable = false)
    private String clerkId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String profileImgLink;

    // Editable fields
    private String role;

    @Column(columnDefinition = "TEXT")
    private String description;

    // We'll store skills as a single comma-separated string for simplicity.
    // The service layer will handle conversion to/from a list.
    @Column(length = 1024)
    private String skills;
}
