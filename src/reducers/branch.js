import { constants as c } from "../constants";

const initialState = {
  branches: {
    list: [],
    status: c.LOADING,
  },
};
export function branch(state = initialState, action) {
  switch (action.type) {
    case c.GET_BRANCH_ADDRESS_SUCCESS:
      return {
        ...state,
        branches: {
          list: action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_BRANCH_ADDRESS_FAILURE:
      return {
        ...state,
        branches: {
          status: c.FAILURE,
          list: [],
        },
      };
    default:
      return state;
  }
}
