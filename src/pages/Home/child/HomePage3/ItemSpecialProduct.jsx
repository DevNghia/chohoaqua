import Slider from "react-slick";
import { Link } from "react-router-dom";
import { standardProductLink } from "../../../../helper";

import {
  formatPrice,
  formatPriceOrContact,
  handleImgErr,
} from "../../../../helper";

import { useSelector } from "react-redux";
export default function ItemProduct(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  let {
    min_price,
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
    <div
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
                          class={`sale-label sale-top-right ${product_discount == null || product_discount == 0
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
                          {is_top_sale && (
                            <div className="top-sale-tag">Bán chạy</div>
                          )}{" "}
                          <img
                            class="product-thumbnail "
                            src={avt}
                          ></img>
                        </div>
                        <div className="product-info">
                          <Link
                            to={`/san-pham/${slug}-${id}`}
                            title="Đào đỏ Mỹ"
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
                              class={`old-price ${product_discount == null ||
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
                            <div
                              className="price"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                {badges.status_collaborator === 1 && (
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
                                        ((discount == 0 ? min_price : discount) *
                                          percent_collaborator) /
                                        100
                                      )}`}
                                    </label>
                                  </div>
                                )}
                              </div>
                              &nbsp;
                              <span style={{ color: "#999", fontSize: "13px" }}>
                                Đã xem:{view}{" "}
                              </span>
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
  );
}
