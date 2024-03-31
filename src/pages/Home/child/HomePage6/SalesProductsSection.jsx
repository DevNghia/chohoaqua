import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ItemProduct from "./ItemProduct";
import Slider from "react-slick";

export default function SalesProductsSection(props) {
  const { banners_ads, products } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  
  var settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
    ]
  };
  
  function showBanner() {
    var banner = '';
    if (banners_ads.length) {
      var bannerSetting = banners_ads.pop();
      banner = <div style={{maxHeight: "112px"}}><img style={{height: "100%", objectFit: "cover", margin: "0 auto", display: "block"}} src={bannerSetting.image_url} /></div>;
    }
    return (banner);
  };

  return (
    <section className="hot-products-section">
      <div className="container">
        <div className="row">
          <div className="col-12 section-head">
            {showBanner()}
          </div>
          <div style={{marginTop:"10px"}}>
            <h3>{props.title}</h3>
          </div>
          <div className="products-slider">
            <Slider {...settings}>
              {
                products.slice(0, 10).map((v, i) =>
                  <div className="card-container" key={i}>
                    <ItemProduct
                      key={i}
                      product={v}
                    />
                  </div>
                )
              }
            </Slider>
          </div>
          <div className="text-center read-more">
              <Link to="/san-pham" title="Xem thêm sản phẩm khác">Xem thêm sản phẩm khác <i className="fa fa-angle-double-right"></i></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
