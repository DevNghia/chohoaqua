import { constants as c } from "../constants";
const initialState = {
  status: c.LOADING,
  list: [],
  comboPopup : {}

};
export function combo(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_COMBO_SUCCESS:
      return {
        ...state,
        status: c.SUCCESS,
        list: action.data,
      };
    case c.GET_ALL_COMBO_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
      };
    case c.GET_COMBOS_POPUP:
      return {
        ...state,
        comboPopup: {
          ...action.data,
          status: c.SUCCESS
        }
      };

    case c.RESET_COMBOS_POPUP:
      return {
        ...state,
        comboPopup: {
          status: c.RESET_COMBOS_POPUP
        }
      };
    default:
      return state;
  }
}
