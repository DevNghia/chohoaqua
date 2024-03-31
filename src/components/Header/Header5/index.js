import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from '../../../constants';
import { appActions } from '../../../actions/appActions';
import { userActions } from '../../../actions/userActions';
import { cartActions } from '../../../actions/cartActions';
import ProfileUser from '../../ProfileUser';
import { useLocation } from 'react-router-dom';
import Notification from '../../Notification';

import './style.css';
import { getListMenu } from '../../../utils/menuUtils';
import Search from '../../Search/Search.jsx';
export default function Header_2() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [currentActive, setCurrentActive] = useState('');
  const [isShowBanner, setIsShowBanner] = useState(true);

  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const notify = useSelector((state) => state.user.notify);
  const badges = useSelector((state) => state.user.badges);
  const isLoaded = useSelector((state) => state.app.isLoaded);
  const bannerAds = useSelector((state) => state.app.bannerAds);

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchValue(searchParams.get('search') ?? '');
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
    window.addEventListener('click', function (e) {
      let containers = document.querySelectorAll('.header-dropdown');
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].contains(e.target)) return;
      }
      setCurrentActive('');
    });
  }, []);

  function checkIsLoaded() {
    if (isLoaded === false) {
      const script1 = document.createElement('script');
      const script2 = document.createElement('script');
      const script3 = document.createElement('script');

      script1.src = '/js/theme_js_5/jquery.js';
      script1.async = true;
      script2.src = '/js/theme_js_5/core.js';
      script2.async = true;
      script3.src = '/js/theme_js_5/main.js';
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
    if (searchValue !== '') {
      var hostname = window.location.pathname;
      if (hostname.includes('/san-pham')) {
        elmLink.current.click();
        //Handle reset filter
        document.getElementById('filter_price_clear')?.click();
        document.getElementById('filter_attribute_clear')?.click();
      } else window.location.href = window.location.origin + '/san-pham?search=' + searchValue;
    }
  }
  function handleEnter(e) {
    e.preventDefault();
    if (e.key === 'Enter') handleSearch();
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
    toggleMenu('.categories-dropdown');
  }
  function toggleMenu(selector) {
    const menuToggle = document.querySelector(`${selector} .menu`);
    menuToggle.classList.toggle('active');
  }
  function handleToggleActive(type) {
    if (currentActive === type) {
      setCurrentActive('');
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
    handleToggleActive('notify');
    if (v.type === 'NEW_MESSAGE') {
      dispatch(appActions.setChatStatus('active'));
      return;
    }
    let arr = v.title.split(' ');
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
  return (
    <React.Fragment>
      <div style={{ display: 'none' }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <header className="header5">
        {bannerAds.status === c.SUCCESS && bannerAds.type_8.length > 0 && (
          <div className={`top-campaign-banner ${isShowBanner ? '' : 'hide'}`}>
            <div className="Module Module-1273">
              <div className="ModuleContent">
                <div className="top-campaign-banner-wrap" style={{ backgroundColor: '#d4145a' }}>
                  <div className="container" style={{ textAlign: 'center' }}>
                    {bannerAds.type_8.map((img) => (
                      <a href={img.link_to}>
                        <img alt="" src={img.image_url} />
                      </a>
                    ))}

                    <div className="campaign-banner-close" onClick={closeBanner}>
                      <span className="ri-close-line" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="top-header">
          <div className="container">
            <div className="top-header-wrap flex justify-between items-center">
              <div className="top-header-left Module Module-207">
                <div className="ModuleContent">
                  <div className="menu-wrapper">
                    <div className="menu flex items-center">
                      <ul className="flex items-center">
                        {getListMenu(appTheme).map((eleMenu) => (
                          <li>
                            <a
                              href={eleMenu.link_to}
                              to={{
                                pathname: eleMenu.link_to,
                                state: { prevPath: window.location.pathname },
                              }}
                              title={eleMenu.name}
                            >
                              <em className="ri-customer-service-2-line"></em>
                              {eleMenu.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top-header-right row">
                <div className="header-util-list flex items-center">
                  {appTheme.phone_number_hotline == null ||
                  appTheme.phone_number_hotline === '' ||
                  appTheme.is_show_icon_hotline === false ? (
                    ''
                  ) : (
                    <div className="header-util-item hotline-wrapper">
                      <div className="hotline">
                        <div className="Module Module-1269">
                          <div className="ModuleContent">
                            <span className="hidden-desktop">Hotline</span>
                            <a href={'tel:' + appTheme.phone_number_hotline}>
                              <em className="ri-phone-line" style={{ color: appTheme.color_main_1 }} />
                              <strong
                                style={{
                                  color: appTheme.color_main_1,
                                  fontSize: 16,
                                }}
                              >
                                {' '}
                                {appTheme.phone_number_hotline}{' '}
                              </strong>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    marginLeft: 15,
                    paddingBottom: '4px',
                  }}
                >
                  {' '}
                  <Notification fontSize={25} useIcon={true} hideTitle={true}></Notification>
                </div>

                <div
                  style={{
                    marginLeft: 15,
                    paddingRight: !tokenInfo ? null : 100,
                    width: !tokenInfo ? null : 130,
                    marginTop: -10,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {' '}
                  <ProfileUser />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="middle-header">
          <div className="container">
            <div className="row items-center">
              <div className="col col-lg-3">
                <div className="Module Module-216">
                  <div className="ModuleContent">
                    <div className="logo hidden-mobile">
                      <Link to="/">
                        <img
                          style={{
                            width: '180px',
                            height: '75px',
                            objectFit: 'contain',
                            marginRight: 100,
                            marginTop: 3,
                          }}
                          alt="logo"
                          src={appTheme.logo_url}
                        />
                      </Link>
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
              <div className="col col-lg-7 col-sm-8">
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
                      <a className="product-detail-search-toggle" href="Product/SearchResults.html">
                        <em className="ri-search-line" />
                      </a>
                    </li>
                  </ul>
                </div>

                <form onSave={handleSearch} className="search-wrapper Module Module-217">
                  <div
                    id="ctl00_mdl217_ctl00_Search_pnlSearch"
                    className="searchbox productsearchbox"
                    style={{
                      background: 'white',
                      position: 'relative',
                    }}
                  >
                    <input
                      value={searchValue}
                      onChange={handleInputChange}
                      type="text"
                      id="ctl00_mdl217_ctl00_Search_txtSearch"
                      title="Tìm kiếm"
                      className="searchinput search-text"
                      autoComplete="off"
                      placeholder="Bạn cần tìm sản phẩm gì?"
                      style={{ borderColor: appTheme.color_main_1 }}
                    />
                    <Search searchValue={searchValue}></Search>
                    <button
                      onClick={handleSearch}
                      id="ctl00_mdl217_ctl00_Search_btnSearch"
                      className="searchbutton"
                      style={{ background: appTheme.color_main_1 }}
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col col-lg-1 col-sm-2">
                <div className="cart-wrapper Module Module-218">
                  <div className="ModuleContent">
                    <div className="cart">
                      <div className="cart-toggle position-relative inline-block">
                        <Link to="/gio-hang">
                          <img src="/img/cart-5.png" alt="Cart icon" />
                        </Link>
                        <div
                          style={{ background: appTheme.color_main_1 }}
                          className="cart-amount flex flex-center rounded position-absolute background-main text-white"
                        >
                          {badges.cart_quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 hidden-mobile">
                <div className="vn-pay-wrapper Module Module-219">
                  <div className="ModuleContent" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu hidden-desktop">
          <div className="container">
            <div className="mobile-menu-wrap" />
            <div className="mobile-menu-tool">
              <div className="mobile-menu-social">
                <div className="Module Module-1281">
                  <div className="ModuleContent">
                    <div className="social-link">
                      {/*<div className="footer-title">
                        Kết nối với chúng tôi:&nbsp;
                      </div>
                      <ul>
                        <li>
                          <a href="https://www.facebook.com/SakukoStore/">
                            <img
                              alt="#"
                              src="Data/Sites/1/media/footer/fb.png"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/sakukostore/">
                            <img
                              alt="#"
                              src="Data/Sites/1/media/footer/instagram-(2).png"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="https://zalo.me/3381137266754915476">
                            <img
                              alt=""
                              src="Data/Sites/1/media/footer/logo-zalo.png"
                              style={{ width: "36px", height: "36px" }}
                            />
                          </a>
                        </li>
                      </ul>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
