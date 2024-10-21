import React, { useState, useEffect } from "react";
import axios from "axios";
import ship from "../../images/ship.jpg";
import uytin from "../../images/uytin.jpg";
import { Link,useNavigate,useParams  } from "react-router-dom";
const ProductDetail = () => {
  const { id } = useParams(); // Lấy id sản phẩm từ URL

  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState("");
  function getCookie(name) {
    const value = `; `;
    const parts = document.cookie.split(value);
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].split('=');
        if (part.length === 2 && name === part[0]) {
            return part[1];
        }
    }
    return '';
  }
  const addToCart = async (e) => {
    
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost/api/cart/add/"+id,{}, {
          headers: {
            'Authorization':'Bearer '+ getCookie('token')
          },
        }
      );
      if(response.status===200){
        alert('Product added to cart !');
      }
      
    } catch (error) {
      console.log('error: '+error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost/api/products/" + id
        );
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]); // Sử dụng id trong dependency array để cập nhật khi id thay đổi

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div style={{ marginLeft: "20px" }}>
      <hr />
      <h1 style={{ textDecoration: "underline" }}>{product.name}</h1>
      <div className="detail" style={{ display: "flex" }}>
        <div className="left" style={{ width: "60%" }}>
          <img src={product.image} alt="Hình ảnh" style={{ width: "50%" }} />
        </div>
        <div className="right" style={{ width: "40%", marginTop: "5%" }}>
          <h4 style={{ color: "orangered", fontSize: "30px" }}>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
          </h4>
          <p style={{ fontSize: "18px", width: "100%" }}>
            Loại sản phẩm: {product.category.name}
          </p>
          <p style={{ fontSize: "18px", width: "100%" }}>
            Nhãn hiệu: {product.brand.name}
          </p>
          <p style={{ fontSize: "18px", width: "100%" }}>
            Mô tả: {product.description}
          </p>
          <div className="button" style={{display:"flex", justifyContent: "center"}}>
            <Link
              className="btn btn-primary"
              style={{marginRight:"20px"}}
              to="/"
            >
              Quay lại
            </Link>
            {/* <%if(product.stock > 0){%> */}
            <form onSubmit={addToCart}>
                <button type="submit" className="btn btn-info" onClick={() => window.confirm('Are you sure you want to add this item to cart?')}>
                  Thêm vào giỏ hàng
                </button>
            </form>
          </div>
        </div>
      </div>
      <br />
  <p style={{fontSize:"16px", width:"100%"}}>

    <span><img src={uytin} width="30px"/></span>
    Hàng chính hãng - Bảo hành 12 Tháng
    <span><img src={ship} width="30px"/></span>
    Giao hàng toàn quốc
  </p>
    </div>
  );
};

export default ProductDetail;
