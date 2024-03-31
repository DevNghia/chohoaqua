import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import "./style.css"
export default function HomeBanner(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;
  var bannerSettings = {
    infinite: true,
    slidesToShow: banners.length > 3 ? 3 : banners.length  ,
    slidesToScroll: 1,
    arrow:true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: banners.length > 2 ? 2 : banners.length,
          slidesToScroll: 1,
        }
      },
    ]
  };

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  return (
    <section className="awe-section-2 product999" id="awe-section-2">
      <div className="section_banner">
        <div className="container">
          <div >
            <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                <div className="item">
                  <a href = {v.link_to == null ? "#" : v.link_to } className="clearfix">
                    <img
                      style={{
                        maxHeight : "200px",
                        width: "99%",
                        borderRadius: "10px",
                        objectFit: "cover",
                        margin:"0px auto"
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
    </section>
  );
}
