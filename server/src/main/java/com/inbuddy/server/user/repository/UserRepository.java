package com.inbuddy.server.user.repository;

import com.inbuddy.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    
}
