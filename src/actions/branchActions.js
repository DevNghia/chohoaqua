import { constants as c } from "../constants";
import { branchServices as s } from "../services/branchServices";

function getBranches(onSuccess) {
  return (dispatch) => {
    s.getBranches().then((res) => {
      if (res.code === 200) {
        if (onSuccess) onSuccess(res.data);
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(data) {
    return { type: c.GET_BRANCH_ADDRESS_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_BRANCH_ADDRESS_FAILURE };
  }
}

export const branchActions = {
  getBranches,
};
