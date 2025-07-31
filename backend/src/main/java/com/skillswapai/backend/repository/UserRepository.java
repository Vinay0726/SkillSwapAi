package com.skillswapai.backend.repository;

import com.skillswapai.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom method to find a user by their unique Clerk ID
    Optional<User> findByClerkId(String clerkId);
}
