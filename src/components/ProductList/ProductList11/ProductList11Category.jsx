// import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProductItem11Category from "../../ProductItem/ProductItem11/ProductItem11Category";

const ProductListStyles = styled.div`
  margin-top: 0 !important;
  .product-category-list {
    background-color: transparent;
  }
  .slick-list {
    margin: 0 -5px;
  }
  .slick-slide > div {
    padding: 0 5px;
  }
`;

export default function ProductList11Category(props) {
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

  return (
    <ProductListStyles className="product-category-list-wrap product11">
      <div className="container">
        <div className="product-category-list ajax-response-parent">
          <div className="product-category-list-heading flex justify-between items-center">
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
          </div>
          <div className="product-category-list-body">
            <div
              className="product-category-tab show"
              style={{ display: "block" }}
            >
              <div className="product-list">
                <div className="ajax-response">
                  <Slider {...settings2}>
                    {firstLine.map((v, i) => (
                      <ProductItem11Category product={v} />
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductListStyles>
  );
}
