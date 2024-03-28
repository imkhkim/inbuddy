package com.inbuddy.server.flight.service;

import com.inbuddy.server.flight.entity.FlightInfo;
import com.inbuddy.server.flight.repository.FlightRepository;
import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FlightService {

    private final JourneyRepository journeyRepository;
    private final FlightRepository flightRepository;

    @Transactional
    public void createFlightInfo(int journeyId, String flightCode, String airline, Date departureDate) {
        if (flightRepository.existsByJourneyJourneyId(journeyId)){
            throw new DataIntegrityViolationException("이미 해당 여정에 대한 비행기 정보가 생성되었습니다.");
        }
        Journey journey = journeyRepository.findByJourneyId(journeyId);
        FlightInfo flight = FlightInfo.builder()
                .journey(journey)
                .flightCode(flightCode)
                .airline(airline)
                .departureDate(departureDate)
                .build();
        flightRepository.save(flight);
    }

    @Transactional
    public void modifyFlightInfo(int flightId, String flightCode, String airline, Date departureDate) throws ChangeSetPersister.NotFoundException {
        Optional<FlightInfo> flightInfo = flightRepository.findById(flightId);
        if(flightInfo.isPresent()){
            flightInfo.get().updateFlightInfo(flightCode,airline,departureDate);
        }else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @Transactional
    public void deleteFlightInfo(int flightId){
        FlightInfo flightInfo = flightRepository.findById(flightId)
                .orElseThrow(() -> new IllegalArgumentException("해당 비행정보를 찾을 수 없습니다. ID: " + flightId));
        flightRepository.delete(flightInfo);
    }

    @Transactional
    public FlightInfo readFlightInfo(int journeyId){
        return flightRepository.findByJourney_JourneyId(journeyId);
    }
}
