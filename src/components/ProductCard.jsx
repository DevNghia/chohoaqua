import {
  formatPrice,
  formatNumber,
  formatPriceOrContact,
  handleImgErr,
} from "../helper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { standardProductLink } from "../helper";
import LazyImage from "./LazyImage";
import Lazyload from "react-lazyload";
import DiscountProduct from "./ProductItem/DiscountProduct";
export default function ProductCard(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const myLink = useRef(null);
  const badges = useSelector((state) => state.user.badges);
  const profile = useSelector((state) => state.user.profile);
  let {
    id,
    name,
    view,
    price,
    sold,
    images,
    slug,
    is_new,
    min_price,
    min_price_before_override,
    is_favorite,
    product_discount,
    percent_collaborator,
    is_top_sale,
    has_in_combo,
    has_in_bonus_product,
    has_in_product_discount,
    type_share_collaborator_number,
    money_amount_collaborator,
    stars,
    count_stars,
    commission_agency,
    distributes,
  } = props.product;
  console.log("ádasfasdfadsfadsfad", props.product);
  let discount = 0;
  let discount_percent = 0;
  let avt = "/img/default_product.jpg";
  let favorite_tag_style = appTheme.home_page_type == 6 ? "26px" : "23px";
  let maxCommission = 0;
  let minCommission = 0;
  let elementDistributes;
  let commissions;
  if (
    commission_agency === 0 &&
    profile.is_collaborator === false &&
    profile.is_agency === true &&
    profile.is_general_agency === false &&
    distributes.length > 0
  ) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map((item) => item.commission);

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }
  if (profile.is_general_agency === true && distributes.length > 0) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map((item) => item.commission);

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }
  if (profile.is_agent_have_general_agency === true && distributes.length > 0) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map((item) => item.commission);

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }
  if (profile.is_collaborator === true && distributes.length > 0) {
    elementDistributes = distributes[0].element_distributes;

    // Lấy giá trị commission từ mỗi phần tử và chuyển thành mảng các giá trị commission
    commissions = elementDistributes.map(
      (item) => item.collaborator_commission
    );

    // Lấy phần tử lớn nhất và nhỏ nhất
    maxCommission = Math.max(...commissions);
    minCommission = Math.min(...commissions);
  }

  if (product_discount) {
    discount_percent = product_discount.value;
    discount = min_price * 0.01 * (100 - product_discount.value);
    //discount = product_discount.discount_price;

    // price = min_price - discount;
  }
  if (images.length) avt = images[0].image_url;
  function handleClick() {
    if (props.handleClose) props.handleClose();
    myLink.current.click();
  }
  const renderStarRating = (rating = 5) => {
    return (
      <div
        style={{
          display: "flex",
          columnGap: "3px",
          alignItems: "center",
        }}
      >
        <div className="star-rating">
          {Array(5)
            .fill(null)
            .map((v, index) => (
              <i
                key={index}
                style={{
                  color:
                    Math.floor(rating) >= index + 1 ? "#e4d237" : "#c4bdbd",
                  fontSize: "12px",
                  marginRight: "2px",
                }}
                className={"fas fa-star"}
              ></i>
            ))}
        </div>
        {appTheme.is_show_product_count_stars ? (
          <div
            style={{
              fontSize: "12px",
            }}
          >
            ({count_stars})
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div onClick={handleClick} className="product-card" style={props.style}>
      <div style={{ display: "none" }}>
        <Link ref={myLink} to={`/san-pham/${slug}-${id}`} />
      </div>
      <div className="image">
        {is_new && <div className="new-tag">Mới</div>}
        {product_discount && (
          <div className="discount-tag">
            {`${discount_percent}%`}
            <br />
            <span>GIẢM</span>
          </div>
        )}
        {is_favorite && (
          <div
            className="favorite-tag"
            style={{ bottom: is_top_sale ? favorite_tag_style : "0" }}
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
        {is_top_sale && <div className="top-sale-tag">Bán chạy</div>}
        <div className="img-container">
          <Lazyload
            offset={100}
            throttle={300}
            placeholder={<LazyImage></LazyImage>}
          >
            <img
              src={avt}
              alt={name}
              loading="lazy"
              onError={handleImgErr}
              style={{
                background: "url(/img/default_product.jpg)",
                backgroundSize: "contain",
              }}
            />
          </Lazyload>
        </div>
      </div>
      <div style={{ padding: "0.5em" }}>
        <div className="name">{name}</div>
        {renderStarRating(stars)}
        <div style={{ display: "flex" }}>
          <div
            className="current-price"
            style={{ color: appTheme.color_main_1 }}
          >
            {"  "}
            {formatPriceOrContact(discount == 0 ? min_price : discount)}
          </div>
          <span
            style={{ margin: "auto 0px", paddingLeft: "15px" }}
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
                  <div
                    className="coll-price"
                    style={{
                      margin: "0",
                    }}
                  >
                    <span>Hoa hồng: </span>
                    <label
                      style={{
                        color: "deeppink",
                      }}
                    >
                      {distributes.length === 0
                        ? formatPrice(money_amount_collaborator)
                        : formatPrice(minCommission) +
                          " - " +
                          formatPrice(maxCommission)}
                    </label>
                  </div>
                  {/* {type_share_collaborator_number === 0 ? (
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
                  )} */}
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
                Hoa hồng:{" "}
                <label
                  style={{
                    color: "deeppink",
                  }}
                >
                  {minCommission === 0
                    ? formatPrice(commission_agency)
                    : formatPrice(minCommission) +
                      " - " +
                      formatPrice(maxCommission)}
                </label>
              </div>
            )}
          </div>
          {/* {view > 0 && <div className="view-count">Đã xem: {view}</div>} */}
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
  );
}
