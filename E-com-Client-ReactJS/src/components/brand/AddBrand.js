import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate  } from "react-router-dom";


const AddBrand = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
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
    if(image) formData.append('image', image);
    formData.append('description', description);
    try {
      const response = await axios.post(
        "http://localhost/api/brand/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization':'Bearer '+ getCookie('token')
          },
        }
      );
      navigate("/brands");
      // Xử lý phản hồi từ backend ở đây (ví dụ: lưu token vào localStorage)
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div  style={{margin: '30px'}}>
          <div>
            <h1>Thêm nhãn hiệu</h1>
            <form onSubmit={handleSignup}>
              <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
                <label htmlFor="name" style={{width:"30%"}}>Tên nhãn hiệu:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
                <label htmlFor="image" style={{width:"23%"}}>Ảnh:</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
                <label htmlFor="description" style={{width:"30%"}}>Mô tả:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {error && <div style={{color: 'red'}} className="alert alert-danger">{error}</div>}
             <div className="form-group" style={{margin: '30px'}}>
               <button style={{marginRight: '60px'}} type="submit" className="btn btn-primary btn-block">
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

export default AddBrand;
