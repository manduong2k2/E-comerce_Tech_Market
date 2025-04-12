package com.example.E_com_Product_Services.Interfaces;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.example.E_com_Product_Services.Entities.Brand;

public interface IBrandService {
    public List<Brand> getAll();
    public List<Brand> getFiltered(Map<String, String> filters);
    public Brand getById(Long id);
    public Brand save(MultipartFile file, Brand brand);
    public Brand update(MultipartFile file, Brand brand,Brand newBrand);
    public boolean delete(Brand brand);
}
