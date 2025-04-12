package com.example.E_com_Product_Services.DTOs;

import com.example.E_com_Product_Services.Entities.Brand;
import com.example.E_com_Product_Services.Entities.Category;
import com.example.E_com_Product_Services.Entities.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Long stock;
    private String image;
    private Brand brand;
    private Category category;

    public Product toProduct(Brand brand,Category category){
        Product product = new Product();
        product.setName(this.getName());
        product.setDescription(this.getDescription());
        product.setPrice(this.getPrice());
        product.setStock(this.getStock());
        product.setImage(this.getImage());
        product.setBrand(brand);
        product.setCategory(category);
        return product;
    }
    public static ProductDTO fromProduct(Product product){
        return new ProductDTO(
            product.getId(),
            product.getName(),
            product.getImage(),
            product.getPrice(),
            product.getStock(),
            product.getDescription(),
            new Brand(
                product.getBrand().getId(),
                product.getBrand().getName(),
                product.getBrand().getDescription(),
                product.getBrand().getImage(),
                null
            ),
            new Category(
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getCategory().getImage(),
                null
            )
        );
        

        
    }
}
