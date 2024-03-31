import { min } from "date-fns";
import { constants as c } from "../constants";
import { appServices } from "../services/appServices";
function formatPriceOrContact(p) {
  if (!p) return "Liên hệ";
  p = Math.round(p);
  p = p.toString();
  let n = 0;
  let tmp = "";
  let rs = p[0];
  for (let i = p.length - 1; i > 0; i--) {
    n++;
    tmp += p[i];
    if (n % 3 === 0) {
      tmp += ".";
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i];
  }
  if (rs == 0) return "Liên hệ";
  return rs + "₫";
}
function formatNumber(value) {
  var _value = value;
  console.log(value);
  return typeof _value !== "undefined" && _value != null
    ? _value
        .toString()
        .replace(/\./g, "")
        .toString()
        .replace(/,/g, "")
        .toString()
        .replace(/-/g, "")
        .toString()
    : "";
}

function formatNoD(number) {
  if (number == "" || number == null) number = 0;
  var number = number.toString().replace(/\./g, ".");
  number = parseInt(number);

  let dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(number ?? 0);
}

function formatPrice(p, NOD = false, isCheckNegative = false) {
  const isNegative = Number(p) < 0 && isCheckNegative;
  if (!p) return "0đ";
  p = Math.round(isNegative ? Math.abs(p) : p);
  p = p.toString();
  let n = 0;
  let tmp = "";
  let rs = p[0];
  for (let i = p.length - 1; i > 0; i--) {
    n++;
    tmp += p[i];
    if (n % 3 === 0) {
      tmp += ".";
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i];
  }
  if (NOD == true) return isNegative ? -rs : rs;
  return `${isNegative ? `-${rs}` : rs}đ`;
}
export const formatNumberPhone = (phone) => {
  const regexPhone = /(84|0[1|3|5|7|8|9])+([0-9]{8})\b/;
  if (phone) {
    return regexPhone.test(phone);
  }
  return false;
};
export const formatPriceV2 = (str) => {
  const strFormat = str
    ?.toString()
    .replace(/[A-Za-z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, "");
  if (Number(strFormat) >= 1000) {
    return strFormat
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  } else if (Number(strFormat) > 0 && Number(strFormat) < 1000) {
    return Number(strFormat);
  } else {
    return "";
  }
};
function showNextElement(e, height) {
  let currentElement = e.currentTarget;
  let nextElement = currentElement.nextElementSibling;
  let parentElement = currentElement.parentElement;
  if (nextElement.style.maxHeight) {
    nextElement.style.maxHeight = null;
    parentElement.style.zIndex = 2;
  } else {
    if (!height)
      nextElement.style.maxHeight = nextElement.scrollHeight + 16 + "px";
    else {
      nextElement.style.overflowY = "scroll";
      nextElement.style.maxHeight = height + 16 + "px";
    }

    parentElement.style.zIndex = 4;
  }
}
function hideParentElement(e) {
  let currentElement = e.currentTarget;
  let parentElement = currentElement.parentElement;
  parentElement.style.maxHeight = null;
  parentElement.parentElement.style.zIndex = 2;
}
async function uploadImage(formData) {
  const store_code = appServices.store_code;
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const path = `${c.API_URL}/customer/${store_code}/images`;
  const requestOptions = {
    method: "POST",
    headers: {
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: formData,
  };
  const response = await fetch(path, requestOptions);
  if (!response.ok) return "";
  const json = await response.json();
  return json.data;
}
async function uploadVideo(formData) {
  const store_code = appServices.store_code;
  const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
  const path = `${c.API_URL}/customer/${store_code}/video`;
  const requestOptions = {
    method: "POST",
    headers: {
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: formData,
  };
  const response = await fetch(path, requestOptions);
  if (!response.ok) return "";
  const json = await response.json();
  return json.data;
}
function handleImgErr(e) {
  e.target.src = c.DEFAULT_PRODUCT_IMG;
}
function isHexColor(color) {
  var re = /^#[0-9A-F]{6}$/i;
  return re.test(color);
}
function isImageUrl(url) {
  if (!url) return false;
  let str = url.replace('"', "");
  let imgFormat = ["jpg", "png", "jpeg", "svg", "webp"];
  let arr = str.split(".");
  let fileExtension = arr[arr.length - 1];
  return imgFormat.includes(fileExtension);
}
function isNullText(text) {
  return !text || text === "null";
}
async function requestOtp(phone_number) {
  const store_code = appServices.store_code;
  const path = `${c.API_URL}/customer/${store_code}/send_otp`;
  let formData = new FormData();
  formData.append("phone_number", phone_number);
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(path, requestOptions);
  if (!response.ok) {
    console.log("otp fail");
    return "";
  }
  const json = await response.json();
  console.log(json);
  return json.data;
}
function formatDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  var hour = date.getHours().toString();
  hour = hour.length > 1 ? hour : "0" + hour;
  var minute = date.getMinutes().toString();
  minute = minute.length > 1 ? minute : "0" + minute;
  var second = date.getSeconds().toString();
  second = second.length > 1 ? second : "0" + second;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
function standardProductLink(str) {
  str = str.replace(/%/g, "");
  str = removeAccents(str);
  str = str.replace(/\s/g, "-");
  str = replaceAll(str, "/", "-");
  str = replaceAll(str, "--", "-");
  return str;
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateNumberPhone(phone) {
  var re = /^\d+$/;
  return re.test(phone);
}
function convertNumberPhone(phone) {
  if (phone) {
    let phoneConvert;
    phoneConvert = phone.replaceAll(" ", "");
    phoneConvert = phoneConvert.replaceAll(".", "");
    phoneConvert = phoneConvert.replaceAll("-", "");
    phoneConvert = phoneConvert.replaceAll("(", "");
    phoneConvert = phoneConvert.replaceAll(")", "");
    phoneConvert = phoneConvert.replaceAll("+", "");

    if (phoneConvert.slice(0, 2) == "84") {
      phoneConvert = `0${phoneConvert.slice(2)}`;
    }
    if (phoneConvert.slice(0, 1) != "0") {
      phoneConvert = `0${phoneConvert}`;
    }
    return phoneConvert;
  }
  return "";
}

function isCheckValidNumberPhone(phone) {
  const $phone_convert = convertNumberPhone(phone);
  console.log("isCheckValidNumberPhone ~ phone:", $phone_convert);
  console.log("isCheckValidNumberPhone ~ phone.length:", $phone_convert.length);
  if ($phone_convert.length == 10) {
    return true;
  }

  return false;
}
// function validateNumber(phone){
//   var re = "10";
//   return re.test((phone).length)
// }

export {
  validURL,
  formatPrice,
  showNextElement,
  hideParentElement,
  uploadImage,
  uploadVideo,
  handleImgErr,
  isImageUrl,
  isHexColor,
  isNullText,
  formatDate,
  requestOtp,
  isJson,
  standardProductLink,
  formatPriceOrContact,
  validateEmail,
  validateNumberPhone,
  formatNoD,
  formatNumber,
  convertNumberPhone,
  isCheckValidNumberPhone,
  // validateNumber
};
