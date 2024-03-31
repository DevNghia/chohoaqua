import { constants as c } from "../constants";
import { appServices } from "./appServices";
import { DeviceUUID } from "device-uuid";
const store_code = appServices.store_code;
const uuid = new DeviceUUID().get();

try {
  var tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
} catch (error) {
  var tokenInfo = null;
  window.localStorage.removeItem("tokenInfo");
}

function accountCheck(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/login/check_exists`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function accountLogin(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/login`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function accountRegis(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/register`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getUserAddress() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/address`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function addUserAddress(addressInfo) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(addressInfo),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/address`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function requestSendOtpEmail(email) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify({ email: email }),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/send_email_otp`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function updateUserAddress(addressInfo) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(addressInfo),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/address/${addressInfo.id}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function deleteUserAddress(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/address/${id}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return {};
    });
}
function getUserProfile() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/profile`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return {};
    });
}
function updateReferalNumberPhone(form) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(form),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/profile/referral_phone_number`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return {};
    });
}
function getUserPoints() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/reward_points`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return {};
    });
}
function getuserHistory() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/point_history`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json, "ddd");
      return json;
    })
    .catch((err) => {
      return {};
    });
}
function updateUserProfile(profile) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(profile),
  };
  return fetch(`${c.API_URL}/customer/${store_code}/profile`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json, "s");
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getUserReview() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/reviews`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getUserAwaitReview() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/reviews/not_rated`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function readAllNoti() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": store_code + "-" + uuid,
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/notifications_history/read_all`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function getUserBadges() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
      "device-id": store_code + "-" + uuid,
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/badges`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}

function getuserNotify() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/notifications_history`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function resetPassword(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/reset_password`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function changePassword(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
    body: JSON.stringify(info),
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/change_password`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return {};
    });
}
export const userServices = {
  readAllNoti,
  accountCheck,
  accountLogin,
  accountRegis,
  resetPassword,
  getUserProfile,
  getuserHistory,
  getUserAddress,
  addUserAddress,
  updateUserProfile,
  updateUserAddress,
  getUserPoints,
  deleteUserAddress,
  getUserReview,
  getUserBadges,
  getuserNotify,
  getUserAwaitReview,
  requestSendOtpEmail,
  updateReferalNumberPhone,
  changePassword,
};
