import axios from "axios";
import { Message } from "element-ui";
import { getToken, getUserName } from "@/utils/app";

const BASE_URL = process.env.NODE_ENV === "production" ? "" : "/api";
// 创建axios,重新赋值
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 添加token userid sui ...业务需求
    config.headers["Tokey"] = getToken();
    config.headers["UserName"] = getUserName();
    // config.headers.sui = "3333333333";
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode != 0) {
      Message.error(data.message);
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
