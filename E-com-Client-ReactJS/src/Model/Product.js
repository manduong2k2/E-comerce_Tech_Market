import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import cartImage from "../images/cart2.png";
const Product = ({ product }) => {
  // Destructure product properties
  const { id, name, price, image, description, stock, brand, user } = product;

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

    if (!getCookie('token')) {
      alert('Xin vui lòng đăng nhập !');
      window.location.href = '/login';
    }
    else {
      if (window.confirm("Are you sure you want to add this item to cart") === true) {
        try {
          const response = await axios.post("http://localhost/api/cart/add/" + id, {}, {
            headers: {
              'Authorization': 'Bearer ' + getCookie('token')
            },
          }
          );
          if (response.status === 200) {
            alert('Product added to cart !');
          }
        } catch (error) {
          console.log('error: ' + error.response.data.message);
        }
      }
      const fetchCartItems = async () => {
        try {
          const response = await axios.get("http://localhost/api/carts", {
            headers: {
              Authorization: "Bearer " + getCookie("token"),
            },
          });
          document.getElementById('num-cart').innerHTML = response.data.length;
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItems();
    }
  };

  return (
    <div className="product-item" style={{ cursor: 'pointer', border: 'none' }}>
      <div className="row justify-content-center">
        {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
        <div className="card">
          <div className="card-header" style={{ backgroundColor: 'white', marginTop: 10 }}>
            <Link to={"/product/detail/" + id}>
            <img src={image} alt={name} className="card-img-top" style={{ width: "214px", height: "214px" }} />
            </Link>
          </div>
          <div className="card-body">
            <h4 className="card-title">{name}</h4>
            <p className="card-text price">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</p>
            <p className="card-text info">{user.fullname}</p>
          </div>
          <div className="card-footer clearfix">
            <div className="d-flex justify-content-between align-items-center">
              <form onSubmit={addToCart}>
                <button type="submit" className="btn btn-cart" >
                  <img src={cartImage} alt="Cart" style={{ width: '20px', height: '20px' }} />
                </button>
              </form>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Product;