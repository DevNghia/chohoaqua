import { constants as c } from "../constants";
import { voucherServices } from "../services/voucherServices";
function getAllVoucher() {
  return (dispatch) => {
    voucherServices.getAllVoucher().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(data) {
    return { type: c.GET_ALL_VOUCHERS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_ALL_VOUCHERS_FAILURE, code, message };
  }
}

function getAllProductsByVoucherId(vourcher_id, page, search_value) {
  return (dispatch) => {
    voucherServices.getListProductByVourcherId(vourcher_id, page, search_value).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(data) {
    return { type: c.GET_ALL_PRODUCTS_BY_VOUCHER_ID_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_ALL_PRODUCTS_BY_VOUCHER_ID_FAILURE, code, message };
  }
}

export const voucherActions = {
  getAllVoucher,
  getAllProductsByVoucherId,
};
