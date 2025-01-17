import { constants as c } from "../constants";
const initialState = {
  account: {
    status: c.LOADING,
  },
  info: {
    status: c.LOADING,
    steps_bonus: [],
  },
  orders: {
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
  superior: {
    status: c.LOADING,
    data: [],
  },
};
export function collaborator(state = initialState, action) {
  console.log("type", action.type);
  switch (action.type) {
    case c.GET_COLLABORATOR_REPORT_SUCCESS:
      return {
        ...state,
        report: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_COLLABORATOR_REPORT_FAILURE:
      return {
        ...state,
        report: {
          status: c.FAILURE,
        },
      };
    case c.GET_COLLABORATOR_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_COLLABORATOR_ACCOUNT_FAILURE:
      return {
        ...state,
        account: {
          status: c.FAILURE,
        },
      };
    case c.GET_COLLABORATOR_INFO_SUCCESS:
      return {
        ...state,
        info: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_COLLABORATOR_INFO_FAILURE:
      return {
        ...state,
        info: {
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
    case c.GET_SUPERIOR_SUCCESS:
      return {
        ...state,
        superior: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_SUPERIOR_FAILURE:
      return {
        ...state,
        superior: {
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
    case c.GET_COLLABORATOR_REFERRAL_CODE_SUCCESS:
      return {
        ...state,
        referral: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_COLLABORATOR_REFERRAL_CODE_FAILURE:
      return {
        ...state,
        referral: {
          status: c.FAILURE,
          data: [],
        },
      };
    default:
      return state;
  }
}
