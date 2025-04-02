package com.web.n7.repository;

import com.web.n7.model.User;
import com.web.n7.model.enumeration.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.role <> 'ADMIN'")
    List<User> findByRoleNot(Role role);
}