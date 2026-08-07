package com.oceanis.server.controller;

import com.oceanis.server.dto.VoyageRequest;
import com.oceanis.server.dto.VoyageResponse;
import com.oceanis.server.service.VoyageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voyages")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class VoyageController {

    private final VoyageService voyageService;

    // Save Voyage
    @PostMapping
    public VoyageResponse saveVoyage(@RequestBody VoyageRequest request) {
        return voyageService.saveVoyage(request);
    }

    // Get All Voyages
    @GetMapping
    public List<VoyageResponse> getAllVoyages() {
        return voyageService.getAllVoyages();
    }
}