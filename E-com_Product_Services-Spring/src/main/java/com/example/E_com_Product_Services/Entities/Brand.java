package com.example.E_com_Product_Services.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Brand {
    private long id;

    private String name;

    private String description;

    private String image;

}
