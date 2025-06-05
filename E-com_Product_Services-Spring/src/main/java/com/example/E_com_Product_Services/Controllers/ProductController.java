package com.example.E_com_Product_Services.Controllers;

import com.example.E_com_Product_Services.DTOs.ProductDTO;
import com.example.E_com_Product_Services.Entities.Brand;
import com.example.E_com_Product_Services.Entities.Category;
import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Interfaces.IProductService;
import com.example.E_com_Product_Services.Services.ApiService;
import com.fasterxml.jackson.databind.ObjectMapper;

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
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @Autowired
    private ApiService apiService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> showAllProducts(@RequestParam(required = false) Map<String, String> filters) {
        try{
            List<ProductDTO> filteredProducts;
            if(filters.isEmpty()) filteredProducts = productService.getAll().stream().map(ProductDTO::new).collect(Collectors.toList());
            filteredProducts = productService.getFiltered(filters).stream().map(ProductDTO::new).collect(Collectors.toList());
            Map<String, Object> response = new HashMap<>();
            response.put("products", filteredProducts);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.ok(response);
        }
    } //

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            Product product = productService.getById(id);
            if (product == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Product not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            return ResponseEntity.ok(new ProductDTO(product));
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to retrieve product");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(
            @ModelAttribute Product product,
            @RequestPart(name = "file", required = false) MultipartFile file) {
        try {
            Product savedProduct = productService.save(file, product);
            savedProduct.setBrand(new ObjectMapper().readValue(apiService.getData("8081","api", "brands/"+savedProduct.getBrand_id()), Brand.class));
            savedProduct.setCategory(new ObjectMapper().readValue(apiService.getData("8082","api", "categories/"+savedProduct.getCategory_id()), Category.class));
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product added successfully");
            response.put("product", new ProductDTO(savedProduct));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product added failed");
            response.put("Error: ", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> updateProduct(
            @PathVariable Long id,
            @ModelAttribute Product product,
            @RequestPart(name = "file", required = false) MultipartFile file,
            @RequestParam(required = false) Long brand_id,
            @RequestParam(required = false) Long category_id) {
        try {
            Product existingProduct = productService.getById(id);
            if (existingProduct == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Product not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            Product updatedProduct = productService.update(file, existingProduct,product);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product updated successfully");
            response.put("product", new ProductDTO(updatedProduct));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product update failed");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> DeleteProductById(@PathVariable Long id) {
        try {
            Product product = productService.getById(id);
            if (product == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Product not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            boolean deleteStatus = productService.delete(product);
            Map<String, Object> response = new HashMap<>();
            response.put("message", deleteStatus);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to retrieve product");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
