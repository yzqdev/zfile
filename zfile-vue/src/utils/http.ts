import axios from "axios";
import {getDomainApi} from "./getApiUrl";
axios.defaults.withCredentials=true
axios.defaults.baseURL = getDomainApi(9101);
axios.interceptors.request.use((config) => {
  let url: any = config.url;
  // get参数编码
  if (config.method === "get" && config.params) {
    url += "?";
    let keys = Object.keys(config.params);
    for (let key of keys) {
      url += `${key}=${encodeURIComponent(decodeURI(config.params[key]))}&`;
    }
    url = url.substring(0, url.length - 1);
    config.params = {};
  }
  config.url = url;
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log("responseData==", response.data);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
