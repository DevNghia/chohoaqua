import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from '../../../constants';
import { cartActions } from '../../../actions/cartActions';

import { userActions } from '../../../actions/userActions';
import { appActions } from '../../../actions/appActions';
import { Link } from 'react-router-dom';
import ProfileUser from '../../ProfileUser';
import BannerListNav from '../../../pages/Home/child/HomePage8/BannerListNav';
import Notification from '../../Notification';

import './style.css';
import { useLocation } from 'react-router-dom';
import Search from '../../Search/Search.jsx';
export default function Header_8() {
  const notify = useSelector((state) => state.user.notify);
  const dispatch = useDispatch();
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const profile = useSelector((state) => state.user.profile);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const [currentActive, setCurrentActive] = useState('');
  const badges = useSelector((state) => state.user.badges);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const [searchValue, setSearchValue] = useState('');
  const appTheme = useSelector((state) => state.app.appTheme);
  const bannerAds = useSelector((state) => state.app.bannerAds);
  const category = useSelector((state) => state.category);

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
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

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }
  function handleToggleActive(type) {
    if (currentActive === type) {
      setCurrentActive('');
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
    if (e.key === 'Enter') handleSearch();
  }
  return (
    <React.Fragment>
      <div style={{ display: 'none' }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      <header className="sticky header8">
        <div style={{ background: appTheme.color_main_1 }} className="header-list">
          <div className="container row ">
            <div className="col-md icon-nav-top-header hidden-mobiles">
              <div className="dropbtn hidden-mobiles">
                <i class="fas fa-bars"></i>
              </div>
              <div className="nav-list-content">
                <BannerListNav categories={category.categories} />
              </div>
            </div>
            <div className="col-3 col-xs-12 col-md-2 text-lg-left">
              <Link to="/">
                <img className="logo-top-nav" src={appTheme.logo_url} alt="" />
              </Link>
            </div>
            <div class="cps-group-input col-8 col-md-4 col-xs-12" onKeyDown={handleEnter}>
              <div class="input-group-btn ">
                <i class="fas fa-search"></i>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  style={{
                    marginBottom: 11,
                  }}
                  type="text"
                  name="q"
                  id="search"
                  class="cps-input cta-search search-text"
                  placeholder="Bạn cần tìm gì?"
                  maxlength="128"
                  size={50}
                  autocomplete="off"
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <Search searchValue={searchValue}></Search>
              </div>
            </div>
            <div
              // className="box-about col-xs-12 col-md-6  row"
              className="box-about row"
              style={{
                whiteSpace: 'nowrap',
                marginLeft: 'auto',
              }}
            >
              <a href={`tel:${appTheme.phone_number_hotline}`}>
                <button className="item-about about-1 hidden-mobile about-contact cta-goi-mua-hang">
                  <div className="about__box-icon">
                    <img src="/img/icon-phone.png" />
                  </div>
                  <div class="about__box-content">
                    <p class="mb-0 title">
                      Gọi mua hàng
                      <br />
                      {appTheme == null ||
                      appTheme.phone_number_hotline == null ||
                      appTheme.phone_number_hotline === '' ||
                      appTheme.is_show_icon_hotline === false ? (
                        ''
                      ) : (
                        <span
                          style={{
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 'bold',
                          }}
                        >
                          {appTheme.phone_number_hotline}
                        </span>
                      )}
                    </p>
                  </div>
                </button>
              </a>
              <Link to="/gio-hang">
                <div className="item-about hidden-mobiles about-4 about-cart cta-gio-hang">
                  <div className="about__box-icon">
                    <img
                      style={{
                        width: '32px',
                        marginTop: '8px',
                        maxWidth: 'none',
                      }}
                      src="/img/Icongiohang.png"
                      alt="IconCart"
                    />
                    {badges.cart_quantity == 0 ? (
                      <div className="number-cart">{null}</div>
                    ) : (
                      <div className="number">{badges.cart_quantity}</div>
                    )}
                  </div>
                  <div
                    class="about__box-content"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <p class="mb-0 title">Giỏ hàng</p>
                  </div>
                </div>
              </Link>
              <div style={{ marginTop: '13px' }}>
                <Notification
                  fontSize={24}
                  useIcon={true}
                  hideTitle={true}
                  colorText={'white'}
                  colorIcon={'white'}
                ></Notification>
              </div>
              <div
                style={{
                  paddingTop: 3,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ProfileUser colorText={'white'} colorIcon={'white'} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
