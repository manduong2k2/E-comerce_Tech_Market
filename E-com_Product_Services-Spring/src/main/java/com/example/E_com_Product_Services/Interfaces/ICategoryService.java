package com.example.E_com_Product_Services.Interfaces;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.example.E_com_Product_Services.Entities.Category;

public interface ICategoryService {
    public List<Category> getAll();
    public List<Category> getFiltered(Map<String, String> filters);
    public Category getById(Long id);
    public Category save(MultipartFile file, Category category);
    public Category update(MultipartFile file, Category category,Category newCategory);
    public boolean delete(Category category);
}
