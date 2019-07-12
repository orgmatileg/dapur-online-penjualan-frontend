import axios from "axios";
import qs from "qs";
import { clearLocalStorageAuthData } from "../helpers/localStorage";

function parseError(res) {
  if (res.status_code === 401) {
    clearLocalStorageAuthData();
  }

  // // error
  // if (messages) {
  //   if (messages instanceof Array) {
  //     return Promise.reject({ messages: messages });
  //   } else {
  //     return Promise.reject({ messages: [messages] });
  //   }
  // } else {
  //   return Promise.reject({ messages: ["エラーが発生しました"] });
  // }

  return res;
}

/**
 * parse response
 */
function parseBody(response) {
  //  if (response.status === 200 && response.data.status.code === 200) { // - if use custom status code
  if (response.status === 200) {
    return response.data;
  } else {
    return this.parseError(response.data.description);
  }
}

let instance = axios.create({
  baseURL: "https://dapur-online-akuntansi-api.luqmanul.com/v1",
  paramsSerializer: function(params) {
    return qs.stringify(params, { indices: false });
  }
});

// request header
instance.interceptors.request.use(
  config => {
    // Do something before request is sent

    const auth_dataStr = localStorage.getItem("auth_data");
    const auth_data = JSON.parse(auth_dataStr);
    if (auth_data) config.headers = { Authorization: auth_data.token };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response parse
instance.interceptors.response.use(
  response => {
    return parseBody(response);
  },
  error => {
    console.warn("Error status", error.response.status);
    // return Promise.reject(error)
    if (error.response) {
      return parseError(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
);

export const http = instance;
