import { constants as c } from "../constants";
let cartInfo = localStorage.getItem("cartInfo");
const initialState = {
  cartInfo: cartInfo
    ? JSON.parse(cartInfo)
    : {
        status: c.LOADING,
        line_items: [],
        total_after_discount: 0,
        total_before_discount: 0,
        product_discount_amount: 0,
        voucherStatus: 0,
      },
  status: c.LOADING,
  shipmentFee: {
    status: c.LOADING,
    list: [],
  },
  paymentMethod: {
    status: c.LOADING,
    list: [],
  },
  ordersList: {
    status: c.LOADING,
    list: [],
  },
  orderInfo: {
    status: c.LOADING,
    info: {},
  },
  loadingShippingFee: false,
};
export function cart(state = initialState, action) {
  switch (action.type) {
    case c.ADD_CART_SUCCESS:
      return {
        ...state,
        cartInfo: action.cartInfo,
        status: c.LOADING,
      };
    case c.GET_CART_SUCCESS:
    case c.APPLY_VOUCHER_SUCCESS:
      return {
        ...state,
        status: c.SUCCESS,
        cartInfo: {
          ...action.cartInfo,
          status: c.SUCCESS,
        },
      };
    case c.GET_CART_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
        cartInfo: { status: c.FAILURE },
      };
    case c.GET_SHIPMENT_FEE_SUCCESS:
      return {
        ...state,
        shipmentFee: {
          status: c.SUCCESS,
          list: action.shipmentFee,
        },
      };
    case c.GET_SHIPMENT_FEE_FAILURE:
      return {
        ...state,
        shipmentFee: {
          status: c.FAILURE,
          list: [],
        },
      };
    case c.LOADING_SHIPPING_FEE:
      return {
        ...state,
        loadingShippingFee: action.loading,
      };
    case c.GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethod: {
          status: c.SUCCESS,
          list: action.paymentMethod,
        },
      };
    case c.GET_PAYMENT_METHODS_FAILURE:
      return {
        ...state,
        paymentMethod: {
          status: c.FAILURE,
        },
      };
    case c.GET_BILL_HISTORY:
      return {
        ...state,
        billHistory: {
          status: c.SUCCESS,
          listBillHistory: action.billHistory,
        },
      };
    case c.GET_BILL_HISTORY_FAILURE:
      return {
        ...state,
        billHistory: {
          status: c.FAILURE,
        },
      };
    case c.GET_PAY_HISTORY_SUCCESS:
      return {
        ...state,
        payHistory: {
          status: c.SUCCESS,
          listPayHistory: action.payHistory,
        },
      };
    case c.GET_PAY_HISTORY_FAILURE:
      return {
        ...state,
        billHistory: {
          status: c.FAILURE,
        },
      };
    case c.GET_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        ordersList: {
          ...action.ordersList,
          status: c.SUCCESS,
        },
      };
    case c.GET_ORDERS_LIST_FAILURE:
      return {
        ...state,
        ordersList: {
          status: c.FAILURE,
        },
      };
    case c.RESET_ORDERS_LIST_STATUS:
      return {
        ...state,
        ordersList: {
          status: c.LOADING,
        },
      };
    case c.GET_ORDER_INFO_SUCCESS:
      return {
        ...state,
        orderInfo: {
          status: c.SUCCESS,
          info: action.orderInfo,
        },
      };
    case c.RESET_ORDER_INFO_STATUS:
      return {
        ...state,
        status: c.LOADING,
      };
    case c.GET_ORDER_INFO_FAILURE:
      return {
        ...state,
        orderInfo: {
          status: c.FAILURE,
        },
      };
    case c.CHANGE_NUMBER_SUCCESS: {
      let newState = { ...state };
      newState.cartInfo.line_items = [null];
      return newState;
    }
    case c.VOUCHER_SUCCESS: {
      let newState = { ...state };
      newState.cartInfo.voucherStatus = 1;
      return newState;
    }
    case c.VOUCHER_FAILURE: {
      let newState = { ...state };
      newState.cartInfo.voucherStatus = -1;
      return newState;
    }
    default:
      return state;
  }
}
