package com.example.E_com_Category_Services.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private long id;

    private String name;

    private String description;

    private Double price;

    private Long stock;

    private String image;

    private Long user_id;

}
