package com.inbuddy.server.flight.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inbuddy.server.journey.entity.Journey;
import jakarta.persistence.*;

import java.util.Date;

public class flight_info {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_info_id")
    private int flightInfoId;

    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "journey_id",nullable = false)
    private Journey journey;

    @Column(name = "journey_name", nullable = false, length = 255)
    private Date flightDate;
    @Column(name = "flight_code", nullable = false)
    private String flightCode;

    @Column(name = "airline", nullable = false)
    private String airline;


}
