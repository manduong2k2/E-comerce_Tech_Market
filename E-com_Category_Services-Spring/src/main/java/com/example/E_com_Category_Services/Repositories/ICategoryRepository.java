package com.example.E_com_Category_Services.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.E_com_Category_Services.Entities.Category;

public interface ICategoryRepository extends JpaRepository<Category,Long> {
}
