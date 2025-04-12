package com.example.E_com_Product_Services.Generic;

import com.example.E_com_Product_Services.Utils.FileUploadUtil;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public class GenericService<T extends IGeneric<ID>,ID> implements IGenericService<T,ID>{
    @Autowired
    protected IGenericRepository<T, ID> repository;

    @Override
    public List<T> getAll() {
        System.out.println("Get All request recieved");
        return repository.findAll();
    }

    @Override
    public T getById(ID id) {
        Optional<T> entity = repository.findById(id);
        return entity.isEmpty() ? null : entity.get();
    }

    @Override
    public T save(MultipartFile file, T entity) {
        repository.save(entity);
        if(file!=null && !file.isEmpty()){
            try{
                String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());
                String fileName = String.valueOf(entity.getId())+'.'+fileExt;
                String uploadDir = "src/main/resources/static/img/"+entity.getType();
                FileUploadUtil.saveFile(uploadDir,fileName,file);
                entity.setImage("img/"+entity.getType()+"/"+entity.getId()+'.'+fileExt);
                repository.save(entity);
            }
            catch (IOException e){
                System.out.println(e.getMessage());
            }
        }
        return entity;
    }

    @Override
    public String delete(T entity) {
        try{
            FileUploadUtil.deleteFile(entity.getImage());
            repository.delete(entity);
            return "Delete successfully";
        }catch (IOException e){
            return "Delete failed: " + e.getMessage();
        }
    }
}
