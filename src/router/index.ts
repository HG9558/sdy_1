import { createRouter, createWebHashHistory, type RouteMeta } from 'vue-router'
import routes from "~pages";
import { matomolog } from '../utils/matomo-init'
import { baseMenuData } from 'static_data/game_data';

interface IMicroGame {
  depotCode: string;
  gameExplain: string;
  firstPageShow: boolean;
}

const microGameList = JSON.parse(import.meta.env.VITE_MICRO_GAME_LIST ?? "[]");
const firstPageSHowData = microGameList.find((_: IMicroGame) => _.firstPageShow);

routes.forEach((item) => {
  // (firstPageSHowData && item.path.startsWith('/micro_page')) && ((item.meta as RouteMeta)!.auth = false);
});

const hasWGB = baseMenuData.cockfightingMenu.list.some(v => v.depotCode === 'WGB')
const router = createRouter({
  history: createWebHashHistory('/'),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      redirect: hasWGB ? { path: '/specialGamePage/cockfighting'} : firstPageSHowData ? { name: 'micro_page-id', params: { id: firstPageSHowData.depotCode } } : { name: 'Home' },
      children: routes,
    },
  ]
})

router.beforeEach(async (to, _from, next) => {
  const { auth } = to.meta
  const { token } = useUserState();
  const isLogin = !!token;

  if (matomolog) {
    matomolog(to)   //- 记录matomo路由跳转
  }
  if (isLogin) {
    if (to.path.includes('/login')) {
      next('/home')
    } else {
      next()
    }
  } else {
    if (!auth) {
      next()
    } else {
      next({ path: '/home' })
    }
  }
})

export default router
