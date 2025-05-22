package com.example.E_com_Category_Services.DTOs;

import java.util.List;

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
    private String description;
    private List<Product> products ;
    
    public CategoryDTO(Category category){
        this.id = category.getId();
        this.name = category.getName();
        this.image = category.getImage();
        this.description = category.getDescription();
    }
}
