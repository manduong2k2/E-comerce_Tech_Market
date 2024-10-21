// src/components/ChangePassword.js

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/api/user/changePassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        alert("Đổi mật khẩu thành công");
        navigate("/user/manage");
      } else {
        setError("Invalid email or password. Please try again.");
        console.log("Login failed:", response.data);
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
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
                <form onSubmit={handleChangePassword}>
                  <h1 className="mb-3 h3 text-center">Đổi mật khẩu</h1>
                  <div className="form-outline mb-4">
                    <input
                      name="oldPassword"
                      id="form3Example3"
                      placeholder="Mật khẩu cũ"
                      required
                      className="form-control"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      name="newPassword"
                      id="form3Example4"
                      className="form-control"
                      placeholder="Mật khẩu mới"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                  <button
                    className="btn btn-primary btn-block mx-auto d-block mb-4"
                    type="submit"
                  >
                    Đổi mật khẩu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
