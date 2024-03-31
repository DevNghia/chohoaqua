import { appServices } from "../../services/appServices";
const store_code = appServices.store_code;
const dataSet = [
  {
    name: "Trang chủ",
    to: {
      pathname: "/",
      state: { prevPath: window.location.pathname },
    },
    style1: {
      style_container: {
        width: "110px",
      },
    },
  },
  {
    name: "Sản phẩm",
    to: {
      pathname: "/san-pham",
      state: { prevPath: window.location.pathname },
    },
    style1: {
      style_container: {
        width: "90px",
      },
    },
  },
  {
    name: "Tin tức",
    to: {
      pathname: "/tin-tuc",
      state: { prevPath: window.location.pathname },
    },
    style1: {
      style_container: {
        width: "80px",
      },
    },
  },
  {
    name: "Voucher",
    to: {
      pathname: "/ma-giam-gia",
      state: { prevPath: window.location.pathname },
    },
    style1: {
      style_container: {
        width: "90px",
      },
    },
  },
  {
    name: "Combo tặng thưởng",
    to: {
      pathname: "/combo-giam-gia",
      state: { prevPath: window.location.pathname },
    },
    style1: {
      style_container: {
        width: "fit-content",
      },
    },
  },

  {
    name: "Báo giá",
    to: {
      pathname: "/bao-gia",
      state: { prevPath: window.location.pathname },
    },
    style1: {
      style_container: {
        marginLeft: "30px",
      },
    },
  },
];

const dataAllowStore = ["topwindow", "ferlitizer", "cuahang"];

function allowCalculate() {
  for (const item of dataAllowStore) {
    if (store_code === item) return true;
  }
  return false;
}
export {
  dataSet,
  allowCalculate,
  // validateNumber
};
