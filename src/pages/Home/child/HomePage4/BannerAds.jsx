import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
export default function HomeBanner(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;
  var bannerSettings = {
    infinite: false,
    slidesToShow: banners.length > 3 ? 3 : banners.length,
    slidesToScroll: 1,

  };

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  return (


    <section className="awe-section-4">
      <div className="section_banner">
        <div className="container">
          <div className="banner-swiper swiper-container">
            <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                <div className="swiper-slide  banner-slide">
                  <a href={v.link_to == null ? "#" : v.link_to} className="clearfix" title={v.title}>
                    <img
                      style={{ width: "100%", height: "160px", objectFit: "cover" }}
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
    </section>



  );
}
