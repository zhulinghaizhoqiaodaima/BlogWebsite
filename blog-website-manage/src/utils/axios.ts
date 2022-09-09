import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { message } from "antd";
import Nprogress from 'nprogress'
import  'nprogress/nprogress.css'
export const createAxiosByinterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000,    //超时配置
    withCredentials: true,  //跨域携带cookie
    ...config,   // 自定义配置覆盖基本配置
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      Nprogress.start()

      // 在发送请求之前做些什么
    //   console.log("config:", config);
      // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      Nprogress.done()
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      Nprogress.done()
      // 对响应数据做点什么
      const { data } = response;
    //   console.log("response:", response);
      return data;
   
    },
    function (error) {
      Nprogress.done()
      // 对响应错误做点什么
      console.log("error-response:", error.response);
      console.log("error-config:", error.config);
      console.log("error-request:", error.request);
      message.error(error?.response?.data?.message || "服务端异常");
      return Promise.reject(error);
    }
  );
  return instance;
};
