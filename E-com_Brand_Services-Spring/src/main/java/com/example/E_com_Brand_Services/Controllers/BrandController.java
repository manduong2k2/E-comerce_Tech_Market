package com.example.E_com_Brand_Services.Controllers;

import com.example.E_com_Brand_Services.DTOs.BrandDTO;
import com.example.E_com_Brand_Services.Entities.Brand;
import com.example.E_com_Brand_Services.Interfaces.IBrandService;

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
@RequestMapping("/api/brands")
public class BrandController {
    @Autowired
    private IBrandService brandService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> showAllCategories(@RequestParam(required = false) Map<String, String> filters){
        try{
            List<BrandDTO> filterdBrands ;
            if(filters.isEmpty()) filterdBrands = brandService.getAll().stream().map(BrandDTO::new).collect(Collectors.toList());
            filterdBrands = brandService.getFiltered(filters).stream().map(BrandDTO::new).collect(Collectors.toList());
            Map<String, Object> response = new HashMap<>();
            response.put("brands", filterdBrands);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBrandById(@PathVariable Long id) {
        try {
            Brand brand = brandService.getById(id);
            if (brand == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Brand not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Brand retrieved successfully");
            response.put("product",new BrandDTO(brand));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to retrieve brand");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String,Object>> addBrand(@ModelAttribute Brand brand , @RequestPart(name = "file" , required = false) MultipartFile file){
        try{
            Brand savedBrand = brandService.save(file,brand);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Brand added successfully");
            response.put("brand", new BrandDTO(savedBrand));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Brand added failed");
            response.put("Error: ", e.getMessage());
            return ResponseEntity.ok(response);
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> updateProduct(
            @PathVariable Long id,
            @RequestBody Brand brand,
            @RequestPart(name = "file", required = false) MultipartFile file) {
        try {
            Brand existingBrand = brandService.getById(id);
            if (existingBrand == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Brand not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            Brand updatedBrand = brandService.update(file,existingBrand,brand);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Brand updated successfully");
            response.put("brand", new BrandDTO(updatedBrand));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Brand update failed");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> DeleteBrandById(@PathVariable Long id) {
        try {
            Brand brand = brandService.getById(id);
            if (brand == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Brand not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            Boolean deleteStatus = brandService.delete(brand);
            Map<String, Object> response = new HashMap<>();
            response.put("message", deleteStatus);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed to delete brand");
            response.put("Error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
