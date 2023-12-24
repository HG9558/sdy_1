import axios from 'axios'
import store from '../store'
import router from '@/router'
import crypto from '@/utils/crypto'
import { getTimeStamp } from '@/utils'
import { lang, language } from '../i18n'
import qs from 'qs';
import { Message } from 'element-ui'
import { selectLine } from '../utils/selectLine'
import {  VUE_APP_DEFAULTSTOKEN } from './config'
import { handleResponseTime } from '../utils/index'

const getBaseUrl = selectLine()

const instance = axios.create({
  withCredentials: true,
  headers: { 
    dev: 'PC',
    loginType: 0,
  },
})

const { CancelToken } = axios

function handleRequest (config, baseUrl) {
  const { url } = config
  if (!url.includes('splive/')) {
    config.url = baseUrl + '/api'+ url
  } else {
    config.url = baseUrl + url
    const micsecond = getTimeStamp()
    config.headers.sptvstoken = crypto.Encrypt(process.env.VUE_APP_DEFAULT_SPTVTOKEN + micsecond)
  }

  //- config.noStop = 不需要拦截队列
  if (!config.noStop) {
    //- 请求队列处理
    if (store.state.global.reqQueue.findIndex(item => config.url === item) > -1) {
      // config.cancelToken = new CancelToken(c => c(lang('操作频率过快') + config.url))
    } else {
      store.commit('global/set_req_queue', [...store.state.global.reqQueue, config.url])
    }
  }
}

function handleResponse (config) {
  const { url } = config
  const tempArr = store.state.global.reqQueue.filter(item => item !== url);
  store.commit('global/set_req_queue', tempArr);
}

//- 请求处理
instance.interceptors.request.use(config => {
  return getBaseUrl.then(res=>{
    handleRequest(config, res)
    const { token } = store.state.user;
    let { SToken } = store.state.normal;
    SToken = SToken || VUE_APP_DEFAULTSTOKEN
    SToken && (config.headers.SToken = SToken)
    token && (config.headers.token = token)
    config.headers.deviceid = store.state.global.equipmentId
    if (language && language !== 'zh') {
			config.headers.language = (language === 'en' ? 'en_us' : language)
			// 暂时处理马来语游戏跳转参数
			const urlList = [
				'/sys/catDepotList',
				'/sys/chessDepotList',
				'/sys/lotteryDepotList',
				'/sys/elecDepotList',
				'/sys/gameFishList',
				'/sys/gameList',
				'/sys/gameLotteryList',
				'/sys/gameChessList',
				'/sys/transit',
				'/sys/tryPlayGame',
			]
			if (language === 'ms' && urlList.some( v => config.url.includes(v))) {
				config.headers.language = 'en_us'
			}
    }
    return config
  })
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  handleResponse(response.config)

  if (response && response.data && process.env.VUE_APP_APP_SIGN === 'lua') {
    response.data = handleResponseTime(response.config.url, response.data)
  }

  const statusCode = response.data.code

  switch (statusCode) {
    case 500:
      if (response.data.msg.indexOf('SToken') === -1 && response.data.msg !== '您操作过快，请稍后再试！') {
        Message({
          customClass: process.env.VUE_APP_APP_TEMPLATE,
          message: response.data.msg,
          duration: 1500
        })
      }
      Message({
        customClass: process.env.VUE_APP_APP_TEMPLATE,
        message: response.data.msg,
        duration: 1500
      })
      return Promise.reject(response)
    case 401:
      Message({
        customClass: process.env.VUE_APP_APP_TEMPLATE,
        message: lang('请刷新页面,重新登录!'),
        duration: 1500
      })
      store.commit('user/set_user_token', '')
      store.commit('user/clear_user_info')
      router.push({
        path: '/login',
        query: {
          fromPath: router.currentRoute.fullPath
        }
      })
      return Promise.reject(response)
  }
  return Promise.resolve(response)
}, error => {
  return Promise.reject(error)
})

//- 输出promise对象
export default ({ params = {}, url = '', type = 'get', config = {} }) => {
  if ((type === 'get' || type === 'delete')) {
    Object.keys(params).length && (url += `?${qs.stringify(params)}`)
  }
  return new Promise((resolve, reject) => {
    instance[type](url, params, config).then(resolve).catch(reject)
  })
}
