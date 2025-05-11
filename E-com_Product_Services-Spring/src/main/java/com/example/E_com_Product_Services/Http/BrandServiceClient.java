package com.example.E_com_Product_Services.Http;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.E_com_Product_Services.Entities.Brand;

@Service
public class BrandServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    private final String BRAND_SERVICE_URL = "http://localhost:8081/api/brands"; 

    public Brand getBrandById(Long brandId) {
        String url = BRAND_SERVICE_URL + "/" + brandId;
        return restTemplate.getForObject(url, Brand.class);
    }
}
