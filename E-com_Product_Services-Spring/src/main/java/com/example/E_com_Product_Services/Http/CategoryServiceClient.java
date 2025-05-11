package com.example.E_com_Product_Services.Http;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.E_com_Product_Services.Entities.Category;

@Service
public class CategoryServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    private final String CATEGORY_SERVICE_URL = "http://localhost:8082/api/categories"; 

    public Category getCategoryById(Long categoryId) {
        String url = CATEGORY_SERVICE_URL + "/" + categoryId;
        return restTemplate.getForObject(url, Category.class);
    }
}
