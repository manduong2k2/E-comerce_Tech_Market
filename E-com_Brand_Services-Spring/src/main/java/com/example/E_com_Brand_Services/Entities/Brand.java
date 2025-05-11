package com.example.E_com_Brand_Services.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Nationalized;

@Data
@Entity
@Table(name = "brand")
@AllArgsConstructor
@NoArgsConstructor
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

    @Transient
    private List<Product> products = new ArrayList<Product>();

}
