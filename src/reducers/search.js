import { constants as c } from "../constants";
const initialState = {
  textSearch: "",
};
export function search(state = initialState, action) {
  switch (action.type) {
    case c.UPDATE_SEARCH_TEXT:
      return {
        ...state,
        textSearch: action.data,
      };
    default:
      return state;
  }
}
