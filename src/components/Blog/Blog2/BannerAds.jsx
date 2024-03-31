import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import "./style.css";
import styled from "styled-components";

const BannerAds2Styles = styled.section`
  .slick-slider {
    .slick-prev {
      left: 15px !important;
    }
    .slick-next {
      right: 15px !important;
    }
  }
`;

export default function HomeBanner(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;
  var bannerSettings = {
    infinite: true,
    slidesToShow: banners.length > 4 ? 4 : banners.length,
    slidesToScroll: 1,

    arrow: true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: banners.length > 2 ? 2 : banners.length,
          slidesToScroll: 1,
        },
      },

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
    <BannerAds2Styles className="awe-section-2 blog22" id="awe-section-2">
      <div className="section_banner">
        <div className="container">
          <div
            style={{
              margin: "0 -10px",
            }}
          >
            <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                <div className="item">
                  <a
                    href={v.link_to == null ? "#" : v.link_to}
                    className="clearfix"
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    <img
                      style={{
                        height: "auto",
                        width: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                      src={v.image_url}
                      alt={v.title}
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </BannerAds2Styles>
  );
}
