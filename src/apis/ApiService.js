/**
 * 簡單請求
（1) 请求方法是以下三种方法之一：
  HEAD
  GET
  POST
（2）HTTP的头信息不超出以下几种字段：
  Accept
  Accept-Language
  Content-Language
  Last-Event-ID
  Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

 */
import _get from 'lodash/get';
import axios, { CancelToken } from 'axios';
// import httpAdapter from 'axios/lib/adapters/http';
import AppConfig from '~~config';
import { history } from '~~store';

function getBlobErrorCode(blob) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const errorCode = e.srcElement.result || '';
      resolve(errorCode);
    };
    reader.onerror = e => {
      resolve('');
    };
    reader.readAsText(blob);
  });
}

const API_CONFIG = {
  baseURL: AppConfig.apiDomain,
  timeout: AppConfig.timeout,
  // validateStatus: status => (status >= 200 && status <= 500),
};

// // other method: 沒有包成function的方式
const axiosInstance = axios.create(API_CONFIG);


axiosInstance.interceptors.response.use(
  response => { return response; },
  async error => {
    const errorData = _get(error, ['response', 'data'], '');
    if (errorData instanceof Blob) {
      const errorCode = await getBlobErrorCode(errorData);
      if (errorCode) {
        // 把原本的error data替代為error code
        const newError = {
          ...error,
          response: {
            ...error.response,
            data: errorCode
          }
        };
        return Promise.reject(newError);
      }
    }
    return Promise.reject(error);
  }
);
const ApiService = {
  instance: axiosInstance,

  // withToken = true 要帶上Authorization的header
  mergeHeaders(headers, withToken) {
    let finalHeader = {};
    if (withToken) {
      // TODO check token
      const token = `${sessionStorage.getItem('tokentype')} ${sessionStorage.getItem('token')}`;
      if (token) {
        finalHeader = {
          ...finalHeader,
          Authorization: token
        };
      }
    }
    if (headers) {
      finalHeader = {
        ...finalHeader,
        ...headers
      };
    }
    return finalHeader;
  },

  // optionsConfig: {params, headers, timeout.....}
  get(url, optionsConfig = {}) {
    const { withToken = true, headers, ...args } = optionsConfig;
    return this.instance({
      method: 'get',
      url,
      headers: this.mergeHeaders(headers, withToken),
      ...args
    }).catch(this.handleApiError);
  },

  cancelGet(url, optionsConfig = {}) {
    const { withToken = true, headers, ...args } = optionsConfig;
    const source = CancelToken.source();
    return {
      send: () => this.instance({
        method: 'get',
        url,
        headers: this.mergeHeaders(headers, withToken),
        cancelToken: source.token,
        ...args
      }).catch(this.handleApiError),
      cancel: source.cancel,
    };
  },

  post(url, optionsConfig = {}) {
    const { withToken = true, headers, data, ...args } = optionsConfig;

    return this.instance({
      method: 'post',
      url,
      data,
      headers: this.mergeHeaders(headers, withToken),
      ...args
    }).catch(this.handleApiError);
  },

  delete(url, optionsConfig = {}) {
    const { withToken = true, headers, data, ...args } = optionsConfig;
    return this.instance({
      method: 'delete',
      url,
      data,
      headers: this.mergeHeaders(headers, withToken),
      ...args
    }).catch(this.handleApiError);
  },

  put(url, optionsConfig = {}) {
    const { withToken = true, headers, data, ...args } = optionsConfig;
    return this.instance({
      method: 'put',
      url,
      data,
      headers: this.mergeHeaders(headers, withToken),
      ...args
    }).catch(this.handleApiError);
  },

  patch(url, optionsConfig = {}) {
    const { withToken = true, headers, data, ...args } = optionsConfig;
    return this.instance({
      method: 'patch',
      url,
      data,
      headers: this.mergeHeaders(headers, withToken),
      ...args
    }).catch(this.handleApiError);
  },

  handleApiError(error) {
    // TODO 這裡可以發aciton，或是把錯誤訊息統一做處理
    const errorRes = _get(error, ['response']);
    const errorMsg = _get(errorRes, ['data']);
    const errorCode = _get(errorRes, ['status']);

    const isTokenExpired = (errorCode === 401 && errorMsg === 'authorized expire');

    if (!errorRes) {
      const msg = _get(error, ['message']);
      throw new Error(`Unexpected Error: ${msg}`);
    } else if (isTokenExpired) {
      sessionStorage.clear();
      history.push('/'); // 當token過期時, 踢回首頁
      console.log('token過期, 需要重新登入');
      throw new Error('authorized expire');
    }

    throw error;
  },
};

export default ApiService;


// const axiosInstance = axios.create(API_CONFIG);
// const apiClient = {
//   instance: axiosInstance,
//   get: axiosInstance.get,
//   post: axiosInstance.post,
//   delete: axiosInstance.delete,
//   put: axiosInstance.put,
//   patch: axiosInstance.patch,
// };
// export default apiClient;

// ref
// 參考架構
// https://github.com/letsdoitworld/World-Cleanup-Day/blob/a1e678de01269e897831475aea88b3084ee78713/mobile-app/src/app/services/Api.js
// https://github.com/abereghici/movie-database-react/blob/487a56b06b01f80a3a2d026626701c8a618f2341/src/app/api/index.js
// https://github.com/itsrimzz1/testApp-expo/blob/48f21ddf815ea76c9d4a0e6c0e83924361623fec/src/app/apiService.js
// https://github.com/kostyanet/mobx-spa/blob/789350545375f4d157866955e9e2640d0d0fd0ee/src/app/services/api.service.js
// https://github.com/tiezo/anon_fl_frontend/blob/4587d568283b0a284eaae50dfedd63b73a513d5f/src/app/api/client.js
// https://github.com/tiezo/anon_fl_frontend/blob/4587d568283b0a284eaae50dfedd63b73a513d5f/src/app/api/resources.js

// https://github.com/innowatio/iwapp/blob/4cc799528a9b121c51dcd1796cc1f658254cd348/app/lib/axios.js
// https://github.com/keita-nishimoto/aws-serverless-prototype
// https://github.com/qiaoyixuan/blog/blob/113544a7802b5e346b97a81b90eb01688b6b3961/public/app/apis/Client.js
