package com.oceanis.server.controller;

import com.oceanis.server.entity.ShippingRoute;
import com.oceanis.server.service.ShippingRouteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "http://localhost:5173")
public class ShippingRouteController {

    private final ShippingRouteService shippingRouteService;

    public ShippingRouteController(
            ShippingRouteService shippingRouteService) {
        this.shippingRouteService = shippingRouteService;
    }

    // Get all shipping routes
    @GetMapping
    public List<ShippingRoute> getAllRoutes() {
        return shippingRouteService.getAllRoutes();
    }

    // Get route by ID
    @GetMapping("/{id}")
    public ShippingRoute getRouteById(@PathVariable Long id) {
        return shippingRouteService.getRouteById(id);
    }

    // Get routes starting from a port
    @GetMapping("/from/{portId}")
    public List<ShippingRoute> getRoutesFromPort(
            @PathVariable Long portId) {
        return shippingRouteService.getRoutesFromPort(portId);
    }

    // Get routes ending at a port
    @GetMapping("/to/{portId}")
    public List<ShippingRoute> getRoutesToPort(
            @PathVariable Long portId) {
        return shippingRouteService.getRoutesToPort(portId);
    }

    // Add a new shipping route
    @PostMapping
    public ShippingRoute createRoute(
            @RequestBody ShippingRoute route) {
        return shippingRouteService.saveRoute(route);
    }

    // Delete a shipping route
    @DeleteMapping("/{id}")
    public String deleteRoute(@PathVariable Long id) {
        shippingRouteService.deleteRoute(id);
        return "Shipping route deleted successfully";
    }
}
