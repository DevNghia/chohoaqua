import { constants as c } from "../constants";
import { bonusProductServices } from "../services/bonusProductServices";
function getAllBonusProduct() {
  return (dispatch) => {
    bonusProductServices.getAllBonusProduct().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(data) {
    return { type: c.GET_ALL_BONUS_PRODUCT_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_ALL_BONUS_PRODUCT_FAILURE, code, message };
  }
}
export const bonusProductActions = {
  getAllBonusProduct,
};
