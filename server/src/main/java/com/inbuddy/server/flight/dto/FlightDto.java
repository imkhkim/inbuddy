package com.inbuddy.server.flight.dto;

import lombok.Data;

import java.util.Date;

@Data
public class FlightDto {
    private int journeyId;
    private String flightCode;
    private String airline;
    private Date departureDate;
}
