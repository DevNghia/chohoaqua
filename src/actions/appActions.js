import { constants as c } from "../constants";
import { appServices } from "../services/appServices";
function getHomeInfo() {
  return (dispatch) => {
    dispatch({ type: c.GET_HOME_LOADING });
    appServices.getHomeInfo().then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure());

      dispatch({ type: c.GET_HOME_DONE });
    });
  };
  function success(data) {
    return { type: c.GET_HOME_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_HOME_FAILURE };
  }
}
function changePopup(popupType, messageInfo, rattingInfo) {
  return (dispatch) => {
    dispatch({
      type: c.CHANGE_POPUP,
      popupType,
      messageInfo,
      rattingInfo,
    });
  };
}
function getProvincesList() {
  return (dispatch) => {
    appServices.getProvincesList().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(provinces) {
    localStorage.setItem("provinces", JSON.stringify(provinces));
    return {
      type: c.GET_PROVINCES_LIST_SUCCESS,
      provinces,
    };
  }
  function failure() {
    return {
      type: c.GET_PROVINCES_LIST_FAILURE,
    };
  }
}
function getDistrictsList(provinceID) {
  return (dispatch) => {
    appServices.getDistrictsList(provinceID).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(districts) {
    return {
      type: c.GET_DISTRICTS_LIST_SUCCESS,
      districts,
    };
  }
  function failure() {
    return {
      type: c.GET_DISTRICTS_LIST_FAILURE,
    };
  }
}
function getWardsList(districtID) {
  return (dispatch) => {
    appServices.getWardsList(districtID).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(wards) {
    return {
      type: c.GET_WARDS_LIST_SUCCESS,
      wards,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

function getAllCategories() {
  return (dispatch) => {
    appServices.getAllCategories().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(categories) {
    return {
      type: c.GET_LIST_CATEGORIES_HOME,
      categories,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

function getBannerAds() {
  return (dispatch) => {
    appServices.getBannerAds().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(bannerAds) {
    return {
      type: c.GET_LIST_BANNERS_ADS_HOME,
      bannerAds,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

function getAllBanners() {
  return (dispatch) => {
    appServices.getAllBanners().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(banners) {
    return {
      type: c.GET_LIST_BANNERS_HOME,
      banners,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

function getInfoStore() {
  return (dispatch) => {
    const info_store = appServices.getInfoStore();
    if (info_store != null) {
      let info = { ...info_store, status: c.SUCCESS };
      dispatch(success(info));
    } else {
      dispatch(failure());
    }
  };
  function loading(data) {
    return { type: c.GETTING_INFO_STORE };
  }
  function success(data) {
    return { type: c.GET_INFO_STORE_SUCCESS, data };
  }
  function failure() {
    return { type: c.INFO_STORE_FAILURE };
  }
}
function getWebTheme() {
  return (dispatch) => {
    appServices.getWebTheme().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function loading(data) {
    return { type: c.GETTING_WEB_THEME };
  }
  function success(data) {
    return { type: c.GET_WEB_THEME_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_WEB_THEME_FAILURE };
  }
}
function setChatStatus(status) {
  return (dispatch) => dispatch({ type: c.TOGGLE_CHAT_STATUS, status });
}

function getAllSaleProduct() {
  return (dispatch) => {
    appServices.getAllSaleProduct().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_LIST_SALE_PRODUCT_HOME,
      data,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

function getAllNewProduct() {
  return (dispatch) => {
    appServices.getAllNewProduct().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_LIST_NEW_PRODUCT_HOME,
      data,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

function getAllHotProduct() {
  return (dispatch) => {
    appServices.getAllHotProduct().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_LIST_HOT_PRODUCT_HOME,
      data,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

function getAllListProductWithCategory() {
  return (dispatch) => {
    appServices.getAllListProductWithCategory().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_LIST_PRODUCT_BY_CATEGORY_HOME,
      data,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}
function getAllNewPosts() {
  return (dispatch) => {
    appServices.getAllNewPosts().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_LIST_NEW_POST_HOME,
      data,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}
function getAllPostWithCategory() {
  return (dispatch) => {
    appServices.getAllPostWithCategory().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_LIST_POST_WITH_CATEGORY_HOME,
      data,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}

export const appActions = {
  getProvincesList,
  getDistrictsList,
  setChatStatus,
  getWardsList,
  getHomeInfo,
  changePopup,
  getWebTheme,
  getInfoStore,
  getAllBanners,
  getAllCategories,
  getBannerAds,
  getAllSaleProduct,
  getAllNewProduct,
  getAllHotProduct,
  getAllListProductWithCategory,
  getAllNewPosts,
  getAllPostWithCategory,
};
