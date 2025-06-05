package com.example.E_com_Product_Services.Entities;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    private long id;

    private String name;

    private String image;

    private String description;

    private List<Product> products;
}
