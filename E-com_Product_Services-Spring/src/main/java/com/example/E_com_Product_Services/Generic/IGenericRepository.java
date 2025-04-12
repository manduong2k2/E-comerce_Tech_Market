package com.example.E_com_Product_Services.Generic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean  // Chỉ định rằng interface này không tạo bean cụ thể
public interface IGenericRepository<T extends IGeneric<ID>, ID> extends JpaRepository<T, ID> {
    // Nếu cần, bạn có thể thêm các phương thức chung ở đây
}

