package com.inbuddy.server.journey.controller;

import com.inbuddy.server.journey.dto.JourneyCreationRequest;
import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import com.inbuddy.server.global.message.Message;
import com.inbuddy.server.journey.service.JourneyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users/{user_id}/journeys")
public class JourneyController {

    private final JourneyRepository journeyRepository;
    private final JourneyService journeyService;

    @GetMapping()
    public ResponseEntity<Object> getJourneys(@PathVariable("user_id") int userId) {
        try {
            List<Journey> journeyList = journeyRepository.findByUserUserId(userId);
            if (journeyList.isEmpty()) {
                Message message = new Message("404", "여정 목록을 찾을 수 없습니다.");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            } else {
                Message message = new Message("200", "여정 목록을 가져오기 성공", journeyList);
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        } catch (Exception e) {
            Message message = new Message("500", "서버 오류로 인해 여정 목록을 가져올 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{journey_id}")
    public ResponseEntity<Object> deleteJourney(@PathVariable("user_id") int userId, @PathVariable("journey_id") int journeyId) {
        try {
            // 해당 사용자의 여정 중에서 journeyId에 해당하는 여정을 찾습니다.
            Optional<Journey> optionalJourney = journeyRepository.findById(journeyId);

            if (optionalJourney.isPresent()) {
                Journey journey = optionalJourney.get();
                // 여정이 해당 사용자의 것인지 확인합니다.
                if (journey.getUser().getUserId() == userId) {
                    // 여정을 삭제합니다.
                    journeyRepository.delete(journey);

                    // 삭제 성공 메시지 반환
                    Message message = new Message("200", "여정을 삭제했습니다.");
                    return new ResponseEntity<>(message, HttpStatus.OK);
                } else {
                    // 해당 사용자의 여정이 아닌 경우 에러 메시지 반환
                    Message message = new Message("403", "해당 여정을 삭제할 권한이 없습니다.");
                    return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
                }
            } else {
                // 해당 여정이 존재하지 않는 경우 에러 메시지 반환
                Message message = new Message("404", "해당하는 여정을 찾을 수 없습니다.");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // 서버 오류 발생 시 에러 메시지 반환
            Message message = new Message("500", "서버 오류로 인해 여정을 삭제할 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<Object> createJourney(@PathVariable("user_id") int userId, @RequestBody JourneyCreationRequest journeyRequest) {
        try {
            // JourneyService를 사용하여 여정 생성
            journeyService.createJourney(userId, journeyRequest.getJourneyName(), journeyRequest.getFlightCode(), journeyRequest.getJourneyCreationDate(), journeyRequest.getJourneyModificationDate());
            // 생성된 여정을 반환 (여정 생성 성공 시 반환하는 것이 좋습니다)
            Message message = new Message("200", "여정 생성에 성공했습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            // 여정 생성 실패 시 에러 메시지 반환
            Message message = new Message("500", "여정 생성에 실패했습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
