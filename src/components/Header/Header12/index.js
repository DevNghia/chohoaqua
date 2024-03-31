import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileUser from "../../ProfileUser";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userActions } from "../../../actions/userActions";
import { appActions } from "../../../actions/appActions";
import Notification from "../../Notification";
import styled from "styled-components";
import { constants as c } from "../../../constants";
import { cartActions } from "../../../actions/cartActions";
import { Search } from "../../Search";

const Header12Styles = styled.div`
  .box-call {
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: #fff;
    cursor: pointer;
    position: relative;

    &:hover {
      .dropdown-call {
        visibility: visible;
        opacity: 1;
      }
    }
    .dropdown-call {
      position: absolute;
      border: 1px solid #ddd;
      line-height: 25px;
      z-index: 998;
      background: #fff;
      color: #333;
      padding: 5px 10px;
      top: calc(100% + 8px);
      right: 0;
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s;
      &::before {
        content: "";
        position: absolute;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #fff;
        top: -8px;
        right: 20px;
      }
      .dropdown-call-item {
        display: flex;
        div {
          &:first-child {
            display: flex;
            column-gap: 5px;
            align-items: center;
          }
          width: 80px;
          color: #888;
          span {
            &:last-child {
              font-weight: 400;
              color: #333;
            }
          }
        }
        .dropdown-call-email {
          transform: rotate(-90deg);
        }
      }
    }
    span {
      font-size: 12px;
      font-weight: 700;
    }
    i {
      transform: rotate(90deg);
    }
  }
  .btn-search-icon {
    display: none;
  }
  .nav-header {
    padding: 0.875rem 0;
  }
  .search-header-content {
    background-color: #fff;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    width: 600px;
    border-radius: 3px;
    overflow: hidden;
    i {
      color: #a4a3a3;
    }
    input {
      background-color: transparent;
      width: 100%;
      padding: 8px;
    }
    .btn-search {
      padding: 8px 10px;
      white-space: nowrap;
      background-color: #ddd;
    }
  }
  .image-top-header {
    width: 258px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    a {
      img {
        height: 32px;
        width: auto;
      }
    }
  }
  .header-function {
    display: flex;
    align-items: center;
    padding-left: 16px;
    column-gap: 24px;
    margin-left: auto;
  }
  .box-cart {
    h5 {
      margin-left: 0 !important;
      white-space: nowrap;
      font-size: 12px !important;
    }
  }
  .about-4 {
    align-items: center;
  }
  .number-cart {
    background-color: #ff424e;
    width: 18px;
    height: 18px;
    border-radius: 100rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px !important;
    left: 14px !important;
    top: -7px !important;
  }
  @media only screen and (max-width: 1399px) {
    .search-header-content {
      width: 450px;
    }
  }
  @media screen and (max-width: 1160px) {
    .box-call {
      margin-left: 0;
    }
  }
  @media screen and (max-width: 1024px) {
    .notification-content {
      margin-left: 30px !important;
    }
  }
  @media screen and (max-width: 992px) {
    .search-header-content {
      width: 300px;
    }
  }
  @media screen and (max-width: 768px) {
    .search-header-content {
      width: 100%;
    }
    .image-top-header {
      width: 60px;
    }
  }
  @media screen and (max-width: 768px) {
    .image-top-header {
      width: 60px;
      margin-right: 20px;
    }
  }
  @media screen and (max-width: 600px) {
    .box-user {
      display: none !important;
    }
  }
  @media screen and (max-width: 400px) {
    .search-header-content {
      padding-left: 0 !important;
      .search-icon-left {
        display: none;
      }
      .btn-search-text {
        display: none;
      }
      .btn-search-icon {
        display: inline-block;
      }
    }
    .header-function {
      padding-left: 0 !important;
      margin-left: 0 !important;
      .notification-content {
        margin-left: 0 !important;
        margin-right: 8px;
      }
    }
  }
`;

export default function Header_12() {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const notify = useSelector((state) => state.user.notify);
  const badges = useSelector((state) => state.user.badges);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const [searchValue, setSearchValue] = useState("");

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    setSearchValue(searchParams.get("search") ?? "");
  }, [location]);
  useEffect(() => {
    if (tokenInfo) {
      dispatch(userActions.getUserBadges());
      dispatch(userActions.getUserProfile());
    }
    if (tokenInfo && cartInfo.status === c.LOADING) {
      dispatch(cartActions.getCartInfo());
    }
    if (tokenInfo && notify.status === c.LOADING) {
      dispatch(userActions.getuserNotify());
    }
    if (provincesList.length === 0 && addressStatus === c.LOADING) {
      dispatch(appActions.getProvincesList());
    }
  }, []);

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
      <Header12Styles
        className="main-header7 sticky"
        style={{ background: appTheme.color_main_1 }}
      >
        <div className="nav-header container row">
          <div className="image-top-header">
            <Link to="/">
              <img src={appTheme.logo_url} alt="" />
            </Link>
          </div>

          <div className="">
            <div className="search-header" onKeyDown={handleEnter}>
              <div className="search-header-content">
                <span className="search-icon-left">
                  <i class="fas fa-search"></i>
                </span>
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={searchValue}
                  placeholder="Tìm sản phẩm mong muốn ..."
                  className="search-text"
                />
                <button
                  className="btn-search btn-search-text"
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </button>
                <button
                  className="btn-search btn-search-icon"
                  onClick={handleSearch}
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>
              <Search searchValue={searchValue}></Search>
            </div>
          </div>
          <div className="header-function">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
              className="box-user"
            >
              <ProfileUser
                colorText={"white"}
                colorIcon={"white"}
                header12={true}
                styleElmUserList={{
                  alignItems: "center",
                }}
                accountInfoStyle={{
                  marginRight: "0",
                }}
              />
            </div>
            <div
              className="box-cart row"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <a href="/gio-hang" style={{ marginLeft: "auto" }}>
                <div className="item-about hidden-mobile about-4 about-cart cta-gio-hang">
                  <div
                    className="about__box-icon"
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      src="/img/Icongiohang.png"
                      style={{ width: 22 }}
                      alt="cart"
                    />
                    <div className="number-cart">{badges.cart_quantity}</div>
                  </div>
                  <div className="about__box-content">
                    <h5 className="mb-0 title">Giỏ hàng</h5>
                  </div>
                </div>
              </a>
            </div>
            <div
              className="box-call hidden-mobile"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <i class="fa fa-phone"></i>
              <span>Hotline</span>
              <div className="dropdown-call">
                <div className="dropdown-call-item">
                  <div>
                    <span>
                      <i className="fa fa-phone-square"></i>
                    </span>
                    <span>Hotline</span>
                  </div>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {appTheme.phone_number_hotline}
                  </span>
                </div>
                <div className="dropdown-call-item">
                  <div>
                    <span className="dropdown-call-email">
                      <i className="fa fa-envelope"></i>
                    </span>{" "}
                    <span>Email</span>
                  </div>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {appTheme.contact_email}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                marginLeft: 0,
                width: "100%",
              }}
              className="notification-content"
            >
              <Notification
                fontSize={18}
                useIcon={true}
                hideTitle={true}
                colorText={"white"}
                colorIcon={"white"}
                header12={true}
              ></Notification>
            </div>
          </div>
        </div>
      </Header12Styles>
    </React.Fragment>
  );
}
