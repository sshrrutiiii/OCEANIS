package com.oceanis.server.service;

import com.oceanis.server.entity.ShippingRoute;
import com.oceanis.server.repository.ShippingRouteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingRouteService {

    private final ShippingRouteRepository shippingRouteRepository;

    public ShippingRouteService(
            ShippingRouteRepository shippingRouteRepository) {
        this.shippingRouteRepository = shippingRouteRepository;
    }

    public List<ShippingRoute> getAllRoutes() {
        return shippingRouteRepository.findAll();
    }

    public ShippingRoute getRouteById(Long id) {
        return shippingRouteRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Shipping route not found"));
    }

    public List<ShippingRoute> getRoutesFromPort(Long sourcePortId) {
        return shippingRouteRepository
                .findBySourcePortId(sourcePortId);
    }

    public List<ShippingRoute> getRoutesToPort(Long destinationPortId) {
        return shippingRouteRepository
                .findByDestinationPortId(destinationPortId);
    }

    public ShippingRoute saveRoute(ShippingRoute route) {
        return shippingRouteRepository.save(route);
    }

    public void deleteRoute(Long id) {
        shippingRouteRepository.deleteById(id);
    }
}