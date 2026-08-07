package com.oceanis.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoyageRequest {

    private String source;

    private String destination;

    private Double distanceKm;

    private Double etaHours;

    private Double fuelTons;
}