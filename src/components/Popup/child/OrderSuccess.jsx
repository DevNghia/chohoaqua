import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Select from "../../../components/Select";
import {
  showNextElement,
  hideParentElement,
  formatPrice,
} from "../../../helper";
import { constants as c } from "../../../constants";
import { appServices } from "../../../services/appServices";
import { appActions } from "../../../actions/appActions";
import { cartActions } from "../../../actions/cartActions";
import styled from "styled-components";

const OrderSuccessStyles = styled.div`
  width: 700px !important;
  border-radius: 10px !important;
  h4 {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-bottom: 20px;
    i {
      font-size: 50px;
      color: #9ac657 !important;
    }
  }
  .order-infoDetail {
    padding: 15px;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
    border-radius: 10px;
    width: 100%;
    text-align: left;
    & > div:first-child {
      margin-bottom: 20px;
      h4 {
        font-size: 16px;
        text-transform: capitalize;
        margin-bottom: 5px;
      }
    }
    .order-infoContent {
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      div {
        display: flex;
        span:first-child {
          width: 35%;
        }
        span:nth-child(2) {
          font-weight: 600;
        }
      }
      div:last-child {
        button {
          margin-left: 20px;
          border-radius: 10px;
          cursor: pointer;
          padding: 8px 20px;
        }
      }
      .custom-select {
        .select-btn {
          border-color: #eee;
        }
        .options {
          top: 98%;
          display: flex;
          flex-direction: column;
        }
      }
    }
    .order-btnBottom {
      padding: 10px 0;
      p {
        width: 96%;
        font-weight: 500;
        margin-bottom: 25px;
      }
      .order-btnBottomContent {
        width: auto;
        justify-content: center;
        column-gap: 10px;
        a {
          width: 200px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100rem;
          color: #999;
          font-weight: 700;
          border-color: #999;
        }
      }
    }
  }
  @media screen and (max-width: 560px) {
    .order-infoContent {
      div {
        span:first-child {
          width: 50% !important;
        }
      }
      div:last-child {
        button {
          margin-left: 0 !important;
        }
      }
      .custom-select {
        width: 230px !important;
        .options {
          top: 34px !important;
        }
      }
    }
  }
`;

export default function OrderSuccess(props) {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.app.appTheme);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const orderInfo = useSelector((state) => state.app.orderPopup);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const account = useSelector((state) => state.agency.account);
  const profile = useSelector((state) => state.user.profile);
  const selectValues = useMemo(
    () =>
      tokenInfo == null
        ? []
        : paymentMethod.list.map((v) => {
            return {
              title: v.name,
              id: v.id,
              payment_method_id: v.payment_method_id,
            };
          }),
    [paymentMethod]
  );
  function handlePaymentRequest() {
    var linkback =
      window.location.protocol + "//" + window.location.host + "/don-hang";
    const url = `${c.API_URL}/customer/${appServices.store_code}/purchase/pay/${orderInfo.order_code}?link_back=${linkback}`;
    try {
      var tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
    } catch (error) {
      var tokenInfo = null;
    }

    if (orderInfo.payment_method_id == 2) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "customer-token": tokenInfo ? tokenInfo.token : "",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (tokenInfo) window.location.href = "/don-hang";
          else window.location.href = "/";
        })
        .catch((err) => {
          if (tokenInfo) window.location.href = "/don-hang";
          else window.location.href = "/";
        });
    } else {
      var intervalID, childWindow;

      window.location.replace(url);

      // childWindow = window.open(
      //   url,
      //   "Thanh toán đơn hàng",
      //   "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=800, height=1000, top=100, left=100"
      // );

      // function checkWindow() {
      //   if (childWindow && childWindow.closed) {
      //     window.clearInterval(intervalID);
      //     if (tokenInfo) window.location.href = "/don-hang";
      //     else window.location.href = "/";
      //   }
      // }
      // var intervalID = window.setInterval(checkWindow, 500);
    }
  }
  function handleChangePage() {
    dispatch(appActions.changePopup(c.NO_POPUP));
  }
  function handleChangePaymentMethod(value, e) {
    console.log(value);
    let info = {
      orderCode: orderInfo.order_code,
      paymentMethodId: value.payment_method_id,
      paymentMethodName: value.title,
      paymentPartnerId: value.id,
      paymentPartnerName: value.title,
    };
    console.log(info);
    hideParentElement(e);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP));
    dispatch(cartActions.changePaymentMethod(info, orderInfo.orderInfo));
  }
  useEffect(() => {
    if (paymentMethod.status === c.LOADING)
      dispatch(cartActions.getPaymentMethods());
  }, []);
  console.log(orderInfo);
  return (
    <div className="modal center">
      {!tokenInfo ? (
        <OrderSuccessStyles className="order-popup">
          <button
            onClick={() => window.location.reload()}
            // onClick={handleChangePage}
            // href="/don-hang"
            className="close-btn"
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-times"></i>
          </button>
          <h4>
            <i
              style={{ color: appTheme.color_main_1 }}
              className="fas fa-check-circle"
            ></i>
            <span>{orderInfo.title}</span>
          </h4>
          <div className="order-infoDetail">
            <div>
              <h4>Chào {orderInfo.orderInfo.customer_name},</h4>
              <p>{orderInfo.subTitle}</p>
            </div>
            <div className="order-infoContent">
              <div>
                <span>Mã đơn hàng:</span>
                <span>{orderInfo.orderInfo.order_code}</span>
              </div>
              <div className="order-selectedPayment">
                <span>Phương thức thanh toán</span>
                <Select
                  nonSelect={true}
                  handleSelect={handleChangePaymentMethod}
                  showDetail={showNextElement}
                  placeholder={orderInfo.payment_partner_name}
                  values={selectValues}
                />
              </div>
              <div>
                <span>Thời gian dự kiến giao hàng:</span>
                <span>3 - 4 ngày</span>
              </div>
              <div>
                <span>Tổng thanh toán:</span>
                <span
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  {formatPrice(orderInfo.orderInfo.total_final)}
                </span>
              </div>
              <div>
                <span>Tình trạng:</span>
                <span
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  {orderInfo.orderInfo.payment_status_name}
                </span>
                {orderInfo.payment_method_id !== 2 && (
                  <button
                    onClick={handlePaymentRequest}
                    style={{ background: appTheme.color_main_1 }}
                  >
                    Thanh toán ngay
                  </button>
                )}
              </div>
            </div>
            <div className="order-btnBottom">
              <p>
                Mọi thông tin về đơn hàng sẽ được lưu lại, vui lòng kiểm tra
                trên hệ thống để biết thêm chi tiết. Cảm ơn bạn đã tin tưởng và
                giao dịch tại hệ thống
              </p>
              <div className="row order-btnBottomContent">
                <a onClick={handleChangePage} href="/">
                  Tiếp tục mua sắm
                </a>
                {/* <a
                  onClick={handleChangePage}
                  href="/don-hang"
                  style={{
                    color: appTheme.color_main_1,
                    borderColor: appTheme.color_main_1,
                  }}
                >
                  Chi tiết đơn hàng
                </a> */}
              </div>
            </div>
          </div>
        </OrderSuccessStyles>
      ) : (
        <OrderSuccessStyles className="order-popup">
          {console.log("windowwww", window.location.pathname)}
          {window.location.pathname === "/don-hang" ? (
            <button
              onClick={() => props.handleClose()}
              className="close-btn"
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-times"></i>
            </button>
          ) : window.location.pathname === "/gio-hang" ? (
            <a
              // onClick={() => window.location.reload()}
              onClick={handleChangePage}
              href="/don-hang"
              className="close-btn"
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-times"></i>
            </a>
          ) : (
            <button
              onClick={() => props.handleClose()}
              className="close-btn"
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          <h4>
            <i
              style={{ color: appTheme.color_main_1 }}
              className="fas fa-check-circle"
            ></i>
            <span>{orderInfo.title}</span>
          </h4>
          <div className="order-infoDetail">
            <div>
              <h4>Chào {orderInfo.orderInfo?.customer_name},</h4>

              <p>
                {profile?.is_collaborator === false &&
                profile?.is_agency === false &&
                profile?.is_agent_have_general_agency === false &&
                profile?.is_general_agency === false
                  ? orderInfo.subTitle
                  : null}
                {profile?.is_collaborator === true ? orderInfo.subTitle : null}
                {profile?.is_agency === true
                  ? "Bạn đã gửi yêu cầu nhập hàng thành công vui lòng đợi xác nhận từ hệ thống."
                  : null}
                {profile?.is_agent_have_general_agency === true
                  ? "Bạn đã gửi yêu cầu nhập hàng thành công vui lòng đợi xác nhận từ hệ thống."
                  : null}
                {profile?.is_general_agency === true
                  ? "Bạn đã gửi yêu cầu nhập hàng thành công vui lòng đợi xác nhận từ hệ thống."
                  : null}
                {/* {account?.agency_type?.name == null
                  ? orderInfo.subTitle
                  : "Bạn đã gửi yêu cầu nhập hàng thành công vui lòng đợi xác nhận từ hệ thống."} */}
                {/* {orderInfo.subTitle} */}
              </p>
            </div>

            {profile?.is_collaborator === false &&
            profile?.is_agency === false &&
            profile?.is_agent_have_general_agency === false &&
            profile?.is_general_agency === false ? (
              <div className="order-infoContent">
                <div>
                  <span>Mã đơn hàng:</span>
                  <span>{orderInfo.orderInfo?.order_code}</span>
                </div>
                <div className="order-selectedPayment">
                  <span>Phương thức thanh toán</span>
                  <Select
                    handleSelect={handleChangePaymentMethod}
                    showDetail={showNextElement}
                    placeholder={orderInfo.payment_partner_name}
                    values={selectValues}
                  />
                </div>
                <div>
                  <span>Thời gian dự kiến giao hàng:</span>
                  <span>3 - 4 ngày</span>
                </div>
                <div>
                  <span>Tổng thanh toán:</span>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {formatPrice(orderInfo.orderInfo?.total_final)}
                  </span>
                </div>
                <div>
                  <span>Tình trạng:</span>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {orderInfo.orderInfo?.payment_status_name}
                  </span>
                  {orderInfo.payment_method_id !== 2 && (
                    <button
                      onClick={handlePaymentRequest}
                      style={{ background: appTheme.color_main_1 }}
                    >
                      Thanh toán ngay
                    </button>
                  )}
                </div>
              </div>
            ) : null}
            {profile?.is_collaborator === true ? (
              <div className="order-infoContent">
                <div>
                  <span>Mã đơn hàng:</span>
                  <span>{orderInfo.orderInfo?.order_code}</span>
                </div>
                <div className="order-selectedPayment">
                  <span>Phương thức thanh toán</span>
                  <Select
                    handleSelect={handleChangePaymentMethod}
                    showDetail={showNextElement}
                    placeholder={orderInfo.payment_partner_name}
                    values={selectValues}
                  />
                </div>
                <div>
                  <span>Thời gian dự kiến giao hàng:</span>
                  <span>3 - 4 ngày</span>
                </div>
                <div>
                  <span>Tổng thanh toán:</span>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {formatPrice(orderInfo.orderInfo?.total_final)}
                  </span>
                </div>
                <div>
                  <span>Tình trạng:</span>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {orderInfo.orderInfo?.payment_status_name}
                  </span>
                  {orderInfo.payment_method_id !== 2 && (
                    <button
                      onClick={handlePaymentRequest}
                      style={{ background: appTheme.color_main_1 }}
                    >
                      Thanh toán ngay
                    </button>
                  )}
                </div>
              </div>
            ) : null}
            {profile?.is_agency === true ? null : null}
            {profile?.is_agent_have_general_agency === true ? null : null}
            {profile?.is_general_agency === true ? null : null}
            {/* {account?.agency_type?.name == null ? (
              <div className="order-infoContent">
                <div>
                  <span>Mã đơn hàng:</span>
                  <span>{orderInfo.orderInfo?.order_code}</span>
                </div>
                <div className="order-selectedPayment">
                  <span>Phương thức thanh toán</span>
                  <Select
                    handleSelect={handleChangePaymentMethod}
                    showDetail={showNextElement}
                    placeholder={orderInfo.payment_partner_name}
                    values={selectValues}
                  />
                </div>
                <div>
                  <span>Thời gian dự kiến giao hàng:</span>
                  <span>3 - 4 ngày</span>
                </div>
                <div>
                  <span>Tổng thanh toán:</span>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {formatPrice(orderInfo.orderInfo?.total_final)}
                  </span>
                </div>
                <div>
                  <span>Tình trạng:</span>
                  <span
                    style={{
                      color: appTheme.color_main_1,
                    }}
                  >
                    {orderInfo.orderInfo?.payment_status_name}
                  </span>
                  {orderInfo.payment_method_id !== 2 && (
                    <button
                      onClick={handlePaymentRequest}
                      style={{ background: appTheme.color_main_1 }}
                    >
                      Thanh toán ngay
                    </button>
                  )}
                </div>
              </div>
            ) : null} */}
            {/* <div className="order-infoContent">
              <div>
                <span>Mã đơn hàng:</span>
                <span>{orderInfo.orderInfo?.order_code}</span>
              </div>
              <div className="order-selectedPayment">
                <span>Phương thức thanh toán</span>
                <Select
                  handleSelect={handleChangePaymentMethod}
                  showDetail={showNextElement}
                  placeholder={orderInfo.payment_partner_name}
                  values={selectValues}
                />
              </div>
              <div>
                <span>Thời gian dự kiến giao hàng:</span>
                <span>3 - 4 ngày</span>
              </div>
              <div>
                <span>Tổng thanh toán:</span>
                <span
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  {formatPrice(orderInfo.orderInfo?.total_final)}
                </span>
              </div>
              <div>
                <span>Tình trạng:</span>
                <span
                  style={{
                    color: appTheme.color_main_1,
                  }}
                >
                  {orderInfo.orderInfo?.payment_status_name}
                </span>
                {orderInfo.payment_method_id !== 2 && (
                  <button
                    onClick={handlePaymentRequest}
                    style={{ background: appTheme.color_main_1 }}
                  >
                    Thanh toán ngay
                  </button>
                )}
              </div>
            </div> */}

            <div className="order-btnBottom">
              <p>
                Mọi thông tin về đơn hàng sẽ được lưu lại, vui lòng kiểm tra
                trên hệ thống để biết thêm chi tiết. Cảm ơn bạn đã tin tưởng và
                giao dịch tại hệ thống
              </p>
              <div className="row order-btnBottomContent">
                <a onClick={handleChangePage} href="/">
                  Tiếp tục mua sắm
                </a>
                <a
                  onClick={handleChangePage}
                  href="/don-hang"
                  style={{
                    color: appTheme.color_main_1,
                    borderColor: appTheme.color_main_1,
                  }}
                >
                  Chi tiết đơn hàng
                </a>
              </div>
            </div>
          </div>
        </OrderSuccessStyles>
      )}
    </div>
  );
}
