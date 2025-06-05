package com.example.E_com_Product_Services.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.Nationalized;

@Data
@Entity
@Table(name="product")
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Lob
    @Nationalized
    @Column(name = "name")
    private String name;

    @Lob
    @Nationalized
    @Column(name = "description")
    private String description;

    @Column(name = "price")
    @NotNull(message = "Price is required")
    private Double price;

    @Column(name = "stock")
    @NotNull(message = "Stock is required")
    private Long stock;

    @Column(name = "brand_id")
    @NotNull(message = "Brand Id is required")
    private Long brand_id;

    @Column(name = "category_id")
    @NotNull(message = "Category Id is required")
    private Long category_id;

    @Column(name = "image")
    @Size(max = 200, message = "image must be less than 200 characters")
    private String image;

    private Long user_id;
    
    @Transient
    private Brand brand;

    @Transient
    private Category category;

}
