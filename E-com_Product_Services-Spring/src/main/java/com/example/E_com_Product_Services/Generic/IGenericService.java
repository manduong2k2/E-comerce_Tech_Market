package com.example.E_com_Product_Services.Generic;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IGenericService<T, ID> {
    public List<T> getAll();
    public T getById(ID id);
    public T save(MultipartFile file, T entity);
    public String delete(T entity);
}

