import { constants as c } from "../constants";
const initialState = {
  orderCode: null,
  account: {
    status: c.LOADING,
  },
  listAgency: {
    status: c.LOADING,
    list: [],
  },
  info: {
    status: c.LOADING,
    steps_bonus: [],
  },
  orders: {
    status: c.LOADING,
    data: [],
  },
  ordersImport: {
    status: c.LOADING,
    data: [],
  },
  history: {
    status: c.LOADING,
    data: [],
  },
  bonus: {
    status: c.LOADING,
    data: [],
  },
  referral: {
    status: c.LOADING,
    data: [],
  },
  reportss: {
    status: c.LOADING,
    data: [],
  },
};
export function agency(state = initialState, action) {
  switch (action.type) {
    case c.GET_AGENCY_REPORT_SUCCESS:
      return {
        ...state,
        report: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_AGENCY_REPORT_FAILURE:
      return {
        ...state,
        report: {
          status: c.FAILURE,
        },
      };
    case c.GET_AGENCY_REPORT_IMPORT_SUCCESS:
      return {
        ...state,
        reportImport: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_AGENCY_REPORT_IMPORT_FAILURE:
      return {
        ...state,
        reportImport: {
          status: c.FAILURE,
        },
      };
    case c.GET_AGENCY_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_AGENCY_ACCOUNT_FAILURE:
      return {
        ...state,
        account: {
          status: c.FAILURE,
        },
      };
    case c.GET_AGENCY_INFO_SUCCESS:
      return {
        ...state,
        info: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_AGENCY_INFO_FAILURE:
      return {
        ...state,
        info: {
          status: c.FAILURE,
          steps_bonus: [],
        },
      };

    case c.GET_LIST_AGENCY_SUCCESS:
      return {
        ...state,
        listAgency: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_LIST_AGENCY_FAILURE:
      return {
        ...state,
        listAgency: {
          status: c.FAILURE,
          steps_bonus: [],
        },
      };

    case c.GET_REPORT_GEN_SUCCESS:
      return {
        ...state,
        reportss: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_REPORT_GEN_FAILURE:
      return {
        ...state,
        reportss: {
          status: c.FAILURE,
          steps_bonus: [],
        },
      };
    case c.GET_SHARED_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_SHARED_ORDERS_FAILURE:
      return {
        ...state,
        order: {
          status: c.FAILURE,
          data: [],
        },
      };
    case c.GET_AGENCY_ORDERS_IMPORT_SUCCESS:
      return {
        ...state,
        ordersImport: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_AGENCY_ORDERS_IMPORT_FAILURE:
      return {
        ...state,
        ordersImport: {
          status: c.FAILURE,
          data: [],
        },
      };
    case c.GET_BALANCE_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_BALANCE_HISTORY_FAILURE:
      return {
        ...state,
        history: {
          status: c.FAILURE,
          data: [],
        },
      };
    case c.GET_BONUS_HISTORY_SUCCESS:
      return {
        ...state,
        bonus: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_BONUS_HISTORY_FAILURE:
      return {
        ...state,
        bonus: {
          status: c.FAILURE,
          data: [],
        },
      };
    case c.GET_AGENCY_REFERRAL_CODE_SUCCESS:
      return {
        ...state,
        referral: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_AGENCY_REFERRAL_CODE_FAILURE:
      return {
        ...state,
        referral: {
          status: c.FAILURE,
          data: [],
        },
      };
    case c.SAVE_ORDER_CODE:
      return {
        ...state,
        orderCode: action.orderCode, // Lưu order_code từ action vào state
      };
    default:
      return state;
  }
}
