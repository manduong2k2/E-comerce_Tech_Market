package com.example.E_com_Brand_Services.DTOs;

import java.util.List;
import java.util.stream.Collectors;

import com.example.E_com_Brand_Services.Entities.Brand;
import com.example.E_com_Brand_Services.Entities.Product;

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

    public Brand toBrand(){
        return new Brand(
            this.getId(),
            this.getName(),
            this.getDescription(),
            this.getImage(),
            this.getProducts()
        );
    }

    public BrandDTO(Brand brand){
        this.id = brand.getId();
        this.name= brand.getName();
        this.description = brand.getDescription();
        this.image = brand.getImage();
        this.products = brand.getProducts().stream().map(product -> new Product(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getStock(),
            product.getImage(),
            null
        )).collect(Collectors.toList());
    }
}
