import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const fetchBrandsAndCategories = async () => {
    try {
      const brands = await axios.get("http://localhost/api/brands");
      const categories = await axios.get(
        "http://localhost/api/categories"
      );
      setBrands(brands.data);
      setCategories(categories.data);
    } catch (error) {
      console.error("Error fetching :", error);
      setError("Failed to load. Please try again.");
    }
  };
  const handleImagePreviewClick = () => {
    document.getElementById("productImage").click();
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
    fetchBrandsAndCategories();
    axios
      .get("http://localhost/api/products/" + id, {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setName(response.data.product.name);
        setStock(response.data.product.stock);
        setPrice(response.data.product.price);
        setCategory_id(response.data.product.category_id);
        setBrand_id(response.data.product.brand_id);
        setDescription(response.data.product.description);
        setImage(response.data.product.image);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.response);
      });
  }, []);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  var [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand_id, setBrand_id] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      image = document.getElementById("productImage").files[0];
      const formData = new FormData();
      formData.append("name", name);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category_id", category_id);
      formData.append("brand_id", brand_id);
      if (image) formData.append("image", image);
      formData.append("description", description);
      const response = await axios.post(
        "http://localhost/api/product/edit/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/products");
      } else {
        alert(response.data.message);
      }

      // Xử lý phản hồi từ backend ở đây
    } catch (error) {
      setError("Failed to update product. Please try again.");
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card" style={{ margin: "30px" }}>
          <div className="card-body">
            <h1>Chỉnh sửa sản phẩm</h1>
            <form onSubmit={handleUpdateProduct}>
              <div className="form-group">
                <label htmlFor="name">Tên sản phẩm:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Số lượng tồn:</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá:</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <input
                  onChange={handleImageChange}
                  type="file"
                  id="productImage"
                  style={{ display: "none" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category_id">Loại sản phẩm:</label>
                <select
                  className="form-control"
                  id="category_id"
                  value={category_id}
                  onChange={(e) => setCategory_id(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="brand_id">Nhãn hiệu:</label>
                <select
                  className="form-control"
                  id="brand_id"
                  value={brand_id}
                  onChange={(e) => setBrand_id(e.target.value)}
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}{" "}
                    </option>
                  ))}
                </select>
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
                <Link to="/products" className="btn btn-secondary btn-block">
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

export default EditProduct;
