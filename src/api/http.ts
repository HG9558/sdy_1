// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import axios, { type AxiosRequestConfig } from 'axios'
import crypto from '@/utils/crypto'
import { getTimeStamp } from '@/utils'
import qs from 'qs';
import { selectLine } from 'utils/selectLine'
import { ElMessage } from 'element-plus';
import router from '../router'
import { lang } from '../i18n'
declare module 'axios' {
  export interface AxiosRequestConfig {
    noStop?: boolean;
    method?: Method;
    config?: { [key: string]: any };
    ignore_zh_tw?: boolean;
  }
}

const getBaseUrl = selectLine()

const instance = axios.create({
  withCredentials: true,
  headers: { dev: 'PC' },
})

const { CancelToken } = axios


const generateReqKey = (config: AxiosRequestConfig) => {
  const { method, url } = config;
  return [method, url].join('&')
}

const pendingRequest = new Map();
const addPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateReqKey(config);
  config.cancelToken = config.cancelToken || new CancelToken(c => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, c);
    }
  })
}

const removePendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}

function handleRequest(config: AxiosRequestConfig, baseUrl: string) {
  const { url } = config

  if (!url?.includes('splive/')) {
    config.url = baseUrl + '/api' + url
  } else {
    config.url = baseUrl + url
    const micsecond = getTimeStamp()
    const envState = useEnvState();
    config.headers.sptvstoken = crypto.Encrypt(envState.vite_default_sptvtoken + micsecond)

  }
  if (!config.noStop) {
    removePendingRequest(config);
    addPendingRequest(config);
  }
}

instance.interceptors.request.use(async (config) => {
  const res = await getBaseUrl;
  handleRequest(config, res);
  const { token } = useUserState();
  const envState = useEnvState();
  const SToken = envState.vite_defaultstoken;
  SToken && (config.headers.SToken = SToken);
  token && (config.headers.token = token);
  config.headers.dev = 'PC';
  const language = useGlobalState().language;
  if (language && language !== 'zh') {
    config.headers.language = (language === 'en' ? 'en_us' : language)
    if (config.url?.includes('/user/BetDetailList')) {
      config.headers.language = language === 'zh_tw' ? 'zh' : 'en_us'
    }
    (config.ignore_zh_tw && language === 'zh_tw') && (config.headers.language = 'zh');
  }
  config.headers.logintype = 0;
  return config;
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  removePendingRequest(response.config)
  const userState = useUserState();
  const statusCode = response.data.code
  const { VITE_THEME } = import.meta.env;
  switch (statusCode) {
    case 500:
    case 2000:
      ElMessage({
        customClass: VITE_THEME,
        message: response.data.msg,
        duration: 1500
      })
      return Promise.reject(response)
    case 401:
      ElMessage({
        customClass: VITE_THEME,
        message: lang('请刷新页面,重新登录!'),
        duration: 1500
      })
      userState.clear_user_info();
      router.replace('/login')
      return Promise.reject(response)
  }
  return Promise.resolve(response.data)
}, error => {
  return Promise.reject(error)
})

export default <T>({ params = {}, url = '', method = 'get', config = {} }: AxiosRequestConfig): Promise<T> => {
  const configObject = { data: null, ...config };
  if ((method === 'get' || method === 'delete')) {
    Object.keys(params).length && (url += `?${qs.stringify(params)}`)
  } else if (method === 'post') {
    instance.defaults.headers = { 'content-type': 'application/json' }
    configObject.data = params;
  }
  return new Promise((resolve: any, reject) => {
    instance({
      method,
      url,
      ...configObject
    }).then(resolve).catch(reject)
  })
}
