import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from '../../../constants';
import { appActions } from '../../../actions/appActions';
import { userActions } from '../../../actions/userActions';
import { cartActions } from '../../../actions/cartActions';
import './style.css';
import Notification from '../../Notification';
import { useLocation } from 'react-router-dom';
import ProfileUser from '../../ProfileUser';
import styled from 'styled-components';
import { getListMenu } from '../../../utils/menuUtils';
import { Search } from '../../Search';

const Header3Styles = styled.div`
  @media screen and (max-width: 1200px) {
    .container {
      .row {
        justify-content: center;
        .col-xl-2 {
          flex: 0 0 auto;
          width: 16.6666666667% !important;
        }
        .col-xl-5-r {
          flex: 0 0 auto;
          width: auto !important;
        }
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

      <Header3Styles className="header3">
        <div className="middle-header" style={{ background: appTheme.color_main_1 }}>
          <div className="container">
            <div className="row align-items-center row-item">
              <div className="col-xl-3 header-left">
                <div className="">
                  <div className="wrap_main">
                    <div className="bg-header-nav ">
                      <nav className="header-nav">
                        <ul className="item_big">
                          {getListMenu(appTheme).map((eleMenu) =>
                            eleMenu.name === 'Báo giá' ? null : (
                              <li className="nav-item  has-mega">
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
                            ),
                          )}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 " style={{ textAlign: 'center' }}>
                <Link
                  to="/"
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img className="logo" src={appTheme.logo_url} alt="ND Fresh" />
                </Link>
              </div>
              <div
                className={
                  !tokenInfo
                    ? 'col-xl-5-r col-lg-9 col-md-9 header-right'
                    : 'col-xl-5-r col-lg-9 col-md-9 header-right-2'
                }
              >
                <div className="nd-header-search nd-searchs">
                  <form className="nd-header-search-form" onSave={handleSearch}>
                    <input
                      style={{
                        'margin-top': '5px',
                      }}
                      type="text"
                      className="search-auto form-control search-text"
                      value={searchValue}
                      onChange={handleInputChange}
                      placeholder="Tìm kiếm sản phẩm..."
                      autoComplete="off"
                    />
                    <input type="hidden" name="type" defaultValue="product" />
                    <button onClick={handleSearch} className="btn btn-default">
                      <svg class="Icon Icon--search-desktop" viewBox="0 0 21 21">
                        <g
                          transform="translate(1 1)"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="square"
                        >
                          <path d="M18 18l-5.7096-5.7096"></path>
                          <circle cx="7.2" cy="7.2" r="7.2"></circle>
                        </g>
                      </svg>
                    </button>
                  </form>
                  <Search searchValue={searchValue} width="350px" position="right"></Search>
                </div>
                <div className="header-page-link">
                  <ul className="group-account" style={{ display: 'flex', alignItems: 'center' }}>
                    <li className="cart-drop">
                      <div className="icon">
                        <Link to="/gio-hang" className="nd-header-cart" aria-label="Xem giỏ hàng" title="Giỏ hàng">
                          <svg
                            enableBackground="new 0 0 407.453 407.453"
                            version="1.1"
                            viewBox="0 0 407.45 407.45"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {' '}
                            <g fill="#010002">
                              {' '}
                              <path d="m255.1 116.52c4.487 0 8.129-3.633 8.129-8.129 0-4.495-3.642-8.129-8.129-8.129h-111.61c-4.487 0-8.129 3.633-8.129 8.129 0 4.495 3.642 8.129 8.129 8.129h111.61z" />{' '}
                              <path d="m367.06 100.26h-55.372c-4.487 0-8.129 3.633-8.129 8.129 0 4.495 3.642 8.129 8.129 8.129h47.243v274.68h-310.41v-274.68h44.536c4.487 0 8.129-3.633 8.129-8.129 0-4.495-3.642-8.129-8.129-8.129h-52.664c-4.487 0-8.129 3.633-8.129 8.129v290.94c0 4.495 3.642 8.129 8.129 8.129h326.67c4.487 0 8.129-3.633 8.129-8.129v-290.94c0-4.495-3.634-8.128-8.129-8.128z" />{' '}
                              <path d="m282.59 134.8c4.487 0 8.129-3.633 8.129-8.129v-59.273c-1e-3 -37.156-40.115-67.394-89.618-67.394-49.308 0-89.414 30.238-89.414 67.394v59.274c0 4.495 3.642 8.129 8.129 8.129s8.129-3.633 8.129-8.129v-59.274c0-28.198 32.823-51.137 73.36-51.137 40.334 0 73.157 22.939 73.157 51.137v59.274c-1e-3 4.495 3.633 8.128 8.128 8.128z" />{' '}
                              <path d="m98.892 147.57c0 11.526 9.389 20.907 20.923 20.907s20.923-9.38 20.923-20.907c0-4.495-3.642-8.129-8.129-8.129s-8.129 3.633-8.129 8.129c0 2.561-2.089 4.65-4.666 4.65-2.569 0-4.666-2.089-4.666-4.65 0-4.495-3.642-8.129-8.129-8.129s-8.127 3.634-8.127 8.129z" />{' '}
                              <path d="m282.59 168.47c11.534 0 20.923-9.38 20.923-20.907 0-4.495-3.642-8.129-8.129-8.129s-8.129 3.633-8.129 8.129c0 2.561-2.089 4.65-4.666 4.65s-4.666-2.089-4.666-4.65c0-4.495-3.642-8.129-8.129-8.129s-8.129 3.633-8.129 8.129c2e-3 11.526 9.39 20.907 20.925 20.907z" />{' '}
                            </g>{' '}
                          </svg>
                          <span className="count_item_pr">{badges.cart_quantity}</span>
                        </Link>
                      </div>
                      <div className="top-cart-content">
                        <div className="CartHeaderContainer"></div>
                      </div>
                    </li>
                    <li
                      style={{
                        marginLeft: '10px',
                      }}
                    >
                      <Notification
                        fontSize={25}
                        useIcon={true}
                        hideTitle={true}
                        colorText={'#fff'}
                        colorIcon={'#fff'}
                      ></Notification>{' '}
                    </li>
                    <li>
                      <ProfileUser colorText={'#fff'} colorIcon={'#fff'} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header3Styles>
    </React.Fragment>
  );
}
