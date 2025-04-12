package com.example.E_com_Product_Services.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.E_com_Product_Services.Entities.Product;


public interface IProductRepository extends JpaRepository<Product,Long> {
}
