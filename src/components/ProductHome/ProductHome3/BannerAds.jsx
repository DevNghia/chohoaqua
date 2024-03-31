import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import "./style.css";
import styled from "styled-components";

const BannerAds4Styles = styled.div`
  .section_banner {
    .swiper-slide {
      padding: 0 10px !important;
    }
  }
`;

export default function HomeBanner(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;
  var bannerSettings = {
    infinite: true,
    slidesToShow: banners.length > 3 ? 3 : banners.length,
    slidesToScroll: 1,

    arrow: true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // {
      //   breakpoint: 768,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   }
      // },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: banners.length > 2 ? 2 : banners.length,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  return (
    <BannerAds4Styles className="awe-section-4 product333">
      <div className="section_banner">
        <div className="container">
          <div className="banner-swiper swiper-container">
            <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                <div className="swiper-slide banner-slide">
                  <a
                    href={v.link_to == null ? "#" : v.link_to}
                    className="clearfix"
                 
                  >
                    <img
                      style={{
                        height: "auto",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                      src={v.image_url}
                      alt={v.title}
                      className="img-responsive center-block d-block mx-auto"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </BannerAds4Styles>
  );
}
