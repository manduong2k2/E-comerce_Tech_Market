package com.example.E_com_Product_Services.Entities;

import com.example.E_com_Product_Services.Generic.IGeneric;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.Nationalized;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "brand")
@AllArgsConstructor
@NoArgsConstructor
public class Brand implements IGeneric<Long> {
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

    @OneToMany(mappedBy = "brand")
    private List<Product> products = new ArrayList<>();


    @Override
    public String getType(){
        return "Brand";
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
