package com.oceanis.server.dto;

import java.util.List;

public class RouteResponse {

    private String source;
    private String destination;
    private List<PortPoint> path;
    private double distanceKm;

    public RouteResponse() {
    }

    public RouteResponse(
            String source,
            String destination,
            List<PortPoint> path,
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

    public List<PortPoint> getPath() {
        return path;
    }

    public void setPath(List<PortPoint> path) {
        this.path = path;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public static class PortPoint {

        private Long id;
        private String name;
        private double lat;
        private double lng;

        public PortPoint() {
        }

        public PortPoint(
                Long id,
                String name,
                double lat,
                double lng
        ) {
            this.id = id;
            this.name = name;
            this.lat = lat;
            this.lng = lng;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getLat() {
            return lat;
        }

        public void setLat(double lat) {
            this.lat = lat;
        }

        public double getLng() {
            return lng;
        }

        public void setLng(double lng) {
            this.lng = lng;
        }
    }
}