// import { useGlobalState, useUserState } from '@/stores';
import type Vue from 'vue';
import VueMatomo from 'vue-matomo'
import matomoconfig from './matomoconfig'
const { VITE_SITE_CODE } = import.meta.env;
const config = matomoconfig(VITE_SITE_CODE)

let matomolog: (route: any) => void | null;
let matomoClick: () => void | null;

export const matomoConfigFn = (app: Vue.App<Element>) => {
  if (config) {
    app.use(VueMatomo, {
      host: config.host,
      siteId: config.siteId['PC'],
      enableLinkTracking: true,
      requireConsent: false,
      trackInitialView: true,
      trackerFileName: 'matomo',
      debug: false,
    })

    matomolog = (route) => {
      const userState = useUserState();
      const globalState = useGlobalState();
      // 用户id
      let userInfo = userState.userInfo
      let userName = userInfo && userInfo.loginName
      if (userName) {
        window._paq.push(['setUserId', userName])
      }
      
      // 自定义维度1 ======== 设备id
      const equipmentId = globalState.equipmentId
      if (equipmentId) {
        window._paq.push(['setCustomDimension', 1, equipmentId]);
      }

      // 自定义维度2 ======== 访问域名
      window._paq.push(['setCustomDimension', 2, window.location.host]);

      // spa 跟踪新页面视图
      window._paq.push(['setCustomUrl', route.path]);

      let meta = route.meta || {}
      let title = Object.prototype.toString.call(meta.title) === '[object Function]' ? meta.title.call(route, route) : meta.title
      window._paq.push(['setDocumentTitle', `${title || route.path}`]);
      window._paq.push(['trackPageView']);
    }
    matomoClick = () => {
      // window._paq.push(['trackEvent', 'add', 'add employee']);
      // window._paq.push(['trackEvent', 'click', text])
    }
  }
}
export { matomolog, matomoClick }
