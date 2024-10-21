package com.example.E_com_Product_Services.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Lob
    @Column(name = "name")
    @NotEmpty(message = "Name must not be empty")
    @Nationalized
    private String name;

    @Lob
    @Column(name = "description")
    @NotEmpty(message = "Description must not be empty")
    @Nationalized
    private String description;

    @Column(name = "image")
    @Size(max = 200, message = "Image must be less than 200 characters")
    private String image;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Product> products = new ArrayList<>();
}
