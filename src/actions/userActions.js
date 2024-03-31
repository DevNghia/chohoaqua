import { constants as c } from "../constants";
import { userServices as s } from "../services/userServices";
import { appActions } from "./appActions";
import { toast } from "react-toastify";

function accountCheck(info) {
  return (dispatch) => {
    s.accountCheck(info).then((res) => {
      if (res.code === 200) {
        let result = res.data.filter((v) => v.value === true);
        if (result.length === 0) {
          dispatch({ type: c.PHONE_NOT_REGISTERED, info });
        } else {
          dispatch({ type: c.PHONE_REGISTERED, info });
        }
      }
    });
  };
}

function accountLogin(info) {
  return (dispatch) => {
    s.accountLogin(info).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(tokenInfo) {
    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
    window.location.reload();
    return { type: c.LOGIN_SUCCESS, tokenInfo };
  }
  function failure(msg) {
    return { type: c.LOGIN_FAILURE, msg };
  }
}
function requestSendOtpEmail(email) {
  return (dispatch) => {
    s.requestSendOtpEmail(email).then((res) => {
      if (res.code === 200 || res.code === 201) {
      } else {
      }
    });
  };
}
function accountRegis(info) {
  return (dispatch) => {
    s.accountRegis(info).then((res) => {
      if (res.code === 200 || res.code === 201) {
        s.accountLogin(info).then((res2) => {
          if (res2.code === 200) {
            dispatch(success(res2.data));
          } else {
            window.location.reload();
          }
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(tokenInfo) {
    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
    window.location.reload();
    return { type: c.LOGIN_SUCCESS, tokenInfo };
  }
  function failure(message) {
    return { type: c.REGIS_FAILURE, message };
  }
}
function resetPassword(info) {
  return (dispatch) => {
    s.resetPassword(info).then((res) => {
      if (res.code === 200 || res.code === 201) {
        toast.success(" Đã khôi phục mật khẩu của bạn", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch(appActions.changePopup(c.PHONE_POPUP));
        // dispatch(success(dispatch));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(dispatch) {
    return { type: c.RESET_PASSWORD_SUCCESS };
  }
  function failure(msg) {
    return { type: c.RESET_PASSWORD_FAILURE, msg };
  }
}
function changePassword(info, funcModal) {
  return (dispatch) => {
    s.changePassword(info).then((res) => {
      if (res.code === 200 || res.code === 201) {
        toast.success("Thay đổi mật khẩu thành công !", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (funcModal) {
          funcModal();
        }
      } else {
        toast.error(res.msg, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
}
function accountLogout() {
  localStorage.removeItem("tokenInfo");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartInfo");
  localStorage.removeItem("reward_points");
  localStorage.removeItem("profile");
  localStorage.removeItem("badges");
  return (dispatch) => {
    dispatch({ type: c.LOGOUT });
    window.location.href = "/";
  };
}
function getUserAddress() {
  return (dispatch) => {
    s.getUserAddress().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(userAddress) {
    return { type: c.GET_USER_ADDRESS_SUCCESS, userAddress };
  }
  function failure() {
    return { type: c.GET_USER_ADDRESS_FAILURE };
  }
}
function addUserAddress(addressInfo) {
  return (dispatch) => {
    s.addUserAddress(addressInfo).then((res) => {
      if (res.code === 201) {
        dispatch(success());
        window.location.reload();
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.ADD_USER_ADDRESS_SUCCESS,
      fromCart: addressInfo.fromCart,
      message: "Thêm địa chỉ giao hàng thành công",
    };
  }
  function failure(message) {
    return { type: c.ADD_USER_ADDRESS_FAILURE, message };
  }
}
function updateUserAddress(addressInfo) {
  return (dispatch) => {
    s.updateUserAddress(addressInfo).then((res) => {
      if (res.code === 200) {
        s.getUserAddress().then((res) => {
          if (res.code === 200) {
            dispatch({
              type: c.GET_USER_ADDRESS_SUCCESS,
              userAddress: res.data,
            });
          } else {
            // dispatch(failure(res.msg));
          }
        });

        dispatch(success());
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.CHANGE_POPUP,
      popupType: c.AUTOHIDE_POPUP,
      messageInfo: "Đã cập nhật",
    };
  }
  function failure(message) {
    return { type: c.UPDATE_USER_ADDRESS_FAILURE, message };
  }
}
function setAddressDefault(addressInfo) {
  return (dispatch) => {
    s.updateUserAddress(addressInfo).then((res) => {
      if (res.code === 200) {
        s.getUserAddress().then((res) => {
          if (res.code === 200) {
            dispatch({
              type: c.GET_USER_ADDRESS_SUCCESS,
              userAddress: res.data,
            });
          } else {
            // dispatch(failure(res.msg));
          }
        });

        dispatch(success());
        // window.location.reload();
      } else {
        dispatch(failure());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
      }
    });
  };
  function success() {
    return { type: c.SET_ADDRESS_DEFAULT_SUCCESS };
  }
  function failure() {
    return { type: c.SET_ADDRESS_DEFAULT_FAILURE };
  }
}
function deleteUserAddress(id) {
  return (dispatch) => {
    s.deleteUserAddress(id).then((res) => {
      if (res.code === 200) {
        dispatch(success());

        s.getUserAddress().then((res) => {
          if (res.code === 200) {
            dispatch({
              type: c.GET_USER_ADDRESS_SUCCESS,
              userAddress: res.data,
            });
          } else {
            // dispatch(failure(res.msg));
          }
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.DELETE_USER_ADDRESS_SUCCESS,
      message: "Xóa địa chỉ thành công",
    };
  }
  function failure(message) {
    return { type: c.DELETE_USER_ADDRESS_FAILURE, message };
  }
}
// point_history
function getUserPointsHistory() {
  return (dispatch) => {
    s.getuserHistory().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else if (res.code === 401) {
        dispatch(userActions.accountLogout());
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(point_history) {
    localStorage.setItem("point_history", JSON.stringify(point_history));
    return {
      type: c.GET_POINTS_HISTORY_SUCCESS,
      point_history,
    };
  }
  function failure(message, code) {
    return { type: c.GET_POINTS_HISTORY_FAILURE, message, code };
  }
}
//reward_points
function getUserPoints() {
  return (dispatch) => {
    s.getUserPoints().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else if (res.code === 401) {
        dispatch(userActions.accountLogout());
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(reward_points) {
    localStorage.setItem("reward_points", JSON.stringify(reward_points));
    return {
      type: c.GET_REWARD_POINTS_SUCCESS,
      reward_points,
    };
  }
  function failure(message, code) {
    return { type: c.GET_REWARD_POINTS_FAILURE, message, code };
  }
}

//reward_points
function getUserProfile() {
  return (dispatch) => {
    s.getUserProfile().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else if (res.code === 401) {
        dispatch(userActions.accountLogout());
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
    return {
      type: c.GET_PROFILE_SUCCESS,
      profile,
    };
  }
  function failure(message, code) {
    return { type: c.GET_PROFILE_FAILURE, message, code };
  }
}
function updateUserProfile(profile) {
  return (dispatch) => {
    s.updateUserProfile(profile).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Cập nhật thông tin thành công !",
        });
      } else {
        dispatch(failure(res.msg, res.code));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
      }
    });
  };
  function success(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
    return {
      type: c.UPDATE_PROFILE_SUCCESS,
      profile,
    };
  }
  function failure(message, code) {
    return { type: c.UPDATE_PROFILE_FAILURE, message, code };
  }
}
function updateReferalNumberPhone(
  data,
  onSuccess = () => {},
  onFail = () => {}
) {
  return (dispatch) => {
    s.updateReferalNumberPhone(data).then((res) => {
      if (res.code === 200) {
        dispatch(getUserProfile());
        if (onSuccess) {
          onSuccess();
        }
      } else {
        if (onFail) {
          onFail(res.msg);
        }
        // setTimeout(() => {
        //   dispatch({
        //     type: c.CHANGE_POPUP,
        //     popupType: c.AUTOHIDE_POPUP,
        //     messageInfo: "SĐT của người giới thiệu không tồn tại !",
        //   });
        // }, 2000);
        // dispatch({
        //   type: c.CHANGE_POPUP,
        //   popupType: c.AUTOHIDE_POPUP,
        //   messageInfo: res.msg,
        // });
      }
    });
  };
}
function getUserReview() {
  return (dispatch) => {
    s.getUserReview().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(data) {
    return {
      ...data,
      type: c.GET_USER_REVIEW_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_REVIEW_FAILURE, message, code };
  }
}
function getUserAwaitReview() {
  return (dispatch) => {
    s.getUserAwaitReview().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(data) {
    return {
      ...data,
      type: c.GET_USER_AWAIT_REVIEW_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_AWAIT_REVIEW_FAILURE, message, code };
  }
}

function readAllNoti() {
  return (dispatch) => {
    s.readAllNoti().then((res) => {
      if (res.code === 200) {
        s.getUserBadges().then((res) => {
          if (res.code === 200) {
            dispatch(success(res.data));
          } else {
            dispatch(failure(res.msg, res.code));
          }
        });
      } else {
      }
    });
  };
  function success(data) {
    localStorage.setItem("badges", JSON.stringify(data));
    return {
      badges: data,
      type: c.GET_USER_BADGES_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_BADGES_FAILURE, message, code };
  }
}
function getUserBadges() {
  return (dispatch) => {
    s.getUserBadges().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(data) {
    localStorage.setItem("badges", JSON.stringify(data));
    return {
      badges: data,
      type: c.GET_USER_BADGES_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_BADGES_FAILURE, message, code };
  }
}
function getuserNotify() {
  return (dispatch) => {
    s.getuserNotify().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(data) {
    return {
      data,
      type: c.GET_USER_NOTIFY_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_NOTIFY_FAILURE, message, code };
  }
}
function toggleClassChat(boxChatStateIp) {
  var boxChatState = boxChatStateIp;
  boxChatState = boxChatState === "active" ? "" : "active";

  return {
    boxChatState,
    type: c.TOGGLE_BOX_CHAT,
  };
}
export const userActions = {
  readAllNoti,
  accountCheck,
  getUserPointsHistory,
  getUserPoints,
  accountLogin,
  accountRegis,
  accountLogout,
  resetPassword,
  getUserProfile,
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setAddressDefault,
  updateUserProfile,
  getUserReview,
  getUserAwaitReview,
  getUserBadges,
  getuserNotify,
  toggleClassChat,
  requestSendOtpEmail,
  updateReferalNumberPhone,
  changePassword,
};
