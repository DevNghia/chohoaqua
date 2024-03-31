import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

export default function HomeBanner(props) {
  const { banners } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <section className="home-1 banner-section">
      <div className="col-12">
        <div className="home-slider">
          <div className="col-12">
            <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                <div className="swiper-slide">
                      <a href={v.link_to == null ? "#" : v.link_to} className="object-fit-img img">
                    <img src={v.image_url}        alt={v.title}/>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
