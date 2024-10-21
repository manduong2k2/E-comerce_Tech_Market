import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  function getCookie(name) {
    const value = `; `;
    const parts = document.cookie.split(value);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].split("=");
      if (part.length === 2 && name === part[0]) {
        return part[1];
      }
    }
    return "";
  }
  const Delete = async (id) => {
    const result = window.confirm("Bạn có chắc muốn xoá sản phẩm này không?");
    if (result) {
      try {
        const response = await axios.delete(
          "http://localhost/api/product/delete/" + id,
          {},
          {
            headers: {
              Authorization: "Bearer " + getCookie("token"),
            },
          }
        );
        if (response.status === 200) {
          alert("Xoá sản phẩm thành công !");
          window.location.href = "/products";
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost/api/user/products", {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      })
      .then((response) => {
        const { data } = response;
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Invalid data received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  
  return (
    <div>
      {products.length === 0 ? (
        <div className="container text-center text-black">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h3 className="mt-5">Bạn chưa đăng gì hết</h3>
            <p className="lead" style={{margin: "30px auto"}}>
              Hãy đến mục đăng bài và đăng những gì bạn muốn &#128538;
            </p>
            <Link to="/product/add" className="btn btn-primary" style={{margin: "10px auto"}}
              >Đến trang đăng sản phẩm</Link>
          </div>
        </div>
      </div>
      ) : (
        <div className="container form-container">
          <h2>Quản lý sản phẩm</h2>
          <table className="table table-striped projects">
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th style={{ width: "15%" }}>Tên sản phẩm</th>
                <th>Số lượng tồn</th>
                <th>Giá</th>
                <th>Ảnh</th>
                <th style={{ width: "30%" }}>Mô tả</th>
                <th>Loại</th>
                <th>Nhãn hiệu</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>{product.id} </td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
                  </td>
                  <td>
                    <img
                      src={product.image}
                      height={90}
                      width={90}
                      border="1px solid #ccc"
                    />
                  </td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td>{product.brand.name}</td>
                  <td>
                    <div className="form-group">
                      <Link
                        style={{ margin: 20 }}
                        className="btn btn-primary btn-lock"
                        to={"/product/edit/" + product.id}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => Delete(product.id)}
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
