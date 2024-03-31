import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import "./style.css";

const Blog7Styles = styled.div`
  .slick-slider {
    .slick-prev {
      left: 15px;
    }
  }
`;

export default function BannerAdsSection(props) {
  const { banners_ads } = props;
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    infinite: true,
    slidesToShow: banners_ads.length > 3 ? 4 : banners_ads.length,
    slidesToScroll: 1,
    arrow: true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          slidesToShow: banners_ads.length > 2 ? 3 : banners_ads.length,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: banners_ads.length > 3 ? 3 : banners_ads.length,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Blog7Styles className="section blog-7" id="DuAn" name="Dự án">
      <div className="widget HTML" data-version={2} id="HTML11">
        <div className="home-project">
          <div className="container">
            <div className="title-text bg-grey">
              <h2>Đối tác khách hàng</h2>
            </div>
            <div
              className="owl-project carousel-resize-991"
              style={{
                marginLeft: "-15px",
              }}
            >
              <Slider {...bannerSettings}>
                {banners_ads.map((v, i) => (
                  <div className="item">
                    {" "}
                    <a href="#" title={v.title} className="thumb img-shine">
                      <img
                        src={v.image_url}
                        alt={v.title}
                        className="img-responsive basic item_thumb lazyloaded"
                      />
                    </a>{" "}
                    <h3>
                      <a title={v.title} className="text1line item_name">
                        {v.title}
                      </a>
                    </h3>{" "}
                  </div>
                ))}
              </Slider>
              {/* <div className="item">
                {" "}
                <a
                  href="https://halugroup-khoirom.blogspot.com/2020/04/goldmark-city-ho-tung-mau.html"
                  title="Goldmark City Hồ Tùng Mậu"
                  className="thumb img-shine"
                >
                  <img
                    src="https://1.bp.blogspot.com/-4mJ5vg41P5g/YSNhPoR6cCI/AAAAAAAAFU0/qdmFZUTrLvshxYdUPRex12eHcDrLoTIjQCLcBGAsYHQ/s320/2.jpg"
                    data-src="https://1.bp.blogspot.com/-4mJ5vg41P5g/YSNhPoR6cCI/AAAAAAAAFU0/qdmFZUTrLvshxYdUPRex12eHcDrLoTIjQCLcBGAsYHQ/s320/2.jpg"
                    alt="Goldmark City Hồ Tùng Mậu"
                    className="img-responsive basic item_thumb lazyloaded"
                  />
                </a>{" "}
                <h3>
                  <a
                    href="https://halugroup-khoirom.blogspot.com/2020/04/goldmark-city-ho-tung-mau.html"
                    title="Goldmark City Hồ Tùng Mậu"
                    className="text1line item_name"
                  >
                    Goldmark City Hồ Tùng Mậu
                  </a>
                </h3>{" "}
              </div>{" "}
              <div className="item">
                {" "}
                <a
                  href="https://halugroup-khoirom.blogspot.com/2020/04/vinhomes-imperia-hai-phong.html"
                  title="Vinhomes Imperia Hải Phòng"
                  className="thumb img-shine"
                >
                  <img
                    src="https://1.bp.blogspot.com/--PzZ-9ipumQ/YSNhHbZtTsI/AAAAAAAAFUw/SBBgX_4788UO-H7r_xT392Qj0YNBPXXhACLcBGAsYHQ/s320/1.jpg"
                    data-src="https://1.bp.blogspot.com/--PzZ-9ipumQ/YSNhHbZtTsI/AAAAAAAAFUw/SBBgX_4788UO-H7r_xT392Qj0YNBPXXhACLcBGAsYHQ/s320/1.jpg"
                    alt="Vinhomes Imperia Hải Phòng"
                    className="img-responsive basic item_thumb lazyloaded"
                  />
                </a>{" "}
                <h3>
                  <a
                    href="https://halugroup-khoirom.blogspot.com/2020/04/vinhomes-imperia-hai-phong.html"
                    title="Vinhomes Imperia Hải Phòng"
                    className="text1line item_name"
                  >
                    Vinhomes Imperia Hải Phòng
                  </a>
                </h3>{" "}
              </div>{" "}
              <div className="item">
                {" "}
                <a
                  href="https://halugroup-khoirom.blogspot.com/2020/04/vinhomes-gardenia-my-inh.html"
                  title="Vinhomes Gardenia Mỹ Đình"
                  className="thumb img-shine"
                >
                  <img
                    src="https://1.bp.blogspot.com/-0wlke2aILmM/YSNh3npBYpI/AAAAAAAAFVI/_ZWKHrc0MVMlZh3ovpNHNB7gR0DaYsKtACLcBGAsYHQ/s320/4.jpg"
                    data-src="https://1.bp.blogspot.com/-0wlke2aILmM/YSNh3npBYpI/AAAAAAAAFVI/_ZWKHrc0MVMlZh3ovpNHNB7gR0DaYsKtACLcBGAsYHQ/s320/4.jpg"
                    alt="Vinhomes Gardenia Mỹ Đình"
                    className="img-responsive basic item_thumb lazyloaded"
                  />
                </a>{" "}
                <h3>
                  <a
                    href="https://halugroup-khoirom.blogspot.com/2020/04/vinhomes-gardenia-my-inh.html"
                    title="Vinhomes Gardenia Mỹ Đình"
                    className="text1line item_name"
                  >
                    Vinhomes Gardenia Mỹ Đình
                  </a>
                </h3>{" "}
              </div>{" "}
              <div className="item">
                {" "}
                <a
                  href="https://halugroup-khoirom.blogspot.com/2020/04/vinhomes-skylake-pham-hung.html"
                  title="Vinhomes skylake Phạm Hùng"
                  className="thumb img-shine"
                >
                  <img
                    src="https://1.bp.blogspot.com/-ybarHquNPsM/YSNhalGFT_I/AAAAAAAAFU8/8R0-t5ywMR4_xZYt5wJjWEWUoK7oJElswCLcBGAsYHQ/s320/3.jpg"
                    data-src="https://1.bp.blogspot.com/-ybarHquNPsM/YSNhalGFT_I/AAAAAAAAFU8/8R0-t5ywMR4_xZYt5wJjWEWUoK7oJElswCLcBGAsYHQ/s320/3.jpg"
                    alt="Vinhomes skylake Phạm Hùng"
                    className="img-responsive basic item_thumb lazyloaded"
                  />
                </a>{" "}
                <h3>
                  <a
                    href="https://halugroup-khoirom.blogspot.com/2020/04/vinhomes-skylake-pham-hung.html"
                    title="Vinhomes skylake Phạm Hùng"
                    className="text1line item_name"
                  >
                    Vinhomes skylake Phạm Hùng
                  </a>
                </h3>{" "}
              </div>{" "} */}
            </div>
          </div>
        </div>
      </div>
    </Blog7Styles>
  );
}
