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
              class={`product-thumbnail ${product_discount == null || product_discount == 0 ? "" : "sale"
                }`}
              data-sale={`Giảm ${discount_percent}%`}
            >
              {is_new && <div className="new-tag-theme">Mới</div>}
              {is_favorite && (
                <div
                  className="favorite-tag"
                  style={{ bottom: is_top_sale ? "23px" : "0" }}
                >
                  Yêu thích
                </div>
              )}
              {is_top_sale && <div className="top-sale-tag">Bán chạy</div>}{" "}
              <Link
                className="image_thumb"
                to={`/san-pham/${slug}-${id}`}
              >
                <div className="product-image">

                  <img
                    style={{ objectFit: "contain" }}
                    src={avt}
                    alt="Áo polo phối khóa cổ"
                  />
                
                </div>
              </Link>{" "}
            </div>
            <div className="product-info" style={{ padding: "0 8px" }}>
              <h3 className="product-name">
                <Link to={`/san-pham/${slug}-${id}`}>
                  {name}
                </Link>
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
                    {"  "}{formatPriceOrContact(discount == 0 ? min_price : discount)}
                  </span>

                  <span
                    class={`compare-price ${product_discount == null ||
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                }}
              >
                <div>

                  {badges.status_collaborator === 1 && (
                    <div className="coll-price">
                      <span
                        className="price product-price"
                        style={{ color: "#9e9e9e" }}
                      >
                        Hoa hồng:{" "}
                      </span>
                      <label style={{ color: "deeppink" }}>
                        {` ₫${formatPrice(((discount == 0 ? min_price : discount) * percent_collaborator) / 100)}`}

                      </label>
                    </div>
                  )}
                </div>

                <div style={{ color: "#9e9e9e" }} className="view-count">
                  Đã xem: {view}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
