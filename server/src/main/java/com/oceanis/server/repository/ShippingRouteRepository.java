package com.oceanis.server.repository;

import com.oceanis.server.entity.ShippingRoute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShippingRouteRepository
        extends JpaRepository<ShippingRoute, Long> {

    List<ShippingRoute> findBySourcePortId(Long sourcePortId);

    List<ShippingRoute> findByDestinationPortId(Long destinationPortId);
}