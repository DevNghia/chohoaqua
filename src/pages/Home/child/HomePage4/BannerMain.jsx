import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
export default function HomeBanner(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;
  var bannerSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div className="section_slider container">
      <div className="swiper-container slide-container">
        <div className="">
            <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                <div className="swiper-slide">
                     <a href={v.link_to == null ? "#" : v.link_to} className="clearfix">
                    <img
                      style={{
                        width: "100%",
                        maxHeight: "475px",
                        objectFit: "cover",
                      }}
                      src={v.image_url}
                      alt={v.title}
                      className="img-responsive center-block d-block mx-auto img-banner"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
  );
}
