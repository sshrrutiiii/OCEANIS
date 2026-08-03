package com.oceanis.server.service;

import com.oceanis.server.dto.PortRequest;
import com.oceanis.server.dto.PortResponse;
import com.oceanis.server.entity.Port;
import com.oceanis.server.repository.PortRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortService {

    private final PortRepository portRepository;

    // Add Port
    public PortResponse addPort(PortRequest request) {

        Port port = Port.builder()
                .name(request.getName())
                .country(request.getCountry())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();

        Port savedPort = portRepository.save(port);

        return mapToResponse(savedPort);
    }

    // Get All Ports
    public List<PortResponse> getAllPorts() {

        return portRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get Port By ID
    public PortResponse getPortById(Long id) {

        Port port = portRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Port not found"));

        return mapToResponse(port);
    }

    // Update Port
    public PortResponse updatePort(Long id, PortRequest request) {

        Port port = portRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Port not found"));

        port.setName(request.getName());
        port.setCountry(request.getCountry());
        port.setLatitude(request.getLatitude());
        port.setLongitude(request.getLongitude());

        Port updated = portRepository.save(port);

        return mapToResponse(updated);
    }

    // Delete Port
    public void deletePort(Long id) {

        portRepository.deleteById(id);
    }

    // Entity -> DTO
    private PortResponse mapToResponse(Port port) {

        return PortResponse.builder()
                .id(port.getId())
                .name(port.getName())
                .country(port.getCountry())
                .latitude(port.getLatitude())
                .longitude(port.getLongitude())
                .build();
    }

}