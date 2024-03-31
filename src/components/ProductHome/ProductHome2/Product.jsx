import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";

import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";
import styled from "styled-components";
import BannerByCategory from "../../BannerByCategory";

const Product2Styles = styled.section`
  .slick-prev {
    left: 4px !important;
  }
  .slick-next {
    right: 4px !important;
  }
`;

export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const info = useMemo(() => {
    if (categories && categories.length > 0) {
      return {
        category: categories.filter((v) => v.name === props.title),
      };
    } else {
      return {};
    }
  }, [categories]);
  const [firstLine, setFirstLine] = useState(props.products);
  const [secondLine, setSecondLine] = useState([]);
  var settings1 = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
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
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var settings2 = {
    infinite: props.products.length > 4,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: props.products.length > 2,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: props.products.length > 3,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: props.products.length > 4,
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          infinite: props.products.length > 4,
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 600 && props.products.length > 4) {
      let firstArr = props.products.slice(0, 2);
      let secondArr = props.products.slice(2);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 600 && width < 768 && props.products.length > 6) {
      let firstArr = props.products.slice(0, 3);
      let secondArr = props.products.slice(3);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 768 && width < 992 && props.products.length > 8) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 992 && width < 1400 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 1400 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
  }, []);

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }

  console.log(categories, info.category, props.title);
  return (
    <Product2Styles className="awe-section-3 product22" id="awe-section-3">
      <div className="section section-collection section-collection-1">
        <div className="container">
          <div className="collection-border">
            <div className="collection-main">
              <div
                className="e-tabs not-dqtab ajax-tab-1"
                data-section="ajax-tab-1"
                data-view="car-1"
              >
                <div className="content">
                  <div className="section-title">
                    <Link
                      to={
                        info.category && info.category.length > 0
                          ? `/san-pham?danh-muc=${info.category[0].slug}-${info.category[0].id}`
                          : "#"
                      }
                    >
                      <h2 style={{ backgroundColor: appTheme.color_main_1 }}>
                        {props.title}
                      </h2>
                    </Link>
                  </div>

                  {props.banners != null && props.banners.length > 0 && (
                    <div
                      style={{
                        marginBottom: 30,
                      }}
                    >
                      {" "}
                      <BannerByCategory banners={props.banners} />
                    </div>
                  )}

                  <div style={{ margin: "0 -2px" }}>
                    <div className="">
                      <Slider {...settings1}>
                        {firstLine.map((v, i) => (
                          <ItemProduct key={i} product={v} />
                        ))}
                      </Slider>
                    </div>
                  </div>
                  <div style={{ margin: "0 -8px" }}>
                    <div className="">
                      <Slider {...settings2}>
                        {secondLine.map((v, i) => (
                          <ItemProduct key={i} product={v} />
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
    </Product2Styles>
  );
}
