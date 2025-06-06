package com.example.E_com_Category_Services.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.E_com_Category_Services.DTOs.CategoryDTO;
import com.example.E_com_Category_Services.Entities.Category;
import com.example.E_com_Category_Services.Interfaces.ICategoryService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> showAllCategories(@RequestParam(required = false) Map<String, String> filters){
        try{
            List<CategoryDTO> filterdCategories ;
            if(filters == null) filterdCategories = categoryService.getAll().stream().map(CategoryDTO::new).collect(Collectors.toList());
            filterdCategories = categoryService.getFiltered(filters).stream().map(CategoryDTO::new).collect(Collectors.toList());
            Map<String, Object> response = new HashMap<>();
            response.put("categories", filterdCategories);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBrandById(@PathVariable Long id) {
        try {
            Category category = categoryService.getById(id);
            if (category == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Category not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            return ResponseEntity.ok(new CategoryDTO(category));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to retrieve category");
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
            response.put("category", new CategoryDTO(savedCategory));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Category added failed");
            response.put("Error: ", e);
            return ResponseEntity.ok(response);
        }
    }
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> updateProduct(
            @PathVariable Long id,
            @ModelAttribute Category category,
            @RequestPart(name = "file", required = false) MultipartFile file) {
        try {
            Category existingCategory = categoryService.getById(id);
            if (existingCategory == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Category not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            Category updatedCategory = categoryService.update(file,existingCategory,category);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Category updated successfully");
            response.put("category", new CategoryDTO(updatedCategory));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Category update failed");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
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
            boolean deleteStatus = categoryService.delete(category);
            Map<String, Object> response = new HashMap<>();
            response.put("Delete success", deleteStatus);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to delete category");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
