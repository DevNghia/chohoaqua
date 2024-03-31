import { constants as c } from "../constants";
const initialState = {
  list: {
    status: c.LOADING,
    data: [],
    bonusProductPopup : {}
  },
};
export function bonusProduct(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_BONUS_PRODUCT_SUCCESS:
      return {
        ...state,
        list: {
          data: [...action.data],
          status: c.SUCCESS,
        },
      };
    case c.GET_ALL_BONUS_PRODUCT_FAILURE:
      return {
        ...state,
        list: {
          data: [],
          status: c.FAILURE,
        },
      };
      case c.GET_BONUS_PRODUCT_POPUP:
        return {
          ...state,
          bonusProductPopup: {
            ...action.data,
            status: c.SUCCESS
          }
        };
        case c.GET_BONUS_PRODUCT_LADDER_POPUP:
          return {
            ...state,
            bonusProductLadderPopup: {
              ...action.data,
              status: c.SUCCESS
            }
          };
      case c.RESET_BONUS_PRODUCT_POPUP:
        return {
          ...state,
          bonusProductPopup: {
            status: c.RESET_BONUS_PRODUCT_POPUP
          }
        };
    default:
      return state;
  }
}
