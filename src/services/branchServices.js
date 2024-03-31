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

function getBranches() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/branches`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return {};
    });
}

export const branchServices = {
  getBranches,
};
