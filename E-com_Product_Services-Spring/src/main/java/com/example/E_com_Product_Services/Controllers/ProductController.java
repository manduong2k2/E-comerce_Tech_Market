package com.example.E_com_Product_Services.Controllers;

import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> showAllProducts(){
        return productService.getAllProducts();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String,Object>> addProduct(@ModelAttribute Product product , @RequestPart("file") MultipartFile file){
        try{
            Product savedProduct = productService.addProduct(file,product);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product added successfully");
            response.put("product", savedProduct);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product added failed");
            response.put("Error: ", e);
            return ResponseEntity.ok(response);
        }
    }
}
