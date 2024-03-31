import Slider from "react-slick";
import React, { useEffect, useMemo } from "react";

import { Link } from "react-router-dom";
import CategoryCard from "../../CategoryCard";
import DiscountProduct from "../../../pages/Home/child/DiscountProduct";
import { handleImgErr } from "../../../helper";
import { useSelector } from "react-redux";
import "./style.css";
import $ from "jquery";
import styled from "styled-components";

const HomeBanner10Styles = styled.section`
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
      .menu-item_name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 14px;
        font-weight: 500;
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
        width: 214px;
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
  .slick-dots {
    display: none !important;
  }
  .navigation::-webkit-scrollbar {
    width: 0px;
  }

  @media only screen and (max-width: 600px) {
    .section-banner {
      margin-top: 0 !important;
    }
  }
`;

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

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
  var bannerSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
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

  console.log(banners);
  return (
    <HomeBanner10Styles className="header-10 home-page-10">
      <section className="section awe-section-1">
        <div className="container section mt-0">
          <div className="row">
            <div
              className="col-lg-15 d-xl-block d-none navigation-wrapper"
              style={{
                paddingRight: "14px",
                width: "20%",
              }}
            >
              <nav className="h-100 wrapper">
                <ul
                  className="navigation list-group list-group-flush scroll"
                  style={{
                    height: "370px",
                  }}
                >
                  {categories.map((v, i) => (
                    <>
                      <li className="menu-item list-group-item menu-main parent">
                        <Link
                          to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                          className="menu-item__link"
                          title="Chăm sóc da mặt"
                        >
                          <div className="menu-item__img">
                            <img
                              src={v.image_url || "./img/default_product.jpg"}
                              alt="category"
                            />
                          </div>
                          <span className="menu-item_name"> {v.name}</span>
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
                              width: `calc(218px*${Math.ceil(
                                v.category_children.length / 5
                              )})`,
                              maxWidth: `calc(218px*4)`,
                              height:
                                Math.ceil(v.category_children.length / 5) > 1
                                  ? "378px"
                                  : `calc(46px*${v.category_children.length})`,
                            }}
                          >
                            {v.category_children.map((item) => (
                              <li
                                style={{
                                  width: "218px",
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
            <div className="col-xl-60 col-md-9 col-12 mt-3 px-xl-0 pr-md-0 section-banner">
              <div className="section_slider clearfix">
                <Slider {...bannerSettings}>
                  {banners.map(
                    (v, i) => (
                      <a href="#" title="Slider 1" tabIndex={0}>
                        <img
                          style={{
                            height: "355px",
                            width: "100%",
                            "object-fit": "cover",
                          }}
                          className="img-fluid mx-auto"
                          src={v.image_url}
                          alt="Slider 1"
                          onError={handleImgErr}
                        />
                      </a>
                    )

                    // <div key={i} className="image">
                    //   <div className="img-container">
                    //     <img src={v.image_url} alt="banner" onError={handleImgErr} />
                    //   </div>
                    // </div>
                  )}
                </Slider>
              </div>
            </div>
            <div
              className="col-xl-15 col-md-3 col-12 pt-3 sub_banner"
              style={{ paddingLeft: "10px" }}
            >
              {props.banners_ads.map((v, i) => (
                <a
                  className="sub_banner__item banner"
                  href={v.link_to == null ? "#" : v.link_to}
                  title="Promo 1"
                >
                  <img
                    className="img-fluid"
                    src={v.image_url}
                    alt=""
                    style={{
                      width: "262px",
                      height: "168px",
                      objectFit: "cover"
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </HomeBanner10Styles>
  );
}
