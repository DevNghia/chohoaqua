import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

export default function BannerAdsSection(props) {
  const { banners_ads } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          arrows: false,
          infinite: banners_ads.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          infinite: banners_ads.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          infinite: banners_ads.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
    ]
  };

  return (
    <section className="banner-ads-section">
      <div className="container">
        <div className="banner-ads-slider">
          <div className="col-12">
            <Slider {...bannerSettings}>
              {banners_ads.map((v, i) => (
                <div className="swiper-slide">
                  <a className="object-fit-img img" href="#">
                    <img src={v.image_url} />
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
