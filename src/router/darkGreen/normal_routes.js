export const normalRoutes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "Home" */ 'pages/home')
  },
  {
    path: '/physical',
    name: 'physical',
    meta: { title: '体育', },
    component: () => import(/* webpackChunkName: "physical" */ 'pages/physical')
  },
  {
    path: '/real', name: 'real',
    meta: { title: '真人', },
    component: () => import(/* webpackChunkName: "real" */ 'pages/real'),
    children: [
      {
        path: '',
        name: 'partsList',
        meta: {
          loginFree: true,
          title: '真人',
        },
        component: () => import(/* webpackChunkName: "partList" */ 'pages/real/partList')
      },
      {
        path: 'selectList',
        name: 'selectList',
        meta: {
          loginFree: true,
          title: '真人',
        },
        component: () => import(/* webpackChunkName: "selectList" */ 'pages/real/selectList')
      },
    ]
  },
  {
    path: '/poker', name: 'poker',
    meta: { title: '棋牌', },
    component: () => import(/* webpackChunkName: "poker" */ 'pages/poker'),
    children: [
      {
        path: '',
        name: 'partsList',
        meta: {
          loginFree: true,
          title: '棋牌',
        },
        component: () => import(/* webpackChunkName: "partList" */ 'pages/poker/partList')
      },
      {
        path: 'selectList',
        name: 'selectList',
        meta: {
          loginFree: true,
          title: '棋牌',
        },
        component: () => import(/* webpackChunkName: "selectList" */ 'pages/poker/selectList')
      },
    ]
  },
  {
    path: '/e_sport',
    name: 'e_sport',
    meta: { title: '电竞', },
    component: () => import(/* webpackChunkName: "e_sport" */ 'pages/e_sport')
  },
  {
    path: '/lottery',
    name: 'lottery',
    meta: { title: '彩票' },
    component: () => import(/* webpackChunkName: "lottery" */ 'pages/lottery'),
    children: [
      {
        path: '',
        name: 'partList',
        meta: {
          loginFree: true,
          title: '彩票',
        },
        component: () => import(/* webpackChunkName: "partList" */ 'pages/lottery/partList')
      },
      {
        path: 'selectList',
        name: 'selectList',
        meta: {
          loginFree: true,
          title: '彩票',
        },
        component: () => import(/* webpackChunkName: "selectList" */ 'pages/lottery/selectList')
      },
    ]
  },
  {
    path: '/electronic',
    name: 'electronic',
    meta: { title: '电子', },
    component: () => import(/* webpackChunkName: "electronic" */ 'pages/electronic'),
    children: [
      {
        path: '',
        name: 'partList',
        meta: {
          loginFree: true,
          title: '电子',
        },
        component: () => import(/* webpackChunkName: "partList" */ 'pages/electronic/partList')
      },
      {
        path: 'selectList',
        name: 'selectList',
        meta: {
          loginFree: true,
          title: '电子',
        },
        component: () => import(/* webpackChunkName: "selectList" */ 'pages/electronic/selectList')
      },
    ]
  },
  {
    path: '/fish',
    name: 'fish',
    meta: { title: '捕鱼', },
    component: () => import(/* webpackChunkName: "electronic" */ 'pages/fish'),
    children: [
      {
        path: '',
        name: 'partList',
        meta: {
          loginFree: true,
          title: '捕鱼',
        },
        component: () => import(/* webpackChunkName: "partList" */ 'pages/fish/partList')
      },
      {
        path: 'selectList',
        name: 'selectList',
        meta: {
          loginFree: true,
          title: '捕鱼',
        },
        component: () => import(/* webpackChunkName: "selectList" */ 'pages/fish/selectList')
      },
    ]
  },
  {
    path: '/bingo',
    name: 'bingo',
    meta: { title: '宾果', },
    component: () => import(/* webpackChunkName: "electronic" */ 'pages/bingo'),
    children: [
      {
        path: '',
        name: 'partList',
        meta: {
          loginFree: true,
          title: '宾果',
        },
        component: () => import(/* webpackChunkName: "partList" */ 'pages/bingo/partList')
      },
      {
        path: 'selectList',
        name: 'selectList',
        meta: {
          loginFree: true,
          title: '宾果',
        },
        component: () => import(/* webpackChunkName: "selectList" */ 'pages/bingo/selectList')
      },
    ]
  },
  {
    path: '/douji',
    name: 'douji',
    meta: { title: '斗鸡', },
    component: () => import(/* webpackChunkName: "douji" */ 'pages/douji')
  },
  {
    path: '/discount',
    name: 'discount',
    meta: { title: '优惠', },
    component: () => import(/* webpackChunkName: "discount" */ 'pages/discount')
  },
  {
    path: '/partner',
    name: 'partner',
    meta: { title: '合营', },
    component: () => import(/* webpackChunkName: "partner" */ 'pages/partner')
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    meta: { title: '赞助', },
    component: () => import(/* webpackChunkName: "sponsor" */ 'pages/sponsor')
  },
  {
    path: '/game_help',
    name: 'game_help',
    meta: { title: '游戏帮助', },
    component: () => import(/* webpackChunkName: "game_help" */ 'pages/game_help')
  },
  {
    path: '/help_center',
    name: 'help_center',
    meta: { title: '帮助中心', },
    component: () => import(/* webpackChunkName: "help_center" */ 'pages/help_center')
  },
  {
    path: '/contact_us',
    name: 'contact_us',
    meta: { title: '联系我们', },
    component: () => import(/* webpackChunkName: "contact_us" */ 'pages/contact_us')
  },
  //- 论坛
  {
    path: '/forum',
    name: 'forum',
    meta: { title: '论坛', },
    component: () => import(/* webpackChunkName: "forum" */ 'pages/forum')
  },
  {
    path: '/worldcup',
    name: 'worldcup',
    meta: { title: '世界杯', },
    component: () => import(/* webpackChunkName: "worldcup" */ 'pages/worldcup'), 
  },
  {
    path: '/worldcup/news',
    name: 'news',
    meta: { title: '世界杯', },
    component: () => import(/* webpackChunkName: "worldcupNews" */ 'pages/worldcup/news')
  },
].map(route => (route.meta.loginFree = true) && route)