import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileUser from "../../ProfileUser";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Notification from "../../Notification";
import styled from "styled-components";
import Search from "../../Search/Search.jsx";

const Header7Styles = styled.div`
  .box-call {
    margin-left: 30px;
  }
`;

export default function Header_7() {
  const appTheme = useSelector((state) => state.app.appTheme);
  const [searchValue, setSearchValue] = useState("");

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    setSearchValue(searchParams.get("search") ?? "");
  }, [location]);

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }
  const elmLink = useRef(null);

  function handleSearch(e) {
    e.preventDefault();
    if (searchValue !== "") {
      var hostname = window.location.pathname;
      if (hostname.includes("/san-pham")) {
        elmLink.current.click();
        //Handle reset filter
        document.getElementById("filter_price_clear")?.click();
        document.getElementById("filter_attribute_clear")?.click();
      } else
        window.location.href =
          window.location.origin + "/san-pham?search=" + searchValue;
    }
  }
  function handleEnter(e) {
    if (e.key === "Enter") handleSearch(e);
  }
  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <Header7Styles
        className="main-header7"
        style={{ background: appTheme.color_main_1 }}
      >
        <div className="nav-header container row">
          <div className="col-lg-1 col-xl-1 col-md-1 col-2  image-top-header">
            <Link to="/">
              <img src={appTheme.logo_url} alt="" />
            </Link>
          </div>

          <div className="search-header-top col-xl-6 col-lg-6 col-md-7 col-9 col-sm-6 search-wrapper">
            <div className="search-header" onKeyDown={handleEnter}>
              <input
                className="search-text"
                onChange={handleInputChange}
                type="text"
                value={searchValue}
                placeholder="Tìm sản phẩm..."
              />
              <button
                className="sumbit-search"
                onClick={handleSearch}
                style={{ background: appTheme.color_main_1 }}
              >
                <i class="fas fa-search"></i> <span>tìm kiếm</span>
              </button>
            <Search searchValue={searchValue}></Search>
            </div>
          </div>

          <div
            className="col-xl-2 col-lg-2 box-call hidden-mobile"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <a href={`tel:${appTheme.phone_number_hotline}`}>
              <button className="item-about about-1 row  about-contact cta-goi-mua-hang">
                <div className="about__box-icon">
                  <img src="/img/icon-phone.png" />
                </div>
                <div className="about__box-content">
                  <p className="mb-0 title" style={{ color: "white" }}>
                    Gọi mua hàng
                    <br />
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                      {appTheme.phone_number_hotline}
                    </span>
                  </p>
                </div>
              </button>
            </a>
          </div>

          <div
            className="box-cart row col-xl-1 col-lg-1 col-md-1"
            style={{
              zIndex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <a href="/gio-hang" style={{ marginLeft: "auto" }}>
              <div className="item-about hidden-mobile about-4 about-cart cta-gio-hang">
                <div className="about__box-icon">
                  <img src="/img/Icongiohang.png" style={{ width: 32 }} />
                  <div className="number-cart"></div>
                </div>
                <div className="about__box-content">
                  <h5 className="mb-0 title">
                    Giỏ <br /> hàng
                  </h5>
                </div>
              </div>
            </a>
            <div
              style={{
                marginLeft: 0,
                width: "100%",
              }}
            >
              <Notification
                fontSize={24}
                useIcon={true}
                hideTitle={true}
                colorText={"white"}
                colorIcon={"white"}
              ></Notification>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              paddingLeft: "17px",
            }}
            className="box-user"
          >
            <ProfileUser colorText={"white"} colorIcon={"white"} />
          </div>
        </div>
      </Header7Styles>
    </React.Fragment>
  );
}
