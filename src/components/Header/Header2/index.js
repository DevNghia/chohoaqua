import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { cartActions } from "../../../actions/cartActions";
import { useLocation } from "react-router-dom";
import "./style.css";
import ProfileUser from "../../ProfileUser";
import Notification from "../../Notification";
import styled from "styled-components";
import { getListMenu } from "../../../utils/menuUtils";
import { Search } from "../../Search";

const HeaderStyles = styled.div`
  @media screen and (max-width: 1200px) {
    .header-btn {
      background: transparent !important;
    }
  }

  @media screen and (max-width: 600px) {
    .header-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      .search-bar-input {
        padding-bottom: 0 !important;
        width: 250px;
        .search-text {
          max-height: 40px !important;
        }

        span.input-group-btn {
          right: -5%;
          top: 30% !important;
        }
      }
      .icon-cart-mobile {
        display: none !important;
      }
    }
  }
`;

export default function Header_2(props) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const notify = useSelector((state) => state.user.notify);
  const badges = useSelector((state) => state.user.badges);
  const location = useLocation();
  useEffect(() => {
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

  function handleSearch() {
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
    if (e.key === "Enter") handleSearch();
  }

  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <HeaderStyles className="header2" id="template-1">
        <div
          className="topbar-mobile hidden-lg hidden-md text-center text-md-left"
          style={{ background: appTheme.color_main_1 }}
        >
          {appTheme == null ||
          appTheme.phone_number_hotline == null ||
          appTheme.phone_number_hotline === "" ||
          appTheme.is_show_icon_hotline === false ? (
            ""
          ) : (
            <div className="container container-template-2">
              Hotline:
              <span>
                <a href={"tel:" + appTheme.phone_number_hotline}>
                  {appTheme.phone_number_hotline}
                </a>
              </span>
            </div>
          )}
        </div>

        <div className="container">
          <div className="header-main">
            <div className="header-content clearfix a-center">
              <div className="row">
                <div
                  className="col-xs-12 col-md-3 text-lg-left"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="logo inline-block">
                    <Link to="/" className="logo-wrapper ">
                      <img
                        style={{
                          height: "2em",
                          "object-fit": "contain",
                        }}
                        src={appTheme.logo_url}
                        alt="logo "
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-6 hidden-xs">
                  <div className="policy d-flex justify-content-around">
                    <div className="item-policy d-flex align-items-center">
                      <a title="policy2_title" href="#">
                        <img
                          src="https://bizweb.dktcdn.net/thumb/medium/100/308/325/themes/801947/assets/policy2.png?1623316806453"
                          alt="DuaLeo-X"
                        />
                      </a>
                      <div className="info a-left">
                        <a title="Hỗ trợ 24/7" href="#">
                          Hỗ trợ 24/7
                        </a>
                        {appTheme == null ||
                        appTheme.phone_number_hotline == null ||
                        appTheme.phone_number_hotline === "" ||
                        appTheme.is_show_icon_hotline === false
                          ? ""
                          : null}
                      </div>
                    </div>
                    <div className="item-policy d-flex align-items-center">
                      <a href="#">
                        <img src="https://bizweb.dktcdn.net/thumb/medium/100/308/325/themes/801947/assets/policy3.png?1623316806453" />
                      </a>
                      <div className="info a-left">
                        <a title="Giờ làm việc" href="#">
                          Giờ làm việc
                        </a>
                        <p>{appTheme.contact_time_work}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-md-1 col-lg-2 hidden-sm hidden-xs">
                  <div className="top-cart-contain f-right ">
                    <div className="mini-cart text-xs-center">
                      <div className="heading-cart">
                        <Link
                          to="/gio-hang"
                          className="header-btn row"
                          style={{
                            background: appTheme.color_main_1,
                          }}
                        >
                          <div className="icon f-left relative">
                            <i className="fa fa-shopping-bag" />
                            <span
                              className="cartCount count_item_pr hidden-count"
                              id="cart-total"
                            >
                              {badges.cart_quantity}
                            </span>
                          </div>
                          <div className="right-content hidden-md">
                            <span className="label">
                              Giỏ hàng(
                              <span className="cartCount2">
                                {badges.cart_quantity}
                              </span>
                              )
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xs-12 col-md-2 col-lg-2 hidden-sm hidden-xs"
                  style={{ display: "flex" }}
                >
                  <div
                    style={{ margin: "auto 0px", paddingRight: "30px" }}
                    className="hidden-sm hidden-xs"
                  >
                    <Notification
                      useIcon={true}
                      fontSize={25}
                      hideTitle={true}
                      style={{
                        header_dropdown: {
                          paddingBottom: "10px",
                        },
                      }}
                    ></Notification>
                  </div>
                  <div
                    className=" hidden-sm hidden-xs"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ul
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: tokenInfo ? -40 : 0,
                      }}
                    >
                      <li>
                        <ProfileUser />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to={{
                pathname: "/gio-hang",
                state: { prevPath: window.location.pathname },
              }}
              title="Giỏ hàng"
            >
              {" "}
              <div className="icon-cart-mobile hidden-md hidden-lg f-left absolute">
                <div
                  className="icon relative"
                  style={{
                    marginTop: 40,
                  }}
                >
                  <i className="fa fa-shopping-bag" />
                  <span className="cartCount count_item_pr">
                    {" "}
                    {badges.cart_quantity}
                  </span>
                </div>
              </div>
            </Link>

            <div className="hidden-md hidden-lg">
              <div className="search-bar-input" onKeyDown={handleEnter}>
                <div
                  className="input-group search-bar search_form"
                  onKeyDown={handleEnter}
                >
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      name="query"
                      value={searchValue}
                      onChange={handleInputChange}
                      placeholder="Tìm sản phẩm"
                      className="input-group-field st-default-search-input search-text auto-search"
                      autoComplete="off"
                    />
                    <Search searchValue={searchValue}></Search>
                  </div>
                  <span className="input-group-btn">
                    <button
                      className="btn icon-fallback-text"
                      onClick={handleSearch}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <nav style={{ background: appTheme.color_main_1 }}>
          <div className="container">
            <div className="hidden-sm hidden-xs">
              <ul className="nav nav-left">
                {getListMenu(appTheme).map((eleMenu) => (
                  <li className="nav-item">
                    <a
                      href={eleMenu.link_to}
                      className="nav-link"
                      to={{
                        pathname: eleMenu.link_to,
                        state: { prevPath: window.location.pathname },
                      }}
                      title={eleMenu.name}
                    >
                      {eleMenu.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="menu-search f-right bbbbb">
                <div className="header_search search_form">
                  <div
                    className="input-group search-bar search_form"
                    onKeyDown={handleEnter}
                  >
                    <input
                      type="search"
                      name="query"
                      value={searchValue}
                      onChange={handleInputChange}
                      placeholder="Tìm sản phẩm"
                      className="input-group-field st-default-search-input search-text auto-search"
                      autoComplete="off"
                    />
                    <Search
                      searchValue={searchValue}
                      width="650px"
                      position="right"
                    ></Search>
                    <span className="input-group-btn">
                      <button
                        className="btn icon-fallback-text"
                        onClick={handleSearch}
                      >
                        <i className="fa fa-search" />
                      </button>
                    </span>
                  </div>
                  <div id="search_suggestion">
                    <div id="search_top">
                      <div id="product_results" />
                      <div id="article_results" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </HeaderStyles>
    </React.Fragment>
  );
}
