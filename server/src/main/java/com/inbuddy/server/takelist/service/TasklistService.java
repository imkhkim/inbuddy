package com.inbuddy.server.takelist.service;

import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import com.inbuddy.server.takelist.entity.Tasklist;
import com.inbuddy.server.takelist.repository.TaskllistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TasklistService {

    private final JourneyRepository journeyRepository;
    private final TaskllistRepository taskllistRepository;

    @Transactional
    public void createTasklist(int journeyId, String taskName){
        Journey journey = journeyRepository.findByJourneyId(journeyId);
        Tasklist tasklist = Tasklist.crateTasklist(journey,taskName);
        taskllistRepository.save(tasklist);
    }
}
