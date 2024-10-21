package com.example.E_com_Product_Services.Repositories;

import com.example.E_com_Product_Services.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByUserId(Long userId);
}
