import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatPrice, formatPriceOrContact } from "../../../helper";
import DiscountProduct from "../DiscountProduct";

const ProductItemStyles = styled.div`
  position: relative;
  overflow: hidden;
  .productItem-content {
    .productItem-image {
      position: relative;
      overflow: hidden;
      height: 480px;
      &:hover img:nth-child(2) {
        opacity: 1;
        visibility: visible;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s;
        &:first-child {
          &:hover {
            transform: scale(1.1);
          }
        }
        &:nth-child(2) {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          visibility: hidden;
        }
      }
      .productItem-new {
        position: absolute;
        font-size: 1em;
        color: #fff;
        font-weight: 400;
        line-height: 25px;
        text-align: center;
        top: 5px;
        right: 0;
        z-index: 10;
        padding: 0 10px;
      }
      .productItem-percentDiscount {
        -webkit-box-align: center;
        -ms-flex-align: center;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        align-items: center;
        color: #fff;
        font-size: 12px;
        top: 5px;
        left: 0;
        background-repeat: no-repeat;
        padding-left: 15px;
        width: 83px;
        height: 24px;
        font-weight: 700;
        text-transform: uppercase;
        z-index: 5;
      }
      .productItem-favorite {
        position: absolute;
        z-index: 2;
        right: 2px;
        bottom: 22px;
        padding: 4px;
        font-size: 10px;
        color: white;
        background-color: #333;
        opacity: 0.7;
        border-radius: 2px;
      }
      .productItem-discount {
        position: absolute;
        font-size: 1em;
        color: #fff;
        font-weight: 400;
        line-height: 25px;
        text-align: center;
        left: 0px;
        bottom: 0px;
        z-index: 2;
        background-color: #c74141;
        padding: 0 13px;
        border-top-right-radius: 10px;
      }
      .productItem-topSale {
        position: absolute;
        right: 2px;
        bottom: 2px;
        z-index: 2;
        padding: 4px;
        font-size: 10px;
        color: #fff;
        background-color: #333;
        opacity: 0.7;
        border-radius: 2px;
      }
    }
    .productItem-info {
      text-align: center;
      padding: 10px;
      font-size: 14px;
      line-height: 21px;
      font-weight: bold;
      text-transform: uppercase;
      .productItem-name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 42px;
        a {
          color: #8a8a8f;
          transition: all 0.3s;
          &:hover {
            color: #070707;
          }
        }
      }
      .productItem-price {
        display: flex;
        justify-content: center;
        column-gap: 10px;
        .productItem-oldPrice {
          text-decoration: line-through;
        }
      }
    }
  }
  @media screen and (max-width: 400px) {
    .productItem-content {
      .productItem-image {
        height: 270px;
      }
      .productItem-info {
        .productItem-price {
          .productItem-oldPrice {
            font-size: 12px;
          }
        }
      }
    }
  }
`;

const ProductItem10 = (props) => {
  const { product } = props;
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);

  const [percentDiscount, setPercentDiscount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    if (product.product_discount) {
      setPercentDiscount(product.product_discount.value);
      setDiscountPrice(
        product.min_price * 0.01 * (100 - product.product_discount.value)
      );
    }
  }, [product.min_price, product.product_discount, product.setPercentDiscount]);

  return (
    <ProductItemStyles className="productItem-card">
      <div className="productItem-content">
        <div className="productItem-image">
          {product.is_new && (
            <div
              className="productItem-new"
              style={{ background: appTheme.color_main_1 }}
            >
              Mới
            </div>
          )}
          {product.product_discount && (
            <div
              className="productItem-percentDiscount"
              style={{
                backgroundImage: 'url("/img/coupon-bg.png")',
                columnGap: "5px",
              }}
            >
              <span>GIẢM</span>
              {`${percentDiscount}%`}
            </div>
          )}
          {product.is_favorite && (
            <div
              className="productItem-favorite"
              style={{
                bottom: product.is_top_sale ? product.favorite_tag_style : "0",
              }}
            >
              Yêu thích
            </div>
          )}
          {product.has_in_combo === true ||
          product.has_in_bonus_product === true ||
          product.has_in_product_discount === true ? (
            <DiscountProduct
              hasInCombo={product.has_in_combo}
              hasInBonusProduct={product.has_in_bonus_product}
              hasInProductDiscount={product.has_in_product_discount}
            ></DiscountProduct>
          ) : null}
          {product.is_top_sale && (
            <div className="productItem-topSale">Bán chạy</div>
          )}
          <Link to={`/san-pham/${product.slug}-${product.id}`}>
            <img
              className="productItem-img"
              src={product.images[0]?.image_url || "/img/default_product.jpg"}
              alt={product.name}
            />
            {product.images.length > 1 && (
              <img src={product.images[1].image_url} alt={product.name} />
            )}
          </Link>
        </div>
        <div className="productItem-info">
          <div className="productItem-name">
            <Link to={`/san-pham/${product.slug}-${product.id}`}>
              {product.name}
            </Link>
          </div>
          <div className="productItem-price">
            <div
              className="productItem-currentPrice"
              style={{ color: appTheme.color_main_1 }}
            >
              {formatPriceOrContact(
                Number(discountPrice) === 0 ? product.min_price : discountPrice
              )}
            </div>
            <span
              className={`productItem-oldPrice ${
                product.product_discount === null ||
                Number(product.product_discount) === 0 ||
                formatPriceOrContact(product.min_price) === "Liên hệ"
                  ? "hide"
                  : ""
              }`}
            >
              {formatPriceOrContact(product.min_price)}
            </span>
          </div>
          <div style={{ height: "17px" }}>
            <div
              style={{
                margin: "2px 0",
                fontSize: "12px",
                color: "#999",
                display: "inline-block",
                fontWeight: "500",
              }}
            >
              {badges.status_collaborator === 1 ? (
                <>
                  {product.type_share_collaborator_number === 0 ? (
                    <>
                      {formatPrice(
                        ((discountPrice == 0
                          ? product.min_price
                          : discountPrice) *
                          product.percent_collaborator) /
                          100
                      ) !== "0₫" && (
                        <div
                          className="coll-price"
                          style={{
                            margin: "0",
                          }}
                        >
                          <span>Hoa hồng:</span>
                          <label
                            style={{
                              color: "deeppink",
                            }}
                          >
                            {` ${formatPrice(
                              ((discountPrice == 0
                                ? product.min_price
                                : discountPrice) *
                                product.percent_collaborator) /
                                100
                            )}`}
                          </label>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div
                        className="coll-price"
                        style={{
                          margin: "0",
                        }}
                      >
                        <span>Hoa hồng:</span>
                        <label
                          style={{
                            color: "deeppink",
                          }}
                        >
                          {formatPrice(product.money_amount_collaborator)}
                        </label>
                      </div>
                    </>
                  )}
                </>
              ) : null}
            </div>
            {badges.status_agency === 1 && (
              <div
                style={{
                  margin: "2px 0",
                  fontSize: "12px",
                  color: "#999",
                  display: "inline-block",
                  fontWeight: "500",
                }}
              >
                Giá bán lẻ{" "}
                <label
                  style={{
                    color: "deeppink",
                  }}
                >
                  {formatPrice(product.min_price_before_override)}
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProductItemStyles>
  );
};

export default ProductItem10;
