import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ProductItem10 from "../../ProductItem/ProductItem10/ProductItem10";

const ProductListStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  .productHome10__slider2 {
    position: relative;
    .productHome10__btn {
      position: absolute;
      top: calc(50% - 20px);
      z-index: 100;
      padding: 0px;
      margin: 0px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(7, 7, 7, 0.5);
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: rgba(7, 7, 7, 0.7);
      }
      &.productHome10__btnPrev {
        left: 8px;
      }
      &.productHome10__btnNext {
        right: 0;
      }
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

const ProductList10 = (props) => {
  const [productsFirstLine, setProductsFirstLine] = useState(props.products);
  const [productsSecondLine, setProductsSecondLine] = useState([]);
  const slider = useRef();
  const settings1 = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings2 = {
    infinite: props?.products?.length > 4,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
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
        breakpoint: 992,
        settings: {
          infinite: props.products.length > 3,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 600 && props.products.length > 2) {
      let firstArr = props.products.slice(0, 2);
      let secondArr = props.products.slice(2);
      setProductsFirstLine(firstArr);
      setProductsSecondLine(secondArr);
    } else if (width >= 600 && width < 992 && props.products.length > 3) {
      let firstArr = props.products.slice(0, 3);
      let secondArr = props.products.slice(3);
      setProductsFirstLine(firstArr);
      setProductsSecondLine(secondArr);
    } else if (width >= 992 && props.products.length > 4) {
      let firstArr = props.products.slice(0, 4);
      let secondArr = props.products.slice(4);
      setProductsFirstLine(firstArr);
      setProductsSecondLine(secondArr);
    }
  }, []);
  return (
    <ProductListStyles className="productHome10__listProduct">
      <Slider {...settings1} ref={slider}>
        {productsFirstLine.map((product) => (
          <div className="product__main" key={product.id}>
            <ProductItem10 product={product} />
          </div>
        ))}
      </Slider>
      <div className="productHome10__slider2">
        {productsSecondLine.length > 4 && (
          <>
            <button
              className="productHome10__btn productHome10__btnPrev"
              onClick={() => slider.current.slickPrev()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path
                  fill="currentColor"
                  d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
                ></path>
              </svg>
            </button>
            <button
              className="productHome10__btn productHome10__btnNext"
              onClick={() => slider.current.slickNext()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path
                  fill="currentColor"
                  d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                ></path>
              </svg>
            </button>
          </>
        )}
        <Slider {...settings2} ref={slider}>
          {productsSecondLine.map((product) => (
            <div className="product__main" key={product.id}>
              <ProductItem10 product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </ProductListStyles>
  );
};

export default ProductList10;
