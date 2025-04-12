package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Brand;
import com.example.E_com_Product_Services.Interfaces.IBrandService;
import com.example.E_com_Product_Services.Repositories.IBrandRepository;
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
public class BrandService implements IBrandService{

    @Autowired
    protected IBrandRepository repository;

    public BrandService(IBrandRepository brandRepository) {
        this.repository = brandRepository;
    }
    @Override
    public List<Brand> getAll(){
        return repository.findAll();
    }

    @Override
    public List<Brand> getFiltered(Map<String, String> filters) {
        List<Brand> filteredBrands = repository.findAll().stream().filter(p -> {
            for (Map.Entry<String, String> entry : filters.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                switch (key) {
                    case "name":
                        if (!p.getName().toLowerCase().contains(value))
                            return false;
                        break;
                    case "description":
                        if (!p.getDescription().contains(value))
                            return false;
                        break;
                    default:
                        break;
                }
            }
            return true;
        }).collect(Collectors.toList());
        return filteredBrands;
    }
    @Override
    public Brand getById(Long id) {
        Optional<Brand> brand = repository.findById(id);
        return brand.isEmpty() ? null : brand.get();
    }
    @Override
    public Brand save(MultipartFile file, Brand brand) {
        repository.save(brand);
        if (file != null && !file.isEmpty()) {
            try {
                String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
                String fileName = String.valueOf(brand.getId()) + '.' + fileExt;
                String uploadDir = "src/main/resources/static/img/" + brand.getClass();
                FileUploadUtil.saveFile(uploadDir, fileName, file);
                brand.setImage("img/" + brand.getClass() + "/" + brand.getId() + '.' + fileExt);
                repository.save(brand);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        return brand;
    }
    @Override
    public Brand update(MultipartFile file, Brand brand, Brand newBrand) {
        brand.setName(newBrand.getName());
        brand.setDescription(newBrand.getDescription());
        if (file != null && !file.isEmpty()) {
            try {
                String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
                String fileName = String.valueOf(brand.getId()) + '.' + fileExt;
                String uploadDir = "src/main/resources/static/img/" + brand.getClass();
                FileUploadUtil.saveFile(uploadDir, fileName, file);
                brand.setImage("img/" + brand.getClass() + "/" + brand.getId() + '.' + fileExt);
                repository.save(brand);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        return repository.save(brand);
    }
    @Override
    public boolean delete(Brand brand) {
        try {
            FileUploadUtil.deleteFile(brand.getImage());
            repository.delete(brand);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
