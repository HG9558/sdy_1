import { lang } from '@/i18n';
import axios from 'axios'
import { ElMessage } from 'element-plus';

const VITE_APP_APP_API_URL = sessionStorage.VITE_APP_APP_API_URL ?? import.meta.env.VITE_APP_APP_API_URL;
const VITE_THEME = sessionStorage.VITE_THEME ?? import.meta.env.VITE_THEME;

export const selectLine = () => {
  let errNum = 0
  const promiseArr = JSON.parse(VITE_APP_APP_API_URL).map((apiUrl: string, _apiIndex: number, apiArr: string[]) => {
    return new Promise<string>((resolve, reject) => {
      axios.post(`${apiUrl}/splive/app/getCurrentTimeMillis`)
        .then((res) => {
          if (res.status == 200 && res.data && res.data.code === 0 && res.data.msg) {
            sessionStorage.setItem('timeGap', (res.data.time - new Date().getTime()).toString())
            resolve(apiUrl)
          } else {
            errNum++
            if (apiArr.length === errNum) reject('')
          }
        })
        .catch(() => {
          errNum++
          if (apiArr.length === errNum) reject('')
        })
    })
  })
return Promise.race(promiseArr).then((value) => {
    return value
  }).catch((err) => {
    ElMessage({
      customClass: VITE_THEME,
      message: lang('线路故障，请切换网络重试！'),
      duration: 1500
    })
    return err
  })
}
