import { constants as c } from '../constants';
const initialState = {
  list: {
    status: c.LOADING,
    data: [],
  },
  voucherPopup: {},
  listProductsByVoucherId: {
    status: c.LOADING,
    data: [],
  },
};
export function voucher(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_VOUCHERS_SUCCESS:
      return {
        ...state,
        list: {
          data: [...action.data],
          status: c.SUCCESS,
        },
      };
    case c.GET_ALL_VOUCHERS_FAILURE:
      return {
        ...state,
        list: {
          data: [],
          status: c.FAILURE,
        },
      };
    case c.GET_VOUCHERS_POPUP:
      return {
        ...state,
        voucherPopup: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.RESET_VOUCHERS_POPUP:
      return {
        ...state,
        voucherPopup: {
          status: c.RESET_VOUCHERS_POPUP,
        },
      };
    case c.GET_ALL_PRODUCTS_BY_VOUCHER_ID_SUCCESS:
      return {
        ...state,
        listProductsByVoucherId: {
          data: [action.data],
          status: c.SUCCESS,
        },
      };
    case c.GET_ALL_PRODUCTS_BY_VOUCHER_ID_FAILURE:
      return {
        ...state,
        listProductsByVoucherId: {
          data: [],
          status: c.FAILURE,
        },
      };
    default:
      return state;
  }
}
