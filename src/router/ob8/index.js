import Vue from 'vue'
import { Message } from 'element-ui'
import VueRouter from 'vue-router'
import store from '../../store'
import { normalRoutes } from './normal_routes'
import { authRoutes } from './auth_routes'
import dayjs from 'dayjs'

Vue.use(VueRouter)

const routes = [
  ...normalRoutes,
  ...authRoutes,
  {
    path: '*',
    name: 'noPge',
    meta: {
      signInPage: true,
    },
    component: () => import(/* webpackChunkName: "noPage" */ 'pages/noPage')
  }
]

//- 导航重复点击容错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
}

const router = new VueRouter({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

function checkUserConditions(userInfo) {
  const { registerTime, realName, mobile } = userInfo
  const diffHour = dayjs().diff(registerTime, 'hour')
  // const diffHour = dayjs().diff(registerTime, 'minutes')
  if (diffHour >= 24) {
    // if (Notify.dismiss) Notify.dismiss()
    const path = '/profile/baseInfo'
    if (!realName) {
      Message({ message: '请先完善真实姓名' });
      return path
    }
    if (!mobile) {
      Message({ message: '请先完善手机号码' });
      return path
    }
  }
}


router.beforeEach(async (to, from, next) => {
  const { loginFree } = to.meta
  const isLogin = !!store.state.user.token;
  if (isLogin) {
    // to.path === '/login' ? next('/') : next()
    const { userInfo } = store.state.user
    const path = checkUserConditions(userInfo)
    if (path && (to.path !== path)) {
      next(path)
    } else if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (loginFree) {
      next()
    } else {
      next({
        path: '/',
        query: { fromPath: to.fullPath }
      })
    }
  }
})

export default router
