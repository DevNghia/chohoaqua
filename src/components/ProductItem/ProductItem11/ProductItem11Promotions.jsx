import Slider from "react-slick";
import { Link } from "react-router-dom";
import { formatPriceV2, standardProductLink } from "../../../helper";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import {
  formatPrice,
  formatNumber,
  formatPriceOrContact,
  handleImgErr,
} from "../../../helper";

import { useSelector } from "react-redux";
import DiscountProduct from "../DiscountProduct";
import styled from "styled-components";
import moment from "moment/moment";

const ProductItemStyles = styled.div`
  border-radius: 5px;
  padding: 10px;
  position: relative;
  overflow: hidden;
  border: 1px solid #f1f1f1;
  &:hover {
    box-shadow: 0 0 3px 0 #afafaf !important;
  }
  .product_name {
    font-size: 14px !important;
    font-weight: 400;
    height: 44px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0;
    transition: all 0.3s;
    &:hover a {
      color: #da251c;
    }
  }
  .product-image {
    position: relative;
    height: 240px;
    width: 100%;
    img {
      height: 240px;
      width: 100%;
    }
    .top-sale-tag {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: #fff;
      background: #f90;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .product-discount {
    span {
      color: #fff;
      text-transform: uppercase;
      text-align: center;
      line-height: 22px;
      width: 50px;
      display: block;
      border-radius: 16px;
      background: #f90;
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 10;
    }
  }
  .product-bottom {
    background-color: #da251c;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 2px;
    border-radius: 5px;
    font-size: 14px;
    .current-price {
      font-weight: 600;
    }
    .prev-price {
      font-size: 11px;
      text-decoration: line-through;
    }
    .product-bottom-right {
      text-align: right;
      font-size: 12px;
      line-height: 16px;
      strong {
        font-size: 14px;
      }
    }
  }
  .product-bottom-promotions {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
    .promotions-price {
      color: #da251c;
      font-weight: 600;
      font-size: 18px;
    }
    .promotions-sold {
      position: relative;
      height: 16px;
      width: 100%;
      overflow: hidden;
      border-radius: 100rem;
      .promotions-sold-bg {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #ddd;
        border-radius: 100rem;
      }
      .promotions-sold-percent {
        position: absolute;
        top: 0;
        z-index: 5;
        height: 100%;
        background-image: linear-gradient(
          to right,
          rgba(255, 153, 0, 1),
          rgba(255, 0, 0, 1)
        );
        overflow: hidden;
        border-radius: 100rem;
      }
      .promotions-sold-price {
        position: absolute;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 12px;
      }
    }
  }
  @media screen and (max-width: 400px) {
    .product-image {
      height: 160px;
      img {
        height: 160px;
      }
    }
  }
`;

export default function ProductItem11Promotions(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  let {
    min_price,
    min_price_before_override,
    price,
    product_discount,
    percent_collaborator,
    images,
    name,
    id,
    view,
    sold,
    is_favorite,
    is_new,
    is_top_sale,
    slug,
    price_for_agency,
    quantity_in_stock,
    has_in_combo,
    has_in_bonus_product,
    has_in_product_discount,
    type_share_collaborator_number,
    money_amount_collaborator,
    check_inventory,
  } = props.product;
  let pastPrice = min_price;
  let discount = 0;
  let discount_percent = 0;
  let avt = "/img/default_product.jpg";

  if (product_discount) {
    discount_percent = product_discount.value;
    discount = min_price * 0.01 * (100 - product_discount.value);
    //discount = product_discount.discount_price;

    // price = min_price - discount;
  }
  if (images.length) avt = images[0].image_url;

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  function handleTime(discount) {
    if (discount) {
      const endTime = Math.ceil(
        moment.duration(moment(discount.end_time).diff(moment())).asDays()
      );
      return endTime;
    }
    return 0;
  }
  const totalStock = quantity_in_stock + sold;

  return (
    <ProductItemStyles className="product-item">
      {product_discount == null || product_discount == 0 ? null : (
        <div class={`product-discount`}>
          <span>-{discount_percent}%</span>
        </div>
      )}
      <Link to={`/san-pham/${slug}-${id}`}>
        <div className="product-image">
          {is_top_sale && <div className="top-sale-tag">Bán chạy</div>}
          <img src={avt} alt={name} loading="lazy" />
        </div>
      </Link>
      <h3 className="product_name">
        <Link
          to={`/san-pham/${slug}-${id}`}
          style={{
            lineHeight: 1.5,
          }}
        >
          {name}
        </Link>
      </h3>
      {product_discount ? (
        <div className="product-bottom">
          <div className="product-bottom-left">
            <div className="current-price">
              {discount ? `${formatPriceV2(discount)}₫` : "0₫"}
            </div>
            <div className="prev-price">
              {" "}
              {min_price ? `${formatPriceV2(min_price)}₫` : "0₫"}
            </div>
            <div
              style={{
                fontSize: "12px",
              }}
            >
              {badges.status_collaborator === 1 ? (
                <>
                  {type_share_collaborator_number === 0 ? (
                    <>
                      {formatPrice(
                        ((discount == 0 ? min_price : discount) *
                          percent_collaborator) /
                          100
                      ) != "0₫" && (
                        <div
                          className="coll-price"
                          style={{
                            margin: "0",
                          }}
                        >
                          <span>Hoa hồng:</span>
                          <label
                            style={{
                              fontWeight: "600",
                            }}
                          >
                            {` ${formatPrice(
                              ((discount == 0 ? min_price : discount) *
                                percent_collaborator) /
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
                            fontWeight: "600",
                          }}
                        >
                          {formatPrice(money_amount_collaborator)}
                        </label>
                      </div>
                    </>
                  )}
                </>
              ) : null}
              {badges.status_agency === 1 && (
                <div>
                  Giá bán lẻ{" "}
                  <label
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {formatPrice(min_price_before_override)}
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="product-bottom-right">
            <div>Kết thúc sau</div>
            <div>
              <strong>{handleTime(product_discount)}</strong> ngày
            </div>
            <div>
              Còn <strong>{check_inventory ? quantity_in_stock : 999}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-bottom-promotions">
          <div className="promotions-price">
            {min_price ? `${formatPriceV2(min_price)} ₫` : "0 ₫"}
          </div>
          <div
            style={{
              fontSize: "12px",
            }}
          >
            {badges.status_collaborator === 1 ? (
              <>
                {type_share_collaborator_number === 0 ? (
                  <>
                    {formatPrice(
                      ((discount == 0 ? min_price : discount) *
                        percent_collaborator) /
                        100
                    ) != "0₫" && (
                      <div
                        className="coll-price"
                        style={{
                          margin: "0",
                        }}
                      >
                        <span>Hoa hồng:</span>
                        <label
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          {` ${formatPrice(
                            ((discount == 0 ? min_price : discount) *
                              percent_collaborator) /
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
                          fontWeight: "600",
                        }}
                      >
                        {formatPrice(money_amount_collaborator)}
                      </label>
                    </div>
                  </>
                )}
              </>
            ) : null}
            {badges.status_agency === 1 && (
              <div>
                Giá bán lẻ{" "}
                <label
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {formatPrice(min_price_before_override)}
                </label>
              </div>
            )}
          </div>
          <div className="promotions-sold">
            <div className="promotions-sold-bg"></div>
            <div
              className="promotions-sold-percent"
              style={{
                width: check_inventory ? `${(sold / totalStock) * 100}%` : "0%",
              }}
            ></div>
            <div className="promotions-sold-price">Đã bán {sold}</div>
          </div>
        </div>
      )}
    </ProductItemStyles>
  );
}
