// src/main/java/com/openlecture/repository/UserRepository.java
package com.openlecture.repository;

import com.openlecture.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
