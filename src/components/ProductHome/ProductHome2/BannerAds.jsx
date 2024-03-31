import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import styled from "styled-components";

const Product2Styles = styled.section`
  .section_banner {
    margin-top: 20px;
    .item {
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
    <Product2Styles className="awe-section-2 product222" id="awe-section-2">
      <div className="section_banner">
        <div className="container" style={{ padding: "0px 0px" }}>
          <div style={{ margin: "0 -10px" }}>
            <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                <div className="item" style={{ margin: "0 10px" }}>
                  <a
                    href={v.link_to == null ? "#" : v.link_to}
                    className="clearfix"
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
    </Product2Styles>
  );
}
