package com.oceanis.server.controller;

import com.oceanis.server.dto.PortRequest;
import com.oceanis.server.dto.PortResponse;
import com.oceanis.server.service.PortService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PortController {

    private final PortService portService;

    // Add Port
    @PostMapping
    public PortResponse addPort(@RequestBody PortRequest request) {
        return portService.addPort(request);
    }

    // Get All Ports
    @GetMapping
    public List<PortResponse> getAllPorts() {
        return portService.getAllPorts();
    }

    // Get Port By Id
    @GetMapping("/{id}")
    public PortResponse getPortById(@PathVariable Long id) {
        return portService.getPortById(id);
    }

    // Update Port
    @PutMapping("/{id}")
    public PortResponse updatePort(
            @PathVariable Long id,
            @RequestBody PortRequest request
    ) {
        return portService.updatePort(id, request);
    }

    // Delete Port
    @DeleteMapping("/{id}")
    public void deletePort(@PathVariable Long id) {
        portService.deletePort(id);
    }
}
