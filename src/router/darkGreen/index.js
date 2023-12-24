import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../store'
import { normalRoutes } from './normal_routes'
import { authRoutes } from './auth_routes'

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


router.beforeEach(async (to, from, next) => {
  const { loginFree } = to.meta
  const isLogin = !!store.state.user.token;
  if (isLogin) {
    to.path === '/login' ? next('/') : next()
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
