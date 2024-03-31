import Slider from "react-slick";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../../pages/Home/child/HomePage2/useWindowDimensions";
import "./style.css";
import styled from "styled-components";
import { useEffect } from "react";

const CategoryProductStyles = styled.section`
  .container {
    display: flex;
    column-gap: 15px;
    .col-md-3 {
      width: 240px;
    }
    .col-md-9 {
      width: calc(100% - 240px - 15px);
    }
    .menu-main {
      .list-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
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
            .image {
              flex-shrink: 0;
            }
            .list-names {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
    .slick-dots li.slick-active button:before {
      color: #fff !important;
    }
  }

  @media screen and (max-width: 600px) {
    .section_category_slider {
      & > .container {
        width: 100% !important;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .section_category_slider {
      .slick-list .banner-img img {
        height: 135px;
      }
      .slick-arrow {
        display: none !important;
      }
    }
  }
`;

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const { height, width } = useWindowDimensions();
  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  useEffect(() => {
    $(".parent").on("mouseover", function () {
      var $menuItem = $(this),
        $submenuWrapper = $(" .wrapper", $menuItem);
      var menuItemPos = $menuItem.position();
      $submenuWrapper.css({
        top: menuItemPos.top,
        left: menuItemPos.left + Math.round($menuItem.outerWidth() * 1),
      });
    });
  }, []);
  var bannerSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  return (
    <CategoryProductStyles className="banner2 container" id="awe-section-1">
      <div className="section_category_slider">
        <div className="container">
          <div className="col-md-3  hidden-xs aside-vetical-menu">
            <div className="blog-aside aside-item sidebar-category">
              <div
                className="aside-title text-center text-xl-left"
                style={{ backgroundColor: appTheme.color_main_1 }}
              >
                <h2
                  className="title-head"
                  style={{
                    height: 28,
                    paddingTop: 5,
                  }}
                >
                  <span
                    style={{
                      paddingTop: 9,
                    }}
                  >
                    Danh mục
                  </span>
                </h2>
              </div>
              <div className="column" style={{ background: "white" }}>
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
                      marginRight: "8px",
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
                            src={v.image_url || "./img/default_product.jpg"}
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
                          }}
                        ></i>
                      )}
                    </Link>

                    <div
                      className="sub-menu-1 wrapper"
                      style={{ marginLeft: "0px", zIndex: 100 }}
                    >
                      <ul
                        style={{
                          width: `calc(225px*${Math.ceil(
                            v.category_children.length / 5
                          )})`,
                          maxWidth: `calc(225px*4)`,
                          height:
                            Math.ceil(v.category_children.length / 5) > 1
                              ? "450px"
                              : `calc(56px*${v.category_children.length})`,
                        }}
                      >
                        {v.category_children.map((item) => (
                          <li
                            style={{
                              width: "225px",
                            }}
                          >
                            <Link
                              style={{ cursor: "pointer", display: "flex" }}
                              to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                            >
                              <div
                                className="sub-menu-1-item"
                                style={{ padding: "0.75em" }}
                              >
                                <div className="image">
                                  <div className="image-list">
                                    <img
                                      style={{
                                        width: "30px",
                                        borderRadius: "5px",
                                      }}
                                      src={
                                        item.image_url ||
                                        "./img/default_product.jpg"
                                      }
                                      alt="category"
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
          </div>
          <div className="col-md-9   px-0 mt-5 ">
            <div className="home-slider owl-carousel">
              <Slider
                {...bannerSettings}
                style={{
                  margin: "0 1px",
                }}
              >
                {banners.map((v, i) => (
                  <div className="swiper-slide banner-img">
                    <a
                      href={v.link_to == null ? "#" : v.link_to}
                      className="clearfix"
                      title={v.title}
                    >
                      <img
                        src={v.image_url}
                        alt={v.title}
                        className="img-responsive center-block d-block mx-auto img-banner"
                        style={{ borderRadius: "15px" }}
                      />
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </CategoryProductStyles>
  );
}
