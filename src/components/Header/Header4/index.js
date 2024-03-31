import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from '../../../constants';
import { appActions } from '../../../actions/appActions';
import { userActions } from '../../../actions/userActions';
import { cartActions } from '../../../actions/cartActions';
import ProfileUser from '../../ProfileUser';
import { useLocation } from 'react-router-dom';
import { allowCalculate } from '../dataset';
import Notification from '../../Notification';
import { Search } from '../../Search';

import './style.css';
import styled from 'styled-components';
import { getListMenu } from '../../../utils/menuUtils';

const HeaderNav4Styles = styled.div`
  .item_small.child li {
    a {
      white-space: nowrap;
    }
    .item_small_child {
      li {
        width: 220px;
        a {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-bottom: none !important;
          &:hover {
            color: #ff6200 !important;
          }
        }
      }
      overflow-x: auto;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      background-color: white;
      transform-origin: 0% 0%;
      box-shadow: 0 1px 2px 2px rgb(0 0 0 / 4%);
      z-index: 99;
      max-height: 0px;
      max-width: 0px;
      opacity: 0;
      transform: translateX(100%) perspective(600px) rotateX(-90deg);
      transition: transform 0.5s ease, opacity 0.6s ease, max-height 0.6s step-end, max-width 0.6s step-end,
        padding 0.6s step-end;
    }
    &:hover {
      .item_small_child {
        max-height: 3000px;
        max-width: 3000px;
        opacity: 1;
        transform: translateX(100%) perspective(600px) rotateX(0deg);
        transition: transform 0.5s ease, opacity 0.2s ease, max-height 0s step-end, max-width 0s step-end,
          padding 0s step-end;
      }
    }
  }
  @media screen and (max-width: 1320px) {
    .item_small.child li {
      .item_small_child {
        li {
          width: 190px;
        }
      }
    }
  }
  @media screen and (max-width: 1120px) {
    .item_small.child li {
      .item_small_child {
        li {
          width: 160px;
        }
      }
    }
  }
`;
const HeaderAdsStyles = styled.div`
  &.headerAds {
    background: rgba(248, 123, 167, 0.5);
    .headerAds__content {
      display: flex;
      justify-content: center;
      column-gap: 100px;
      padding: 10px 0;
      color: #a31c1c;
      .headerAds__item {
        position: relative;
        font-size: 18px;
      }
      .headerAds__item:nth-child(2)::before {
        content: '';
        position: absolute;
        z-index: 1000;
        top: 50%;
        left: -50px;
        width: 4px;
        height: 4px;
        border-radius: 100rem;
        background-color: #a31c1c;
        transform: translateY(-50%);
      }
      .headerAds__item:nth-child(2)::after {
        content: '';
        position: absolute;
        z-index: 1000;
        top: 50%;
        right: -50px;
        width: 4px;
        height: 4px;
        border-radius: 100rem;
        background-color: #a31c1c;
        transform: translateY(-50%);
      }
    }
  }
`;
const HeaderStyles = styled.div`
  @media only screen and (max-width: 760px) {
    .col-account {
      display: none !important;
    }
  }
  @media only screen and (max-width: 600px) {
    .col-logo {
      width: 100%;
      max-width: 100%;
      flex: auto;
      display: flex;
      justify-content: center;
    }
    .col-account {
      display: none;
    }
    .search-mobile {
      width: 85%;
      margin: 0 auto;
      .header_search {
        height: 35px !important;
        overflow: hidden;
        .input-group-btn {
          height: 35px !important;
          svg {
            width: 17px !important;
            height: 17px !important;
          }
        }
      }
      input {
        height: 32px !important;
        min-height: 32px !important;
        padding: 0 35px 0 30px !important;
      }
    }
  }
`;

export default function Header_2() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [currentActive, setCurrentActive] = useState('');
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
  return (
    <React.Fragment>
      <div style={{ display: 'none' }}>
        <Link ref={elmLink} to={`/san-pham?search=${searchValue}`}></Link>
      </div>
      {/* <HeaderAdsStyles className="headerAds">
        <div className="headerAds__content">
          <div className="headerAds__item">100% chính hãng</div>
          <div className="headerAds__item">Nhập SALEHEL125 giảm thêm 125k</div>
          <div className="headerAds__item">Freeship đơn hàng từ 199k</div>
        </div>
      </HeaderAdsStyles> */}
      <HeaderStyles className="header4">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-xl-2 col-md-2 col-6 col-logo">
              <Link to="/" className="logo">
                <img width={170} height={58} src={appTheme.logo_url} />
              </Link>
            </div>

            <div className="col-lg-7 col-xl-7 col-md-7 col-10 col-search order-3 order-md-2 search-lg">
              <div className="theme-search-smart">
                <div className="header_search theme-searchs">
                  <form
                    onSave={handleSearch}
                    className="input-group search-bar theme-header-search-form ultimate-search"
                  >
                    <input
                      type="text"
                      value={searchValue}
                      onChange={handleInputChange}
                      placeholder="Tìm kiếm sản phẩm..."
                      className="search-auto input-group-field auto-search search-text"
                      required
                    />
                    <span className="input-group-btn">
                      <button onClick={handleSearch} className="btn icon-fallback-text" aria-label="Justify">
                        <svg
                          enableBackground="new 0 0 612.01 612.01"
                          version="1.1"
                          viewBox="0 0 612.01 612.01"
                          xmlSpace="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m606.21 578.71-158.01-155.49c41.378-44.956 66.802-104.41 66.802-169.84-0.02-139.95-115.3-253.39-257.51-253.39s-257.49 113.44-257.49 253.39 115.28 253.39 257.49 253.39c61.445 0 117.8-21.253 162.07-56.586l158.62 156.1c7.729 7.614 20.277 7.614 28.006 0 7.747-7.613 7.747-19.971 0.018-27.585zm-348.72-110.91c-120.33 0-217.87-95.993-217.87-214.41s97.543-214.41 217.87-214.41c120.33 0 217.87 95.993 217.87 214.41s-97.542 214.41-217.87 214.41z" />
                        </svg>
                      </button>
                    </span>
                    <Search searchValue={searchValue}></Search>
                  </form>
                </div>
              </div>
              <div className="contact-phone">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{
                    margin: 'auto',
                    display: 'block',
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    left: 0,
                  }}
                  width="71px"
                  height="71px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle cx={50} cy={50} r="39.7789" fill="none" stroke="#fff000" strokeWidth={8}>
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0;40"
                      keyTimes="0;1"
                      keySplines="0 0.2 0.8 1"
                      calcMode="spline"
                      begin="-0.5s"
                    />
                    <animate
                      attributeName="opacity"
                      repeatCount="indefinite"
                      dur="1s"
                      values="1;0"
                      keyTimes="0;1"
                      keySplines="0.2 0 0.8 1"
                      calcMode="spline"
                      begin="-0.5s"
                    />
                  </circle>
                  <circle cx={50} cy={50} r="24.6446" fill="none" stroke="#fff000" strokeWidth={8}>
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0;40"
                      keyTimes="0;1"
                      keySplines="0 0.2 0.8 1"
                      calcMode="spline"
                    />
                    <animate
                      attributeName="opacity"
                      repeatCount="indefinite"
                      dur="1s"
                      values="1;0"
                      keyTimes="0;1"
                      keySplines="0.2 0 0.8 1"
                      calcMode="spline"
                    />
                  </circle>
                </svg>
                <p>Tư vấn hỗ trợ</p>
                {appTheme == null ||
                appTheme.phone_number_hotline == null ||
                appTheme.phone_number_hotline === '' ||
                appTheme.is_show_icon_hotline === false ? (
                  '...'
                ) : (
                  <a href={`tel:${appTheme.phone_number_hotline}`}> {appTheme.phone_number_hotline}</a>
                )}
              </div>
            </div>

            <div className="col-lg-3 col-xl-3 col-md-3 col-6 col-account order-2 order-md-3">
              <ul
                className="group-account"
                style={{
                  justifyContent: 'flex-end',
                }}
              >
                <li
                  className="account d-none d-lg-inline-block"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <ProfileUser
                    accountInfoStyle={{
                      width: 'auto',
                      position: 'relative',
                    }}
                  />
                </li>

                <li className="cart-drop">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1s"
                      x="0px"
                      y="0px"
                      viewBox="0 0 489 489"
                      style={{ enableBackground: 'new 0 0 489 489' }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3   c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1   C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462   H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41   c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z" />
                      </g>
                    </svg>
                    <Link
                      to="/gio-hang"
                      className="img_hover_cart"
                      title="Giỏ hàng"
                      style={{
                        fontSize: 14,
                      }}
                    >
                      <span class="count_item count_item_pr hidden-count"> {badges.cart_quantity}</span>
                      Giỏ hàng
                    </Link>
                  </div>
                  <div className="top-cart-content d-none">
                    <div className="CartHeaderContainer"></div>
                  </div>
                </li>

                <Notification
                  useIcon={true}
                  hideTitle={true}
                  style={{
                    header_dropdown: {
                      paddingBottom: '10px',
                    },
                    margin: '0 auto',
                  }}
                ></Notification>
              </ul>
            </div>
          </div>
          <div className="col-lg-12 col-xl-12 col-md-12 col-12 col-search order-3 order-md-2 search-mobile">
            <div className="theme-search-smart">
              <div className="header_search theme-searchs">
                <form onSave={handleSearch} className="input-group search-bar theme-header-search-form ultimate-search">
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={searchValue}
                      onChange={handleInputChange}
                      placeholder="Tìm kiếm sản phẩm..."
                      className="search-auto input-group-field auto-search search-text"
                      required
                    />
                  </div>
                  <span className="input-group-btn">
                    <button onClick={handleSearch} className="btn icon-fallback-text" aria-label="Justify">
                      <svg
                        enableBackground="new 0 0 612.01 612.01"
                        version="1.1"
                        viewBox="0 0 612.01 612.01"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m606.21 578.71-158.01-155.49c41.378-44.956 66.802-104.41 66.802-169.84-0.02-139.95-115.3-253.39-257.51-253.39s-257.49 113.44-257.49 253.39 115.28 253.39 257.49 253.39c61.445 0 117.8-21.253 162.07-56.586l158.62 156.1c7.729 7.614 20.277 7.614 28.006 0 7.747-7.613 7.747-19.971 0.018-27.585zm-348.72-110.91c-120.33 0-217.87-95.993-217.87-214.41s97.543-214.41 217.87-214.41c120.33 0 217.87 95.993 217.87 214.41s-97.542 214.41-217.87 214.41z" />
                      </svg>
                    </button>
                  </span>
                </form>
              </div>
                    <Search searchValue={searchValue}></Search>
            </div>
            <div className="contact-phone">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                  margin: 'auto',
                  display: 'block',
                  position: 'absolute',
                  width: '30px',
                  height: '30px',
                  left: 0,
                }}
                width="71px"
                height="71px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle cx={50} cy={50} r="39.7789" fill="none" stroke="#fff000" strokeWidth={8}>
                  <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;40"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                    begin="-0.5s"
                  />
                  <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                    begin="-0.5s"
                  />
                </circle>
                <circle cx={50} cy={50} r="24.6446" fill="none" stroke="#fff000" strokeWidth={8}>
                  <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;40"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                  />
                  <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                  />
                </circle>
              </svg>
              <p>Tư vấn hỗ trợ</p>
              {appTheme == null ||
              appTheme.phone_number_hotline == null ||
              appTheme.phone_number_hotline === '' ||
              appTheme.is_show_icon_hotline === false ? (
                '...'
              ) : (
                <a href={`tel:${appTheme.phone_number_hotline}`}> {appTheme.phone_number_hotline}</a>
              )}
            </div>
          </div>
        </div>
      </HeaderStyles>
      <HeaderNav4Styles className="header_nav_main4 header-menu d-none d-lg-block clearfix">
        <div className="container">
          <div className="heade_menunavs">
            <div className="wrap_main d-flex">
              <div className="bg-header-nav">
                <nav className="header-nav">
                  <ul className="item_big">
                    {appTheme != null && appTheme.is_use_custom_menu == true ? (
                      getListMenu(appTheme).map((eleMenu) => (
                        <li className="nav-item  ">
                          <a
                            href={eleMenu.link_to}
                            className="a-img "
                            to={{
                              pathname: eleMenu.link_to,
                              state: { prevPath: window.location.pathname },
                            }}
                            title={eleMenu.name}
                          >
                            {eleMenu.name}
                          </a>
                        </li>
                      ))
                    ) : (
                      <>
                        {window.location.pathname === '/san-pham' ? (
                          <li className="nav-item  ">
                            <Link className="a-img " to="/san-pham" title="Sản phẩm">
                              Sản phẩm
                            </Link>
                          </li>
                        ) : (
                          <li className="nav-item  ">
                            <Link className="a-img caret-down" to="/san-pham" title="Sản phẩm">
                              Sản phẩm
                            </Link>
                            <ul className="item_small child">
                              {categories.length > 0
                                ? categories.map((v, i) => (
                                    <li>
                                      <Link to={`/san-pham?danh-muc=${v.slug}-${v.id}`} title="Áo nam">
                                        {v.name}
                                      </Link>
                                      {v.category_children.length > 0 && (
                                        <ul
                                          className="item_small_child"
                                          style={{
                                            columnCount:
                                              Math.ceil(v.category_children.length / categories.length) > 4
                                                ? 4
                                                : Math.ceil(v.category_children.length / categories.length),
                                          }}
                                        >
                                          {v.category_children.map((v, i) => (
                                            <li key={v.id}>
                                              <Link to={`/san-pham?danh-muc=${v.slug}-${v.id}`}>{v.name}</Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  ))
                                : null}
                            </ul>
                          </li>
                        )}
                        <li className="nav-item  ">
                          <Link
                            to={{
                              pathname: '/tin-tuc',
                              state: { prevPath: window.location.pathname },
                            }}
                            className="nav-link"
                          >
                            Tin tức{' '}
                          </Link>
                        </li>
                        <li className="nav-item  ">
                          <Link
                            to={{
                              pathname: '/ma-giam-gia',
                              state: { prevPath: window.location.pathname },
                            }}
                            className="nav-link"
                          >
                            Voucher{' '}
                          </Link>
                        </li>
                        <li className="nav-item  ">
                          <Link
                            to={{
                              pathname: '/combo-giam-gia',
                              state: { prevPath: window.location.pathname },
                            }}
                            className="nav-link"
                          >
                            Combo tặng thưởng{' '}
                          </Link>
                        </li>
                        {allowCalculate() == true && (
                          <li className="nav-item  ">
                            <Link
                              to={{
                                pathname: '/bao-gia',
                                state: { prevPath: window.location.pathname },
                              }}
                              className="nav-link"
                            >
                              Báo giá{' '}
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </HeaderNav4Styles>
    </React.Fragment>
  );
}
