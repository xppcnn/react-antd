import axios from 'axios';
import { message, notification } from 'antd';
import { getLocalStore } from '@utils/auth'

const token = getLocalStore('TOKEN')

const Axios = axios.create({
    // 默认的请求头
    // baseURL: host,
   headers : {
      "Content-Type": "application/json;charset=UTF-8",
    }
});

// axios.defaults.baseURL = host;

/**
 * request 拦截器
 */
Axios.interceptors.request.use(
    config => {
      if(token){
        return { ...config,  headers : {
          "Authorization": `Bearer ${token}`,
        }}
      }
      return config
    },
    (error) => {
        message.error('请求错误');
        return Promise.reject(error);
    },
);

/**
 * response 拦截器
 */
Axios.interceptors.response.use(
    response => {
        if (response.data.code === 200) {
            return response;
        }
        // 针对请求成功：返回的 code 码做不同的响应
        serverResponseSuccessManager.codeParser(response);
        return Promise.resolve(response.data);
    },
    (error) => {
        // 针对请求失败：应该提示的错误信息
        serverResponseFailedManager.getErrorMessage(error);
        return Promise.reject(error.response);
    },
);

/**
 * @author：姚嘉东
 * @description：针对请求返回做不同的响应处理
 * @date：2020/3/19
 */

/**
 * 针对请求成功：返回的 code 码做不同的响应处理
 */
class ServerResponseSuccessManager {
    /**
     * 状态码解析器
     * @param response
     */
    codeParser(response) {
        const code = response?.data?.code;
        const resData = response?.data;
        const parser = {
            '10010': () => {
                this.handleCodeIs10010(resData);
            },
            '0': () => {
                this.handleCodeIs0(resData);
            },
            default: () => console.log('code 无法识别'),
        };
        return parser[code] ? parser[code]() : parser['default'];
    }

    /**
     * 状态码为 200 的响应处理
     * @param resData
     */
    handleCodeIs0(resData) {
        if (resData.code === 0) {
          notification.error({
            message: '数据拉取失败, 请刷新重试',
            description: resData.data,
          });
        }
    }

    /**
     * 状态码为 10010 的响应处理
     * @param resData
     */
    handleCodeIs10010(resData) {
        if (resData === 'TOKEN_INVALID') {
            message.config({
                maxCount: 1,
            });
            message.info('登录已过期，请重新登录');
            setTimeout(() => {
                window.location.href = '/account/login';
            }, 1000);
        }
    }
}

/**
 * 针对请求失败的响应处理
 */
class ServerResponseFailedManager {
    /**
     * 请求失败时，需要提示的信息
     */
    getErrorMessage(error) {
        // message.warn(error.response?.status);
        notification.error({
          message: '数据拉取失败, 请刷新重试',
          description: error.response?.statusText,
        });
        
    }
}

export const serverResponseSuccessManager = new ServerResponseSuccessManager();
export const serverResponseFailedManager = new ServerResponseFailedManager();

// 统一发起请求的函数
export function request(options) {
  return Axios.request(options);
}