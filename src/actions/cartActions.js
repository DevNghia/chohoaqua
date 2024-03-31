import { constants as c } from "../constants";
import { cartServices as s } from "../services/cartServices";
import { toast } from "react-toastify";
import { userActions } from "../actions/userActions";
function addCart(product, willShowPopup, isBuyNow) {
  return (dispatch) => {
    s.addCart(product).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
        if (product.quantity) {
          if (willShowPopup) {
            toast.success(" Đã thêm vào giỏ hàng", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: "Sản phẩm đã hết hàng",
          });
        }

        if (isBuyNow == true) {
          window.location.href = "/gio-hang";
        }
      } else {
        dispatch(failure());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Có lỗi xảy ra vui lòng thử lại sau !",
        });
      }
      dispatch(userActions.getUserBadges());
    });
  };
  function success(cartInfo) {
    return { type: c.ADD_CART_SUCCESS, cartInfo };
  }
  function failure() {
    return { type: c.ADD_CART_FAILURE };
  }
}
function changeNumberInCart(product, data, defaultAddress, logged) {
  return (dispatch) => {
    s.changeNumberInCart(product).then((res) => {
      if (res.code === 200) {
        dispatch(userActions.getUserBadges());

        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        if (product.quantity === 0) {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: "Xóa sản phẩm khỏi giỏ hàng thành công !",
          });
        }
        if (!logged) {
          dispatch(getCartInfo());
        } else {
          dispatch(getCartInfo(data));
        }
        dispatch(postListShipperFee(defaultAddress?.id));
        // dispatch(getShipmentFee(defaultAddress?.id));
        // dispatch(userActions.getUserBadges());
        // dispatch(getCartInfo(code_voucher));
      } else {
        dispatch(failure());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Có lỗi xảy ra vui lòng thử lại sau !",
        });
      }
    });
  };
  function success(cartInfo) {
    return { type: c.CHANGE_NUMBER_SUCCESS, cartInfo };
  }
  function failure() {
    return { type: c.ADD_CART_FAILURE };
  }
}
function purchase(order_code) {
  return (dispatch) => {
    s.purchase(order_code).then((res) => {
      if (res.code === 200) {
        window.location.reload();
      } else {
      }
    });
  };
}

function getCartInfo(data) {
  return (dispatch) => {
    s.getCartInfo(data).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
      } else {
        if (
          res.msg_code === "NOT_ENOUGH_USE_VOUCHER" ||
          res.msg_code === "NO_VOUCHER_EXISTS"
        ) {
          localStorage.removeItem("code_voucher");
          dispatch(success(res.data));

          return;
        }

        dispatch(failure());
      }
    });
  };
  function success(cartInfo) {
    return {
      type: c.GET_CART_SUCCESS,
      cartInfo,
    };
  }
  function failure() {
    return { type: c.GET_CART_FAILURE };
  }
}

function getShipmentFee(idAddress, data) {
  return (dispatch) => {
    if (idAddress == null && !data) return;
    s.getShipmentFee(idAddress, data).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(shipmentFee) {
    return {
      type: c.GET_SHIPMENT_FEE_SUCCESS,
      shipmentFee,
    };
  }
  function failure() {
    return { type: c.GET_SHIPMENT_FEE_FAILURE };
  }
}
function postListShipperFee(idAddress, dataAddress, branch_id) {
  return (dispatch) => {
    if (idAddress == null && !dataAddress) return;
    dispatch({
      type: c.LOADING_SHIPPING_FEE,
      loading: true,
    });
    s.postListShipperFee(idAddress, dataAddress, branch_id)
      .then(async (res) => {
        if (res.code === 200) {
          if (res.data) {
            const data = [];
            if (res.data?.length > 0) {
              for (var element of res.data) {
                await s
                  .postShipmentFeeForEachService(
                    idAddress,
                    dataAddress,
                    element.partner_id,
                    branch_id
                  )
                  .then((resService) => {
                    if (resService.code === 200) {
                      if (resService.data?.fee_with_type_ship?.length > 0) {
                        data.push(resService.data);
                      }
                      dispatch(success(data));
                    } else {
                      dispatch(failure());
                    }
                  });
              }
            } else {
              dispatch(success([]));
            }
          }
        } else {
          dispatch(failure());
        }
      })
      .finally(() => {
        dispatch({
          type: c.LOADING_SHIPPING_FEE,
          loading: false,
        });
      });
  };
  function success(shipmentFee) {
    return {
      type: c.GET_SHIPMENT_FEE_SUCCESS,
      shipmentFee,
    };
  }
  function failure() {
    return { type: c.GET_SHIPMENT_FEE_FAILURE };
  }
}
function getPaymentMethods() {
  return (dispatch) => {
    s.getPaymentMethods().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(paymentMethod) {
    return {
      type: c.GET_PAYMENT_METHODS_SUCCESS,
      paymentMethod,
    };
  }
  function failure() {
    return { type: c.GET_PAYMENT_METHODS_FAILURE };
  }
}

function getBillHistory(data) {
  return (dispatch) => {
    s.getBillHistory(data).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(billHistory) {
    return {
      type: c.GET_BILL_HISTORY,
      billHistory,
    };
  }
  function failure() {
    return { type: c.GET_BILL_HISTORY_FAILURE };
  }
}

function getPayHistory(data) {
  return (dispatch) => {
    s.getPayHistory(data).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(payHistory) {
    return {
      type: c.GET_PAY_HISTORY_SUCCESS,
      payHistory,
    };
  }
  function failure() {
    return { type: c.GET_PAY_HISTORY_FAILURE };
  }
}

function order(orderInfo, onSuccess = () => {}) {
  return (dispatch) => {
    s.order(orderInfo).then((res) => {
      if (res.code === 201) {
        window.localStorage.removeItem("cartInfo");
        window.localStorage.removeItem("code_voucher");
        window.localStorage.removeItem("total_shipping_fee");
        onSuccess();
        dispatch(success());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.ORDER_POPUP,
          orderPopupTitle: {
            title: "Đặt hàng thành công !",
            subTitle:
              "Bạn đã đặt hàng thành công vui lòng đợi xác nhận từ cửa hàng.",
          },
          paymentMethod: {
            payment_method_name: res.data.payment_method_name,
            payment_partner_name: res.data.payment_partner_name,
            payment_partner_id: res.data.payment_partner_id,
            payment_method_id: res.data.payment_method_id,
            order_code: res.data.order_code,
            orderInfo: res.data,
          },
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.ORDER_SUCCESS,
    };
  }
  function failure(message) {
    return {
      type: c.ORDER_FAILURE,
      message,
    };
  }
}
function changePaymentMethod(info, orderInfo) {
  return (dispatch) => {
    s.changePaymentMethod(info).then((res) => {
      if (res.code === 201 || res.code === 200) {
        dispatch(success());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.ORDER_POPUP,
          orderPopupTitle: {
            title: "Cập nhật thông tin thanh toán thành công !",
            subTitle:
              "Bạn đã cập nhật thông tin thanh toán thành công vui lòng đợi xác nhận từ cửa hàng.",
          },
          paymentMethod: {
            payment_method_name: info.paymentMethodName,
            payment_method_id: info.paymentMethodId,
            payment_partner_id: info.paymentPartnerId,
            payment_partner_name: info.paymentPartnerName,
            order_code: info.orderCode,
            orderInfo: orderInfo || {},
          },
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.CHANGE_PAYMENT_METHOD_SUCCESS,
    };
  }
  function failure(message) {
    return {
      type: c.CHANGE_PAYMENT_METHOD_FAILURE,
      message,
    };
  }
}
function getOrdersList(query) {
  return (dispatch) => {
    s.getOrdersList(query).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(ordersList) {
    return {
      type: c.GET_ORDERS_LIST_SUCCESS,
      ordersList,
    };
  }
  function failure(code, message) {
    return {
      type: c.GET_ORDERS_LIST_FAILURE,
      code,
      message,
    };
  }
}
function getOrderInfo(orderCode) {
  return (dispatch) => {
    s.getOrderInfo(orderCode).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(orderInfo) {
    return {
      type: c.GET_ORDER_INFO_SUCCESS,
      orderInfo,
    };
  }
  function failure(code, message) {
    return {
      type: c.GET_ORDER_INFO_FAILURE,
      code,
      message,
    };
  }
}
function cancelOrder(info) {
  return (dispatch) => {
    s.cancelOrder(info).then((res) => {
      if (res.code === 200) {
        dispatch(success());
        window.location.reload();
      } else {
        dispatch(failure(res.code, res.msg));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
      }
    });
  };
  function success() {
    return { type: c.CANCEL_ORDER_SUCCESS };
  }
  function failure(code, message) {
    return { type: c.CANCEL_ORDER_FAILURE, code, message };
  }
}
function applyDiscount(
  info,
  type,
  setVoucher = () => {},
  showPopup = false,
  clearVoucherEmpty = () => {},
  isShowMessage = true
) {
  const msg = {
    code_voucher: "Áp dụng voucher thành công !",
    is_use_points: "Sử dụng xu thành công !",
    is_use_balance_collaborator: "Sử dụng số dư CTV thành công !",
    is_use_balance_agency: "Sử dụng số dư đại lý thành công !",
    is_order_for_customer: "Đặt đơn hộ cho khách hàng !",
  };
  return (dispatch) => {
    dispatch({ type: c.LOADING_SHIPPING, isLoading: true });
    s.applyDiscount(info).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));

        if (info.total_shipping_fee) {
          localStorage.setItem(
            "total_shipping_fee",
            JSON.stringify(info.total_shipping_fee)
          );
        }

        if (info.code_voucher) {
          if (setVoucher) setVoucher(info.code_voucher);
          localStorage.setItem(
            "code_voucher",
            JSON.stringify(info.code_voucher)
          );
        }
        // dispatch({type: c.RESET_ORDER_INFO_STATUS})
        dispatch({ type: c.LOADING_SHIPPING, isLoading: false });
        dispatch(success(res.data));

        if (!showPopup) dispatch({ type: c.VOUCHER_SUCCESS });
        if (info[type] && isShowMessage)
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: msg[type],
          });
      } else {
        dispatch({ type: c.LOADING_SHIPPING, isLoading: false });
        dispatch(failure(res.code, res.msg));
        if (isShowMessage) {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: res.msg,
          });
        }
        dispatch({ type: c.VOUCHER_FAILURE });
        if (clearVoucherEmpty) {
          clearVoucherEmpty();
        }
      }
    });
  };
  function success(cartInfo) {
    return {
      type: c.APPLY_VOUCHER_SUCCESS,
      cartInfo,
    };
  }
  function failure(code, message) {
    return { type: c.APPLY_VOUCHER_FAILURE, code, message };
  }
}
function applyAddress(info) {
  const msg = {
    change_address: "Đã thay đổi địa chỉ !",
  };
  return (dispatch) => {
    s.applyDiscount(info).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Đã chọn",
        });
      }
    });
  };
  function success(cartInfo) {
    return {
      type: c.APPLY_VOUCHER_SUCCESS,
      cartInfo,
    };
  }
  function failure(code, message) {
    return { type: c.APPLY_VOUCHER_FAILURE, code, message };
  }
}
export const cartActions = {
  order,
  addCart,
  getCartInfo,
  getShipmentFee,
  postListShipperFee,
  getPaymentMethods,
  changeNumberInCart,
  changePaymentMethod,
  getOrdersList,
  getOrderInfo,
  applyDiscount,
  cancelOrder,
  applyAddress,
  purchase,
  getBillHistory,
  getPayHistory,
};
