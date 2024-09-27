package com.restaurant.objects;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("Restaurant")
public class Restaurant {
    @Id
    private String name;
    private Integer salary;
}
