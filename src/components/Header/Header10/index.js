import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { cartActions } from "../../../actions/cartActions";
import $ from "jquery";

import { userActions } from "../../../actions/userActions";
import { appActions } from "../../../actions/appActions";
import { Link } from "react-router-dom";
import ProfileUser from "../../ProfileUser";
import BannerListNav from "../../../pages/Home/child/HomePage8/BannerListNav";
import { allowCalculate } from "../dataset";
import Notification from "../../Notification";
import "./style.css";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getListMenu } from "../../../utils/menuUtils";
import { Search } from "../../Search";

const Header10Styles = styled.div`
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
  @media screen and (max-width: 600px) {
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

  console.log(appTheme.headerBackgroudColor);
  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <Header10Styles className="header-10 home-page-10">
        <header className="header header_menu ">
          <div className="midd-header wid_100 d-flex align-items-center">
            <div className="container">
              <div
                className="row align-items-center-header"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="col-6 col-xl-2 col-lg-2 header-left">
                  <Link to="/" className="logo-wrapper">
                    <img
                      style={{
                        width: "200px",
                        height: "54px",
                        objectFit: "contain",
                      }}
                      className="img-fluid max-img"
                      src={appTheme.logo_url}
                      alt="BECARE SKIN"
                    />

                    <img
                      style={{
                        width: "200px",
                        height: "54px",
                        objectFit: "contain",
                      }}
                      className="img-fluid img-mobile"
                      src={appTheme.logo_url}
                      alt="BECARE SKIN"
                    />
                  </Link>

                  <div className="sticky-overlay" />
                </div>
                <div
                  className="col-xl-3 col-lg-3 col-12 header-center"
                  id="search-header"
                  style={{
                    position: "relative",
                  }}
                >
                  <form
                    onSubmit={handleEnter}
                    className="input-group search-bar custom-input-group"
                    role="search"
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
                  // className="col-3 col-xl-5 col-lg-5"
                  style={{ paddingLeft: "15px" }}
                >
                  <ul
                    className="header-right mb-0 float-right list-unstyled d-flex align-items-center"
                    style={{ justifyContent: "space-between", width: "100%" }}
                  >
                    <li
                      className="media d-lg-flex d-none hotline"
                      style={{ paddingLeft: "20px" }}
                    >
                      <img
                        src="https://becareskin.com/wp-content/themes/X-V1-21/assets/phone_icon.png"
                        width={32}
                        height={32}
                        className="mr-3 align-self-center"
                        alt="phone icon"
                      />
                      {appTheme == null ||
                      appTheme.phone_number_hotline == null ||
                      appTheme.phone_number_hotline === "" ||
                      appTheme.is_show_icon_hotline === false ? (
                        ""
                      ) : (
                        <div className="media-body d-md-flex flex-column d-none">
                          <span>Hỗ trợ khách hàng</span>
                          <a
                            className="font-weight-bold d-block"
                            href={"tel:" + appTheme.phone_number_hotline}
                          >
                            {appTheme.phone_number_hotline}
                          </a>
                        </div>
                      )}
                    </li>
                    <li className="ml-3 mr-3 mr-md-3 ml-md-3 media d-lg-flex d-none">
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
                    </li>
                    <li className="ml-2 mr-2 mr-md-2 ml-md-2 media d-lg-flex d-none">
                      <Notification
                        fontSize={24}
                        useIcon={true}
                        hideTitle={true}
                        colorText={appTheme.color_main_1}
                        colorIcon={appTheme.color_main_1}
                      ></Notification>
                    </li>

                    <li className="cartgroup ml-0 mr-2 mr-md-0">
                      <div className="mini-cart text-xs-center" id="minicart">
                        <Link
                          to="/gio-hang"
                          className="img_hover_cart"
                          title="Giỏ hàng"
                          rel="nofollow"
                        >
                          <img
                            src="https://becareskin.com/wp-content/themes/X-V1-21/assets/cart_icon.png"
                            width={24}
                            height={24}
                            alt="cart icon"
                          />
                          <span className="mx-2 d-xl-block d-none">
                            Giỏ hàng
                          </span>
                          <span className="count_item count_item_pr">
                            {" "}
                            {badges.cart_quantity}
                          </span>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          style={{ background: appTheme.color_main_1 ?? "#4a90e2" }}
          className="subheader"
        >
          <div className="container">
            <div
              className="toogle-nav-wrapper"
              style={{
                color: appTheme.color_main_1,
                width:
                  window.location.pathname === "/san-pham" ? "250px" : "257px",
              }}
            >
              <div className="icon-bar btn menu-bar mr-2 p-0 d-inline-flex">
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
              Danh mục sản phẩm
              <div className="navigation-wrapper ">
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
                            <span> {v.name}</span>
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
                                  Math.ceil(v.category_children.length / 8) > 1
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
              </div>
            </div>
            <ul className="shop-policises list-unstyled d-flex align-items-center flex-wrap m-0 pr-0">
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
            </ul>
          </div>
        </div>
      </Header10Styles>
    </React.Fragment>
  );
}
