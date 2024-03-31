// import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";
import "./style.css";
import styled from "styled-components";

const ProductDealStyles = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  .ModuleContent {
    height: 100%;
    .product-deal-wrapper {
      height: 100%;
    }
  }
  .product-deal-image {
    border-radius: 10px;
    overflow: hidden;
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }
  .slick-slide {
    & > div:first-child {
      margin-bottom: 20px;
    }
  }
  .slick-arrow {
    top: 50% !important;
  }
`;

export default function ProductSection(props) {
  const [productDeal, setProductDeal] = useState(props.products);
  const appTheme = useSelector((state) => state.app.appTheme);

  var bannerSettings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  var settings1 = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    rows: 2,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  function showBanner(i, v) {
    var arr = [];
    if (i == 0) {
      arr.push(
        <div className="product-deal-image" style={{ height: "100%" }}>
          <img
            style={{ height: "100%", objectFit: "cover" }}
            src={v.image_url}
            alt=""
          />
        </div>
      );
    }
    return arr.length == 0 ? null : arr;
  }

  return (
    <ProductDealStyles className="home-2 section product5">
      <div className="container">
        <div className="product-promo-heading">
          <h2 className="section-title text-blue">{props.title}</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 Module Module-1290 hidden-mobile ">
            <div className="ModuleContent">
              <div
                style={{ borderColor: appTheme.color_main_1 }}
                className="product-deal-wrapper product-deal-no-slider hidden-mobile"
              >
                {props.banners_ads.length > 0 ? (
                  <React.Fragment>
                    {props.banners_ads.map((v, i) => {
                      return showBanner(i, v);
                    })}
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-lg-8 Module Module-228 col-12 deal-product">
            <div className="ModuleContent">
              <div className="product-promo-wrapper">
                <div className="product-list">
                  <div className="swiper-container">
                    <div className="">
                      <Slider {...settings1}>
                        {productDeal.map((v, i) => (
                          <ItemProduct product={v} />
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductDealStyles>

    // <div className="product-section">
    //   <h3>{props.title}</h3>
    //   <Slider {...settings1}>
    //     {
    //       firstLine.map((v, i) =>
    //         <div className="card-container" key={i}>
    //           <ProductCard
    //             key={i}
    //             product={v}
    //           />
    //         </div>
    //       )
    //     }
    //   </Slider>
    //   <Slider {...settings2}>
    //     {
    //       secondLine.map((v, i) =>
    //         <div className="card-container" key={i}>
    //           <ProductCard
    //             key={i}
    //             product={v}
    //           />
    //         </div>
    //       )
    //     }
    //   </Slider>
    // </div>
  );
}
