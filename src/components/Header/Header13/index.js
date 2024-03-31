import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../actions/cartActions";
import { constants as c } from "../../../constants";

import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { hexToRgbHeader } from "../../../utils/toUtils";
import ProfileUser from "../../ProfileUser";
import { Search } from "../../Search";
import "./style.css";
import Categories from "./Categories";

const Header13Styles = styled.div`
  position: sticky;
  top: 0;
  z-index: 100000;
  &.sticky {
    .subheader {
      /* animation: name duration timing-function delay iteration-count direction
        fill-mode; */
      animation: subHeaderSticky 1s forwards;
    }
  }
  .header {
    z-index: 1000;
    position: relative;
    background-color: #f7f7f7;
  }
  .menu-main {
    .menu-item__link {
      .menu-item__img {
        width: 30px;
        height: 30px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
      span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .sub-menu-2 {
    ul {
      display: flex !important;
      flex-direction: column;
      flex-wrap: wrap;
      grid-gap: 0 !important;
      gap: 0 !important;
      overflow-x: auto;
      li {
        .sub-menu-2-item {
          padding: 8px 15px !important;
          .image {
            width: 30px;
            flex-shrink: 0;
          }
          .list-names {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  @keyframes subHeaderSticky {
    0% {
      transform: translateY(0);
      visibility: "visible";
    }
    100% {
      transform: translateY(-100%);
      visibility: "hidden";
    }
  }

  @media screen and (max-width: 1400px) {
    .toogle-nav-wrapper {
      width: 213px !important;
    }
  }
  @media screen and (max-width: 1023px) {
    .toogle-nav-wrapper {
      display: none;
    }
    .shop-policises {
      .link {
        color: #ffffff;
      }
    }
  }
  @media (min-width: 767px) and (max-width: 1023px) {
    .custom-input-group {
      .input-group-field {
        height: 40px !important;
      }
      .input-group-btn {
        top: 3px !important;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .subheader {
      & > .container {
        display: flex;
        flex-direction: row !important;
        justify-content: space-between;
        gap: 15px;
      }
    }
    .custom-input-group {
      .input-group-field {
        max-width: 250px;
      }
    }
    .logo_image {
      flex-shrink: 0;
    }
    .align-items-center-header {
      .header-right {
        display: none !important;
      }
    }
    .shop-policises {
      flex-wrap: nowrap !important;
      overflow-x: auto;
      width: 100%;
      column-gap: 25px;
      justify-content: flex-start !important;
      li {
        flex-shrink: 0;
        margin-left: 0 !important;
        a {
          white-space: nowrap;
        }
      }
    }
    .shop-policises::-webkit-scrollbar {
      width: 0px !important;
    }
    /* .shop-policises::-webkit-scrollbar-thumb {
      background: transparent;
    } */
  }
  @media screen and (max-width: 400px) {
    .align-items-center-header {
      padding: 0 !important;
      .input-group-field {
        padding: 0 25px 0 10px !important;
      }
      .input-group-btn {
        img {
          width: 16px !important;
        }
      }
    }
  }
  @media screen and (max-width: 341px) {
    .align-items-center-header {
      .header-center {
        width: 100%;
      }
    }
  }
`;

export default function Header_10() {
  const notify = useSelector((state) => state.user.notify);
  const dispatch = useDispatch();
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const profile = useSelector((state) => state.user.profile);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const [currentActive, setCurrentActive] = useState("");
  const badges = useSelector((state) => state.user.badges);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const [searchValue, setSearchValue] = useState("");
  const appTheme = useSelector((state) => state.app.appTheme);
  const categories = useSelector((state) => state.category.categories);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const headerMenu = document.querySelector(".header-10");

    if (window.scrollY > 0) {
      headerMenu.classList.add("sticky");
    } else {
      headerMenu.classList.remove("sticky");
    }
  };

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }
  function handleToggleActive(type) {
    if (currentActive === type) {
      setCurrentActive("");
      return;
    }
    setCurrentActive(type);
  }
  function handleShowCollaboratorRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.COLLABORATOR_REGIS_POPUP));
  }
  function handleShowAgencyRegisForm(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.AGENCY_REGIS_POPUP));
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
    e.preventDefault();
    handleSearch();
  }

  useEffect(() => {
    $(".parent").on("mouseover", function () {
      var $menuItem = $(this),
        $submenuWrapper = $("> .wrapper", $menuItem);
      var menuItemPos = $menuItem.position();
      $submenuWrapper.css({
        top: menuItemPos.top,
        left: menuItemPos.left + Math.round($menuItem.outerWidth() * 1),
      });
    });
  });

  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <Header13Styles className="header-13 home-page-13">
        <div
          // style={{ background: appTheme.color_main_1 ?? "#4a90e2" }}
          style={{
            backgroundImage: `linear-gradient(to right, ${
              hexToRgbHeader(appTheme.color_main_1).first
            }, ${hexToRgbHeader(appTheme.color_main_1).second})`,
          }}
          className="subheader"
        >
          <div className="container">
            <div
              className="logo_image"
              style={{
                paddingBottom: "0",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <img
                  className="logo"
                  src={appTheme.logo_url}
                  alt="logo"
                  width={175}
                  height={40}
                  style={{ height: "80px", width: "auto" }}
                />
              </Link>
              <div
                className="toogle-nav-wrapper"
                style={{
                  color: appTheme.color_main_1,
                  width:
                    window.location.pathname === "/san-pham"
                      ? "250px"
                      : "257px",
                }}
              >
                <div className="icon-bar-2">
                  <span
                    className="bar"
                    style={{
                      background: appTheme.color_main_1,
                    }}
                  />
                  <span
                    className="bar"
                    style={{
                      background: appTheme.color_main_1,
                    }}
                  />
                  <span
                    className="bar"
                    style={{
                      background: appTheme.color_main_1,
                    }}
                  />
                </div>
                DANH MỤC SẢN PHẨM
                {/* <div className="navigation-wrapper ">
                  <nav className="h-100 wrapper">
                    <ul className="navigation list-group list-group-flush scroll">
                      {categories.map((v, i) => (
                        <>
                          <li className="menu-item list-group-item menu-main parent">
                            <Link
                              to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                              className="menu-item__link"
                              title="Chăm sóc da mặt"
                            >
                              <img
                                src={v.image_url || "./img/default_product.jpg"}
                                alt="category"
                                style={{
                                  display: "inline-block",
                                }}
                              />
                              <span style={{ fontWeight: "600px" }}>
                                {" "}
                                {v.name}
                              </span>
                            </Link>
                            {v.category_children.length > 0 && (
                              <i
                                className="fas fa-chevron-right"
                                style={{
                                  color: appTheme.color_main_1,
                                  marginLeft: "auto",
                                  marginTop: 9,
                                }}
                              ></i>
                            )}
                            <div className="sub-menu-2 wrapper">
                              <ul
                                style={{
                                  width: `calc(223px*${Math.ceil(
                                    v.category_children.length / 8
                                  )})`,
                                  maxWidth: `calc(223px*4)`,
                                  height:
                                    Math.ceil(v.category_children.length / 8) >
                                    1
                                      ? "378px"
                                      : `calc(46px*${v.category_children.length})`,
                                }}
                              >
                                {v.category_children.map((item) => (
                                  <li
                                    style={{
                                      width: "223px",
                                    }}
                                  >
                                    <div className="sub-menu-2-item">
                                      <Link
                                        style={{
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          width: "100%",
                                        }}
                                        to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                                      >
                                        <div className="image">
                                          <div className="img-list">
                                            <img
                                              src={
                                                item.image_url ||
                                                "./img/default_product.jpg"
                                              }
                                              alt="category"
                                            />
                                          </div>
                                        </div>
                                        <div className="list-names">
                                          {" "}
                                          {item.name}
                                        </div>
                                      </Link>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>
                  </nav>
                </div> */}
                <Categories categories={categories} />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                paddingBottom: "0",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
              className="d-flex"
            >
              <div
                className="header-center"
                id="search-header"
                style={{
                  position: "relative",
                  paddingBottom: "0px",
                }}
              >
                <form
                  onSubmit={handleEnter}
                  className="input-group search-bar custom-input-group"
                  role="search"
                  style={{ marginBottom: "0" }}
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="input-group-field auto-search form-control search-text"
                    placeholder=" Tìm theo tên sản phẩm..."
                  />
                  <span className="input-group-btn btn-action" style={{}}>
                    <button
                      onClick={handleSearch}
                      style={{ background: appTheme.color_main_1 }}
                      aria-label="search"
                      className="btn text-white icon-fallback-text h-100"
                    >
                      <img
                        style={{ width: "20px" }}
                        src="/img/search.svg"
                        alt="search"
                      />
                    </button>
                  </span>
                </form>
                <Search searchValue={searchValue}></Search>
                <div className="search-overlay" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
                className="header-options-bottom"
              >
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      display: "block",
                      background: "white",
                    }}
                  ></span>
                  <span>Tích điểm tất cả sản phẩm</span>
                </div>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      display: "block",
                      background: "white",
                    }}
                  ></span>
                  <span>Ưu đãi khi thanh toán online</span>
                </div>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      display: "block",
                      background: "white",
                    }}
                  ></span>
                  <span>Cam kết</span>
                </div>
              </div>
            </div>
            <div
              style={{
                paddingBottom: "0",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                width: "270px",
                alignItems: "end",
              }}
              className="header-cart-and-user"
            >
              <div className="cartgroup ml-0 mr-2 mr-md-0">
                <div className="mini-cart text-xs-center" id="minicart">
                  <Link
                    to="/gio-hang"
                    className="img_hover_cart"
                    title="Giỏ hàng"
                    rel="nofollow"
                    style={{ width: "148px", gap: "8px" }}
                  >
                    <img
                      src="https://becareskin.com/wp-content/themes/X-V1-21/assets/cart_icon.png"
                      width={24}
                      height={24}
                      alt="cart icon"
                    />
                    <span className="mx-2 d-xl-block d-none">Giỏ hàng</span>
                    <span className="count_item count_item_pr">
                      {" "}
                      {badges.cart_quantity}
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className="ml-3 mr-3 mr-md-3 ml-md-3 media d-lg-flex d-none"
                style={{ padding: "8px 0" }}
              >
                <ProfileUser
                  stylelmLogin={{ width: "100%", textAlign: "center" }}
                  elmContainerLogin={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  accountInfoStyle={{ position: "relative" }}
                  styleIcon={{ marginRight: "0px" }}
                  styleElmUserList={{ "justify-content": "center" }}
                  colorText={appTheme.color_main_1}
                  colorIcon={appTheme.color_main_1}
                  style={{}}
                  styleObj={{
                    paddingTop: 0,
                  }}
                />
              </div>
            </div>
            {/* <ul className="shop-policises list-unstyled d-flex align-items-center flex-wrap m-0 pr-0">
              {getListMenu(appTheme).map((eleMenu) => (
                <li>
                  <a
                    href={eleMenu.link_to}
                    className="link"
                    to={{
                      pathname: eleMenu.link_to,
                      state: { prevPath: window.location.pathname },
                    }}
                    title={eleMenu.name}
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    {eleMenu.image && (
                      <img
                        style={{ objectFit: "cover" }}
                        width={32}
                        height={32}
                        src={process.env.PUBLIC_URL + eleMenu.image}
                        alt={eleMenu.name}
                      />
                    )}
                    <span>{eleMenu.name}</span>
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </Header13Styles>
    </React.Fragment>
  );
}
