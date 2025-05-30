package com.example.E_com_Product_Services.Interfaces;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.example.E_com_Product_Services.Entities.Product;

public interface IProductService {
    public List<Product> getAll();
    public List<Product> getFiltered(Map<String, String> filters);
    public Product getById(Long id);
    public Product save(MultipartFile file, Product product);
    public Product update(MultipartFile file, Product product,Product newProduct);
    public boolean delete(Product product);
}
