import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate,useLocation } from "react-router-dom";
const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const location = useLocation();
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
  const Delete = async (id) => {
    const result = window.confirm("Bạn có chắc muốn xoá nhãn hiệu này không?");
    if (result) {
      try {
        const response = await axios.delete("http://localhost/api/brand/delete/" + id, {}, {
          headers: {
            'Authorization': 'Bearer ' + getCookie('token')
          },
        });
        if (response.status === 200) {
          alert('Xoá nhãn hiệu thành công !');
          window.location.href = '/brands'
        }
        else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost/api/brands", {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      })
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error.response.data.error);
      });
  }, []);
  return (
    <div className="container form-container">
      <h2>Danh sách nhãn hiệu</h2>
      <Link className="btn-add btn btn-primary" to="/brand/add">Thêm nhãn hiệu</Link>
      <table border="1">
        <thead>
          <tr>
            <th>Mã nhãn hiệu</th>
            <th>Tên nhãn hiệu</th>
            <th>Ảnh</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr>
              <td>{brand.id} </td>
              <td>{brand.name}</td>
              <td>
                <img src={brand.image} height={90} width={90} border="1px solid #ccc" />
              </td>
              <td>{brand.description}</td>
              <td>
                <div className="form-group">
                    <Link style={{ margin: 20 }} className="btn btn-primary btn-lock" to={'/brand/edit/' + brand.id}>Sửa</Link>
                  <button className="btn btn-danger btn-block" onClick={() => Delete(brand.id)}>Xoá</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandList;