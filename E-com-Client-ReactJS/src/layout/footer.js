import "../css/style.css";
import "../css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer background-radial-gradient">
      <footer className="py-0 text-center text-lg-start text-white">
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6
                  className="text-uppercase mb-4 font-weight-bold"
                  style={{ textDecoration: "underline" }}
                >
                  <a className="text-white" href="/">
                    {" "}
                    Ecom Store
                  </a>
                </h6>
                <i>
                  <b>
                    “Công nghệ vượt trội, cuộc sống vượt trội.”{" "}
                  </b>
                  <br /> - Mạnh đẹp trai -
                </i>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Danh mục
                </h6>
                <p>
                  <a
                    className="text-white"
                    style={{ cursor: "pointer" }}
                    href="/"
                  >
                    Trang chủ
                  </a>
                </p>
                <p>
                  <Link
                    className="text-white"
                    style={{ cursor: "pointer" }}
                    to="/introduce"
                  >
                    Giới thiệu
                  </Link>
                </p>
                <p>
                  <Link
                    className="text-white"
                    style={{ cursor: "pointer" }}
                    to="/"
                  >
                    Sản phẩm
                  </Link>
                </p>
                <p>
                  <a
                    className="text-white"
                    style={{ cursor: "pointer" }}
                    onClick="PostList(); changeActiveState('community-nav')"
                  >
                    Cộng đồng
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Liên hệ
                </h6>
                <p>
                  <i className="fa fa-home mr-3"></i> 123/23 Quận 9, TP.HCM
                </p>
                <p>
                  <i className="fa fa-envelope mr-3"></i> ecom@gmail.com
                </p>
                <p>
                  <i className="fa fa-phone mr-3"></i> 0369996789
                </p>
                <p>
                  <i className="fa fa-print mr-3"></i> 0911072002
                </p>
              </div>
            </div>
          </section>

          <hr className="my-3" />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                <div className="p-3">
                  © Copyright:
                  <a className="text-white" href="/">
                    EcomStore.com
                  </a>
                </div>
              </div>

              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                <a
                  className="btn btn-outline-light btn-floating m-1 text-white"
                  role="button"
                  href="https://www.facebook.com/trnvinh1107/"
                >
                  <i className="fa fa-facebook-f"></i>
                </a>

                <a
                  className="btn btn-outline-light btn-floating m-1 text-white"
                  role="button"
                  href=""
                >
                  <i className="fa fa-twitter"></i>
                </a>

                <a
                  className="btn btn-outline-light btn-floating m-1 text-white"
                  role="button"
                >
                  <i className="fa fa-google"></i>
                </a>

                <a
                  className="btn btn-outline-light btn-floating m-1 text-white"
                  role="button"
                  href="https://www.instagram.com/_trn.vinh/"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
