import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import "./style.css"
export default function HomeBanner(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const { banners, discountProducts } = props;
  var bannerSettings = {
    infinite: true,
    slidesToShow: banners.length > 4 ? 4 : banners.length  ,
    slidesToScroll: 1,
        
    arrow:true,
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      // {
      //   breakpoint: 600,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   }
      // },
      // {
      //   breakpoint: 768,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   }
      // },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
    ]
  };


  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  return (


    <section className="awe-section-4 blog44">
    <div className="section_banner">
      <div className="container">
        <div className="banner-swiper swiper-container">
          <Slider {...bannerSettings}>
              {banners.map((v, i) => (
                  <div className="swiper-slide  banner-slide">
                  <a  href = {v.link_to == null ? "#" : v.link_to }  className="clearfix" title="ND Fresh">
                      <img
                      style = {{width : "100%" ,maxHeight : "330px" , objectFit : "cover"}}
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
