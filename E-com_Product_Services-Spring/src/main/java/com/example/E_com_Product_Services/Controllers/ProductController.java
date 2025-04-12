package com.example.E_com_Product_Services.Controllers;

import com.example.E_com_Product_Services.DTOs.ProductDTO;
import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Services.ProductService;
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
    private ProductService productService;

    @GetMapping
    public List<ProductDTO> showAllProducts() {
        try {
            return productService.getAll().stream().map(ProductDTO::fromProduct).collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProductById(@PathVariable Long id) {
        try {
            Product product = productService.getById(id);
            if (product == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Product not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product retrieved successfully");
            response.put("product", ProductDTO.fromProduct(product));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to retrieve product");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> addProduct(
            @ModelAttribute Product product,
            @RequestPart(name = "file", required = false) MultipartFile file,
            @RequestParam(required = false) Long brand_id,
            @RequestParam(required = false) Long category_id) {
        try {
            Product savedProduct = productService.saveWithDetails(file, product,brand_id,category_id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product added successfully");
            response.put("product", ProductDTO.fromProduct(savedProduct));
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
            Product updatedProduct = productService.updateWithDetails(file, existingProduct,product,brand_id,category_id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product updated successfully");
            response.put("product", ProductDTO.fromProduct(updatedProduct));
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
            String deleteStatus = productService.delete(product);
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
