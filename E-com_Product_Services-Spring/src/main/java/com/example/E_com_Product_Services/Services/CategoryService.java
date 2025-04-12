package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Category;
import com.example.E_com_Product_Services.Generic.GenericService;
import com.example.E_com_Product_Services.Repositories.ICategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends GenericService<Category,Long> {
    public CategoryService(ICategoryRepository categoryRepository) {
        this.repository = categoryRepository;
    }
}
