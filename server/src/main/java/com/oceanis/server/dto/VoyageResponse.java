package com.oceanis.server.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoyageResponse {

    private Long id;

    private String source;

    private String destination;

    private Double distanceKm;

    private Double etaHours;

    private Double fuelTons;

    private LocalDateTime createdAt;
}