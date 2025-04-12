package com.example.E_com_Product_Services.Controllers;

import com.example.E_com_Product_Services.DTOs.CategoryDTO;
import com.example.E_com_Product_Services.Entities.Category;
import com.example.E_com_Product_Services.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> showAllCategories(){
        try{
            return categoryService.getAll().stream().map(CategoryDTO::fromCategory).collect(Collectors.toList());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBrandById(@PathVariable Long id) {
        try {
            Category category = categoryService.getById(id);
            if (category == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Category not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Category retrieved successfully");
            response.put("product", CategoryDTO.fromCategory(category));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to retrieve brand");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String,Object>> addCategory(
            @ModelAttribute Category category , 
            @RequestPart(name = "file",required = false) MultipartFile file
        ){
        try{
            Category savedCategory = categoryService.save(file,category);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Category added successfully");
            response.put("category", CategoryDTO.fromCategory(savedCategory));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Category added failed");
            response.put("Error: ", e);
            return ResponseEntity.ok(response);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> DeleteCategoryById(@PathVariable Long id) {
        try {
            Category category = categoryService.getById(id);
            if (category == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Category not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            String deleteStatus = categoryService.delete(category);
            Map<String, Object> response = new HashMap<>();
            response.put("message", deleteStatus);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to delete category");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
