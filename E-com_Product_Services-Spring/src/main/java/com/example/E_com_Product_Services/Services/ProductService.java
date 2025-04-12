package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Interfaces.IBrandService;
import com.example.E_com_Product_Services.Interfaces.ICategoryService;
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
    @Autowired
    private IBrandService brandService;
    @Autowired
    private ICategoryService categoryService;

    public ProductService(IProductRepository productRepository,IBrandService brandService,ICategoryService categoryService) {
        this.repository = productRepository;
        this.brandService =brandService;
        this.categoryService = categoryService;
    }

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
                        if (!p.getDescription().contains(value.toLowerCase())) return false;
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
    public Product save(MultipartFile file, Product product, Long brand_id, Long category_id){
        if (brand_id != null) {
            product.setBrand(brandService.getById(brand_id));
        }
        if (brand_id != null) {
            product.setCategory(categoryService.getById(category_id));
        }
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
    public Product update(MultipartFile file, Product product,Product newProduct, Long brand_id, Long category_id){
        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setPrice(newProduct.getPrice());
        product.setStock(newProduct.getStock());
        if (brand_id != null) {
            product.setBrand(brandService.getById(brand_id));
        }
        if (brand_id != null) {
            product.setCategory(categoryService.getById(category_id));
        }
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
