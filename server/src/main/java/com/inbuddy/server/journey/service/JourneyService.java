package com.inbuddy.server.journey.service;

import com.inbuddy.server.itemlist.repository.ItemlistRepository;
import com.inbuddy.server.itemlist.service.ItemService;
import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import com.inbuddy.server.takelist.service.TasklistService;
import com.inbuddy.server.users.entity.Users;
import com.inbuddy.server.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class JourneyService {

    private final JourneyRepository journeyRepository;
    private final UsersRepository usersRepository;
    private final ItemService itemService;
    private final TasklistService tasklistService;

    public List<Journey> getJourneysByUserId(int userId) {
        return journeyRepository.findByUserUserId(userId);
    }
    @Transactional
    public void createJourney(int userId, String journeyName,Date journeyCreationDate, Date journeyModificationDate){
        Users user = usersRepository.findByUserId(userId);
        Journey journey = Journey.createJourney(user,journeyName,journeyCreationDate,journeyModificationDate);
        journeyRepository.save(journey);

        itemService.createItem(journey.getJourneyId(),"여권");
        itemService.createItem(journey.getJourneyId(),"지갑");

        tasklistService.createTasklist(journey.getJourneyId(), "여권챙김?");
        tasklistService.createTasklist(journey.getJourneyId(), "탑승수속");
        tasklistService.createTasklist(journey.getJourneyId(), "비행기타기");


    }

    // 이 부분 Exception 직접 만들어서 사용 할지 말지?
    public Journey findById(int id) {
        Optional<Journey> optionalJourney = journeyRepository.findById(id);
        if (optionalJourney.isPresent()) {
            return optionalJourney.get();
        } else {
            throw new NoSuchElementException("해당 ID에 대한 여정을 찾을 수 없습니다.");
        }
    }

}
