import React, { useState,useEffect  } from "react";
import axios from "axios";
import { Link,useNavigate  } from "react-router-dom";
import cartImage from "../images/cart2.png";
const User = ({ user }) => {
  // Destructure product properties
  const { id, username, fullname, image,email } = user;

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

  return (
    <div className="user-item" style={{cursor: 'pointer', border:'none'}}>
      <div className="row justify-content-center">
    {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
      <div className="card">
        <div className="card-header">
          <img src={image} alt={name} className="card-img-top" style={{width: "214px", height: "214px"}} />
        </div>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text price">{price} VNĐ</p>
          <p className="card-text info">{user.fullname}</p>
        </div>
        <div className="card-footer clearfix">
          <div className="d-flex justify-content-between align-items-center">
          <form onSubmit={addToCart}>
                <button type="submit" className="btn btn-cart" onClick={() => window.confirm('Are you sure you want to add this item to cart?')}>
                <img src={cartImage} alt="Cart" style={{width: '20px', height: '20px'}}/>
                </button>
            </form>
            <div>
              <a href="#" className="btn btn-cart">Thông tin</a>
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  </div>
      
    </div>
  );
};

export default User;