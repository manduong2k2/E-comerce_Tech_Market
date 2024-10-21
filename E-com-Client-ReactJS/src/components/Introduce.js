import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bannerImage from "../images/abcd.jpeg";
const Introduce = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="overlay">
            <img
              style={{
                width: "70%",
              }}
              src={bannerImage}
              alt="Your Image Alt Text"
            />
            <h1 style={{ position: "absolute", color: "grey" }}>
              CHÀO MỪNG BẠN ĐẾN VỚI ECOM
            </h1>
          </div>
          <br />
          <h4>Giới thiệu</h4>
          <p>
            Cảm ơn quý khách đã đến với ECom Store - nơi tận hưởng công nghệ tốt
            nhất cho cuộc sống hiện đại của bạn! Tại ECom Store, chúng tôi không
            chỉ cung cấp các sản phẩm công nghệ hàng đầu mà còn cam kết mang đến
            trải nghiệm mua sắm tuyệt vời và dịch vụ chăm sóc khách hàng xuất
            sắc..
            <br />
            ECom Store là địa chỉ tin cậy cho hàng triệu người tiêu dùng trong
            lĩnh vực công nghệ, đem đến những sản phẩm và trải nghiệm tuyệt vời
            từ đội ngũ tư vấn chuyên môn và nhiệt huyết của chúng tôi.
            <br />
            Lấy khách hàng là yếu tố quan trọng nhất, hiệu quả của sản phẩm đối
            với từng khách hàng là niềm vui của chúng tôi. Ecom Store luôn là
            địa chỉ tin cậy cho hàng triệu người tiêu dùng.
            <br />
            Ecom Store Nhà nhập khẩu và phân phối tư vấn đồ công nghệ cao cấp
            chính hãng tại Việt Nam.
          </p>
          <h4>Chúng tôi sẽ giúp được gì cho bạn ?</h4>
          <p>
            <br />
            – Thiết bị di động: Tận hưởng sự linh hoạt và tiện ích với các sản
            phẩm di động hàng đầu từ các thương hiệu uy tín.
            <br />
            – Monitor: Chúng tôi cũng có các loại monitor để mở rộng không gian
            làm việc và tăng cường trải nghiệm sử dụng máy tính.
            <br />
            – TLaptop và PC: Khám phá sự linh hoạt và hiệu suất với các dòng
            laptop và máy tính bảng hàng đầu trên thị trường.
            <br />
            Cung cấp các sản phẩm chất lượng và uy tín từ các nhà sản xuất hàng
            đầu. Dịch vụ chăm sóc khách hàng tận tâm và chuyên nghiệp.
            <br />
            Với phương châm "Bạn cần chúng tôi, chúng tôi cũng cần bạn", Ecom
            Store sẽ là địa chỉ tin cậy, uy tín để bạn thay đổi bản thân. Sản
            phẩm và dịch vụ luôn:
            <br />
            + Đúng cam kết, đúng chất lượng.
            <br />
            + Chất lượng phục vụ tốt nhất.
            <br />
            + Các chế độ ưu đãi tốt nhất.
            <br />
            + Giá cả phù hợp nhất.
            <br />
            Chúng tôi luôn lấy
            <b>“chất lượng sản phẩm và uy tín đối với khách hàng”</b> làm nòng
            cốt để phát triển sự nghiệp kinh doanh lâu dài. Ecom Store không
            ngừng tìm kiếm những dòng sản phẩm tốt nhất để đem tới cho khách
            hàng!
            <br />
            Hãy trải nghiệm mua sắm tại
            <b> Ecom Store</b> ngay hôm nay và khám phá thế giới công nghệ đang chờ đón bạn!
            <br />
            <br />
            <b>Xin chân thành cảm ơn quý khách đã lựa chọn chúng tôi!</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
