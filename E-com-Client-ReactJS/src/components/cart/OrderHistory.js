import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const popupRef = useRef(null);
  const toggleDetailsPopup = (order) => {
    setSelectedOrder(order);
    setShowDetails(!showDetails);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost/api/orders", {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };
    fetchOrders();
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function getCookie(name) {
    const value = "; ";
    const parts = document.cookie.split(value);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].split("=");
      if (part.length === 2 && name === part[0]) {
        return part[1];
      }
    }
    return "";
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {orders.length === 0 ? (
        <div className="container text-center text-black">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h3 className="mt-5">Bạn chưa từng mua gì hết</h3>
            <p className="lead" style={{margin: "30px auto"}}>
              Hãy đến trang chủ và mua những gì bạn muốn &#128538;
            </p>
            <Link to="/" className="btn btn-primary" style={{margin: "10px auto"}}
              >Đến trang chủ</Link>
          </div>
        </div>
      </div>
      ) : (
        <div className="container form-container">
          <h2>Lịch sử mua hàng</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Mã hoá đơn</th>
                <th>Ngày</th>
                <th>Tổng</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="productItem">
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>
                    <label>
                      <span readonly>
                        {order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}đ
                      </span>
                    </label>
                  </td>
                  <td><button className="btn btn-primary" onClick={() => toggleDetailsPopup(order)}>Chi tiết</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showDetails && selectedOrder && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <span className="close-btn" onClick={() => setShowDetails(false)}>
              &times;
            </span>
            <h1 style={{color:"white"}}>Chi tiết hóa đơn</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Ảnh</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}đ</td>
                    <td>
                      <img style={{ width: '100px' }} src={item.product.image} alt={item.product.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderHistory;