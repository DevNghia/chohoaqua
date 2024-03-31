import Slider from "react-slick";
import { Link } from "react-router-dom";
import { standardProductLink } from "../../../helper";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import {
  formatPrice,
  formatPriceOrContact,
  handleImgErr,
} from "../../../helper";
import "./style.css";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ItemSpecialProductStyles = styled.div`
  .item-product-name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 44px;
  }
`;

export default function ItemProduct(props) {
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
    slug,
    view,
    is_favorite,
    is_new,
    is_top_sale,
    has_in_combo,
    has_in_bonus_product,
    has_in_product_discount,
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
    <ItemSpecialProductStyles
      className="section_product product_1"
      id="product_1"
      style={{ margin: "0 5px" }}
    >
      <div className="">
        <div className="row-list">
          <div className="">
            <div className="block-product">
              <div className="swiper-container">
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
                          {(has_in_combo === true ||
                            has_in_bonus_product === true ||
                            has_in_product_discount == true) && (
                            <div className="has-discount">Khuyến mãi</div>
                          )}{" "}
                          {is_top_sale && (
                            <div className="top-sale-tag">Bán chạy</div>
                          )}{" "}
                          <Lazyload
                            offset={100}
                            throttle={300}
                            placeholder={<LazyImage></LazyImage>}
                          >
                            <Link
                              to={`/san-pham/${slug}-${id}`}
                              title={name}
                              className="item-product-name"
                            >
                              <img
                                class="product-thumbnail "
                                src={avt}
                                alt={name}
                              ></img>
                            </Link>
                          </Lazyload>
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
                                {badges.status_collaborator === 1 &&
                                  formatPrice(
                                    ((discount == 0 ? min_price : discount) *
                                      percent_collaborator) /
                                      100
                                  ) !== "0₫" &&
                                  formatPrice(
                                    ((discount == 0 ? min_price : discount) *
                                      percent_collaborator) /
                                      100
                                  ) !== "0" && (
                                    <div className="coll-price">
                                      <span
                                        className="price product-price"
                                        style={{
                                          color: "#999",
                                          fontSize: "13px",
                                        }}
                                      >
                                        Hoa hồng:{" "}
                                      </span>
                                      <label style={{ color: "deeppink" }}>
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
                                style={{
                                  color: "#999",
                                  fontSize: "13px",
                                  textAlign: "right",
                                }}
                              >
                                Đã xem:{view}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ItemSpecialProductStyles>
  );
}
