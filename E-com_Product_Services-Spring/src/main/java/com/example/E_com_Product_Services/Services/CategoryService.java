package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Category;
import com.example.E_com_Product_Services.Interfaces.ICategoryService;
import com.example.E_com_Product_Services.Repositories.ICategoryRepository;
import com.example.E_com_Product_Services.Utils.FileUploadUtil;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    protected ICategoryRepository repository;

    public CategoryService(ICategoryRepository categoryRepository) {
        this.repository = categoryRepository;
    }

    @Override
    public List<Category> getAll(){
        return repository.findAll();
    }

    @Override
    public List<Category> getFiltered(Map<String, String> filters) {
        List<Category> filteredCategorys = repository.findAll().stream().filter(p -> {
            for (Map.Entry<String, String> entry : filters.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                switch (key) {
                    case "name":
                        if (!p.getName().toLowerCase().contains(value.toLowerCase()))
                            return false;
                        break;
                    default:
                        break;
                }
            }
            return true;
        }).collect(Collectors.toList());
        return filteredCategorys;
    }
    @Override
    public Category getById(Long id) {
        Optional<Category> category = repository.findById(id);
        return category.isEmpty() ? null : category.get();
    }
    @Override
    public Category save(MultipartFile file, Category category) {
        repository.save(category);
        if (file != null && !file.isEmpty()) {
            try {
                String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
                String fileName = String.valueOf(category.getId()) + '.' + fileExt;
                String uploadDir = "src/main/resources/static/img/categories";
                FileUploadUtil.saveFile(uploadDir, fileName, file);
                category.setImage("img/categories/" + category.getId() + '.' + fileExt);
                repository.save(category);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        return category;
    }
    @Override
    public Category update(MultipartFile file, Category category, Category newCategory) {
        category.setName(newCategory.getName());
        if (file != null && !file.isEmpty()) {
            try {
                String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
                String fileName = String.valueOf(category.getId()) + '.' + fileExt;
                String uploadDir = "src/main/resources/static/img/categories";
                FileUploadUtil.saveFile(uploadDir, fileName, file);
                category.setImage("img/categories/" + category.getId() + '.' + fileExt);
                repository.save(category);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        return repository.save(category);
    }
    @Override
    public boolean delete(Category category) {
        try {
            FileUploadUtil.deleteFile(category.getImage());
            repository.delete(category);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
}
