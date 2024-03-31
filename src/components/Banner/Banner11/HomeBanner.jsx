import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import Slider from "react-slick";
import "./style.css";
import styled from "styled-components";
import { validURL } from "../../../helper";

const HomeBanner11Styles = styled.section`
  margin-bottom: 0 !important;
  .menu-main {
    .list-name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .sub-menu-2-item {
    .image {
      flex-shrink: 0;
    }
  }
  .banner-right {
    width: calc(100% - 250px);
    .banner-right-top {
      display: flex;
    }
    .big-banner-promo-wrapper {
      width: 70% !important;
    }
    .banner-right-bottom-ads {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 5px;
      padding-left: 5px;
      img {
        height: 90px;
        width: 100%;
      }
    }
  }
  .product-category-wrapper {
    margin-bottom: 0 !important;
  }
  .product-category-list .column {
    height: 456px !important;
    max-height: 456px !important;
  }
  .zone-market {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
    margin-top: 15px;
    padding: 10px 0;
    background-color: white;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.05);
    .zone-market-item a {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      text-align: center;
      align-items: center;
      cursor: pointer;
      .zone-market-item-img {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .zone-market-item-img.news {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #a400ff;
        color: #fff;
        border-radius: 100rem;
        svg {
          width: 45px;
          height: 45px;
        }
      }
      .zone-market-item-img.price {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ff8400;
        color: #fff;
        border-radius: 100rem;
        img {
          width: 45px;
          height: 45px;
        }
      }
    }
  }
  .category {
    margin-top: 15px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.05);
    .category-title {
      display: flex;
      align-items: center;
      column-gap: 10px;
      margin-bottom: 10px;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .category-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .category-item {
        border: 1px solid #ddd;
        padding: 20px 7px;
        a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          row-gap: 10px;
          text-align: center;
          img {
            width: 70px;
            height: 70px;
            border-radius: 5px;
          }
        }
        .category-name {
          white-space: normal;
        }
      }
    }
    .category-btnMore {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      a {
        display: flex;
        align-items: center;
        column-gap: 5px;
        color: #0071c4;
        padding: 8px 16px;
        border: 1px solid #0071c4;
        border-radius: 3px;
        i {
          font-size: 11px;
        }
      }
    }
  }
  .product-category-list.wrapper {
    position: static !important;
  }
  @media screen and (min-width: 1280.98px) {
    .big-banner-promo {
      height: 415px !important;
    }
  }
  @media screen and (max-width: 1024.98px) {
    .banner-right {
      width: 100%;
      .big-banner-promo-wrapper {
        width: 100% !important;
      }
    }
    .zone-market {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 576px) {
    .swiper-slide {
      height: 410px !important;
    }
  }
  @media screen and (min-width: 768px) {
    .category {
      .category-list {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  @media screen and (min-width: 920px) {
    .category {
      .category-list {
        grid-template-columns: repeat(6, 1fr);
      }
    }
  }
  @media screen and (min-width: 1200px) {
    .category {
      .category-list {
        grid-template-columns: repeat(10, 1fr);
      }
    }
  }
  @media screen and (max-width: 576px) {
    .big-banner-promo-wrapper {
      padding-top: 53% !important;
    }

    .category-list-check-device {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    .big-banner-promo-wrapper {
      padding-top: 61% !important;
    }
  }
  @media screen and (max-width: 450px) {
    .big-banner-promo-wrapper {
      padding-top: 65% !important;
    }
  }
  @media screen and (max-width: 400px) {
    .big-banner-promo-wrapper {
      padding-top: 75% !important;
    }
  }
  @media screen and (max-width: 350px) {
    .big-banner-promo-wrapper {
      padding-top: 80% !important;
      .big-banner-promo {
        padding-left: 0 !important;
      }
    }
    .banner-right-top {
      img {
        height: 240px !important;
      }
    }
  }
  @media screen and (max-width: 320px) {
    .big-banner-promo-wrapper {
      padding-top: 84% !important;
    }
    .banner-right-top {
      img {
        height: 235px !important;
      }
    }
  }
`;

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const [isShowAll, setIsShowAll] = useState(false);

  useEffect(() => {
    $(".parent").on("mouseover", function () {
      var $menuItem = $(this),
        $submenuWrapper = $(">a> .wrapper", $menuItem);
      var menuItemPos = $menuItem.position();
      $submenuWrapper.css({
        top: 0,
        left: menuItemPos.left + Math.round($menuItem.outerWidth() * 1),
      });
    });
  });

  var bannerSettings = {
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  var cateSettings = {
    infinite: categories.length > 5,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          arrows: false,
          infinite: categories.length > 2,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: categories.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: categories.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }

  function MouseOver(event) {
    event.target.style.color = appTheme.color_main_1;
  }
  function MouseOut(event) {
    event.target.style.color = "";
  }

  return (
    <HomeBanner11Styles className="banner5 home-5">
      <div className="container">
        <div className="home-banner flex flex-wrap">
          <div className="product-category-wrapper Module Module-1282">
            <div className="ModuleContent">
              <div className="product-category dropdown-5">
                <div
                  className="product-category-toggle flex items-center"
                  data-url="/danh-muc-san-pham"
                  style={{ backgroundImage: "url(/img/cate-bg.png)" }}
                >
                  <em className="ri-align-left" />
                  <strong>&nbsp;&nbsp;Danh mục sản phẩm</strong>
                  <em className="ri-arrow-drop-down-fill" />
                </div>
                <div className="dropdown-content product-category-dropdown">
                  <div className="product-category-list wrapper">
                    <div className="column">
                      <Link
                        className="all-img"
                        style={{ display: "flex" }}
                        to={`/san-pham`}
                      >
                        <img
                          className="img-title"
                          src="/img/cubes.png"
                          style={{
                            width: "30px",
                            marginRight: "17px",
                            objectFit: "contain",
                          }}
                          alt=""
                        />
                        <div style={{ marginTop: "5px" }}>Tất cả sản phẩm</div>
                      </Link>
                      {categories.map((v, i) => (
                        <div className="menu-main parent">
                          <Link
                            key={i}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                            to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                          >
                            <div className="image">
                              <div className="img-nav">
                                <img
                                  style={{ borderRadius: "4px" }}
                                  src={
                                    v.image_url || "./img/default_product.jpg"
                                  }
                                  alt={v.name}
                                />
                              </div>
                            </div>
                            <div className="list-name">{v.name}</div>
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
                            <div
                              className="sub-menu-2 wrapper"
                              style={{ paddingLeft: "5px" }}
                            >
                              <ul
                                style={{
                                  width: `calc(223px*4)`,
                                  maxWidth: `calc(223px*4)`,
                                  height: "505px",
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
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-right">
            <div className="banner-right-top">
              <div className="big-banner-promo-wrapper Module Module-222">
                <div className="ModuleContent">
                  <div className="big-banner-promo">
                    <div className="swiper-container">
                      <div className="">
                        <Slider {...bannerSettings}>
                          {banners.map((v, i) => (
                            <div className="swiper-slide">
                              <a
                                className="object-fit-img img"
                                href={v.link_to == null ? "#" : v.link_to}
                              >
                                <img src={v.image_url} alt={v.title} />
                              </a>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-banner-promo-wrapper hidden-mobile Module Module-223">
                <div className="ModuleContent">
                  <div className="small-banner-promo">
                    <ul
                      className="list-banner"
                      style={{
                        "max-height": "450px",
                        overflow: "auto",
                        marginTop: "0",
                      }}
                    >
                      {props.banners_ads.map((v, i) => (
                        <li>
                          <a
                            className="object-fit-img img"
                            href={v.link_to == null ? "#" : v.link_to}
                          >
                            <img src={v.image_url} alt={v.title} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-right-bottom">
              <div className="banner-right-bottom-ads">
                {props.banners_ads_under.map((v, i) => (
                  <a
                    key={i}
                    className="object-fit-img img"
                    href={v.link_to == null ? "#" : v.link_to}
                  >
                    <img
                      src={v.image_url}
                      style={{
                        objectFit: "cover",
                      }}
                      alt={v.title}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="zone-market">
          <div className="zone-market-item">
            <Link to="/tin-tuc">
              <div className="zone-market-item-img news">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                  />
                </svg>
              </div>
              <div className="zone-market-item-title">Tin tức</div>
            </Link>
          </div>
          <div className="zone-market-item">
            <Link to="/bao-gia">
              <div className="zone-market-item-img price">
                <img src="./img/price-tag.png" alt="voucher" />
              </div>
              <div className="zone-market-item-title">Báo giá </div>
            </Link>
          </div>
          <div className="zone-market-item">
            <Link to="/ma-giam-gia">
              <div className="zone-market-item-img">
                <img src="./img/qua-tang.svg" alt="voucher" />
              </div>
              <div className="zone-market-item-title">Voucher</div>
            </Link>
          </div>
          <div className="zone-market-item">
            <Link to="/combo-giam-gia">
              <div className="zone-market-item-img">
                <img src="./img/giam-gia.svg" alt="combo" />
              </div>
              <div className="zone-market-item-title">Combo giảm giá</div>
            </Link>
          </div>
          {infoStore.link_apple_store != null &&
            infoStore.link_apple_store !== "" &&
            validURL(infoStore.link_apple_store) && (
              <div className="zone-market-item">
                <a href={infoStore.link_apple_store}>
                  <div className="zone-market-item-img">
                    <img src="./img/app-store-iki.svg" alt="app_ios" />
                  </div>
                  <div className="zone-market-item-title">Tải App trên iOS</div>
                </a>
              </div>
            )}

          <div className="zone-market-item">
            {infoStore.link_google_play != null &&
              infoStore.link_google_play !== "" &&
              validURL(infoStore.link_google_play) && (
                <a href={infoStore.link_google_play}>
                  <div className="zone-market-item-img">
                    <img src="./img/google-play-iki.svg" alt="app_android" />
                  </div>
                  <div className="zone-market-item-title">
                    Tải App trên Android
                  </div>
                </a>
              )}
          </div>
        </div>

        <div className="category category-list-check-device">
          <h2 className="category-title">
            <img src="./img/hot-category.png" alt="hot-category" />
            Danh mục nổi bật
          </h2>

          <div className="category-list">
            {categories.length > 0 &&
              categories
                .slice(0, isShowAll ? categories.length : 20)
                .map((v, i) => (
                  <div key={i} className="category-item">
                    <Link to={`/san-pham?danh-muc=${v.slug}-${v.id}`}>
                      <img
                        src={v.image_url || "./img/default_product.jpg"}
                        alt={v.name}
                      />
                      <div className="category-name">{v.name}</div>
                    </Link>
                  </div>
                ))}
          </div>
          {categories.length > 20 && isShowAll ? (
            ""
          ) : (
            <div className="category-btnMore">
              <a onClick={() => setIsShowAll(true)}>
                <span>Xem thêm chuyên mục</span>
                <span>
                  <i className="fa fa-chevron-down"></i>
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </HomeBanner11Styles>
  );
}
