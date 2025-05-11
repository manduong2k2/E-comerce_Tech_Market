package com.example.E_com_Category_Services.DTOs;

import com.example.E_com_Category_Services.Entities.Brand;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDTO {
    private Long id;
    private String name;
    private String description;
    private String image;

    public static BrandDTO fromBrand(Brand brand){
        return new BrandDTO(
            brand.getId(),
            brand.getName(),
            brand.getDescription(),
            brand.getImage()
        );
    }
}
