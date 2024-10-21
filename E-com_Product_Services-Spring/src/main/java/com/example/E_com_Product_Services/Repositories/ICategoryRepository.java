package com.example.E_com_Product_Services.Repositories;

import com.example.E_com_Product_Services.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category,Long> {
}
