import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import Slider from "react-slick";
import "./style.css";
import styled from "styled-components";

const HomeBanner5Styles = styled.section`
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
  @media screen and (max-width: 600px) {
    .section-title {
      margin-top: 0px;
    }
    .home-banner {
      height: 380px !important;
    }
  }
  @media screen and (max-width: 576px) {
    margin-bottom: 0;
    .feature-group-wrap {
      height: 35px;
    }
  }
  @media screen and (max-width: 400px) {
    .home-banner {
      height: 340px !important;
    }
    .feature-group-wrap {
      padding-top: 156px !important;
    }
  }
`;

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  useEffect(() => {
    $(".parent").on("mouseover", function () {
      var $menuItem = $(this),
        $submenuWrapper = $(">a> .wrapper", $menuItem);
      var menuItemPos = $menuItem.position();
      $submenuWrapper.css({
        top: menuItemPos.top,
        left: menuItemPos.left + Math.round($menuItem.outerWidth() * 1),
      });
    });
  });

  var bannerSettings = {
    autoplay: false,
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
    <HomeBanner5Styles className="banner5 home-5">
      <div className="container">
        <div
          className="home-banner flex flex-wrap"
          style={{
            height: "410px",
          }}
        >
          <div className="product-category-wrapper Module Module-1282">
            <div className="ModuleContent">
              <div
                className="product-category dropdown-5"
                style={{
                  boxShadow: "0px 0px 12px 1px rgb(207, 205, 205)",
                  border: "1px solid #e5e5e5",
                }}
              >
                <div
                  className="product-category-toggle flex items-center"
                  data-url="/danh-muc-san-pham"
                  // style={{ backgroundImage: "url(/img/cate-bg.png)" }}
                  style={{
                    backgroundColor: "white",
                    backgroundImage: "url(/img/cate-bg.png)",
                  }}
                >
                  <em className="ri-align-left" />
                  <strong>&nbsp;&nbsp;Danh mục sản phẩm</strong>
                  <em className="ri-arrow-drop-down-fill" />
                </div>
                <div
                  className="dropdown-content product-category-dropdown"
                  style={{
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <div className="product-category-list wrapper">
                    <div className="column ">
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
                                  alt="category"
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
                                  width: `calc(223px*${Math.ceil(
                                    v.category_children.length / 5
                                  )})`,
                                  maxWidth: `calc(223px*4)`,
                                  height:
                                    Math.ceil(v.category_children.length / 5) >
                                    1
                                      ? "450px"
                                      : `calc(56px*${v.category_children.length})`,
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
          <div className="big-banner-promo-wrapper Module Module-222">
            <div className="ModuleContent">
              <div className="big-banner-promo">
                <div className="swiper-container">
                  <div className="">
                    <Slider {...bannerSettings}>
                      {banners.map((v, i) => (
                        <div className="swiper-slide">
                          <a
                            href={v.link_to == null ? "#" : v.link_to}
                            className="object-fit-img img"
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
                        <img src={v.image_url} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="feature-group-wrap w-100 Module Module-225">
            <div className="ModuleContent">
              <h1
                style={{ textAlign: "center" }}
                className="section-title text-blue"
              >
                {appTheme.contact_individual_organization_name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </HomeBanner5Styles>
  );
}
