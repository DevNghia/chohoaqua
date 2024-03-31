// import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";
import "./style.css";
import BannerByCategory from "../../BannerByCategory";
import { hexToRgbHeader } from "../../../utils/toUtils";

export default function ProductSection(props) {
  const { banners, categories, discountProducts } = props;
  console.log("banners:11111 ", banners);
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var settings2 = {
    infinite: props.products.length > 5,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: props.products.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: props.products.length > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          infinite: props.products.length > 5,
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
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 992 && width < 1500 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
    if (width >= 1500 && props.products.length > 10) {
      let firstArr = props.products.slice(0, 5);
      let secondArr = props.products.slice(5);
      setFirstLine(firstArr);
      setSecondLine(secondArr);
    }
  }, []);

  return (
    <div
      className="product-category-list-wrap product-home-5 product9"
      style={{
        marginTop: "40px",
        borderTop: `1px solid ${appTheme.color_main_1}`,
        background: "#D8ECD4"
      }}
    >
      <div className="container">
        <div
          className="product-category-list ajax-response-parent"
          style={{ position: "relative", borderRadius: "0" }}
        >
          {/* <div className="product-category-list-heading flex justify-between items-center">
            <div className="category-title flex items-center">
              <Link
                to={
                  info.category && info.category.length > 0
                    ? `/san-pham?danh-muc=${info.category[0].slug}-${info.category[0].id}`
                    : "#"
                }
              >
                <h2 className="section-title text-blue ml-2">{props.title}</h2>
              </Link>
            </div>
          </div> */}
          <div
            style={{
              background: hexToRgbHeader(appTheme.color_main_1).second,
              minWidth: "260px",
              padding: "0 8px",
              height: "34px",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              position: "absolute",
              top: "-17px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap"
            }}
          >
            <p>{props.title}</p>
            <p
              style={{
                width: 0,
                height: "0",
                borderBottom: `17px solid ${appTheme.color_main_1}`,
                borderLeft: "10px solid transparent",
                borderRight: `0 solid ${appTheme.color_main_1}`,
                position: "absolute",
                left: "-10px",
                top: "0px"
              }}
            ></p>
            <p
              style={{
                width: 0,
                height: "0",
                borderBottom: `10px solid ${appTheme.color_main_1}`,
                borderLeft: "17px solid transparent",
                borderRight: `0 solid ${appTheme.color_main_1}`,
                position: "absolute",
                right: "-13px",
                top: "3.5px",
                transform: "rotate(90deg)"
              }}
            ></p>
          </div>
          <BannerByCategory banners={props.banners} />
          <div className="product-category-list-body">
            <div
              className="product-category-tab show"
              style={{ display: "block" }}
            >
              <div className="product-list">
                <div className="ajax-response">
                  <Slider {...settings1}>
                    {firstLine.map((v, i) => (
                      <ItemProduct product={v} key={v} />
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="product-list">
                <div className="ajax-response">
                  <Slider {...settings2}>
                    {secondLine.map((v, i) => (
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
  );
}
