package com.example.E_com_Product_Services.Services;

import com.example.E_com_Product_Services.Entities.Product;
import com.example.E_com_Product_Services.Repositories.IProductRepository;
import com.example.E_com_Product_Services.Utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private IProductRepository productRepository;
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(Long id){
        Optional<Product> optional = productRepository.findById(id);
        return optional.orElse(null);
    }

    public List<Product> getProductsByUserId(Long user_id){
        return productRepository.findByUserId(user_id);
    }

    public Product addProduct(MultipartFile file,Product product){
        productRepository.save(product);
        if(!file.isEmpty()){
            try{
                String fileName = String.valueOf(product.getId());
                String uploadDir = "src/main/resources/static/img/product-photos/" ;
                FileUploadUtil.saveFile(uploadDir,fileName,file);
                product.setImage("img/product-photos/"+product.getId()+".jpg");
                productRepository.save(product);
            }
            catch (IOException e){
                System.out.println(e.getMessage());
            }
        }
        return product;
    }
}
