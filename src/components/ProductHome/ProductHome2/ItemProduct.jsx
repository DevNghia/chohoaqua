import Slider from "react-slick";
import { Link } from "react-router-dom";
import { formatNumber, standardProductLink } from "../../../helper";
import LazyImage from "../../LazyImage";
import Lazyload from "react-lazyload";
import {
  formatPrice,
  formatPriceOrContact,
  handleImgErr,
} from "../../../helper";

import { useSelector } from "react-redux";
import DiscountProduct from "../../ProductItem/DiscountProduct";
export default function ItemProduct(props) {
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  const profile = useSelector((state) => state.user.profile);
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
    commission_agency,
    distributes,
  } = props.product;
  let pastPrice = min_price;
  let discount = 0;
  let discount_percent = 0;
  let avt = "/img/default_product.jpg";
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

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }
  return (
    <div className="item">
      <div className="product-box">
        <div className="product-thumbnail flexbox-grid">
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
          <Link to={`/san-pham/${slug}-${id}`}>
            <Lazyload
              throttle={300}
              offset={100}
              placeholder={<LazyImage></LazyImage>}
            >
              <img
                style={{
                  "object-fit": "contain",
                  width: "100%",
                  height: "100%",
                }}
                src={avt}
                alt={name}
              />{" "}
            </Lazyload>
          </Link>
          <div
            class={`sale-flash ${
              product_discount == null || product_discount == 0
                ? "hide"
                : "show"
            }`}
          >
            <div class="before"></div>- {discount_percent}%
          </div>
        </div>
        <div className="product-info a-center">
          <h3 className="product-name" style={{ height: "41px" }}>
            <Link
              to={`/san-pham/${slug}-${id}`}
              style={{
                display: "-webkit-box",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                // height: "48px",
                fontWeight: "initial",
              }}
              title={name}
            >
              {name}
            </Link>
          </h3>
          <div style={{ textAlign: "left" }}>
            <div
              className="current-price"
              style={{
                color: "rgb(126, 13, 13)",
                "font-size": "18px",
                "font-weight": "500",
              }}
            >
              {"  "}
              {formatPriceOrContact(discount == 0 ? min_price : discount)}
              <span
                style={{ marginLeft: "15px" }}
                class={`old-price ${
                  product_discount == null ||
                  product_discount == 0 ||
                  formatPriceOrContact(min_price) == "Liên hệ"
                    ? "visible_discount"
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
                                {/* {` ${formatPrice(
                                  ((discount == 0 ? min_price : discount) *
                                    percent_collaborator) /
                                    100
                                )}`} */}
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
                    Hoa Hồng:{" "}
                    <label
                      style={{
                        color: "deeppink",
                      }}
                    >
                      {distributes.length === 0
                        ? formatPrice(commission_agency)
                        : formatPrice(minCommission) +
                          " - " +
                          formatPrice(maxCommission)}
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
          {/* <div className="price-box clearfix">
            {badges.status_collaborator === 1 && (
              <div className="special-price">
                <div className="coll-price" style={{ display: "flex" }}>
                  <span>Hoa hồng: &nbsp; </span>
                  <label>
                    {` ₫${formatPrice(
                      (min_price * percent_collaborator) / 100
                    )}`}
                  </label>
                </div>
              </div>
             )} 
          </div>
          <div className="price-box clearfix">
            <div className="special-price">
              <span className="price product-price">
                {" "}
                ₫{formatPriceOrContact(price)}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
