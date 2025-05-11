package com.example.E_com_Brand_Services.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.E_com_Brand_Services.Entities.Brand;

public interface IBrandRepository extends JpaRepository<Brand,Long> {
}
