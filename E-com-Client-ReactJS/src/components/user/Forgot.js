// src/components/Login.js

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
const Forgot = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState([]);
  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/api/user/forgot/'+email, {
      });
      console.log(response)
      if (response.status==200) {
          alert("Đã gửi mật khẩu mới tới email của bạn, vui lòng đăng nhập và thay đổi mật khẩu!");
          window.location.href = "login";

        } else {
          setError('Email không tồn tại. Làm ơn thử lại.');
          console.log('Login failed:', response.data);
        }
      
  } catch (error) {
      setError('Email không tồn tại. Làm ơn thử lại.');
      console.log(error);
  }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Chào mừng bạn đến với <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>E-Com</span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              E-Com Website cao cấp hàng đầu tại Việt Nam.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass">
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className="card-body px-4 py-5 px-md-5"
              >
                <form onSubmit={handleForgot}>
                  <h1 className="mb-3 h3 text-center">Quên mật khẩu</h1>
                  <div className="form-outline mb-4">
                    <input
                      name="email"
                      id="form3Example3"
                      placeholder="Username hoặc email"
                      required
                      className="form-control"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                  <button
                    className="btn btn-primary btn-block mx-auto d-block mb-4"
                    type="submit"
                  >
                    Xác nhận
                  </button>
                  <div className="text-center">
                    <p>
                      <a href="/login">Quay lại</a>
                    </p>
                  </div>
                  <div className="text-center">
                    <p>
                      Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
