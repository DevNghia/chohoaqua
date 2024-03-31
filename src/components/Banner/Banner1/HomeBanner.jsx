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

const HomeBanner1Styles = styled.div`
  .categories-column {
    .column {
      max-height: none;
      .menu-main {
        .image {
          flex-shrink: 0;
        }
        .name-category-parent {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    .banners {
      flex-grow: 1;
      .slick-slider {
        height: 100%;
        .slick-list {
          height: 100%;
          .slick-track {
            height: 100%;
            div {
              height: 100%;
            }
          }
        }
      }
    }
    .categories-row {
      .card-container {
        padding-bottom: 0 !important;
        .category-card {
          padding-bottom: 0 !important;
          overflow: visible !important;
        }
      }
    }
  }
  .sub-menu-1 {
    ul {
      display: flex !important;
      flex-direction: column;
      white-space: wrap;
      grid-gap: 0 !important;
      gap: 0 !important;
      overflow-x: auto;
      .sub-menu-1-item {
        .list-names {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  @media screen and (max-width: 992px) {
    .middle {
      padding: 0px !important;
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
  return (
    <HomeBanner1Styles className="home-banner1 container row">
      <div className="categories-column wrapper">
        <div
          className="main-title"
          style={{ position: "relative", background: "transparent" }}
        >
          <div
            style={{
              backgroundColor: appTheme.color_main_1,
              opacity: "0.25",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
          <h3>Danh mục </h3>
        </div>
        <div className="column">
          <Link style={{ cursor: "pointer", display: "flex" }} to="/san-pham">
            <img
              src="/img/cubes.png"
              alt=""
              style={{
                width: "30px",
                objectFir: "contain",
                marginRight: "8px",
              }}
            />
            <div>Tất cả sản phẩm</div>
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
                  <div className="img-container">
                    <img
                      src={v.image_url || "./img/default_product.jpg"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="name-category-parent">{v.name}</div>
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
              <div
                className="sub-menu-1 wrapper"
                style={{ marginTop: "0px", marginLeft: "0px" }}
              >
                <ul
                  style={{
                    width: `calc(223px*${Math.ceil(
                      v.category_children.length / 8
                    )})`,
                    maxWidth: `calc(223px*4)`,
                    height:
                      Math.ceil(v.category_children.length / 8) > 1
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
                      <Link
                        style={{ cursor: "pointer", display: "flex" }}
                        to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                      >
                        <div className="sub-menu-1-item">
                          <div className="image">
                            <div className="image-list">
                              <img
                                style={{
                                  width: "30px",
                                  borderRadius: "5px",
                                }}
                                src={
                                  item.image_url || "./img/default_product.jpg"
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="list-names"> {item.name}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="middle">
        <div className="banners">
          <Slider {...bannerSettings}>
            {banners.map((v, i) => (
              <div key={i} className="image">
                <div className="img-container">
                  <a
                    href={v.link_to == null ? "#" : v.link_to}
                    className="clearfix"
                  >
                    <img
                      src={v.image_url}
                      alt={v.title}
                      onError={handleImgErr}
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="categories-row">
          <Slider {...cateSettings}>
            {categories.map((v, i) => (
              <div className="card-container" key={i}>
                <Link
                  key={i}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                >
                  <CategoryCard
                    image={v.image_url}
                    title={v.name}
                    id={v.id}
                    key={i}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="discount-products">
        <div
          className="main-title"
          style={{ position: "relative", background: "transparent" }}
        >
          <div
            style={{
              backgroundColor: appTheme.color_main_1,
              opacity: "0.25",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
          <h3 style={{ zIndex: 4 }}>Ưu đãi hôm nay</h3>
        </div>
        <div className="row" style={{ background: appTheme.color_main_1 }}>
          {discountProducts.map((v, i) => (
            <DiscountProduct product={v} key={i} />
          ))}
        </div>
      </div>
    </HomeBanner1Styles>
  );
}
