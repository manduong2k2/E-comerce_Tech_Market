package com.example.E_com_Product_Services.Entities;


import com.example.E_com_Product_Services.Generic.IGeneric;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Product implements IGeneric<Long> {
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

    @Column(name = "image")
    @Size(max = 200, message = "image must be less than 200 characters")
    private String image;

    private Long user_id;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="brand_id",referencedColumnName = "id")
    @JsonBackReference
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="category_id",referencedColumnName = "id" )
    private Category category;

    @Override
    public void setImage(String url) {
        this.image = url;
    }

    @Override
    public String getType(){
        return "Product";
    }

    @Override
    public Long getId(){
        return id;
    }
    @Override
    public String getImage(){
        return image;
    }
}
