package com.oceanis.server.dto;

import java.util.List;

public class RouteResponse {

    private String source;
    private String destination;
    private List<String> path;
    private double distanceKm;

    public RouteResponse() {
    }

    public RouteResponse(
            String source,
            String destination,
            List<String> path,
            double distanceKm
    ) {
        this.source = source;
        this.destination = destination;
        this.path = path;
        this.distanceKm = distanceKm;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public List<String> getPath() {
        return path;
    }

    public void setPath(List<String> path) {
        this.path = path;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = distanceKm;
    }
}