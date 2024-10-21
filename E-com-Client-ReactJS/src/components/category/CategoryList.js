import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
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
  const Delete = async (id) => {
    const result = window.confirm(
      "Bạn có chắc muốn xoá loại sản phẩm này không?"
    );
    if (result) {
      try {
        const response = await axios.delete(
          "http://localhost/api/category/delete/" + id,
          {},
          {
            headers: {
              Authorization: "Bearer " + getCookie("token"),
            },
          }
        );
        if (response.status === 200) {
          alert("Xoá loại sản phẩm thành công !");
          window.location.href = "/categories";
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost/api/categories", {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.response.data.error);
      });
  }, []);
  return (
    <div className="container form-container">
      <h2>Danh sách loại sản phẩm</h2>
        <Link className="btn-add btn btn-primary" to="/category/add">Thêm loại sản phẩm</Link>
      <table border="1">
        <thead>
          <tr>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr>
              <td>{category.id} </td>
              <td>{category.name}</td>
              <td>
                <div className="form-group">
                  <Link
                    style={{ margin: 20 }}
                    className="btn btn-primary btn-lock"
                    to={"/category/edit/" + category.id}
                  >
                    Sửa
                  </Link>
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => Delete(category.id)}
                  >
                    Xoá
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
