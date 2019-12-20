"use strict";

import Vue from 'vue';
import axios from "axios";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: "http://check.jiaoyisuo.online/api"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error
  }
);

const plugin = {
  install() {
    Object.defineProperties(Vue.prototype, {
      $axios: { get() { return axiosInstance; } },
    });
  }
}

Vue.use(plugin)

export default plugin;
export { axiosInstance };
