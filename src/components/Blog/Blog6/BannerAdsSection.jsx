import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "./style.css"
export default function BannerAdsSection(props) {
  const { banners_ads } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {

        

    infinite: true,
    slidesToShow: banners_ads.length > 4 ? 4 : banners_ads.length ,
    slidesToScroll: 1,
    arrow:true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          
          arrows: true,
          infinite: banners_ads.length > 2 ? 2 :banners_ads.length,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      // {
      //   breakpoint: 768,
      //   settings: {
      //     infinite: banners_ads.length > 4,
      //     slidesToShow: 4,
      //     slidesToScroll: 1,
      //   }
      // },
      {
        breakpoint: 1200,
        settings: {
          infinite: banners_ads.length > 3 ? 3 :banners_ads.length,
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
    ]
  };

  return (
    <section className="banner-ads-section6">
      <div className="container">
        <div className="banner-ads-slider">
          <div className="col-12">
            <Slider {...bannerSettings}>
              {banners_ads.map((v, i) => (
                <div className="swiper-slide">
                  <a className="object-fit-img img" href="#">
                    <img style={{maxHeight : "330px"}} src={v.image_url} />
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
