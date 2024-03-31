import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomePage8.css";
import $ from "jquery";
import styled from "styled-components";

const BannerListNavStyles = styled.div`
  .sub-menu-2 {
    ul {
      top: 0 !important;
      display: flex !important;
      flex-direction: column;
      flex-wrap: wrap;
      grid-gap: 0 !important;
      gap: 0 !important;
      overflow-x: auto;
      li {
        .image {
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
`;

export default function BannerListNav(props) {
  const categories = useSelector((state) => state.category.categories);
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
  return (
    <BannerListNavStyles className="home-8 home-1">
      <div className="container">
        <div className="home-banner flex flex-wrap">
          <div className="product-category-wrapper Module Module-1282">
            <div className="ModuleContent">
              <div className="product-category dropdown-5">
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
                      {(categories ?? []).map((v, i) => (
                        <div className="menu-main parent">
                          <Link
                            key={i}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "normal",
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
                            <div className="list-name" style={{ marginTop: 8 }}>
                              {v.name}
                            </div>
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
                                  width: `calc(223px*${Math.ceil(
                                    v.category_children.length / 8
                                  )})`,
                                  maxWidth: `calc(223px*4)`,
                                  height:
                                    Math.ceil(v.category_children.length / 8) >
                                    1
                                      ? "402px"
                                      : `calc(49px*${v.category_children.length})`,
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
                          </Link>
                        </div>
                      ))}
                      <Link to={"/tin-tuc"}>
                        <div className="menu-main">
                          <div className="icon-nav-top">
                            <i class="fas fa-newspaper"></i>
                          </div>
                          <h5 className="title-nav-list-header">Tin tức</h5>
                        </div>
                      </Link>
                      <Link to={"/ma-giam-gia"}>
                        <div className="menu-main">
                          <div className="icon-nav-top">
                            <i class="fab fa-salesforce"></i>
                          </div>
                          <h5 className="title-nav-list-header">Khuyến mại</h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerListNavStyles>
  );
}
