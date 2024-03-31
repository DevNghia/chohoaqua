import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "./style.css";
import styled from "styled-components";

const HomeBanner7Styles = styled.div`
  .nav-list-name {
    .nav-child-list-name {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 100;
      grid-gap: 0 !important;
      gap: 0 !important;
      overflow-x: auto;
      background-color: white;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      transform-origin: 0% 0%;
      box-shadow: 0 1px 2px 2px rgb(0 0 0 / 4%);
      z-index: 99;
      max-height: 0px;
      max-width: 0px;
      opacity: 0;
      transform: translateY(101%) perspective(600px) rotateX(-90deg);
      transition: transform 0.5s ease, opacity 0.6s ease,
        max-height 0.6s step-end, max-width 0.6s step-end, padding 0.6s step-end;
      li {
        padding: 10px;
        width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    &:hover .nav-child-list-name {
      max-height: 3000px;
      max-width: 3000px;
      opacity: 1;
      transform: translateY(101%) perspective(600px) rotateX(0deg);
      transition: transform 0.5s ease, opacity 0.2s ease, max-height 0s step-end,
        max-width 0s step-end, padding 0s step-end;
    }
  }
  .slick-dots {
    li {
      margin: 0;
    }
  }
`;

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  console.log("HomeBanner ~ categories", categories);
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    dots: true,
    pauseOnHover: true,
  };

  return (
    <HomeBanner7Styles className="container banner9">
      <div className="list-nav-top-banner">
        {categories.map((v, i) => (
          <div key={i}>
            <div className="nav-list-name">
              <Link to={`/san-pham?danh-muc=${v.slug}-${v.id}`}>
                <span>{v.name}</span>
              </Link>
              {v?.category_children?.length > 0 && (
                <ul
                  className="nav-child-list-name"
                  style={{
                    width: `calc(200px*${Math.ceil(
                      v.category_children.length / 4
                    )})`,
                    maxWidth: `calc(200px*5)`,
                    height:
                      Math.ceil(v.category_children.length / 4) > 1
                        ? "282px"
                        : `calc(34px*${v.category_children.length})`,
                  }}
                >
                  {v.category_children.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        height: "34px",
                      }}
                    >
                      <Link
                        to={`/san-pham?danh-muc-con=${item.slug}-${item.id}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="banner row ">
        <div className="col-xs-12 col-md-12 col-12">
          <div className="ModuleContent">
            <div className="big-banner-promo">
              <div className="swiper-container">
                <div className="swiper-img">
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
        {/* <div className="col-xs-12 col-md-4 banner-abs-nav">
          {(props.banners_ads).map((v, i) => (
            <li>
              <Link to={v.link_to == null ? "#" : v.link_to}>
                <img src={v.image_url} alt="" />
              </Link>
            </li>
          ))}
        </div> */}
      </div>
    </HomeBanner7Styles>
  );
}
