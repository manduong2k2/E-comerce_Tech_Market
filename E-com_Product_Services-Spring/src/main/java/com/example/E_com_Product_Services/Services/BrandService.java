package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Brand;
import com.example.E_com_Product_Services.Generic.GenericService;
import com.example.E_com_Product_Services.Repositories.IBrandRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BrandService extends GenericService<Brand,Long> {
    public BrandService(IBrandRepository brandRepository){
        this.repository = brandRepository;
    }
    public Brand update(MultipartFile file, Brand brand,Brand newBrand){
        brand.setName(newBrand.getName());
        brand.setDescription(newBrand.getDescription());
        return save(file, brand);
    }
}
