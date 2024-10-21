import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditBrand = () => {
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost/api/brand/" + id, {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((response) => {
        setName(response.data.brand.name);
        setImage(response.data.brand.image);
        setDescription(response.data.brand.description);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error.response);
      });
  }, []);

  const handleImagePreviewClick = () => {
    document.getElementById("brandImage").click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("imagePreview").src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const [name, setName] = useState('');
  var [image, setImage] = useState('');
  const [description, setDescription] = useState('');
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
  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    try {
      image = document.getElementById('brandImage').files[0];
      const formData = new FormData();
      formData.append('name', name);
      if (image)
        formData.append('image', image);
      formData.append('description', description);
      const response = await axios.post("http://localhost/api/brand/edit/" + id,formData, {
        headers: {
          "Content-Type":'multipart/form-data',
          Authorization: 'Bearer ' + getCookie('token')
        },
      });
      if(response.status===200){
        console.log(response.data.request);
        window.location.href='/brands'
      }
      else{
        alert(response.data.message);
      }
    } catch (error) {
      setError("Failed to update brand. Please try again.");
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card" style={{ margin: "30px" }}>
          <div className="card-body">
            <h1>Chỉnh sửa nhãn hiệu</h1>
            <form onSubmit={handleUpdateBrand}>
              <div className="form-group">
                <label htmlFor="name">Tên loại nhãn hiệu:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Ảnh:</label>
                <img
                  src={image}
                  id="imagePreview"
                  height={90}
                  width={90}
                  style={{ cursor: "pointer" }}
                  onClick={handleImagePreviewClick}
                />
                <input onChange={handleImageChange} type="file" id="brandImage" style={{ display: "none" }} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả:</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <Link to="/brands" className="btn btn-secondary btn-block">
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

export default EditBrand;
