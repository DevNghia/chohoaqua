import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductList11FlashSale from "../../ProductList/ProductList11/ProductList11FlashSale";

const ProductHome11FlashSaleStyles = styled.section`
  margin-top: 15px;
  padding: 0 10px 10px 10px;
  background-color: #4d90e0;
  position: relative;
  .productHome11FlashSale__title {
    padding-top: 5px;
    h2 {
      color: #070707;
      text-transform: uppercase;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .productHome11FlashSale__listProduct {
    margin-left: -8px;
    .product__main {
      padding-left: 8px;
    }
  }
  &.productHome11FlashSaleDiscount {
    border: 3px solid transparent;
    border-radius: 15px;
    padding: 10px 30px;
    position: relative;
    margin-top: 50px;
    .productHome11FlashSale__title {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      width: 100%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      & > h2 {
        display: inline-block;
        background-color: white;
        padding: 5px 30px;
        border-radius: 30px;
        box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
        & > div {
          display: flex;
          align-items: center;
          column-gap: 10px;
        }
      }
    }
    .productHome11FlashSale__content {
      margin-top: 50px;
    }
  }
  .productHome11FlashSale__showAll {
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0 0 0 10px;
    padding-left: 10px;
    a {
      color: #fff;
      cursor: pointer;
    }
    i {
      margin-left: 5px;
      vertical-align: middle;
      font-size: 10px;
    }
    &::before {
      display: block;
      position: absolute;
      content: "";
      top: 0;
      right: 100%;
      width: 10px;
      height: 10px;
      background: rgba(255, 255, 255, 0.2);
    }
    &::after {
      display: block;
      position: absolute;
      content: "";
      top: 0;
      right: 100%;
      width: 10px;
      height: 10px;
      background: #4d90e0;
      border-radius: 0 10px 0 0;
    }
  }
`;

const ProductHome11FlashSale = ({ title, categories, ...props }) => {
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <ProductHome11FlashSaleStyles
      className={`productHome11FlashSale ${
        title === "Sản phẩm giảm giá" ? "productHome11FlashSaleDiscount" : ""
      }`}
      style={{
        borderColor: appTheme.color_main_1,
      }}
    >
      <div className="productHome11FlashSale__content">
        <div className="wrapper-container">
          <div className="productHome11FlashSale__title">
            <h2>
              {categories && categories.length > 0 ? (
                <Link
                  to={
                    categories && categories.length > 0
                      ? `/san-pham?danh-muc=${categories[0].slug}-${categories[0].id}`
                      : "#"
                  }
                >
                  <h2>{title}</h2>
                </Link>
              ) : (
                <div>
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      color: "#fff",
                    }}
                  >
                    <img src="./img/flash.png" alt="flash-sale" />
                    <span>{title}</span>
                  </h2>
                </div>
              )}
            </h2>
            <div className="productHome11FlashSale__showAll">
              <Link to="/san-pham">
                Xem tất cả{" "}
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
          <ProductList11FlashSale
            products={props.products}
          ></ProductList11FlashSale>
        </div>
      </div>
    </ProductHome11FlashSaleStyles>
  );
};

export default ProductHome11FlashSale;
