package com.example.E_com_Product_Services.DTOs;


import com.example.E_com_Product_Services.Entities.Brand;
import com.example.E_com_Product_Services.Entities.Category;
import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Http.BrandServiceClient;
import com.example.E_com_Product_Services.Http.CategoryServiceClient;

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
        this.brand = fetchBrand(product.getBrand_id());
        this.category = fetchCategory(product.getCategory_id());
        this.description = product.getDescription();
    }
    public static Brand fetchBrand(Long brand_id){
        return new BrandServiceClient().getBrandById(brand_id);
    }
    public static Category fetchCategory(Long category_id){
        return new CategoryServiceClient().getCategoryById(category_id);
    }
}
