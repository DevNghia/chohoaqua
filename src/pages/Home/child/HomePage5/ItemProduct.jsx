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
    view,
    is_favorite,
    is_new,
    is_top_sale,
    slug,
  } = props.product;
  let pastPrice = min_price;
  let discount = 0;
  let discount_percent = 0;
  let avt = "/img/default_product.jpg";
  if (product_discount) {
    discount_percent = product_discount.value;
    discount = min_price * 0.01 * (100-product_discount.value);
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
        <Link
          className="product-img"
          to={`/san-pham/${slug}-${id}`}
        >
          {is_new && <div className="new-tag">Mới</div>}
          {is_favorite && (
            <div
              className="favorite-tag"
              style={{ bottom: is_top_sale ? "23px" : "0" }}
            >
              Yêu thích
            </div>
          )}
          {is_top_sale && <div className="top-sale-tag">Bán chạy</div>}{" "}
         <img src={avt} />
          <div
            className={`product-deal-coupon
        ${product_discount == null || product_discount == 0 ? "visible_discount" : ""}
            `}
          >
            Giảm {discount_percent}%
          </div>
        </Link>
        <h3 className="product-name leading-snug">
          <Link to={`/san-pham/${slug}-${id}`}>
            {name}
          </Link>
        </h3>
        <div className="product-price flex items-end">
          <strong className="price text-main" style={{color: appTheme.color_main_1}}>
            {"  "}{formatPriceOrContact(discount == 0 ? min_price : discount)}
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
        <div className="special-price" style = {{marginTop : "7px"}}>
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
                          style={{ color: "#9e9e9e"  , "font-size": "15px"}}
                        >
                          Hoa hồng:{" "}
                        </span>
                        <br/>
                        <label style={{ color: "deeppink" }}>
                        {` ₫${formatPrice(((discount == 0  ? min_price : discount ) * percent_collaborator) / 100)}`}
    
                        </label>
                      </div>
                            )}
                          </div>
                          &nbsp;
                          <span style={{ color: "#999" , fontSize : "13px" }}>Đã xem:{view} </span>
                        </div>
                      </div>
      </div>
    </div>
  );
}
