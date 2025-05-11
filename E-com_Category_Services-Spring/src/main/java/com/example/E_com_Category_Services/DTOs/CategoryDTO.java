package com.example.E_com_Category_Services.DTOs;

import java.util.List;
import java.util.stream.Collectors;

import com.example.E_com_Category_Services.Entities.Category;
import com.example.E_com_Category_Services.Entities.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;
    private String image;
    private List<Product> products ;
    
    public static CategoryDTO fromCategory(Category category){
        return new CategoryDTO(
            category.getId(),
            category.getName(),
            category.getImage(),
            category.getProducts().stream().map(product -> new Product(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImage(),
                null
            )).collect(Collectors.toList())
        );
    }
}
