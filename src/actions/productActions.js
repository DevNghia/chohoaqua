import { constants as c } from "../constants";
import { productServices as s } from "../services/productServices";
import { cartServices as m } from "../services/cartServices";
function getProductInfo(id) {
  return (dispatch) => {
    s.getProductInfo(id).then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_PRODUCT_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_PRODUCT_FAILURE, code, message };
  }
}
function getProductAttributes() {
  return (dispatch) => {
    s.getProductAttributes().then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_LIST_ATTRIBUTES_PRODUCT_SUCCESS, data };
  }
  function failure(code) {
    return { type: c.GET_LIST_ATTRIBUTES_PRODUCT_FAILURE, code };
  }
}
function getSimilarProducts(id) {
  return (dispatch) => {
    s.getSimilarProducts(id).then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.GET_SIMILAR_PRODUCTS_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_SIMILAR_PRODUCTS_FAILURE };
  }
}
function setErrorDistribute(mess) {
  return (dispatch) =>
    dispatch({ type: c.SET_ERROR_SELECT_DISTRIBUTE, data: mess });
}
function getAllProducts(params) {
  return (dispatch) => {
    s.getAllProducts(params).then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_PRODUCTS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_PRODUCTS_FAILURE, code, message };
  }
}
function getSuggestProducts(params) {
  return (dispatch) => {
    s.getAllProducts(params).then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_SUGGEST_PRODUCTS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_SUGGEST_PRODUCTS_FAILURE, code, message };
  }
}
function getFavoriteProducts() {
  return (dispatch) => {
    s.getFavoriteProducts().then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_FAVORITE_PRODUCT_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_FAVORITE_PRODUCT_FAILURE, code, message };
  }
}
function toggleWishList(id, isLiked) {
  return (dispatch) => {
    s.toggleWishList(id, isLiked).then((res) => {
      if (res.code === 201 || res.code === 200) {
        dispatch(success(!isLiked));
        if (!isLiked) {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: "Thêm sản phẩm yêu thích thành công",
          });
        } else {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: "Xóa sản phẩm yêu thích thành công",
          });
        }
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
  function success(isLiked) {
    return { type: c.ADD_TO_WISHLIST_SUCCESS, isLiked: isLiked };
  }
  function failure() {
    return { type: c.ADD_TO_WISHLIST_FAILURE };
  }
}
function reviewProduct(id, reviewInfo) {
  return (dispatch) => {
    s.reviewProduct(id, reviewInfo).then((res) => {
      if (res.code === 201 || res.code === 200) {
        dispatch(success());
        dispatch(resetReviewAwait());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });

        m.getOrderInfo(reviewInfo.order_code).then((res) => {
          if (res.code === 201 || res.code === 200) {
            dispatch({
              type: c.GET_ORDER_INFO_SUCCESS,
              orderInfo: res.data,
            });
          }
        });
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
    return { type: c.REVIEW_PRODUCT_SUCCESS };
  }
  function resetReviewAwait() {
    return { type: c.RESET_GET_USER_AWAIT_REVIEW };
  }
  function failure() {
    return { type: c.REVIEW_PRODUCT_FAILURE };
  }
}
function getPurchasedProducts() {
  return (dispatch) => {
    s.getPurchasedProducts().then((res) => {
      if (res.code === 201 || res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_PURCHASED_PRODUCTS_SUCCESS,
      data,
    };
  }
  function failure(code, msg) {
    return { type: c.GET_PURCHASED_PRODUCTS_FAILURE, code, msg };
  }
}
function getProductReview(id, params) {
  return (dispatch) => {
    s.getProductReview(id, params).then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_PRODUCT_REVIEW_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_PRODUCT_REVIEW_FAILURE, code, message };
  }
}
export const productActions = {
  reviewProduct,
  getProductInfo,
  getAllProducts,
  getSuggestProducts,
  toggleWishList,
  getProductReview,
  getSimilarProducts,
  getFavoriteProducts,
  getPurchasedProducts,
  setErrorDistribute,
  getProductAttributes,
};
