package com.example.E_com_Product_Services.Entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

@Data
@Entity
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue
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

    @Column(name = "image")
    @Size(max = 200, message = "image must be less than 200 characters")
    private String image;

    @ManyToOne
    @JoinColumn(name="brand_id",referencedColumnName = "id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name="category_id",referencedColumnName = "id")
    private Category category;

    private Long userId;
}
