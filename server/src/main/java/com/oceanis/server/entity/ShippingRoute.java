package com.oceanis.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "shipping_routes")
public class ShippingRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "distance_km", nullable = false)
    private Double distanceKm;

    @Column(name = "source_port_id", nullable = false)
    private Long sourcePortId;

    @Column(name = "destination_port_id", nullable = false)
    private Long destinationPortId;

    public ShippingRoute() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Long getSourcePortId() {
        return sourcePortId;
    }

    public void setSourcePortId(Long sourcePortId) {
        this.sourcePortId = sourcePortId;
    }

    public Long getDestinationPortId() {
        return destinationPortId;
    }

    public void setDestinationPortId(Long destinationPortId) {
        this.destinationPortId = destinationPortId;
    }
}