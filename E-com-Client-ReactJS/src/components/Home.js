import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../Model/Product";
import "../css/style.css";
import "../css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const prodductDetail=(id)=>{
        try{
            navigate("/product/detail/" + id);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch danh sách sản phẩm
                const productsResponse = await axios.get(
                    "http://localhost/api/products"
                );
                setProducts(productsResponse.data);

                // Fetch danh sách thương hiệu
                const brandsResponse = await axios.get(
                    "http://localhost/api/brands"
                );
                setBrands(brandsResponse.data);

                // Fetch danh sách danh mục
                const categoriesResponse = await axios.get(
                    "http://localhost/api/categories"
                );
                setCategories(categoriesResponse.data);
            } catch (err) {
                console.log(err.response.data.message);
            }
        };
        fetchData();
    }, []);

    // Xử lý sự kiện khi thay đổi thương hiệu được chọn
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    // Xử lý sự kiện khi thay đổi danh mục được chọn
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const Search = (event) => {
        setSearchInput(event.target.value);
    };

    // Lọc danh sách sản phẩm dựa trên thương hiệu và danh mục được chọn
    const filteredProducts = products.filter((product) => {
        if (selectedBrand && selectedCategory && searchInput) {
            return (
                parseInt(product.brand_id) === parseInt(selectedBrand) &&
                parseInt(product.category_id) === parseInt(selectedCategory) &&
                product.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        } else if (selectedBrand && searchInput) {
            return (
                parseInt(product.brand_id) === parseInt(selectedBrand) &&
                product.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        } else if (selectedCategory && searchInput) {
            return (
                parseInt(product.category_id) === parseInt(selectedCategory) &&
                product.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        } else if (selectedBrand) {
            return parseInt(product.brand_id) === parseInt(selectedBrand);
        } else if (selectedCategory) {
            return parseInt(product.category_id) === parseInt(selectedCategory);
        } else if (searchInput) {
            return product.name.toLowerCase().includes(searchInput.toLowerCase());
        } else {
            return true;
        }
    });

    return (
        <div style={{ marginTop: 20 }} className="container">
            <div style={{ display: "flex" }}>
                <select className="form-control selected" value={selectedBrand} onChange={handleBrandChange}>
                    <option value="">Chọn thương hiệu</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                <select className="form-control selected1 selected" value={selectedCategory} onChange={handleCategoryChange} >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <form >
                <input className="form-control" type="search" onChange={Search} placeholder="&#128269;Tìm kiếm sản phẩm..." />
            </form>

            <div style={{ border: "none" }} className="row row-cols-1 row-cols-md-2 row-cols-lg-3" >
                {filteredProducts.map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                        <Product product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
