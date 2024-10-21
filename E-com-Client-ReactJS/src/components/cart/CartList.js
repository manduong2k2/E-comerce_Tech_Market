import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
const CartList = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const handleCheckOut = async () => {
    if (window.confirm("Bạn có chắc muốn đặt hàng không?"))
      try {
        const response = await axios.post(
          "http://localhost/api/order",
          {},
          {
            headers: {
              Authorization: "Bearer " + getCookie("token"),
            },
          }
        );
        console.log(response.data.message);
        alert("Đặt hàng thành công !");
        navigate("/cart/success");
      } catch (error) {
        console.log(error.response.data.message);
      }
  };
  const Increase = async (product_id) => {
    try {
      const response = await axios.post(
        "http://localhost/api/cart/increase/" + product_id,
        {},
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      document.getElementById(product_id + "number").value =
        parseInt(document.getElementById(product_id + "number").value) + 1;
    } catch (error) {
      console.log(error);
    }
  };
  const Decrease = async (product_id) => {
    try {
      const response = await axios.post(
        "http://localhost/api/cart/decrease/" + product_id,
        {},
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      var total = document.getElementById(product_id + "number").value;
      total =
        parseInt(document.getElementById(product_id + "number").value) - 1;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost/api/carts", {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        setCartItems(response.data);
        calculateTotal(response.data);
        document.getElementById("num-cart").innerHTML = response.data.length;
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [cartItems]);
  const RemoveAllItem = async () => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?"))
      try {
        const response = await axios.delete(
          "http://localhost/api/cart/deleteAll",
          {
            headers: {
              Authorization: "Bearer " + getCookie("token"),
            },
          }
        );
        alert("Đã xoá hết tất cả sản phẩm");
        //   setCartItems(cartItems.filter((item) => item.product.id !== productId));
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
  };
  const removeFromCart = async (productId) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?"))
      try {
        const response = await axios.delete(
          "http://localhost/api/cart/delete/" + productId,
          {
            headers: {
              Authorization: "Bearer " + getCookie("token"),
            },
          }
        );
        alert("Đã xoá sản phẩm khỏi giỏ hàng");
        setCartItems(cartItems.filter((item) => item.product.id !== productId));
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
  };

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
  const calculateTotal = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    setTotal(totalPrice);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="container text-center text-black">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h3 className="mt-5">Giỏ hàng đang trống</h3>
              <p className="lead" style={{ margin: "30px auto" }}>
                Hãy đến mục sản phẩm và chọn những gì bạn thích &#128538;
              </p>
              <Link
                className="btn btn-primary"
                style={{ margin: "10px auto" }}
                to="/"
              >
                Đến trang sản phẩm
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container form-container">
          <h2>Giỏ hàng</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Hình</th>
                <th>Số lượng</th>
                <th>Giá &#128181;</th>
                <th>Tổng</th>
                <th>Xoá</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="productItem">
                  <td>{item.product.name}</td>
                  <td>
                    <img
                      src={item.product.image}
                      alt="Hình ảnh"
                      style={{ height: "100px" }}
                    />
                  </td>
                  <td>
                    {" "}
                    <div style={{ display: "inline-flex" }}>
                      <button
                        onClick={() => Decrease(item.product_id)}
                        className={`btn btn-danger ${
                          item.quantity === 1 ? "disable-btn" : ""
                        }`}
                        disabled={item.quantity === 1} // Disable the button when quantity is 1
                      >
                        -
                      </button>
                      <input
                        id={item.product_id + "number"}
                        style={{ width: "80px", textAlign: "center" }}
                        type="number"
                        min="1"
                        value={item.quantity}
                      />
                      <button
                        onClick={() => Increase(item.product_id)}
                        className="btn btn-success"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <label>
                      {" "}
                      <span readOnly>
                        {item.product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        đ
                      </span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <span id="total" className="itemTotal">
                        {(item.quantity * item.product.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>
                      <span>₫</span>
                    </label>
                  </td>
                  <td>
                    <a onClick={() => removeFromCart(item.product.id)}>
                      <svg
                        style={{ cursor: "pointer", fill: "red" }}
                        onMouseOut="this.style.transform='scale(1)'"
                        onMouseOver="this.style.transform='scale(1.2)'"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0 0 128 128"
                      >
                        <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path>
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-12">
              <h3 style={{ display: "flex" }}>
                {" "}
                Tổng hoá đơn:
                <p id="hiddenBillTotal">
                  {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
                <span>₫</span>
              </h3>
            </div>
            <div className="col-md-12 text-center" style={{ margin: "10px 0" }}>
              <a onClick={() => RemoveAllItem()} className="btn btn-danger">
                Xoá toàn bộ sản phẩm
              </a>
              <button
                className="btn btn-success"
                style={{ margin: "0px 15px" }}
                onClick={() => handleCheckOut()}
              >
                Thanh toán
                <svg
                  fill="white"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartList;
