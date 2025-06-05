package com.example.E_com_Product_Services.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.E_com_Product_Services.Entities.Brand;

import reactor.core.publisher.Mono;

@Service
public class ApiService {

    @Autowired
    private WebClient webClient;

    public String getData(String port, String prefix, String url) {
        return webClient.get()
                .uri("http://localhost:" + port + "/" + prefix + "/" + url)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
