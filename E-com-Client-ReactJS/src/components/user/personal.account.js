// src/components/SignUp.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate,useLocation } from "react-router-dom";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const PersonalAccount = () => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
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

  useEffect(() => {
    axios
      .get("http://localhost/api/user", {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      })
      .then((response) => {
        setUsername(response.data.user.username);
        setFullName(response.data.user.fullname);
        setImage(response.data.user.image);
        setEmail(response.data.user.email);
        setAddress(response.data.user.address);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [location.pathname]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const accImage = document.getElementById("accImage").files[0];
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("image", accImage);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    try {
      const response = await axios.post(
        "http://localhost/api/user/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + getCookie('token')
          },
        }
      );
      window.location.href = "/user/manage";
      if (response.status === 200) {
        alert("Cập nhật thông tin thành công!");
      }
      console.log("Message : " + response);
    } catch (error) {
      console.log("error: " + error.response.status);
    }
  };

  return (
    <form onSubmit={handleEdit}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
          id="formContain"
        >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="form-group"
      >
        <h1>Thông tin tài khoản</h1>
        {image ? ( // Check if image cookie exists
          <img
            style={{
              height: "300px",
              width: "300px",
              borderRadius: "60px",
              margin: "30px 0",
            }}
            src={image}
            className="user-avatar"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
        <div className="form-outline mb-4">
          <label style={{ color: "#000" }}>Image: </label>
          <input style={{ color: "#000" }} type="file" id="accImage" />
        </div>
      </div>
      <div style={{ width: "600px", margin: "100px 0 0 0" }} id="accountForm">
        <div id="editAccountInfo">
          <div className="form-group">
            <label htmlFor="accountName">Họ và tên:</label>
            <input
              type="text"
              className="form-control"
              required
              readOnly
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountUsername">Username:</label>
            <input type="hidden" id="accountId" value="<%=data.id%>" />
            <input
              type="text"
              value={username}
              className="form-control"
              required
              readOnly
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountEmail">Email:</label>
            <input
              type="text"
              className="form-control"
              required
              readOnly
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountAddress">Địa chỉ:</label>
            <input
              type="text"
              className="form-control"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Link to={'/user/changePassword'} className="btn btn-primary">Đổi mật khẩu</Link>
          <button type="submit" className="btn btn-success" style={{margin: "30px"}}>
              Hoàn tất
            </button>
        </div>
      </div>
    </div>
      </form>
  );
};

export default PersonalAccount;

