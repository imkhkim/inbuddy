package com.inbuddy.server.takelist.repository;

import com.inbuddy.server.takelist.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TasklistRepository extends JpaRepository<Task,Integer> {
    List<Task> findByJourney_JourneyId(int jourenyid);
}
