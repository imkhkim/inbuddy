package com.inbuddy.server.flight.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inbuddy.server.journey.entity.Journey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "flight_info")
public class FlightInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_info_id")
    private int flightInfoId;

    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "journey_id",nullable = false)
    private Journey journey;

    @Column(name = "departure_date", nullable = false, length = 255)
    private Date departureDate;
    @Column(name = "flight_code", nullable = false, length = 255)
    private String flightCode;

    @Column(name = "airline", nullable = false, length = 255)
    private String airline;

    @Builder
    private FlightInfo(Journey journey, String flightCode, String airline, Date departureDate){
        this.journey = journey;
        this.flightCode = flightCode;
        this.airline = airline;
        this.departureDate = departureDate;
    }

    public static FlightInfo createFlightInfo(Journey journey, String flightCode, String airline, Date departureDate){
        return new FlightInfo(journey,flightCode,airline,departureDate);
    }

    public void updateFlightInfo(String flightCode, String airline, Date departureDate){
        this.flightCode = flightCode;
        this.airline = airline;
        this.departureDate = departureDate;
    }

}