package com.oceanis.server.controller;

import com.oceanis.server.dto.RouteResponse;
import com.oceanis.server.service.RouteAlgorithmService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "http://localhost:5173")
public class RouteController {

    private final RouteAlgorithmService routeAlgorithmService;

    public RouteController(
            RouteAlgorithmService routeAlgorithmService) {
        this.routeAlgorithmService = routeAlgorithmService;
    }

    @GetMapping("/shortest")
    public RouteResponse findShortestRoute(
            @RequestParam Long source,
            @RequestParam Long destination) {

        return routeAlgorithmService.findShortestPath(
                source,
                destination
        );
    }
}