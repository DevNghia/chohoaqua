import { constants as c } from "../constants";
import { toast } from "react-toastify";
const userInfo = localStorage.getItem("userInfo");

try {
  var parse = JSON.parse(localStorage.getItem("tokenInfo"));
  if (parse) var tokenInfo = localStorage.getItem("tokenInfo");
} catch (error) {
  window.localStorage.removeItem("tokenInfo");
  var tokenInfo = null;
}

console.log(tokenInfo);
const profile = localStorage.getItem("profile");
const badges = localStorage.getItem("badges");

const initialState = {
  phone: "",
  email: "",
  boxChatState: "",
  userInfo: userInfo ? JSON.parse(userInfo) : null,
  tokenInfo: tokenInfo ? JSON.parse(tokenInfo) : null,
  status_reg: c.NONE,

  profile: profile
    ? {
        ...JSON.parse(profile),
        status: c.LOADING,
      }
    : {
        status: c.LOADING,
      },
  point_history: {
    content: 0,
    point: 0,
    data: 0,
    references_value: 0,
    created_at: 0,
    status: c.LOADING,
  },
  reward_points: {
    point_introduce_customer: 0,
    point_review: 0,
    money_a_point: 0,
    percent_refund: 0,
    order_max_point: 0,
  },
  address: {
    list: [],
    status: c.LOADING,
  },
  notify: {
    status: c.LOADING,
    total_unread: 0,
    data: [],
  },
  status: c.LOADING,
  message: "",
  myReview: {
    status: c.LOADING,
    list: [],
  },
  awaitReview: {
    status: c.LOADING,
    list: [],
  },
  badges: badges
    ? {
        ...JSON.parse(badges),
        status: c.LOADING,
      }
    : {
        cart_quantity: 0,
        favorite_products: 0,
        voucher_total: 0,
        status_collaborator: 0,
        config_user_vip: null,
        status: c.LOADING,
      },
};
export function user(state = initialState, action) {
  switch (action.type) {
    case c.PHONE_NOT_REGISTERED:
    case c.PHONE_REGISTERED:
      return {
        ...state,
        phone: action.info.phone_number,
        email: action.info.email,
      };

    case c.LOADING_WHEN_SUBMIT_REGISTER:
      return {
        ...state,
        status_reg: c.LOADING,
      };
    case c.LOGIN_SUCCESS:
      return {
        ...state,
        status_reg: c.LOGIN_SUCCESS,
        tokenInfo: action.tokenInfo,
      };
    case c.LOGIN_FAILURE:
    case c.REGIS_FAILURE:
      return {
        ...state,
        status_reg: c.REGIS_FAILURE,

        message: action.message,
      };
    case c.LOGOUT:
      return {
        ...state,
        tokenInfo: null,
        userInfo: null,
        profile: {
          status: c.LOADING,
        },
      };
    case c.RESET_PASSWORD_SUCCESS:
      toast.success(" Đã khôi phục mật khẩu của bạn", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;

    case c.GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: {
          list: action.userAddress,
          status: c.SUCCESS,
        },
      };
    case c.GET_USER_ADDRESS_FAILURE:
      return {
        ...state,
        address: {
          status: c.FAILURE,
          list: [],
        },
      };
    case c.CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    // points
    case c.GET_REWARD_POINTS_SUCCESS:
      return {
        ...state,
        reward_points: { ...action.reward_points, status: c.SUCCESS },
        status: c.SUCCESS,
      };

    case c.GET_POINTS_HISTORY_SUCCESS:
      return {
        ...state,
        point_history: { ...action.point_history, status: c.SUCCESS },
        status: c.SUCCESS,
      };

    case c.GET_PROFILE_SUCCESS:
    case c.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.profile,
          status: c.SUCCESS,
        },
        status: c.SUCCESS,
      };
    case c.GET_PROFILE_FAILURE:
    case c.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        profile: {
          status: c.FAILURE,
        },
        status: c.FAILURE,
      };
    case c.GET_USER_REVIEW_SUCCESS:
      return {
        ...state,
        myReview: {
          status: c.SUCCESS,
          current_page: action.current_page,
          list: action.data,
        },
      };
    case c.RESET_GET_USER_AWAIT_REVIEW:
      return {
        ...state,
        awaitReview: {
          status: c.LOADING,
          list: [],
        },
      };
    case c.GET_USER_AWAIT_REVIEW_SUCCESS:
      return {
        ...state,
        awaitReview: {
          status: c.SUCCESS,
          current_page: action.current_page,
          list: action.data,
        },
      };
    case c.GET_USER_AWAIT_REVIEW_FAILURE:
      return {
        ...state,
        awaitReview: {
          status: c.FAILURE,
        },
      };
    case c.GET_USER_REVIEW_FAILURE:
      return {
        ...state,
        myReview: {
          status: c.FAILURE,
        },
      };
    case c.GET_USER_BADGES_SUCCESS:
      return {
        ...state,
        badges: {
          ...action.badges,
          status: c.SUCCESS,
        },
      };
    case c.GET_USER_BADGES_FAILURE:
      return {
        ...state,
        badges: {
          cart_quantity: 0,
          favorite_products: 0,
          voucher_total: 0,
          status: c.FAILURE,
        },
      };
    case c.GET_USER_NOTIFY_SUCCESS:
      return {
        ...state,
        notify: {
          ...action.data.list_notification,
          status: c.SUCCESS,
          total_unread: action.data.total_unread,
        },
      };
    case c.GET_USER_NOTIFY_FAILURE:
      return {
        ...state,
        notify: {
          status: c.LOADING,
          total_unread: 0,
          data: [],
        },
      };
    case c.TOGGLE_BOX_CHAT:
      return {
        ...state,
        boxChatState: action.boxChatState,
      };
    default:
      return state;
  }
}
