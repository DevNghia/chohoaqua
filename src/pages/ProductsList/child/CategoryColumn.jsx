import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber, formatPriceV2, handleImgErr } from "../../../helper";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import $ from "jquery";
import { useEffect } from "react";
import CategoryC from "../../../components/CategoryColumn";
import styled from "styled-components";
import { useState } from "react";
import FilterPrice from "../../../components/Filter/FilterPrice";
import FilterAttribute from "../../../components/Filter/FilterAttribute";

const CategoryColumnStyles = styled.div`
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
  .menu-main {
    .menu-main__link {
      display: flex;
      align-items: center;
      .list-name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
`;

export default function CategoryColumn(props) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const { bannerAds } = props;
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
    <CategoryColumnStyles className="categories-column">
      {appTheme.home_page_type == 5 ? (
        <CategoryC title="Danh mục sản phẩm" />
      ) : (
        <>
          <div className="main-title2">
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
              <h3
                style={{ padding: "15px", color: "black", fontWeight: "450px" }}
              >
                Danh mục
              </h3>
            </div>
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
                    marginRight: "13px",
                    objectFit: "contain",
                  }}
                />
                <div>Tất cả sản phẩm</div>
              </Link>
              {categories.map((v, i) => (
                <div className="menu-main">
                  <Link
                    className="menu-main__link"
                    key={i}
                    to={`/san-pham?danh-muc=${v.slug}-${v.id}`}
                  >
                    <div className="image">
                      <div className="img-nav">
                        <img
                          style={{
                            borderRadius: "4px",
                          }}
                          src={v.image_url || "./img/default_product.jpg"}
                          alt="category"
                        />
                      </div>
                    </div>
                    <div className="list-name">{v.name}</div>
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
                  <div className="sub-menu-1">
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
                            <div
                              className="sub-menu-1-item"
                              style={{
                                width: "223px",
                              }}
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
          <FilterPrice></FilterPrice>
          <FilterAttribute></FilterAttribute>
        </>
      )}
      {bannerAds.status === c.SUCCESS
        ? bannerAds.type_6.length > 0 && (
            <BannerVertical banners={bannerAds.type_6} />
          )
        : null}
    </CategoryColumnStyles>
  );
}
