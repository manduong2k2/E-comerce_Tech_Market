import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditCategory = () => {
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost/api/category/" + id, {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((response) => {
        setName(response.data.category.name);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      const response = await axios.post("http://localhost/api/category/edit/" + id, formData, {
        headers: {
          'Authorization': 'Bearer ' + getCookie('token')
        },
      });
      if(response.status===200){
        alert(response.data.message);
        navigate('/categories');
      }
      else{
        alert(response.data.message);
      }

      // Xử lý phản hồi từ backend ở đây
    } catch (error) {
      setError("Failed to update category. Please try again.");
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card" style={{ margin: "30px" }}>
          <div className="card-body">
            <h1>Chỉnh sửa loại sản phẩm</h1>
            <form onSubmit={handleUpdateCategory}>
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
              {error && (
                <div style={{ color: "red" }} className="alert alert-danger">
                  {error}
                </div>
              )}
              <div className="form-group" style={{ margin: "30px" }}>
                <button
                  style={{ marginRight: "60px" }}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Xác nhận
                </button>
                <Link to="/categories" className="btn btn-secondary btn-block">
                  Huỷ
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
