import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductList11FlashSale from "../../ProductList/ProductList11/ProductList11FlashSale";
import ProductList11Promotions from "../../ProductList/ProductList11/ProductList11Promotions";

const ProductHome11PromotionsStyles = styled.section`
  margin-top: 15px;
  padding: 0 10px 10px 10px;
  background-color: #fff;
  position: relative;
  .productHome11Promotions__title {
    padding-top: 5px;
    h2 {
      color: #070707;
      text-transform: uppercase;
      font-size: 16px;
      margin-bottom: 15px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .productHome11Promotions__listProduct {
    margin-left: -8px;
    .product__main {
      padding-left: 8px;
    }
  }
  &.productHome11PromotionsDiscount {
    border: 3px solid transparent;
    border-radius: 15px;
    padding: 10px 30px;
    position: relative;
    margin-top: 50px;
    .productHome11Promotions__title {
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
    .productHome11Promotions__content {
      margin-top: 50px;
    }
  }
  .category-btnMore {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    a {
      display: flex;
      align-items: center;
      column-gap: 5px;
      color: #0071c4;
      padding: 8px 16px;
      border: 1px solid #0071c4;
      border-radius: 3px;
      i {
        font-size: 11px;
      }
    }
  }
`;

const ProductHome11Promotions = ({ title, categories, ...props }) => {
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <ProductHome11PromotionsStyles
      className={`productHome11Promotions`}
      style={{
        borderColor: appTheme.color_main_1,
      }}
    >
      <div className="productHome11Promotions__content">
        <div className="wrapper-container">
          <div className="productHome11Promotions__title">
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
                    }}
                  >
                    <img src="./img/hot-category.png" alt={title} />
                    <span>{title}</span>
                  </h2>
                </div>
              )}
            </h2>
          </div>
          <ProductList11Promotions
            products={props.products}
          ></ProductList11Promotions>
          <div className="category-btnMore">
            <Link to={`/san-pham`}>
              <span>Xem thêm chuyên mục</span>
              <span>
                <i className="fa fa-chevron-down"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </ProductHome11PromotionsStyles>
  );
};

export default ProductHome11Promotions;
