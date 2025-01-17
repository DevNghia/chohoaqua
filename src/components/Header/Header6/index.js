import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { cartActions } from "../../../actions/cartActions";
import ProfileUser from "../../ProfileUser";
import { useLocation } from "react-router-dom";
import { allowCalculate } from "../dataset";
import Notification from "../../Notification";
import Search from "../../Search/Search.jsx";

import "./style.css";
export default function Header_6() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const [isLoadedHeader, setIsLoaded] = useState(false);
  const [isShowBanner, setIsShowBanner] = useState(true);

  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const categories = useSelector((state) => state.category.categories);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const profile = useSelector((state) => state.user.profile);
  const notify = useSelector((state) => state.user.notify);
  const badges = useSelector((state) => state.user.badges);
  const isLoaded = useSelector((state) => state.app.isLoaded);

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

  function checkIsLoaded() {
    if (isLoaded === false) {
      const script1 = document.createElement("script");
      const script2 = document.createElement("script");
      const script3 = document.createElement("script");

      script1.src = "/js/theme_js_5/jquery.js";
      script1.async = true;
      script2.src = "/js/theme_js_5/core.js";
      script2.async = true;
      script3.src = "/js/theme_js_5/main.js";
      script3.async = true;

      document.body.appendChild(script1);
      document.body.appendChild(script2);
      document.body.appendChild(script3);

      dispatch({ type: c.SET_IS_LOADED, data: true });
    }
  }

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
    e.preventDefault();
    if (e.key === "Enter") handleSearch();
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

  function closeBanner() {
    setIsShowBanner(false);
  }

  const menuItems = [
    ["Đồng giá", "/img/menu_img2.webp", "/img/menu_img2_hover.webp"],
    ["Mẹ và bé", "/img/menu_img3.webp", "/img/menu_img3_hover.webp"],
    ["Mỹ phẩm", "/img/menu_img4.webp", "/img/menu_img4_hover.webp"],
    ["Đồ gia dụng", "/img/menu_img5.webp", "/img/menu_img5_hover.webp"],
    ["Thực phẩm chức năng", "/img/menu_img6.webp", "/img/menu_img6_hover.webp"],
    ["Thực phẩm", "/img/menu_img7.webp", "/img/menu_img7_hover.webp"],
    ["Hàng mới về", "/img/menu_img8.webp", "/img/menu_img8_hover.webp"],
  ];

  function renderMenuItems(index, value) {
    var items = [];
    if (categories[index]) {
      items.push(
        <li>
          <Link
            to={`/san-pham?danh-muc=${categories[index].slug}-${categories[index].id}`}
            className="menu-link text-center"
          >
            <div className="menu-img">
              <img src={value[1]} alt={value[0]} />
            </div>
            <div className="menu-img-hover">
              <img src={value[2]} alt={value[0]} />
            </div>
          </Link>
          <Link
            to={`/san-pham?danh-muc=${categories[index].slug}-${categories[index].id}`}
            className="menu-title"
          >
            {value[0]}
          </Link>
        </li>
      );
    } else {
      items.push(
        <li>
          <Link to="#" className="menu-link text-center">
            <div className="menu-img">
              <img src={value[1]} alt={value[0]} />
            </div>
            <div className="menu-img-hover">
              <img src={value[2]} alt={value[0]} />
            </div>
          </Link>
          <Link to="#" className="menu-title">
            {value[0]}
          </Link>
        </li>
      );
    }
    return items;
  }

  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <header className="header6">
        {/* Top bar */}
        <div id="top-bar" className="header-top">
          <div className="container">
            <div className="row">
              <div className="col-12 contact">
                <i className="fa fa-phone-alt"></i>{" "}
                <span>
                  <a href={"tel:" + appTheme.phone_number_hotline}>
                    {appTheme.phone_number_hotline}
                  </a>
                </span>
                <i className="fa fa-envelope"></i>{" "}
                <span>
                  <a href={"mailto:" + appTheme.contact_email}>
                    {appTheme.contact_email}
                  </a>
                </span>
              </div>
              <div className="col-9 search-bar">
                <form
                  onSave={handleSearch}
                  className="search-wrapper Module Module-217"
                >
                  <div
                    id="ctl00_mdl217_ctl00_Search_pnlSearch"
                    className="searchbox productsearchbox"
                    style={{ background: "white" }}
                  >
                    <div style={{ position: "relative", width: "100%" }}>
                      <input
                        value={searchValue}
                        onChange={handleInputChange}
                        type="text"
                        id="ctl00_mdl217_ctl00_Search_txtSearch"
                        title="Tìm kiếm..."
                        className="searchinput search-text"
                        autoComplete="off"
                        placeholder="Bạn cần tìm sản phẩm gì?"
                      />
                      <Search searchValue={searchValue}></Search>
                    </div>
                    <button
                      onClick={handleSearch}
                      id="ctl00_mdl217_ctl00_Search_btnSearch"
                      className="searchbutton"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-2 cart-icon">
                <div className="cart-wrapper Module Module-218">
                  <div className="ModuleContent">
                    <div className="cart">
                      <div className="cart-toggle position-relative inline-block">
                        <Link to="/gio-hang">
                          <img src="/img/cart-5.png" alt="Cart icon" />
                        </Link>
                        <div className="cart-amount flex flex-center rounded position-absolute background-main text-white">
                          <Link to="/gio-hang">{badges.cart_quantity}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End top bar */}
        <div className="top-header">
          <div className="container">
            <div className="top-header-wrap flex justify-between items-center">
              {/* Logo */}
              <div className="col-2">
                <div className="Module Module-216">
                  <div className="ModuleContent">
                    <div className="logo hidden-mobile">
                      <a href="/" title="Trang chủ">
                        <img src={appTheme.logo_url} />
                      </a>
                    </div>
                  </div>
                </div>
                <a
                  className="product-detail-back-btn hidden-desktop"
                  href="#"
                  onclick="window.history.go(-1); return false;"
                >
                  <em className="ri-arrow-left-s-line" />
                </a>
              </div>
              {/* End logo */}
              {/* Search */}
              <div className="col-5">
                <div className="product-detail-menu hidden-desktop">
                  <ul>
                    <li>
                      <a href="index.html">
                        <em className="ri-home-2-line" />
                      </a>
                    </li>
                    <li>
                      <a className="product-detail-menu-toggle" href="#">
                        <em className="ri-list-unordered" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="product-detail-search-toggle"
                        href="Product/SearchResults.html"
                      >
                        <em className="ri-search-line" />
                      </a>
                    </li>
                  </ul>
                </div>

                <form
                  onSave={handleSearch}
                  className="search-wrapper Module Module-217"
                >
                  <div
                    id="ctl00_mdl217_ctl00_Search_pnlSearch"
                    className="searchbox productsearchbox"
                    style={{ background: "white", position: "relative" }}
                  >
                    <input
                      value={searchValue}
                      onChange={handleInputChange}
                      type="text"
                      id="ctl00_mdl217_ctl00_Search_txtSearch"
                      title="Tìm kiếm"
                      className="searchinput"
                      autoComplete="off"
                      placeholder="Bạn cần tìm sản phẩm gì?"
                    />
                    <Search searchValue={searchValue}></Search>
                    <button
                      onClick={handleSearch}
                      id="ctl00_mdl217_ctl00_Search_btnSearch"
                      className="searchbutton"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              {/* End search */}

              <div className="top-header-right">
                <div className="header-util-list flex items-center">
                  {appTheme.phone_number_hotline == null ||
                  appTheme.phone_number_hotline === "" ||
                  appTheme.is_show_icon_hotline === false ? (
                    ""
                  ) : (
                    <div
                      className="header-util-item hotline-wrapper"
                      style={{
                        marginRight: 30,
                        marginBottom: -12,
                      }}
                    >
                      <div className="hotline">
                        <div className="Module Module-1269">
                          <div className="ModuleContent">
                            <span className="hidden-desktop">Hotline</span>
                            <a href={"tel:" + appTheme.phone_number_hotline}>
                              <img src="/img/hotline.png" alt="" />
                              <span>Bán Hàng </span>
                              <strong>{appTheme.phone_number_hotline}</strong>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      width: "auto",
                    }}
                  >
                    <Notification
                      fontSize={24}
                      useIcon={true}
                      hideTitle={true}
                    ></Notification>{" "}
                  </div>
                  <div
                    style={{
                      width: "auto",
                    }}
                  >
                    <ProfileUser
                      hideIcon={true}
                      accountInfoStyle={{ position: "unset" }}
                    />
                  </div>

                  <div
                    className="col col-lg-1 col-sm-2"
                    style={{ marginLeft: "0.5em" }}
                  >
                    <div className="cart-wrapper Module Module-218">
                      <div className="ModuleContent">
                        <div className="cart">
                          <div className="cart-toggle position-relative inline-block">
                            <Link to="/gio-hang">
                              <img src="/img/cart-5.png" alt="Cart icon" />
                            </Link>
                            <div className="cart-amount flex flex-center rounded position-absolute background-main text-white">
                              <Link to="/gio-hang" style={{ color: "#fff" }}>
                                {badges.cart_quantity}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="middle-header">
          <div className="container">
            <div className="row items-center">
              {/* Menu */}
              <div className="top-header-left Module Module-207">
                <div className="ModuleContent">
                  <div className="menu-wrapper">
                    <div className="menu flex items-center row">
                      <ul className="flex items-center col-12 text-center">
                        <li>
                          <a href="/tin-tuc" className="menu-link text-center">
                            <div className="menu-img">
                              <img
                                width={50}
                                src="/img/logo-daika.png"
                                alt="Về chúng tôi"
                              />
                            </div>
                            <div className="menu-img-hover">
                              <img
                                width={50}
                                src="/img/logo-daika-hover.png"
                                alt="Về chúng tôi"
                              />
                            </div>
                          </a>
                          <a href="/" className="menu-title">
                            Về chúng tôi
                          </a>
                        </li>
                        {menuItems.map((v, i) => {
                          return renderMenuItems(i, v);
                        })}
                        <li>
                          <Link
                            to="/ma-giam-gia"
                            className="menu-link text-center"
                          >
                            <div className="menu-img">
                              <img src="/img/menu_img9.webp" alt="Voucher" />
                            </div>
                            <div className="menu-img-hover">
                              <img
                                src="/img/menu_img9_hover.webp"
                                alt="Voucher"
                              />
                            </div>
                          </Link>
                          <Link
                            to={{
                              pathname: "/ma-giam-gia",
                              state: { prevPath: window.location.pathname },
                            }}
                            className="menu-title"
                          >
                            Voucher
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/combo-giam-gia"
                            className="menu-link text-center"
                          >
                            <div className="menu-img">
                              <img
                                src="/img/menu_img9.webp"
                                alt="Combo Giảm giá"
                              />
                            </div>
                            <div className="menu-img-hover">
                              <img
                                src="/img/menu_img9_hover.webp"
                                alt="Combo Giảm giá"
                              />
                            </div>
                          </Link>
                          <Link
                            to={{
                              pathname: "/combo-giam-gia",
                              state: { prevPath: window.location.pathname },
                            }}
                            className="menu-title"
                          >
                            Combo tặng thưởng
                          </Link>
                        </li>

                        {allowCalculate() == true && (
                          <li>
                            <Link
                              to="/bao-gia"
                              className="menu-link text-center"
                            >
                              <div className="menu-img">
                                <img src="/img/menu_img9.webp" alt="Báo giá" />
                              </div>
                              <div className="menu-img-hover">
                                <img
                                  src="/img/menu_img9_hover.webp"
                                  alt="Báo giá"
                                />
                              </div>
                            </Link>
                            <Link
                              to={{
                                pathname: "/bao-gia",
                                state: { prevPath: window.location.pathname },
                              }}
                              className="menu-title"
                            >
                              Báo giá
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* End menu */}

              <div className="col-lg-2 hidden-mobile">
                <div className="vn-pay-wrapper Module Module-219">
                  <div className="ModuleContent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
