import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ItemProduct from "./ItemProduct";
import Slider from "react-slick";
import "./style.css"
export default function SalesProductsSection(props) {
  const { banners_ads, products } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  
  function showBanner() {
    var banner = [];
    if (banners_ads.length) {
      var bannerSetting = banners_ads.pop();
      banner = <div ><img style={{maxHeight: "330px",width:"100%", objectFit: "cover", margin: "0 auto", display: "block"}} src={bannerSetting.image_url} /></div>;
    }
    return (banner);
  };

  return (
    <section className="new-products-section product666">
      <div className="container ">
        <div className="row">
          <div className="col-12 section-head">
            {showBanner()}
          </div>
          <div>
           <h3 style={{marginTop:"10px"}}> {props.title}</h3>
          </div>
          <div className="row san-pham">
              {
                products.slice(0, 10).map((v, i) =>
                  <div className="col-lg-2 col-6">
                    <div className="card-container" key={i}>
                      <ItemProduct
                        key={i}
                        product={v}
                      />
                    </div>
                  </div>
                )
              }
          </div>
          <div className="text-center read-more">
              <Link to="/san-pham" title="Xem thêm sản phẩm khác">Xem thêm sản phẩm khác <i className="fa fa-angle-double-right"></i></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
