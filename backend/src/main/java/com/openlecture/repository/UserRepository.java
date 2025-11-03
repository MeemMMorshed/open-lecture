package com.openlecture.repository;

import com.openlecture.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if an email is already registered
    boolean existsByEmail(String email);

    // Find user by username
    Optional<User> findByUsername(String username);

    // Check if a username is already taken (optional)
    boolean existsByUsername(String username);
}
