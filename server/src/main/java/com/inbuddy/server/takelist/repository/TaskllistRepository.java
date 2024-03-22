package com.inbuddy.server.takelist.repository;

import com.inbuddy.server.takelist.entity.Tasklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskllistRepository extends JpaRepository<Tasklist,Integer> {
}
