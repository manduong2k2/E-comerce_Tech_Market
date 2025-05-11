package com.example.E_com_Category_Services.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.E_com_Category_Services.Middlewares.Authentication;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private Authentication myMiddleware;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myMiddleware)
                .addPathPatterns("/products/**"); //
    }
}

