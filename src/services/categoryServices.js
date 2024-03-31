import { constants as c } from "../constants";
import { appServices } from "./appServices";
const store_code = appServices.store_code;

try {
  var tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
} catch (error) {
  var tokenInfo = null;
  window.localStorage.removeItem("tokenInfo");


}


function getCategories() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "customer-token": tokenInfo ? tokenInfo.token : "",
    },
  };
  return fetch(`${c.API_URL}/customer/${store_code}/categories`, requestOptions)
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
export const categoryServices = {
  getCategories,
};
