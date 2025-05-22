package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Interfaces.IProductService;
import com.example.E_com_Product_Services.Repositories.IProductRepository;
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
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository repository;

    @Override
    public List<Product> getAll(){
        return repository.findAll();
    }

    @Override
    public List<Product> getFiltered(Map<String, String> filters){
        List<Product> filteredProducts = repository.findAll().stream().filter(p-> {
            for (Map.Entry<String, String> entry : filters.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                switch (key) {
                    case "name":
                        if (!p.getName().toLowerCase().contains(value.toLowerCase())) return false;
                        break;
                    case "description":
                        if (!p.getDescription().toLowerCase().contains(value.toLowerCase())) return false;
                        break;
                        case "priceMin":
                        try {
                            double minPrice = Double.parseDouble(value);
                            if (p.getPrice() < minPrice) return false;
                        } catch (NumberFormatException e) {
                            return false; 
                        }
                        break;
                    case "priceMax":
                        try {
                            double maxPrice = Double.parseDouble(value);
                            if (p.getPrice() > maxPrice) return false;
                        } catch (NumberFormatException e) {
                            return false;
                        }
                        break;
                    default:
                        break;
                }
            }
            return true;
        }).collect(Collectors.toList());
        return filteredProducts;
    }
    @Override
    public Product getById(Long id) {
        Optional<Product> product = repository.findById(id);
        return product.isEmpty() ? null : product.get();
    }
    @Override
    public Product save(MultipartFile file, Product product){
        repository.save(product);
        if (file != null && !file.isEmpty()) {
            try {
                String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
                String fileName = String.valueOf(product.getId()) + '.' + fileExt;
                String uploadDir = "src/main/resources/static/img/products";
                FileUploadUtil.saveFile(uploadDir, fileName, file);
                product.setImage("img/products/" + product.getId() + '.' + fileExt);
                repository.save(product);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        return product;
    }
    @Override
    public Product update(MultipartFile file, Product product,Product newProduct){
        if(newProduct.getName() !=null) product.setName(newProduct.getName());
        if(newProduct.getDescription() !=null) product.setDescription(newProduct.getDescription());
        if(newProduct.getPrice() !=null) product.setPrice(newProduct.getPrice());
        if(newProduct.getStock() !=null) product.setStock(newProduct.getStock());
        if(newProduct.getBrand_id() !=null) product.setBrand_id(newProduct.getBrand_id());
        if(newProduct.getCategory_id() !=null) product.setCategory_id(newProduct.getCategory_id());
        if (file != null && !file.isEmpty()) {
            try {
                String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
                String fileName = String.valueOf(product.getId()) + '.' + fileExt;
                String uploadDir = "src/main/resources/static/img/products";
                FileUploadUtil.saveFile(uploadDir, fileName, file);
                product.setImage("img/products/" + product.getId() + '.' + fileExt);
                repository.save(product);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        return repository.save(product);
    }
    @Override
    public boolean delete(Product product) {
        try {
            FileUploadUtil.deleteFile(product.getImage());
            repository.delete(product);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    

}
