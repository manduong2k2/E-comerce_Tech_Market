import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate  } from "react-router-dom";
const AddCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
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
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    try {
      const response = await axios.post(
        "http://localhost/api/category/create", formData ,{
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization':'Bearer '+ getCookie('token')
          },
        }
      );
      // Xử lý phản hồi từ backend ở đây (ví dụ: lưu token vào localStorage)
      navigate('/categories');
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div style={{margin: '30px'}}>
          <div>
            <h1>Thêm Loại sản phẩm</h1>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="name">Tên loại sản phẩm:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {error && <div style={{color: 'red'}} className="alert alert-danger">{error}</div>}
             <div className="form-group" style={{margin: '30px'}}>
               <button style={{marginRight: '60px'}} type="submit" className="btn btn-primary btn-block">
                Xác nhận
              </button>
              <Link to="/categories" className="btn btn-secondary btn-block">
                Hủy
              </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
