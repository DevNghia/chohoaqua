import { constants as c } from "../constants";
import { collaboratorServices as s } from "../services/collaboratorServices";
import { userActions } from "./userActions";

function getCollaboratorReport(query) {
  return (dispatch) => {
    s.getCollaboratorReport(query).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_COLLABORATOR_REPORT_SUCCESS, data };
  }
  function failure(code, msg) {
    return { type: c.GET_COLLABORATOR_REPORT_FAILURE, code, msg };
  }
}

function getAccountInfo() {
  return (dispatch) => {
    s.getAccountInfo().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_COLLABORATOR_ACCOUNT_SUCCESS, data };
  }
  function failure(code, msg) {
    return { type: c.GET_COLLABORATOR_ACCOUNT_FAILURE, code, msg };
  }
}
function getInfo() {
  return (dispatch) => {
    s.getInfo().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_COLLABORATOR_INFO_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_COLLABORATOR_INFO_FAILURE, code, message };
  }
}
function getSharedOrder(query) {
  return (dispatch) => {
    s.getSharedOrder(query).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_SHARED_ORDERS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_SHARED_ORDERS_FAILURE, code, message };
  }
}
function getBalanceHistory(query) {
  return (dispatch) => {
    s.getBalanceHistory(query).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_BALANCE_HISTORY_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_BALANCE_HISTORY_FAILURE, code, message };
  }
}
function getBonusHistory(query) {
  return (dispatch) => {
    s.getBonusHistory(query).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_BONUS_HISTORY_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_BONUS_HISTORY_FAILURE, code, message };
  }
}
function requestPayment() {
  return (dispatch) => {
    s.requestPayment().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Gửi yêu cầu thanh toán thành công",
        });
        dispatch(getInfo());
        return;
      }
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: res.msg,
      });
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.REQUEST_PAYMENT_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.REQUEST_PAYMENT_FAILURE, code, message };
  }
}
function updateInfo(info, nonClose = false) {
  return (dispatch) => {
    s.updateInfo(info).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        if (nonClose != true) {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: "Cập nhật thông tin thành công",
          });
        }

        setTimeout(() => {
          s.getAccountInfo().then((res) => {
            if (res.code === 200 || res.code === 201) {
              dispatch({
                type: c.GET_COLLABORATOR_ACCOUNT_SUCCESS,
                data: res.data,
              });
              return;
            }
            dispatch(failure(res.code, res.msg));
          });
        }, 1);
        return;
      }
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: res.msg,
      });
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.UPDATE_COLLABORATOR_INFO_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.UPDATE_INFO_COLLABORATOR_FAILURE, code, message };
  }
}
function regisCollaborator() {
  return (dispatch) => {
    s.regisCollaborator(true).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo:
            "Đăng ký CTV thành công vui lòng chờ phản hồi từ cửa hàng",
        });
        dispatch(userActions.getUserProfile());

        window.location.href = "/cong-tac-vien";
        setTimeout(function () {
          window.location.reload();
        }, 1500);

        return;
      }
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: res.msg,
      });

      window.location.href = "/cong-tac-vien";
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    });
  };
}
function cancelCollaborator() {
  return (dispatch) => {
    s.regisCollaborator(false).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Hủy CTV thành công vui lòng chờ phản hồi từ cửa hàng",
        });
        dispatch(userActions.getUserProfile());
        return;
      }
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: res.msg,
      });
    });
  };
}
function getCollaboratorReferralCode(query) {
  return (dispatch) => {
    s.getCollaboratorReferralCode(query).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_COLLABORATOR_REFERRAL_CODE_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_COLLABORATOR_REFERRAL_CODE_FAILURE, code, message };
  }
}
function getSuperior(query) {
  return (dispatch) => {
    s.getSuperior(query).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_SUPERIOR_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_SUPERIOR_FAILURE, code, message };
  }
}
export const collaboratorActions = {
  getInfo,
  updateInfo,
  getSharedOrder,
  getAccountInfo,
  requestPayment,
  getBonusHistory,
  getBalanceHistory,
  regisCollaborator,
  cancelCollaborator,
  getCollaboratorReport,
  getCollaboratorReferralCode,
  getSuperior,
};
