import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { userActions } from "../../../actions/userActions";
import ProfileUser from "../../ProfileUser";
import { constants as c } from "../../../constants";
import { cartActions } from "../../../actions/cartActions";
import { appActions } from "../../../actions/appActions";
import { getListMenu } from "../../../utils/menuUtils";
import { Search } from "../../Search";

const Header11Styles = styled.header`
  .header__top {
    padding: 10px 30px;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    .header__top-right {
      a {
        display: flex;
        column-gap: 5px;
        align-items: center;
        color: #ffffff;
      }
    }
  }
  .header__content {
    padding: 15px 0;
    background-color: white;
    .header__content__inner {
      padding: 0 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header__content-left {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 0.6;
        .header__content__logo {
          margin-right: auto;
        }
      }
      .header__content__logo {
        height: 40px;
        flex-shrink: 0;
        img {
          height: 100%;
          width: 100px;
          object-fit: cover;
        }
      }
      .header__content__navbar-menu {
        & > ul {
          display: flex;
          align-items: center;
          & > li {
            padding: 15px 10px;
            a {
              text-transform: uppercase;
              font-size: 14px;
              line-height: 21px;
              font-weight: bold;
              color: rgba(7, 7, 7, 0.5);
            }
            &.header__content__navbar-menu__product {
              position: relative;
              a {
                display: flex;
                align-items: center;
                column-gap: 5px;
              }
              &:hover .fadeInDownBigAnimation {
                opacity: 1;
                visibility: visible;
                animation: fadeInDownBigAnimation 0.5s ease-in-out 1;
              }
              .header__content__navbar-menu__category {
                position: absolute;
                top: 100%;
                left: 0;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.5s;
                display: flex;
                flex-direction: column;
                box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.08);
                background-color: white;
                grid-gap: 0 !important;
                li {
                  padding: 10px;
                  a {
                    text-transform: none;
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  &:hover .header__content__navbar-menu__category__child {
                    opacity: 1;
                    visibility: visible;
                  }
                  .header__content__navbar-menu__category__child {
                    position: absolute;
                    left: 100%;
                    top: 0;
                    height: 100%;
                    background-color: white;
                    overflow-x: auto;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.5s;
                  }
                }
              }
            }
          }
        }
      }
      .header__content__navbar-info {
        .header__content__navbar-info__content {
          display: flex;
          align-items: center;
          li {
            padding: 10px 15px;
            cursor: pointer;
            &.header__content__navbar-info__search {
              position: relative;
              span {
                svg {
                  width: 30px;
                  height: 30px;
                }
              }
              &:hover .fadeInDownAnimation {
                opacity: 1;
                visibility: visible;
                /* animation: fadeInDownAnimation 0.5s ease-in-out 1; */
              }
              .header__content__navbar-info__search__dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                width: 250px;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                /* transition: all 0.5s; */
                form {
                  display: flex;
                  align-items: center;
                  input {
                    width: 100%;
                    height: 40px;
                    padding-left: 10px;
                    border: 1px solid #e7e7e7;
                    background-color: #fff;
                  }
                  button {
                    height: 40px;
                    width: 40px;
                    flex-shrink: 0;
                    background-color: #000000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    svg {
                      color: white;
                      width: 20px;
                      height: 20px;
                    }
                  }
                }
              }
            }
            &.header__content__navbar-info__profile {
              position: relative;
              display: flex;
              align-items: center;
              column-gap: 8px;
              &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                /* transform: translateY(-50%); */
                width: 1px;
                height: 40%;
                background-color: #c4c4c4;
              }
              &::after {
                content: "";
                position: absolute;
                right: 0;
                top: 50%;
                /* transform: translateY(-50%); */
                width: 1px;
                height: 40%;
                background-color: #c4c4c4;
              }
              span:first-child {
                width: 30px;
                height: 30px;
                svg {
                }
              }
            }
            &.header__content__navbar-info__cart {
              a {
                display: flex;
                align-items: center;
                column-gap: 8px;
                &:hover {
                  color: #000000;
                }
                span:first-child {
                  position: relative;
                  width: 30px;
                  height: 30px;
                  .header__content__navbar-info__cart__amount {
                    position: absolute;
                    font-size: 10px;
                    font-weight: 600;
                    top: 14px;
                    left: 50%;
                    transform: translateX(-50%);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10005;
  }
  &:has(.sticky) {
    margin-bottom: 84px;
  }
  @media (max-width: 1100px) {
    .header__content {
      .header__content__inner {
        flex-direction: column;
      }
    }
  }
  @media (max-width: 768px) {
    .header__content {
      .header__content__inner {
        flex-direction: row;
        .header__content-left {
          .header__content__navbar-menu {
            display: none;
          }
        }
        .header__content__navbar-info {
          ul {
            li {
              &:not(:first-child) {
                display: none !important;
              }
              &:first-child {
                .header__content__navbar-info__search__dropdown {
                  left: auto !important;
                  right: 0;
                }
              }
            }
          }
        }
      }
    }
  }
  @keyframes fadeInDownAnimation {
    0% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes fadeInDownBigAnimation {
    0% {
      transform: translateY(50px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const Header_11 = () => {
  const dispatch = useDispatch();
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const categories = useSelector((state) => state.category.categories);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  const notify = useSelector((state) => state.user.notify);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const addressStatus = useSelector((state) => state.app.addressData.status);

  const [querySearch, setQuerySearch] = useState("");
  let history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();
    if (querySearch.trim() === "") return;
    const hostname = window.location.pathname;
    if (hostname.includes("/san-pham")) {
      //Handle reset filter
      document.getElementById("filter_price_clear")?.click();
      document.getElementById("filter_attribute_clear")?.click();
    }
    history.push(`/san-pham?search=${querySearch}`);
  };

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
  }, []);

  useEffect(() => {
    const headerContent = document.querySelector(".header__content");
    const sticky = headerContent.offsetTop;
    const scrollHeader = () => {
      if (window.scrollY > sticky) {
        headerContent.classList.add("sticky");
      } else {
        headerContent.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", scrollHeader);
  }, []);
  return (
    <Header11Styles>
      <div
        className="header__top"
        style={{
          backgroundColor: appTheme.color_main_1,
        }}
      >
        <div className="header__top-right">
          <Link to="tel:0987654321">
            <span>
              <i className="fa fa-phone"></i>
            </span>
            <span>Mua hàng online: {appTheme?.contact_phone_number}</span>
          </Link>
        </div>
      </div>
      <div className="header__content">
        <div className="wrapper-container">
          <div className="header__content__inner">
            <div className="header__content-left">
              <div className="header__content__logo">
                <Link to="/">
                  <img
                    src={appTheme.logo_url}
                    alt={appTheme.contact_individual_organization_name}
                  />
                </Link>
              </div>
              <div className="header__content__navbar-menu">
                <ul>
                  {getListMenu(appTheme).map((eleMenu, index) => (
                    <li
                      key={index}
                      className={`${
                        eleMenu.link_to === "/san-pham"
                          ? "header__content__navbar-menu__product"
                          : ""
                      }`}
                    >
                      <Link to={eleMenu.link_to} title={eleMenu.name}>
                        {eleMenu.link_to === "/san-pham" ? (
                          <>
                            <span>{eleMenu.name}</span>
                            <span>
                              <i className="fa fa-angle-down"></i>
                            </span>
                            <ul className="header__content__navbar-menu__category fadeInDownBigAnimation">
                              {categories.length > 0
                                ? categories.map((category) => (
                                    <li
                                      key={category.id}
                                      style={{
                                        width: "220px",
                                      }}
                                    >
                                      <Link
                                        to={`/san-pham?danh-muc=${category.slug}-${category.id}`}
                                        title={category.name}
                                      >
                                        {category.name}
                                      </Link>
                                      {category.category_children.length >
                                        0 && (
                                        <ul
                                          className="header__content__navbar-menu__category__child"
                                          style={{
                                            columnCount:
                                              Math.ceil(
                                                category.category_children
                                                  .length / categories.length
                                              ) > 3
                                                ? 3
                                                : Math.ceil(
                                                    category.category_children
                                                      .length /
                                                      categories.length
                                                  ),
                                          }}
                                        >
                                          {category.category_children.map(
                                            (categoryChild) => (
                                              <li
                                                key={categoryChild.id}
                                                style={{
                                                  width: "220px",
                                                }}
                                              >
                                                <Link
                                                  to={`/san-pham?danh-muc=${categoryChild.slug}-${categoryChild.id}`}
                                                >
                                                  {categoryChild.name}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                    </li>
                                  ))
                                : null}
                            </ul>
                          </>
                        ) : (
                          eleMenu.name
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="header__content__navbar-info">
              <ul className="header__content__navbar-info__content">
                <li className="header__content__navbar-info__search">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="header__content__navbar-info__search__dropdown fadeInDownAnimation">
                    <form onSubmit={handleSearch}>
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        onChange={(e) => setQuerySearch(e.target.value)}
                      />
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </button>
                    </form>
                    <Search searchValue={querySearch}></Search>
                  </div>
                </li>
                <li className="header__content__navbar-info__profile">
                  <ProfileUser
                    header11={true}
                    accountInfoStyle={{
                      width: "auto",
                      position: "relative",
                    }}
                  />
                </li>
                <li className="header__content__navbar-info__cart">
                  <Link to="/gio-hang">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <div className="header__content__navbar-info__cart__amount">
                        {badges.cart_quantity}
                      </div>
                    </span>
                    <span>Giỏ hàng</span>
                  </Link>
                </li>

                <li className="header__content__navbar-info__cart">
                  <Link to="/testscreen">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <div className="header__content__navbar-info__cart__amount">
                        {badges.cart_quantity}
                      </div>
                    </span>
                    <span>Test screen</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Header11Styles>
  );
};

export default Header_11;
