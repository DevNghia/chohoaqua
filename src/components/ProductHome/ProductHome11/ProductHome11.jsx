import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductList11 from "../../ProductList/ProductList11/ProductList11";

const ProductHome11Styles = styled.section`
  margin: 25px 0 30px;

  .productHome11__title {
    h2 {
      color: #070707;
      text-transform: uppercase;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .productHome11__listProduct {
    margin-left: -8px;
    .product__main {
      padding-left: 8px;
    }
  }
  &.productHome11Discount {
    border: 3px solid transparent;
    border-radius: 15px;
    padding: 10px 30px;
    position: relative;
    margin-top: 50px;
    .productHome11__title {
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
    .productHome11__content {
      margin-top: 50px;
    }
  }
`;

const ProductHome11 = ({ title, categories, ...props }) => {
  console.log("ProductHome11 ~ categories:", categories);
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <ProductHome11Styles
      className={`productHome11 ${
        title === "Sản phẩm giảm giá" ? "productHome11Discount" : ""
      }`}
      style={{
        borderColor: appTheme.color_main_1,
      }}
    >
      <div className="productHome11__content">
        <div className="wrapper-container">
          <div className="productHome11__title">
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
                  {title === "Flash sale" ? (
                    <h2
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px",
                      }}
                    >
                      <img src="./img/flash.png" alt="flash-sale" />
                      <span>{title}</span>
                    </h2>
                  ) : (
                    <h2>{title}</h2>
                  )}
                </div>
              )}
            </h2>
          </div>
          <ProductList11 products={props.products}></ProductList11>
        </div>
      </div>
    </ProductHome11Styles>
  );
};

export default ProductHome11;
