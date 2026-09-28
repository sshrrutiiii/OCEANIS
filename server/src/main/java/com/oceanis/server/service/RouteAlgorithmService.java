package com.oceanis.server.service;

import com.oceanis.server.dto.RouteResponse;
import com.oceanis.server.entity.Port;
import com.oceanis.server.entity.ShippingRoute;
import com.oceanis.server.repository.PortRepository;
import com.oceanis.server.repository.ShippingRouteRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteAlgorithmService {

    private final ShippingRouteRepository shippingRouteRepository;
    private final PortRepository portRepository;

    public RouteAlgorithmService(
            ShippingRouteRepository shippingRouteRepository,
            PortRepository portRepository) {

        this.shippingRouteRepository = shippingRouteRepository;
        this.portRepository = portRepository;
    }

    public RouteResponse findShortestPath(
            Long sourceId,
            Long destinationId) {

        List<ShippingRoute> routes =
                shippingRouteRepository.findAll();

        // -----------------------------------------
        // Create graph
        // -----------------------------------------

        Map<Long, List<ShippingRoute>> graph =
                new HashMap<>();

        for (ShippingRoute route : routes) {

            graph
                    .computeIfAbsent(
                            route.getSourcePortId(),
                            key -> new ArrayList<>()
                    )
                    .add(route);
        }

        // -----------------------------------------
        // Distance from source
        // -----------------------------------------

        Map<Long, Double> distances =
                new HashMap<>();

        // -----------------------------------------
        // Previous port
        // -----------------------------------------

        Map<Long, Long> previous =
                new HashMap<>();

        // -----------------------------------------
        // Initialize distances
        // -----------------------------------------

        for (ShippingRoute route : routes) {

            distances.put(
                    route.getSourcePortId(),
                    Double.POSITIVE_INFINITY
            );

            distances.put(
                    route.getDestinationPortId(),
                    Double.POSITIVE_INFINITY
            );
        }

        distances.put(sourceId, 0.0);

        // -----------------------------------------
        // Priority Queue
        // -----------------------------------------

        PriorityQueue<Node> queue =
                new PriorityQueue<>(
                        Comparator.comparingDouble(
                                node -> node.distance
                        )
                );

        queue.add(
                new Node(
                        sourceId,
                        0.0
                )
        );

        // -----------------------------------------
        // Dijkstra Algorithm
        // -----------------------------------------

        while (!queue.isEmpty()) {

            Node current =
                    queue.poll();

            Long currentPort =
                    current.portId;

            double currentDistance =
                    current.distance;

            if (currentDistance >
                    distances.get(currentPort)) {

                continue;
            }

            if (currentPort.equals(destinationId)) {
                break;
            }

            List<ShippingRoute> neighbors =
                    graph.getOrDefault(
                            currentPort,
                            Collections.emptyList()
                    );

            for (ShippingRoute route : neighbors) {

                Long nextPort =
                        route.getDestinationPortId();

                double newDistance =
                        currentDistance
                                + route.getDistanceKm();

                if (newDistance <
                        distances.get(nextPort)) {

                    distances.put(
                            nextPort,
                            newDistance
                    );

                    previous.put(
                            nextPort,
                            currentPort
                    );

                    queue.add(
                            new Node(
                                    nextPort,
                                    newDistance
                            )
                    );
                }
            }
        }

        // -----------------------------------------
        // No route found
        // -----------------------------------------

        if (!sourceId.equals(destinationId)
                && !previous.containsKey(destinationId)) {

            return new RouteResponse(
                    getPortName(sourceId),
                    getPortName(destinationId),
                    new ArrayList<>(),
                    0
            );
        }

        // -----------------------------------------
        // Reconstruct shortest path
        // -----------------------------------------

        List<Long> portIds =
                new ArrayList<>();

        Long current =
                destinationId;

        while (current != null) {

            portIds.add(current);

            if (current.equals(sourceId)) {
                break;
            }

            current =
                    previous.get(current);
        }

        Collections.reverse(portIds);

        // -----------------------------------------
        // Convert IDs to PortPoint objects
        // -----------------------------------------

        List<RouteResponse.PortPoint> path =
                new ArrayList<>();

        for (Long portId : portIds) {

            Port port =
                    portRepository
                            .findById(portId)
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Port not found: "
                                                    + portId
                                    )
                            );

            path.add(
                    new RouteResponse.PortPoint(
                            port.getId(),
                            port.getName(),
                            port.getLatitude(),
                            port.getLongitude()
                    )
            );
        }

        // -----------------------------------------
        // Total shortest distance
        // -----------------------------------------

        double totalDistance =
                distances.get(destinationId);

        // -----------------------------------------
        // Final response
        // -----------------------------------------

        return new RouteResponse(
                getPortName(sourceId),
                getPortName(destinationId),
                path,
                totalDistance
        );
    }

    // -----------------------------------------
    // Get port name
    // -----------------------------------------

    private String getPortName(Long portId) {

        Port port =
                portRepository
                        .findById(portId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Port not found: "
                                                + portId
                                )
                        );

        return port.getName();
    }

    // -----------------------------------------
    // Dijkstra Node
    // -----------------------------------------

    private static class Node {

        Long portId;
        double distance;

        Node(
                Long portId,
                double distance
        ) {
            this.portId = portId;
            this.distance = distance;
        }
    }
}