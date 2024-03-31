import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../helper";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { cartActions as a } from "../../actions/cartActions";
import { agencyActions as b } from "../../actions/agencyAction";
import { getHHmmssDDMMYYY } from "../../utils/date";
import styled from "styled-components";

const Header = React.lazy(() => import("../../components/Header"));
const ItemCard = React.lazy(() => import("./child/ItemCard"));
const Footer = React.lazy(() => import("../../components/Footer"));

const OrderInfoPageStyles = styled.div`
  .note {
    color: grey;
    font-size: 13px;
    max-width: 250px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .classify {
    color: #414040;
    font-size: 13px;
  }
`;

function OrderInfoPage(props) {
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.cart.orderInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const badges = useSelector((state) => state.user.badges);
  const myRef = useRef(null);

  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    dispatch(b.getAccountInfo());
  }, [dispatch]);

  useEffect(() => {
    document.title = `Thông tin đơn hàng ${props.match.params.id}`;
    if (orderInfo.status === c.LOADING)
      dispatch(a.getOrderInfo(props.match.params.id));
  });
  function handleShowProduct(id) {
    window.location.href = `/san-pham/${id}`;
  }
  function handleCancelOrder() {
    dispatch(
      a.cancelOrder({
        order_code: orderInfo.info.order_code,
      })
    );
  }
  function openRattingForm(product) {
    dispatch(
      appActions.changePopup(c.RATTING_POPUP, "", {
        id: product.id,
        name: product.name,
        orderCode: orderInfo.info.order_code,
      })
    );
  }
  function isReviewable(product) {
    let arr = orderInfo.info.line_items.filter((v) => {
      return v.product.id === product.id;
    });
    let rs = arr.length > 0 && arr[0].reviewed === false;
    return rs;
  }
  function handleScrollTo() {
    let top = myRef.current.offsetTop;
    window.scroll({
      top,
      behavior: "smooth",
    });
  }
  function openPaymentDialog() {
    dispatch({
      type: c.CHANGE_POPUP,
      popupType: c.ORDER_POPUP,
      orderPopupTitle: {
        title: "Thanh toán!",
        subTitle: "Hãy thanh toán ngay hoặc thay đổi hình thức thanh toán.",
      },
      paymentMethod: {
        payment_method_name: orderInfo.info.payment_method_name,
        payment_method_id: orderInfo.info.payment_method_id,
        order_code: orderInfo.info.order_code,

        payment_partner_name: orderInfo.info.payment_partner_name,
        payment_partner_id: orderInfo.info.payment_partner_id,
        orderInfo: orderInfo.info,
      },
    });
  }
  console.log(orderInfo);
  return (
    <React.Fragment>
      {/* <Header /> */}
      {orderInfo.status === c.LOADING ? null : (
        <React.Fragment>
          <OrderInfoPageStyles className="order-info-page">
            <div className="container">
              <div className="title">
                {`Chi tiết đơn hàng ${orderInfo.info.order_code}`} -{" "}
                <span>
                  {(profile.is_general_agency &&
                    orderInfo.info.order_status_name ===
                      "Đang chuẩn bị hàng") ||
                  (profile.is_agency &&
                    orderInfo.info.order_status_name ===
                      "Đang chuẩn bị hàng") ||
                  (profile.is_agent_have_general_agency &&
                    orderInfo.info.order_status_name === "Đang chuẩn bị hàng")
                    ? "Đã xác nhận"
                    : orderInfo.info.order_status_name}
                </span>
              </div>
              {orderInfo.info.order_status_code ===
                "WAITING_FOR_PROGRESSING" && (
                <button
                  style={{
                    padding: "6px 8px",
                    borderRadius: "0.25em",
                    color: "white",
                    marginTop: "0.5em",
                    background: "rgb(193 181 183)",
                  }}
                  onClick={handleCancelOrder}
                >
                  Hủy đơn hàng
                </button>
              )}
              <div className="date">
                {orderInfo.info.order_code_refund == null
                  ? `Ngày đặt hàng: ${getHHmmssDDMMYYY(
                      orderInfo.info.created_at
                    )}`
                  : `Ngày hoàn hàng: ${getHHmmssDDMMYYY(
                      orderInfo.info.created_at
                    )}`}
              </div>

              <div className="row" style={{ width: "fit-content" }}>
                <div className="date">
                  {" "}
                  {`${orderInfo.info.payment_status_name}`}
                </div>
                {orderInfo.info.order_code_refund == null &&
                  orderInfo.info.order_status_code === "COMPLETED" &&
                  (!orderInfo.info.reviewed ? (
                    <div
                      style={{ cursor: "pointer", color: "#4f93d5" }}
                      onClick={handleScrollTo}
                      className="date"
                    >
                      &nbsp;| Đánh giá sản phẩm
                    </div>
                  ) : (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={handleScrollTo}
                      className="date"
                    >
                      &nbsp;| Đã đánh giá
                    </div>
                  ))}
              </div>

              {orderInfo.info.order_code_refund != null && (
                <span style={{ color: "red", display: "block" }}>
                  Đơn hoàn tiền từ đơn:{" "}
                  <span id="cart_code">
                    <a href={`/don-hang/${orderInfo.info.order_code_refund}`}>
                      #{orderInfo.info.order_code_refund}
                    </a>{" "}
                  </span>
                </span>
              )}

              <div className="row">
                <div className="user-info">
                  <div className="title">ĐỊA CHỈ NGƯỜI NHẬN</div>
                  <div className="info">
                    <h4>{orderInfo.info.customer_address.name}</h4>
                    <div>
                      <span>Địa chỉ: </span>
                      {(orderInfo.info.customer_address.address_detail ?? "") +
                        ", " +
                        orderInfo.info.customer_address.wards_name +
                        ", " +
                        orderInfo.info.customer_address.district_name +
                        ", " +
                        orderInfo.info.customer_address.province_name +
                        ", "}
                    </div>
                    <div>
                      <span>Điện thoại: </span>{" "}
                      {orderInfo.info.customer_address.phone}
                    </div>
                    <div>
                      <span>Ghi chú: </span> {orderInfo.info.customer_note}
                    </div>
                  </div>
                </div>

                {(profile.is_agency && badges.status_agency === 1) ||
                (profile.is_agent_have_general_agency &&
                  badges.status_agency === 1) ? null : (
                  <>
                    <div className="shipment-info">
                      <div className="title">HÌNH THỨC GIAO HÀNG</div>
                      <div className="info">
                        <div>{orderInfo.info.shipper_name}</div>
                        <div>
                          {`Phí vận chuyển: ${formatPrice(
                            orderInfo.info.total_shipping_fee
                          )}`}
                        </div>
                        {orderInfo.info.ship_discount_amount > 0 && (
                          <div>
                            {`Giảm phí vận chuyển: ${formatPrice(
                              orderInfo.info.ship_discount_amount
                            )}`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="payment-info">
                      <div className="title">THANH TOÁN</div>
                      <div className="info">
                        <div>{orderInfo.info.payment_partner_name}</div>
                        <div>
                          {`Tổng giá trị sản phẩm:  ${formatPrice(
                            orderInfo.info.total_before_discount
                          )}`}
                        </div>
                        {orderInfo.info.product_discount_amount > 0 && (
                          <div>
                            {`Giảm giá sản phẩm:  ${formatPrice(
                              orderInfo.info.product_discount_amount
                            )}`}
                          </div>
                        )}
                        {orderInfo.info.combo_discount_amount > 0 && (
                          <div>
                            {`Giảm combo:  ${formatPrice(
                              orderInfo.info.combo_discount_amount
                            )}`}
                          </div>
                        )}
                        {orderInfo.info.voucher_discount_amount > 0 && (
                          <div>
                            {`Giảm voucher:  ${formatPrice(
                              orderInfo.info.voucher_discount_amount
                            )}`}
                          </div>
                        )}
                        {orderInfo.info.bonus_points_amount_used > 0 && (
                          <div>
                            {`Sử dụng xu:  ${formatPrice(
                              orderInfo.info.bonus_points_amount_used
                            )}`}
                          </div>
                        )}
                        {orderInfo.info.vat > 0 && (
                          <div>{`VAT:  ${formatPrice(
                            orderInfo.info.vat
                          )}`}</div>
                        )}
                        <div>
                          {`Thanh toán:  ${formatPrice(
                            orderInfo.info.total_final
                          )}`}
                        </div>
                        {orderInfo.info.payment_status_code === "UNPAID" &&
                          ["WAITING_FOR_PROGRESSING", "PACKING"].includes(
                            orderInfo.info.order_status_code
                          ) && (
                            <button
                              onClick={openPaymentDialog}
                              style={{
                                padding: "6px 8px",
                                borderRadius: "0.25em",
                                color: "white",
                                marginTop: "0.5em",
                                background: appTheme.color_main_1,
                              }}
                            >
                              Thanh toán
                            </button>
                          )}
                        {orderInfo.info.is_order_for_customer ? (
                          <div>{`Hoa hồng đặt đơn hộ:  ${formatPrice(
                            orderInfo.info.total_commission_order_for_customer
                          )}`}</div>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <table ref={myRef}>
                <thead>
                  <tr>
                    <th className="product">Sản phẩm</th>
                    <th className="prePrice">Giá</th>
                    <th className="number">Số lượng</th>
                    <th className="discount">Giảm giá</th>
                    <th className="price">Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {orderInfo.info.line_items_at_time.map((v, i) => (
                    // v.customer_id != account.customer_id &&
                    <tr key={i}>
                      <td className="product">
                        <div className="row">
                          <div className="image">
                            <div className="img-container">
                              <img
                                src={v.image_url}
                                alt=""
                                style={{
                                  background: "url(/img/default_product.jpg)",
                                  backgroundSize: "contain",
                                }}
                              />
                            </div>
                          </div>
                          <div className="action">
                            <div className="name">{v.name}</div>
                            {v.distributes_selected?.length > 0 ? (
                              <div className="classify">
                                {v.distributes_selected[0].name
                                  ? `${v.distributes_selected[0].name}: `
                                  : ""}
                                {v.distributes_selected[0].value}
                                {v.distributes_selected[0]
                                  .sub_element_distributes
                                  ? ` | ${v.distributes_selected[0].sub_element_distributes}`
                                  : ""}
                              </div>
                            ) : null}
                            {v.note ? (
                              <div className="note">{v.note}</div>
                            ) : null}
                            {orderInfo.info.order_status_code ===
                              "COMPLETED" && (
                              <React.Fragment>
                                {orderInfo.info.order_code_refund == null &&
                                  isReviewable(v) && (
                                    <>
                                      <button
                                        onClick={() => openRattingForm(v)}
                                      >
                                        Đánh giá
                                      </button>
                                      <span> | </span>
                                    </>
                                  )}
                              </React.Fragment>
                            )}
                            <button onClick={() => handleShowProduct(v.id)}>
                              Xem thông tin
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="prePrice">
                        <div>
                          <div>{formatPrice(v.before_discount_price)}</div>
                          {badges.status_agency === 1 ? (
                            <div
                              style={{
                                textDecoration: "line-through",
                                color: "#8d8b8b",
                              }}
                            >
                              {v.price_before_override > 0
                                ? formatPrice(v.price_before_override)
                                : null}
                            </div>
                          ) : null}
                        </div>
                      </td>
                      <td className="number">{v.quantity}</td>
                      <td className="discount">
                        {" "}
                        {formatPrice(
                          v.before_discount_price - v.after_discount
                        )}
                      </td>
                      <td className="price">
                        {formatPrice(v.after_discount * v.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mobile">
                <div
                  className="title"
                  style={{ marginTop: "0.25em", marginBottom: "0.25em" }}
                >
                  Thông tin kiện hàng
                </div>
                {orderInfo.info.line_items_at_time.map((v, i) => (
                  <ItemCard
                    key={i}
                    id={v.id}
                    name={v.name}
                    image={v.image_url}
                    number={v.quantity}
                    price={v.after_discount}
                    status={orderInfo.info.order_status_code}
                  />
                ))}
              </div>
            </div>
          </OrderInfoPageStyles>
          <Footer />
        </React.Fragment>
      )}
      {/* <Footer /> */}
    </React.Fragment>
  );
}
export default OrderInfoPage;
