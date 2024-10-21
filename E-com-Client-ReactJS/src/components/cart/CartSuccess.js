import React from "react";
const CartSuccess = () => {
    return (
        <div className="container text-center text-black">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h3 className="mt-5">Thanh toán hoàn tất</h3>
                <p className="lead" style={{margin: "30px auto"}}>
                    Đơn hàng đang trên đường giao tới bạn!!!
                </p>
                <a className="btn btn-primary" style={{margin: "10px auto"}} href="/"
                  >Trở về trang chủ</a>
              </div>
            </div>
          </div>
    );
};
export default CartSuccess;