package com.inbuddy.server.journey.repository;

import com.inbuddy.server.journey.entity.Journey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JourneyRepository extends JpaRepository<Journey,Integer> {
    List<Journey> findByUserUserId(int userId);
}