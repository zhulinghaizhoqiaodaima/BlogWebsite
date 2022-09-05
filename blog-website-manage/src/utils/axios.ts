
import axios from 'axios';
const service = axios.create({
    baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截器
service.interceptors.request.use((config) => {
    // if (config.url.includes('/passport')) {
    //     return config;
    // } else {

    //     // 直接对象赋值会报错
    //     return {
    //         ...config,
    //         params: {
    //             ...config.params,
    //             appkey: store.state.userInfo.appkey,
    //         }
    //     }
    // }


}, (error) => Promise.reject(error));

//响应拦截器
service.interceptors.response.use((response) => {
    // console.log(response);
    if (response.data.status === 'fail') {
        return Promise.reject(response.data.msg);
    }
    return response.data.data;
}, (error) => Promise.reject(error));

export default service;
