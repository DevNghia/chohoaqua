import axios from "axios";
import { constants as c } from "../constants";

try {
  var tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
} catch (error) {
  var tokenInfo = null;
  window.localStorage.removeItem("tokenInfo");
}

export default function (endpoint, method, body) {
  axios.interceptors.request.use(
    (config) => {
      config.headers.token = tokenInfo;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axios({
    method: method,
    url: `${c.API_URL}${endpoint}`,
    data: body,
  });
}
