import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    dots: true,
    pauseOnHover: true,
  };

  return (
    <div className="container">
      <div className="list-nav-top-banner">
        {categories.map((v, i) => (
          <div key={i}>
            <div className="nav-list-name">
              <span>{v.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="banner row ">
        <div className="col-xs-12 col-md-8">
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
                          <img src={v.image_url}       alt={v.title} />
                        </a>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-4 banner-abs-nav">
          {props.banners_ads.map((v, i) => (
            <li>
              <Link to={v.link_to == null ? "#" : v.link_to}>
                <img src={v.image_url} alt="" />
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
