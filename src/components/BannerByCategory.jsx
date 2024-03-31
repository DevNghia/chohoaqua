import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
// import "./ProductHome/ProductHome9/style.css";
import styled from "styled-components";

const BannerAds4Styles = styled.section`
  .swiper-slide.banner-slide {
    border-radius: 10px !important;
  }
  .slick-list {
    // margin: 0 -8px;
    marginleft: 0;
    padding: 20px 0;
    padding-bottom: 50px;
  }
  .slick-slide > div {
    padding: 0 8px;
  }
`;

export default function BannerByCategory(props) {
  const { banners } = props;

  var bannerSettings = {
    infinite: true,
    slidesToShow: banners?.length > 2 ? 2 : banners?.length,
    slidesToScroll: 1,

    arrow: true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: banners?.length > 1 ? 1 : banners?.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: banners?.length > 2 ? 2 : banners?.length,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <BannerAds4Styles
      className="awe-section-4 product444"
      style={{
        margin: 0,
      }}
    >
      <div className="section_banner">
        <div className="banner-swiper swiper-container">
          {banners && banners.length ? (
            <Slider {...bannerSettings}>
              {banners?.map((v, i) => (
                <div className="swiper-slide banner-slide" key={v}>
                  <a href={v.link == null ? "#" : v.link} className="clearfix">
                    <img
                      style={{
                        // height: "250px",
                        // height: "50%",
                        margin: 0,
                        width: "100%",
                        borderRadius: "10px",
                        // objectFit: "cover",
                        objectFit: "contain",
                      }}
                      src={v.image}
                      alt="banner"
                      className="img-responsive center-block d-block mx-auto"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          ) : null}
        </div>
      </div>
    </BannerAds4Styles>
  );
}
