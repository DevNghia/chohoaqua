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

import { useDispatch, useSelector } from "react-redux";
import DiscountProduct from "../../ProductItem/DiscountProduct";
import { useState } from "react";
import { productActions } from "../../../actions/productActions";
import { cartActions } from "../../../actions/cartActions";
import { userActions } from "../../../actions/userActions";
import styled from "styled-components";

const ItemProductStyles = styled.div`
  @media screen and (max-width: 450px) {
    .product-item {
      .product-img {
        img {
          height: auto !important;
        }
      }
    }
  }
`;

export default function ItemProduct(props) {
  const appTheme = useSelector((state) => state.app.appTheme);

  const badges = useSelector((state) => state.user.badges);
  const dispatch = useDispatch();
  let {
    min_price,
    min_price_before_override,
    price,
    distributes,
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
    stars,
    count_stars,
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

  const [selectedDistributes, setSelectedDistributes] = useState(-1);
  const [selectedSubDistribute, setSelectedSubdistribute] = useState(-1);

  function handleCateClick(id) {
    window.location.href = `/san-pham?danh-muc-ids=${id}`;
  }

  function handleAddCart(isBuyNow) {
    if (distributes?.length && selectedDistributes === -1) {
      dispatch(productActions.setErrorDistribute(distributes[0].name));
      return;
    }
    if (
      distributes?.length &&
      selectedSubDistribute === -1 &&
      distributes[0].sub_element_distribute_name
    ) {
      dispatch(
        productActions.setErrorDistribute(
          distributes[0].sub_element_distribute_name
        )
      );
      return;
    }
    dispatch(productActions.setErrorDistribute(""));
    let d = [];
    let sd = {};
    if (distributes?.length) {
      sd.name = distributes[0].name;
      sd.value = distributes[0].element_distributes[selectedDistributes].name;
    }
    if (selectedSubDistribute !== -1)
      sd.sub_element_distributes =
        distributes?.[0].element_distributes[
          selectedDistributes
        ].sub_element_distributes[selectedSubDistribute].name;
    d.push(sd);
    dispatch(
      cartActions.addCart(
        {
          product_id: id,
          quantity: 1,
          distributes: d,
        },
        true,
        isBuyNow
      )
    );
    // if (isBuyNow == true) {
    //   window.location.href = "/gio-hang";
    //   return;
    // }
    dispatch(userActions.getUserBadges());
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
  console.log(discount_percent);
  return (
    <ItemProductStyles className="swiper-slide">
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
            // style={{ backgroundImage: "url(/img/coupon-bg.png)" }}
          >
            <span className="product-deal-coupon-value">
              -{discount_percent}%
            </span>
          </div>
        </Link>
        <h3
          className="product-name leading-snug"
          style={{
            height: "42px",
          }}
        >
          <Link
            to={`/san-pham/${slug}-${id}`}
            style={{
              lineHeight: 1.5,
            }}
          >
            {name}
          </Link>
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          {renderStarRating(stars)}
          <div
            className="add-to-cart"
            onClick={() => handleAddCart(false)}
            style={{
              backgroundColor: appTheme.color_main_1,
              padding: "6px",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "-2px 2px 6px rgba(0, 0, 0, 0.25)",
              height: "30px",
              width: "30px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5938 15.8906C16.5938 16.279 16.279 16.5938 15.8906 16.5938H15.1875V17.2969C15.1875 17.6852 14.8727 18 14.4844 18C14.096 18 13.7812 17.6852 13.7812 17.2969V16.5938H13.0781C12.6898 16.5938 12.375 16.279 12.375 15.8906C12.375 15.5023 12.6898 15.1875 13.0781 15.1875H13.7812V14.4844C13.7812 14.096 14.096 13.7812 14.4844 13.7812C14.8727 13.7812 15.1875 14.096 15.1875 14.4844V15.1875H15.8906C16.279 15.1875 16.5938 15.5023 16.5938 15.8906ZM16.5938 4.92188V11.6719C16.5938 12.0602 16.279 12.375 15.8906 12.375C15.5023 12.375 15.1875 12.0602 15.1875 11.6719V5.625H13.7812V7.73438C13.7812 8.12271 13.4665 8.4375 13.0781 8.4375C12.6898 8.4375 12.375 8.12271 12.375 7.73438V5.625H5.625V7.73438C5.625 8.12271 5.31021 8.4375 4.92188 8.4375C4.53354 8.4375 4.21875 8.12271 4.21875 7.73438V5.625H2.8125V16.5938H10.2656C10.654 16.5938 10.9688 16.9085 10.9688 17.2969C10.9688 17.6852 10.654 18 10.2656 18H2.10938C1.72104 18 1.40625 17.6852 1.40625 17.2969V4.92188C1.40625 4.53354 1.72104 4.21875 2.10938 4.21875H4.25201C4.53132 1.84651 6.55393 0 9 0C11.4461 0 13.4687 1.84651 13.748 4.21875H15.8906C16.279 4.21875 16.5938 4.53354 16.5938 4.92188ZM12.3279 4.21875C12.0593 2.62459 10.6693 1.40625 9 1.40625C7.33068 1.40625 5.94074 2.62459 5.67214 4.21875H12.3279Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
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
    </ItemProductStyles>
  );
}
