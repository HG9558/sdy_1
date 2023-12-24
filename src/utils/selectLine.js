/* eslint-disable */
let { VUE_APP_APP_API_URL } = process.env
import axios from 'axios'
import { Message } from 'element-ui'
import { lang } from "../i18n"

function selectLine() {
  if (!(VUE_APP_APP_API_URL instanceof Array)) {
    VUE_APP_APP_API_URL = [VUE_APP_APP_API_URL]
  }
  if(VUE_APP_APP_API_URL.length < 1) {
    VUE_APP_APP_API_URL = [window.location.origin]
  }
  let errNum = 0
  const promiseArr = VUE_APP_APP_API_URL.map((apiUrl, apiIndex, apiArr) => {
    return new Promise((resolve, reject) => {
      axios.post(`${apiUrl}/splive/app/getCurrentTimeMillis`)
        .then((res) => {
          if(res.status == 200 && res.data && res.data.code === 0 && res.data.msg){
            sessionStorage.setItem('timeGap', res.data.time - new Date().getTime())
            resolve(apiUrl)
          }else{
            errNum++
            if (apiArr.length === errNum) {
              reject('')
            }
          }
        })
        .catch((error) => {
          errNum++
          if (apiArr.length === errNum) {
            reject('')
          }
        })
    })
  })
  return Promise.race(promiseArr).then((value) => {
    return value
  }).catch((err) => {
    Message({
      customClass: process.env.VUE_APP_APP_TEMPLATE,
      message: lang('线路故障，请切换网络重试！'),
      duration: 1500
    })
    return err
  })
}
export { selectLine }
