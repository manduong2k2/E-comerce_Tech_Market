import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../css/style.css";
import cartImage from "../images/cart.png";
import "../css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";


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
function setCookie(name, value, options = {}) {
  let exp = new Date();
  exp.setTime(exp.getTime() + (options.expires || 0));
  document.cookie = `${name}=${value};${options.path || "/"};${
    options.sameSite || ""
  };${exp.toUTCString()}`;
}
function removeCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}
function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(getCookie("token"));
  const [name, setName] = useState(getCookie("name"));
  const [image, setImage] = useState(getCookie("image"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    setToken(getCookie("token"));
    setName(getCookie("name"));
    setImage(getCookie("image"));
    if(token) setIsAdmin(jwtDecode(token).roles.some(role => role.id === 2));
    setIsLoggedIn(!!token);
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost/api/carts", {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        response.data.length !== 0 ?
        document.getElementById('num-cart').innerHTML= response.data.length
        : document.getElementById('num-cart').innerHTML=0;
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [location.pathname]); 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("name");
    removeCookie("image");
    setToken(""); 
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg background-radial-gradient">
      <div className="container-fluid">
        <button
          className="navbar-toggler icon-nav"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link
                id="home-nav"
                className="nav-link "
                aria-current="page"
                to="/"
              >
                Trang chủ
              </Link>
            </li>
            <li className="nav-item ">
              <Link id="introduce-nav" className="nav-link" to="/introduce">
                Giới thiệu
              </Link>
            </li>
            {/* <li className="nav-item ">
              <Link id="introduce-nav" className="nav-link" to="/introduce">
                Sản phẩm
              </Link>
            </li> */}
            {/* <li className="nav-item ">
              <Link
                id="contact-nav"
                className="nav-link"
                onClick="Contact(); changeActiveState('contact-nav')"
              >
                Liên hệ
              </Link>
            </li> */}
            {isLoggedIn && (
              <li className="nav-item ">
                <Link
                  id="contact-nav"
                  className="nav-link"
                  to='/product/add'
                >
                  Đăng bán
                </Link>
              </li>
            )}
            {isAdmin &&(
              <li className="danhmuc-dropdown nav-item dropdown">
              <a onClick={toggleDropdown} className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                Quản lý
              </a>
              {showDropdown && (
                <ul className="dropdown-menu drop2">
                  <li>
                    <Link to="/users">Tài khoản</Link>
                  </li>
                  <li>
                    <Link to="/products">Sản phẩm</Link>
                  </li>
                  <li>
                    <Link to="/brands">Nhãn hiệu</Link>
                  </li>
                  <li>
                    <Link to="/categories">Loại sản phẩm</Link>
                  </li>
                </ul>
              )}
            </li>
            )}
            {isLoggedIn && ( // Kiểm tra nếu đăng nhập mới hiển thị giỏ hàng
              <li className="nav-item" id="li-cart" style={{ width: "80px" }}>
                <Link className="nav-link" id="cart" to="/carts">
                  <img
                    src={cartImage}
                    title="Giỏ hàng"
                    style={{ height: "28px" }}
                  />
                </Link>
                <p id="num-cart"></p>
              </li>
            )}
            <li className="user-dropdown nav-item dropdown" id="log">
              {/* <div  style={{ display: "flex" }}> */}
              <button
                onClick={toggleDropdown}
                className="user-icon nav-link dropdown-toggle"
                id="account-nav"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {image ? ( // Check if image cookie exists
                  <img src={image} className="user-avatar" />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </button>
              {showDropdown && (
                <ul className="dropdown-menu drop1" id="drop1">
                  {token ? (
                    <>
                    <li>
                      <Link to="/user/manage">
                        Quản lý tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/products">
                        Quản lý sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link to="/order/history">
                        Lịch sử mua hàng
                      </Link>
                    </li>
                    <li>
                      <Link to="" onClick={handleLogout}>
                        Đăng xuất
                      </Link>
                    </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/signup">Đăng ký</Link>
                      </li>
                      <li>
                        <Link to="/login">Đăng nhập</Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
              {/* </div> */}
            </li>
          </ul>
        </div>
        {/* <Link to="/" className="site-title">
                Home
            </Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
