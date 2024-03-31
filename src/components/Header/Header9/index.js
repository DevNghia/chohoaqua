import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from '../../../constants';
import { cartActions } from '../../../actions/cartActions';

import { userActions } from '../../../actions/userActions';
import { appActions } from '../../../actions/appActions';
import { Link } from 'react-router-dom';
import ProfileUser from '../../ProfileUser';
import BannerListNav from '../../../pages/Home/child/HomePage8/BannerListNav';
import './style.css';
import { allowCalculate } from '../dataset';
import Notification from '../../Notification';
import { Search } from '../../Search';

import { useLocation } from 'react-router-dom';
import { getListMenu } from '../../../utils/menuUtils';
import styled from 'styled-components';

const ContainerHeader9Styles = styled.div`
  @media screen and (max-width: 600px) {
    .mini-cart {
      display: none !important;
    }
  }
`;

export default function Header_9() {
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
      <ContainerHeader9Styles className="container-header-9">
        <div className="header-9">
          <header className="header sticker ">
            <div className="middle-header">
              <div className="container container-1">
                <div className="header-main">
                  {/* <div className="menu-bar hidden-lg">
                  <i aria-hidden="true" className="fa fa-bars" />
                </div> */}
                  <div className="logo section" id="Logo" name="Logo">
                    <div className="widget HTML" data-version={2} id="HTML0">
                      <Link className="logo-wrapper" to="/" title="Halugroup">
                        <img alt="Halugroup" className="img-responsive" src={appTheme.logo_url} />
                      </Link>
                    </div>
                  </div>
                  <div className="box-right" style={{ display: 'flex' }}>
                    <div style={{ margin: 'auto' }} className="search">
                      <i className="fa fa-search" style={{ color: appTheme.color_main_1 }} />
                      <div className="header_search search_form">
                        <div className="input-group search-bar search_form" onKeyDown={handleEnter}>
                          <input
                            style={{ height: '34px' }}
                            type="text"
                            autoComplete="off"
                            className="input-group-field st-default-search-input search-text"
                            name="q"
                            placeholder="Tìm kiếm ... "
                            value={searchValue}
                            onChange={handleInputChange}
                          />
                          <span className="input-group-btn">
                            <button tyle="button" className="btn icon-fallback-text">
                              <i className="fa fa-search" />
                            </button>
                          </span>
                        </div>
                        <Search searchValue={searchValue} top='40px'></Search>
                      </div>
                    </div>
                    <div
                      className="mini-cart text-xs-center"
                      style={{
                        margin: 'auto 25px auto auto',
                      }}
                    >
                      <div className="heading-cart">
                        <Link to="/gio-hang">
                          <i className="fa fa-shopping-cart" style={{ color: appTheme.color_main_1 }} />
                          <span
                            className="cartCount count_item_pr simpleCart_quantity"
                            id="cart-total"
                            style={{ background: appTheme.color_main_1 }}
                          >
                            {badges.cart_quantity}
                          </span>
                        </Link>
                      </div>
                      {/* <div className="top-cart-content hidden-sm hidden-xs">
                      <ul className="mini-products-list count_li" id="cart-sidebar">
                        <ul className="list-item-cart">
                          <div className="simpleCart_items" />
                        </ul>
                        <div className="wrap_total">
                          <div className="top-subtotal">Tổng tiền tạm tính: <span className="price simpleCart_total" /></div>
                        </div>
                        <div className="wrap_button">
                          <div className="actions">
                            <a className="btn btn-gray btn-cart-page pink" href="p/gio-hang.html"><span>Đến giỏ hàng</span></a><br />
                            <a className="btn btn-gray btn-checkout pink" href="p/thanh-toan.html" title="Tiến hành thanh toán"><span>Tiến hành thanh toán</span></a>
                          </div></div>
                      </ul>
                    </div> */}
                    </div>
                    <ProfileUser
                      colorText={appTheme.color_main_1}
                      colorIcon={appTheme.color_main_1}
                      styleObj={{
                        paddingTop: '0px',
                        cursor: 'pointer',
                      }}
                      accountInfoStyle={{
                        position: 'initial',
                        paddingBottom: '0px',
                        marginTop: '0px',
                      }}
                    />
                    <Notification
                      fontSize={24}
                      useIcon={true}
                      hideTitle={true}
                      colorText={appTheme.color_main_1}
                      colorIcon={appTheme.color_main_1}
                    ></Notification>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="main-nav" style={{ background: appTheme.color_main_1 }}>
            <div className="container">
              <nav>
                <ul className="nav hidden-sm hidden-xs" id="nav">
                  {getListMenu(appTheme).map((eleMenu) => (
                    <li className="nav-item ">
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
                {/* menu mobile */}
                <ul className="nav hidden-lg nav-mobile">
                  {/* <li class='nav-item active'> <a class='nav-link' href='/' title='Trang chủ'> Trang chủ </a> </li> <li class='nav-item'> <a class='nav-link' href='/p/gioi-thieu.html' title='Giới thiệu'> Giới thiệu </a> </li> <li class='nav-item'> <a class='nav-link' href='#' title='Lĩnh vực hoạt động'> Lĩnh vực hoạt động </a> <span class='open-close2'> <i aria-hidden='true' class='fa fa-angle-down'/> </span> <ul class='sub-menu-1' style='display: none'> <li class='dropdown-submenu nav-item-lv2'> <a class='nav-link' href='#' title='Thép'> <span>Thép</span> </a> <span class='open-close2'> <i aria-hidden='true' class='fa fa-angle-down'/> </span> <ul class='sub-menu-2' style='display: none'> <li class='nav-item-lv3'> <a class='nav-link' href='/ong-thep-han' title='Ống thép hàn'> Ống thép hàn </a> </li> <li class='nav-item-lv3'> <a class='nav-link' href='/thep-xay-dung-can-nong' title='Thép xây dựng cán nóng'> Thép xây dựng cán nóng </a> </li> </ul> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/ton-can-nguoi-kem' title='Tôn cán nguội - kẽm'> <span>Tôn cán nguội - kẽm</span> </a> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/bat-dong-san' title='Bất động sản'> <span>Bất động sản</span> </a> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/ung-dung-san-pham' title='Ứng dụng sản phẩm'> <span>Ứng dụng sản phẩm</span> </a> </li> </ul> </li> <li class='nav-item'> <a class='nav-link' href='/search/label/san-pham' title='Sản phẩm'> Sản phẩm </a> <span class='open-close2'> <i aria-hidden='true' class='fa fa-angle-down'/> </span> <ul class='sub-menu-1' style='display: none'> <li class='dropdown-submenu nav-item-lv2'> <a class='nav-link' href='/ong-thep-ma-kem-nhung-nong' title='Ống mạ kẽm nhúng nóng'> <span>Ống mạ kẽm nhúng nóng</span> </a> <span class='open-close2'> <i aria-hidden='true' class='fa fa-angle-down'/> </span> <ul class='sub-menu-2' style='display: none'> <li class='nav-item-lv3'> <a class='nav-link' href='#' title='Link 3'> Link 3 </a> </li> <li class='nav-item-lv3'> <a class='nav-link' href='#' title='Link 3'> Link 3 </a> </li> </ul> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/sat-xay-dung' title='Sắt xây dựng'> <span>Sắt xây dựng</span> </a> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/ong-ton-ma-kem' title='Ống tôn mạ mẽm'> <span>Ống tôn mạ mẽm</span> </a> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/ong-thep-co-lon' title='Ống thép cỡ lớn'> <span>Ống thép cỡ lớn</span> </a> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/ton-can-nguoi-mat-den' title='Tôn cán nguội mặt đen'> <span>Tôn cán nguội mặt đen</span> </a> </li> <li class='nav-item-lv2'> <a class='nav-link' href='/thep-xay-dung' title='Thép xây dựng'> <span>Thép xây dựng</span> </a> </li> </ul> </li> <li class='nav-item'> <a class='nav-link' href='/search/label/tin-tuc' title='Tin tức'> Tin tức </a> </li> <li class='nav-item'> <a class='nav-link' href='/p/thu-vien.html' title='Thư viện'> Thư viện </a> </li> <li class='nav-item'> <a class='nav-link' href='/p/tuyen-dung.html' title='Tuyển dụng'> Tuyển dụng </a> </li> <li class='nav-item'> <a class='nav-link' href='/p/lien-he.html' title='Liên hệ'> Liên hệ </a> </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </ContainerHeader9Styles>
    </React.Fragment>
  );
}
