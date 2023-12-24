const authRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
      loginFree: true,
      signInPage: true,
    },
    component: () => import(/* webpackChunkName: "login" */ 'pages/login/login'),
  },
  {
    path: '/login/register',
    meta: {
      title: '注册页',
      loginFree: true,
      signInPage: true,
    },
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ 'pages/login/register'),
  },
  {
    path: '/forgetpsw',
    name: 'forgetpsw',
    meta: {
      title: '忘记密码',
      loginFree: true,
    },
    component: () => import(/* webpackChunkName: "login" */ 'pages/forgetpsw'),
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ 'pages/profile'),
    children: [
      {
        path: '/',
        redirect: 'baseInfo',
      },
      {
        path: 'baseInfo',
        name: 'baseInfo',
        meta: {
          title: '个人资料',
        },
        component: () => import(/* webpackChunkName: "baseInfo" */ 'pages/profile/baseInfo'),
      },
      {
        path: 'vip',
        meta: {
          title: 'vip专属',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/vip'),
      },
      {
        path: 'vipinfo',
        meta: {
          title: 'vip详情',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/vipinfo'),
      },
      {
        // 投注记录
        path: 'bettingRecord',
        meta: {
          title: '投注记录',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/bettingRecord'),
      },
      {
        // 交易记录
        path: 'recommended',
        meta: {
          title: '好友推荐',
        },
        component: () => import(/* webpackChunkName: "recommended" */ 'pages/profile/recommended'),
      },
      {
        // 交易记录
        path: 'transaction',
        meta: {
          title: '交易记录',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/transaction'),
      },
      {
        // 存款
        path: 'deposit',
        meta: {
          title: '存款',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/deposit'),
      },
      {
        // 取款
        path: 'withdrawal',
        meta: {
          title: '取款',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/withdrawal'),
      },
      {
        // 意见反馈
        path: 'feedback',
        meta: {
          title: '意见反馈',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/feedback'),
      },
      {
        // 我的优惠
        path: 'coupons',
        meta: {
          title: '我的优惠',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/coupons'),
      },
      {
        // 我的钱包
        path: 'wallet',
        meta: {
          title: '我的钱包',
        },
        name: 'wallet',
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/wallet'),
      },
      {
        // 全民代理
        path: 'nationalAgent',
        meta: {
          title: '全民代理',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/nationalAgent'),
      },
      {
        // 消息中心
        path: 'message',
        name: 'message',
        meta: {
          title: '消息中心',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/messageCenter'),
      },
    ],
  },
  {
    path: '/redEnvelope',
    name: 'redEnvelope',
    meta: {
      title: '红包雨',
      loginFree: true,
      footerHide: true,
    },
    component: () => import(/* webpackChunkName: "redEnvelope" */ 'pages/redEnvelope'),
  },
  {
    path: '/newRedEnvelope',
    name: 'newRedEnvelope',
    meta: {
      title: '新红包雨',
      loginFree: true,
      footerHide: true,
    },
    component: () => import(/* webpackChunkName: "newRedEnvelope" */ '@/pages/blackGold/newRedEnvelope'),
  },
  {
    path: '/redEnvelopeRecord',
    name: 'redEnvelopeRecord',
    meta: {
      title: '新红包雨排行榜',
      loginFree: true,
      footerHide: true,
    },
    component: () => import(/* webpackChunkName: "newRedEnvelope" */ '@/pages/blackGold/newRedEnvelope/redEnvelopeRecord'),
  },
  {
    path: '/topicPage',
    name: 'topicPage',
    component: () => import(/* webpackChunkName: "topicPage" */ 'pages/topicPage'),
  },
  {
    // USDT充值教程
    path: '/usdtTeach',
    name: 'usdtTeach',
    meta: {
      title: 'USDT充值教程',
      loginFree: true,
    },
    component: () => import(/* webpackChunkName: "usdtTeach" */ 'pages/usdtTeach'),
  },
	{
		path: '/luckActivity',
		name: 'luckActivity',
		meta: { title: '优惠活动', },
		component: () => import(/* webpackChunkName: "poker" */ 'pages/luckActivity'),
	},
];

// 防止启动其他站点文件夹报错
if (process.env.VUE_APP_APP_TEMPLATE === 'blackGold') {
	authRoutes.push({
		path: '/specialEnterGame',
		name: 'specialEnterGame',
		meta: { title: 'specialEnterGame', },
		component: () => import(/* webpackChunkName: "specialEnterGame" */ 'pages/specialEnterGame')
	})
}

export { authRoutes }
