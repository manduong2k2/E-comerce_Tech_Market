package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Generic.GenericService;
import com.example.E_com_Product_Services.Repositories.IProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class ProductService extends GenericService<Product,Long> {

    @Autowired
    private BrandService brandService;
    @Autowired
    private CategoryService categoryService;

    public ProductService(IProductRepository productRepository) {
        this.repository = productRepository;
    }
    public Product saveWithDetails(MultipartFile file, Product product, Long brand_id, Long category_id){
        if (brand_id != null) {
            product.setBrand(brandService.getById(brand_id));
        }
        if (brand_id != null) {
            product.setCategory(categoryService.getById(category_id));
        }
        return save(file, product);
    }
    public Product updateWithDetails(MultipartFile file, Product product,Product newProduct, Long brand_id, Long category_id){
        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setPrice(newProduct.getPrice());
        product.setStock(newProduct.getStock());
        if (brand_id != null) {
            product.setBrand(brandService.getById(brand_id));
        }
        if (brand_id != null) {
            product.setCategory(categoryService.getById(category_id));
        }
        return save(file, product);
    }
}
