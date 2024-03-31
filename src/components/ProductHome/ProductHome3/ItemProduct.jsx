import Slider from "react-slick";
import { Link } from "react-router-dom";
import { standardProductLink } from "../../../helper";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import {
  formatPrice,
  formatNumber,
  formatPriceOrContact,
  handleImgErr,
} from "../../../helper";
import "./style.css";
import { useSelector } from "react-redux";
import DiscountProduct from "../../ProductItem/DiscountProduct";
import styled from "styled-components";

const ItemProductStyles = styled.div`
  .product-inventory {
    display: inline-block;
    margin-top: 3px;
    padding: 4px;
    font-size: 10px;
    color: #ffffff;
    border-radius: 4px;
  }
`;

export default function ItemProduct(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  let {
    min_price,
    min_price_before_override,
    price,
    sold,
    product_discount,
    percent_collaborator,
    images,
    name,
    id,
    slug,
    view,
    is_favorite,
    is_new,
    is_top_sale,
    has_in_combo,
    has_in_bonus_product,
    has_in_product_discount,
    type_share_collaborator_number,
    money_amount_collaborator,
    check_inventory,
    quantity_in_stock,
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
  return (
    <ItemProductStyles className="section_product product_1" id="product_1">
      <div className="" style={{ margin: "0 8px" }}>
        <div className="block-product">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className=" item_product_main">
                <div className="product-block-item">
                  <div
                    class={`sale-label sale-top-right ${
                      product_discount == null || product_discount == 0
                        ? "hide"
                        : "show"
                    }`}
                  >
                    <span>- {discount_percent}%</span>
                  </div>
                  <div className="product-transition">
                    {is_new && <div className="new-tag">Mới</div>}
                    {is_favorite && (
                      <div
                        className="favorite-tag"
                        style={{ bottom: is_top_sale ? "23px" : "0" }}
                      >
                        Yêu thích
                      </div>
                    )}
                    {has_in_combo === true ||
                    has_in_bonus_product === true ||
                    has_in_product_discount === true ? (
                      <DiscountProduct
                        hasInCombo={has_in_combo}
                        hasInBonusProduct={has_in_bonus_product}
                        hasInProductDiscount={has_in_product_discount}
                      ></DiscountProduct>
                    ) : null}
                    {!is_top_sale && (
                      <div
                        className="top-sale-tag"
                        style={{
                          opacity: 1,
                          backgroundColor: "#e38800",
                        }}
                      >
                        Bán chạy
                      </div>
                    )}{" "}
                    <div
                      class={`sale-flash ${
                        product_discount == null || product_discount == 0
                          ? "hide"
                          : "show"
                      }`}
                    >
                      <div class="before"></div>- {discount_percent}%
                    </div>
                    <Link
                      className="product-thumb"
                      to={`/san-pham/${slug}-${id}`}
                    >
                      <Lazyload
                        offset={100}
                        throttle={300}
                        placeholder={<LazyImage></LazyImage>}
                      >
                        <img
                          className="product-thumbnail lazy"
                          src={avt}
                          alt={name}
                        />
                      </Lazyload>
                    </Link>
                  </div>
                  <div className="product-info">
                    <Link
                      to={`/san-pham/${slug}-${id}`}
                      title={name}
                      className="item-product-name"
                    >
                      {name}
                    </Link>
                    <div className="product__price">
                      <span
                        className="price"
                        style={{
                          color: "rgb(126, 13, 13)",
                          "font-size": "18px",
                          "font-weight": "500",
                        }}
                      >
                        {" "}
                        {"  "}
                        {formatPriceOrContact(
                          discount == 0 ? min_price : discount
                        )}
                      </span>

                      <span
                        class={`old-price ${
                          product_discount == null ||
                          product_discount == 0 ||
                          formatPriceOrContact(min_price) == "Liên hệ"
                            ? "hide"
                            : ""
                        }`}
                      >
                        {formatPriceOrContact(min_price)}
                      </span>
                    </div>

                    <div className="special-price">
                      <div className="price">
                        <div style={{ height: "17px" }}>
                          <div
                            style={{
                              margin: "2px 0",
                              fontSize: "13px",
                              color: "#999",
                              display: "inline-block",
                              fontWeight: "500",
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
                                            ((discount == 0
                                              ? min_price
                                              : discount) *
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
                                          color: "deeppink",
                                        }}
                                      >
                                        {formatPrice(money_amount_collaborator)}
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
                                fontSize: "13px",
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
                                {formatPrice(min_price_before_override)}
                              </label>
                            </div>
                          )}
                        </div>
                        <div
                          className="view-count"
                          style={{
                            fontSize: "13px",
                            color: "#999",
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "500",
                          }}
                        >
                          {appTheme.is_show_product_sold ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: "2px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Đã mua <span>{formatNumber(sold)}</span>
                            </div>
                          ) : null}{" "}
                          {appTheme.is_show_product_view ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "3px",
                                }}
                              >
                                <span>
                                  <i className="fa fa-eye"></i>
                                </span>
                                <span>{view}</span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        className="product-inventory"
                        style={{
                          backgroundColor:
                            badges.allow_semi_negative ||
                            !check_inventory ||
                            quantity_in_stock > 0
                              ? "#629808"
                              : "#e51313",
                        }}
                      >
                        {" "}
                        {badges.allow_semi_negative ? (
                          "Còn hàng"
                        ) : check_inventory ? (
                          <>{quantity_in_stock > 0 ? "Còn hàng" : "Bán hết"}</>
                        ) : (
                          "Còn hàng"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ItemProductStyles>
  );
}
