package com.inbuddy.server.users.repository;

import com.inbuddy.server.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users,Integer> {
    Users findByUserId(int userId);
}
