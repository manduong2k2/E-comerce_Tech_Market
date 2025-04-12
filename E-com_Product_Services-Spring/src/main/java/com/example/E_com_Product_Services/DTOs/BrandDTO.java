package com.example.E_com_Product_Services.DTOs;

import java.util.List;
import java.util.stream.Collectors;

import com.example.E_com_Product_Services.Entities.Brand;
import com.example.E_com_Product_Services.Entities.Product;

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
    private List<Product> products;

    public static BrandDTO fromBrand(Brand brand){
        return new BrandDTO(
            brand.getId(),
            brand.getName(),
            brand.getDescription(),
            brand.getImage(),
            brand.getProducts().stream().map(product -> new Product(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImage(),
                null,
                null,
                null
            )).collect(Collectors.toList())
        );
    }
}
