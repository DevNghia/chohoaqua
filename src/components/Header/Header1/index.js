import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { cartActions } from "../../../actions/cartActions";
import ProfileUser from "../../ProfileUser";
import Notification from "../../Notification";

import { useLocation } from "react-router-dom";
import { allowCalculate } from "../dataset";
import "./style.css";
import styled from "styled-components";
import { getListMenu } from "../../../utils/menuUtils";
import { Search } from "../../Search";

const Header1Styles = styled.div`
  .category-main {
    .image {
      flex-shrink: 0;
    }
  }
  .list-name {
    line-height: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @media screen and (max-width: 768px) {
    .header-logo {
      img {
        width: 150px !important;
      }
    }
    .container {
      .header-btn.header-btn-favorite {
        display: none;
      }
    }
  }
`;

export default function Header_1() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const categories = useSelector((state) => state.category.categories);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const profile = useSelector((state) => state.user.profile);
  const notify = useSelector((state) => state.user.notify);
  const badges = useSelector((state) => state.user.badges);

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
    window.addEventListener("click", function (e) {
      let containers = document.querySelectorAll(".header-dropdown");
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].contains(e.target)) return;
      }
      setCurrentActive("");
    });
  }, []);
  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }
  const elmLink = useRef(null);

  function handleSearch(e) {
    console.log("preventDefaultpreventDefaultpreventDefault", e);
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

  function handleShowPhonePopup() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  }
  function handleLogout() {
    dispatch(userActions.accountLogout());
  }
  function handleShowProfile() {
    dispatch(appActions.changePopup(c.PROFILE_POPUP));
  }
  function handleCategorySelect() {
    toggleMenu(".categories-dropdown");
  }
  function toggleMenu(selector) {
    const menuToggle = document.querySelector(`${selector} .menu`);
    menuToggle.classList.toggle("active");
  }
  function handleToggleActive(type) {
    if (currentActive === type) {
      setCurrentActive("");
      return;
    }
    setCurrentActive(type);
  }
  function checkAccount(e) {
    if (!tokenInfo) {
      e.preventDefault();
      handleShowPhonePopup();
      return;
    }
  }
  function handleNotificationClick(v) {
    handleToggleActive("notify");
    if (v.type === "NEW_MESSAGE") {
      dispatch(appActions.setChatStatus("active"));
      return;
    }
    let arr = v.title.split(" ");
    let orderID = arr[arr.length - 1];
    window.location.href = `/don-hang/${orderID}`;
  }
  function handleShowCollaboratorRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.COLLABORATOR_REGIS_POPUP));
  }
  function handleShowAgencyRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.AGENCY_REGIS_POPUP));
  }

  function shpwCalculate(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.CALCULATE_PRICE));
  }
  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <Header1Styles
        className="header1"
        style={{ background: appTheme.headerBackgroudColor }}
      >
        <div className="container">
          <Link to="/" className="logo header-logo">
            <img src={appTheme.logo_url} alt="" />
          </Link>
          <div
            id="clickbox"
            className="categories-dropdown header-dropdown"
            style={{ display: "block", cursor: "pointer" }}
          >
            <div
              className="row categories-dropdown-btn"
              onClick={() => handleToggleActive("category")}
            >
              <i className="fas fa-bars"></i>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={
                currentActive === "category"
                  ? " menu dropdown active hide-scroll"
                  : "menu dropdown hide-scroll"
              }
            >
              <h3>Danh mục sản phẩm</h3>
              <ul>
                <li>
                  <Link
                    onClick={handleCategorySelect}
                    style={{ cursor: "pointer", display: "flex" }}
                    to="/san-pham"
                  >
                    <div className="image">
                      <div className="img-container">
                        <img
                          src="/img/cubes.png"
                          alt=""
                          style={{
                            width: "30px",
                            objectFir: "contain",
                            marginRight: "8px",
                          }}
                        />
                      </div>
                    </div>
                    <div>Tất cả sản phẩm</div>
                  </Link>
                </li>
                {categories.map((v, i) => (
                  <li key={i} className="category-main">
                    <Link
                      key={i}
                      onClick={handleCategorySelect}
                      style={{ cursor: "pointer", display: "flex" }}
                      to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                    >
                      <div className="image">
                        <div className="img-container">
                          <img
                            src={v.image_url || "./img/default_product.jpg"}
                            alt="category"
                            style={{
                              width: "30px",
                              borderRadius: "4px",
                              marginRight: "8px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="list-name">{v.name}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <form className="search-bar" onSubmit={handleSearch}>
            <div style={{ position: "relative", minWidth: 580 }}>
              <input
                type="text"
                className="search-text"
                placeholder="Tìm kiếm sản phẩm"
                value={searchValue}
                onChange={handleInputChange}
              />
              <Search searchValue={searchValue}></Search>
            </div>
            <button type="submit" style={{ background: appTheme.color_main_1 }}>
              <img src="/img/search.svg" alt="search" />
            </button>
          </form>
          <Link to="/gio-hang" className="header-btn row">
            <img src="/img/shopping-cart.png" alt="" />
            <div>
              {badges.cart_quantity == 0 ? (
                <div
                  style={{
                    margin: 18,
                  }}
                >
                  {null}
                </div>
              ) : (
                <div className="number">{badges.cart_quantity}</div>
              )}
              <div className="title">Giỏ hàng</div>
            </div>
          </Link>
          <div
            className="row"
            style={{
              alignItems: "center",
            }}
          >
            <Notification></Notification>
            {!tokenInfo ? (
              ""
            ) : (
              <Link
                to="/yeu-thich"
                onClick={checkAccount}
                className="header-btn row header-btn-favorite"
              >
                <img src="/img/heart1.png" alt="" />
                <div>
                  {badges.favorite_products === 0 ? (
                    <div
                      style={{
                        margin: 18,
                      }}
                    >
                      {null}
                    </div>
                  ) : (
                    <div className="number">{badges.favorite_products}</div>
                  )}
                  <div className="title">Yêu thích</div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </Header1Styles>
      <div className="nav1">
        <div
          className="container"
          style={{ background: appTheme.headerBackgroudColor }}
        >
          <div className="row">
            {getListMenu(appTheme).map((eleMenu) => (
              <div
                className="dropdown-container"
                style={{ width: "auto", paddingLeft: 15, paddingRight: 15 }}
              >
                <a
                  href={eleMenu.link_to}
                  className="dropdown-title"
                  to={{
                    pathname: eleMenu.link_to,
                    state: { prevPath: window.location.pathname },
                  }}
                  title={eleMenu.name}
                >
                  {eleMenu.name}
                </a>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: -9,
              marginRight: !tokenInfo ? null : 0,
            }}
          >
            <ProfileUser colorText={"grey"} colorIcon={"grey"} style={{}} />
          </div>
        </div>
      </div>
      <form className="mobile mobile-header1" onSubmit={handleSearch}>
        <div className="search-bar">
          <img
            style={{
              width: "47px",
              marginRight: "20px",
              height: "40px",
              objectFit: "contain",
            }}
            src={appTheme.logo_url}
            alt=""
          />
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Tìm sản phẩm"
              value={searchValue}
              style={{ width: "100%" }}
              onChange={handleInputChange}
            />
            <Search searchValue={searchValue}></Search>
          </div>
          <button type="submit" style={{ background: appTheme.color_main_1 }}>
            <img src="/img/search.svg" alt="search" />
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
