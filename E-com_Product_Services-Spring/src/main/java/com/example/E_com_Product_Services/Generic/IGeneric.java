package com.example.E_com_Product_Services.Generic;


public interface IGeneric<ID> {
    public Long getId();
    public String getName();
    public String getType();
    public void setImage(String url);
    public String getImage();
}
