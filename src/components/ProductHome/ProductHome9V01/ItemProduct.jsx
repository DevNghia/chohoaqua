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
    view,
    is_favorite,
    is_new,
    is_top_sale,
    slug,
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
    <div className="swiper-slide">
      <div className="product-item">
        <Link className="product-img" to={`/san-pham/${slug}-${id}`}>
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
          {is_top_sale && <div className="top-sale-tag">Bán chạy</div>}{" "}
          <Lazyload
            offset={100}
            throttle={300}
            placeholder={<LazyImage></LazyImage>}
          >
            <img src={avt} />
          </Lazyload>
          <div
            className={`product-deal-coupon
        ${
          product_discount == null || product_discount == 0
            ? "visible_discount"
            : ""
        }
            `}
            style={{ backgroundImage: "url(/img/coupon-bg.png)" }}
          >
            Giảm {discount_percent}%
          </div>
        </Link>
        <h3 className="product-name leading-snug">
          <Link to={`/san-pham/${slug}-${id}`}>{name}</Link>
        </h3>
        <div className="product-price flex items-end">
          <strong
            className="price text-main"
            style={{ color: appTheme.color_main_1 }}
          >
            {"  "}
            {formatPriceOrContact(discount == 0 ? min_price : discount)}
          </strong>
          <del
            className={`old-price ${
              product_discount == null ||
              product_discount == 0 ||
              formatPriceOrContact(min_price) == "Liên hệ"
                ? "visible_discount"
                : ""
            }`}
          >
            {formatPriceOrContact(min_price)}{" "}
          </del>
        </div>
        <div className="special-price" style={{ marginTop: "4px" }}>
          <div
            className="price"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
      </div>
    </div>
  );
}
