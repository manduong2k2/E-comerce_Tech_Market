import React, { useState,useEffect  } from "react";
import axios from "axios";
import { Link,useNavigate  } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const fetchBrandsAndCategories = async () => {
    try {
      const brands = await axios.get("http://localhost/api/brands"); 
      const categories = await axios.get("http://localhost/api/categories"); 
      setBrands(brands.data); 
      setCategories(categories.data);
    } catch (error) {
      console.error("Error fetching :", error);
      setError("Failed to load. Please try again."); 
    }
  };
  
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
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand_id, setBrand_id] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrandsAndCategories();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const image = document.getElementById('productImage').files[0];
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('brand_id', document.getElementById('brand_id').value);
    formData.append('category_id', document.getElementById('category_id').value);
    try {
      const response = await axios.post("http://localhost/api/product/create", formData ,{
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization':'Bearer '+ getCookie('token')
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.log('error: '+error.response.data.message);
      console.log('status: '+error.response.status);
    }
  };

  return (
    <div className="row justify-content-center">
  <div className="col-md-6">
    <div  style={{ margin: '30px' }}>
      <div >
        <h1>Thêm sản phẩm</h1>
        <form onSubmit={handleSignup}>
          <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
            <label htmlFor="name" style={{width:"30%"}}>Tên sản phẩm:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
            <label htmlFor="stock" style={{width:"30%"}}>Số lượng tồn:</label>
            <input
              type="text"
              className="form-control"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
            <label htmlFor="price" style={{width:"30%"}}>Giá:</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
          <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
            <label htmlFor="image" style={{width:"23%"}}>Ảnh:</label>
            <input type="file" id="productImage" />
          </div>
          <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
            <label htmlFor="category_id" style={{width:"30%"}}>Loại sản phẩm:</label>
            <select
              className="form-control"
              id="category_id"
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}{' '}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{display:"flex",margin:"10px 0"}}>
            <label htmlFor="brand_id" style={{width:"30%"}}>Nhãn hiệu:</label>
            <select
              className="form-control"
              id="brand_id"
              value={brand_id}
              onChange={(e) => setBrand_id(e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}{' '}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <div style={{ color: 'red' }} className="alert alert-danger">
              {error}
            </div>
          )}
          <div className="form-group" style={{ margin: '30px' }}>
            <button
              style={{ marginRight: '60px' }}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Xác nhận
            </button>
            <Link to="/" className="btn btn-secondary btn-block">
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

export default AddProduct;
