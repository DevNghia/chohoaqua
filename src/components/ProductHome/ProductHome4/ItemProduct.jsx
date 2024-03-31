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

import { useSelector } from "react-redux";
import "./style.css";
import DiscountProduct from "../../ProductItem/DiscountProduct";
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
  console.log(discount_percent);
  return (
    <div
      style={{
        padding: "0 6px",
      }}
    >
      <div className="swiper-slide" style={{ border: "1px solid  #dad3d3" }}>
        <div className="item_product_main">
          <form
            action="https://ego-wear.mysapo.net/cart/add"
            method="post"
            className="variants product-action wishItem"
          >
            <div
              class={`product-thumbnail ${
                product_discount == null || product_discount == 0 ? "" : "sale"
              }`}
              data-sale={`Giảm ${discount_percent}%`}
            >
              {/* <div
                          class={`sale-label sale-top-right ${product_discount == null || product_discount == 0
                              ? "hide"
                              : "show"
                            }`}
                        >
                          <span>- {discount_percent}%</span>
                        </div> */}
              <div
                className={`product-deal-coupon
            ${
              product_discount == null || product_discount == 0
                ? "hide"
                : "show"
            }
            `}
                style={{ backgroundImage: "url(/img/coupon-bg.png)" }}
              >
                Giảm {discount_percent}%
              </div>
              {is_new && <div className="new-tag-theme">Mới</div>}
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
              {is_top_sale && <div className="top-sale-tag">Bán chạy</div>}{" "}
              <Link className="image_thumb" to={`/san-pham/${slug}-${id}`}>
                <div className="product-image">
                  <Lazyload
                    offset={100}
                    throttle={300}
                    placeholder={<LazyImage></LazyImage>}
                  >
                    <img
                      style={{ objectFit: "contain" }}
                      src={avt}
                      alt={name}
                    />
                  </Lazyload>
                </div>
              </Link>{" "}
            </div>
            <div className="product-info" style={{ padding: "0 8px 8px 8px" }}>
              <h3 className="product-name">
                <Link to={`/san-pham/${slug}-${id}`}>{name}</Link>
              </h3>

              <div class="bottom-action">
                <div class="price-box">
                  <span
                    class="price"
                    style={{
                      color: "rgb(126, 13, 13)",
                      "font-size": "18px",
                      "font-weight": "500",
                    }}
                  >
                    {"  "}
                    {formatPriceOrContact(discount == 0 ? min_price : discount)}
                  </span>

                  <span
                    class={`compare-price ${
                      product_discount == null ||
                      product_discount == 0 ||
                      formatPriceOrContact(min_price) == "Liên hệ"
                        ? "hide"
                        : ""
                    }`}
                  >
                    {" "}
                    {formatPriceOrContact(min_price)}{" "}
                  </span>
                </div>
              </div>
              <div>
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
                    <div>
                      Đã mua <span>{formatNumber(sold)}</span>
                    </div>
                  ) : null}
                  {appTheme.is_show_product_view ? (
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
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
