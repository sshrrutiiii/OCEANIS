package com.oceanis.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PortRequest {

    private String name;

    private String country;

    private Double latitude;

    private Double longitude;
}