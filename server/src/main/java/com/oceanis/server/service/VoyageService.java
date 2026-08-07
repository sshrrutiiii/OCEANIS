package com.oceanis.server.service;

import com.oceanis.server.dto.VoyageRequest;
import com.oceanis.server.dto.VoyageResponse;
import com.oceanis.server.entity.Voyage;
import com.oceanis.server.repository.VoyageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoyageService {

    private final VoyageRepository voyageRepository;

    // Save Voyage
    public VoyageResponse saveVoyage(VoyageRequest request) {

        Voyage voyage = Voyage.builder()
                .source(request.getSource())
                .destination(request.getDestination())
                .distanceKm(request.getDistanceKm())
                .etaHours(request.getEtaHours())
                .fuelTons(request.getFuelTons())
                .createdAt(LocalDateTime.now())
                .build();

        Voyage saved = voyageRepository.save(voyage);

        return mapToResponse(saved);
    }

    // Get All Voyages
    public List<VoyageResponse> getAllVoyages() {

        return voyageRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Entity -> DTO
    private VoyageResponse mapToResponse(Voyage voyage) {

        return VoyageResponse.builder()
                .id(voyage.getId())
                .source(voyage.getSource())
                .destination(voyage.getDestination())
                .distanceKm(voyage.getDistanceKm())
                .etaHours(voyage.getEtaHours())
                .fuelTons(voyage.getFuelTons())
                .createdAt(voyage.getCreatedAt())
                .build();
    }
}