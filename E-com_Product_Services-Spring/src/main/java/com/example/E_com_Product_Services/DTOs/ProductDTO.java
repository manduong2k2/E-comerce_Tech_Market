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
    private Brand brand;
    private Category category;
    private String image;

    public Product toProduct(){
        Product product = new Product();
        product.setName(this.getName());
        product.setDescription(this.getDescription());
        product.setPrice(this.getPrice());
        product.setBrand_id(this.getBrand().getId());
        product.setCategory_id(this.getCategory().getId());
        product.setStock(this.getStock());
        product.setImage(this.getImage());
        return product;
    }
    public ProductDTO(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.image = product.getImage();
        this.price = product.getPrice();
        this.stock = product.getStock();
        this.brand = product.getBrand();
        this.category = product.getCategory();
        this.description = product.getDescription();
    }
}
