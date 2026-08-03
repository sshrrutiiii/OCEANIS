package com.oceanis.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ports")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Port {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;
}