package com.oceanis.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PortResponse {

    private Long id;

    private String name;

    private String country;

    private Double latitude;

    private Double longitude;
}