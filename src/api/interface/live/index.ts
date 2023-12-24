import ajax from '../../http.js'

export default {
  //- 获取赛事分类
  // getMatchCategories: params => ajax({ url: '/splive/app/listLandingPageHeadLine', params }),

  // -获取赛事列表
  // getMatchList: params => ajax({ url: '/splive/app/listLandingPageEvent', params, method: 'post' }),

  //- 获取首页直播内容
  getActiveLiveMatch: () => ajax({ url: '/splive/app/getOneOfEventToAppHome', method: 'post' }),

  //- 获取聊天登录凭证
  // getUserSig: params => ajax({ url: '/splive/app/getUserSig', params }),

  //-- 获取赛事列表
  // apiGetMatchs: params => ajax({ url: '/splive/app/listLandingPageEvent', params, method: 'post' }),

  // 通过赛程ID（matchScheduleId）查询赛程数据
  // getScheduleId: params => ajax({ url: '/splive/app/getMatchScheduleByMatchScheduleId', params }),

  // 获取赛程列表
  // getSatchs: params => ajax({ url: '/splive/app/listLandingPageSchedule', params, method: 'post' }),

  // 礼物
  // getGiftList: params => ajax({ url: '/splive/app/gift/listAppSpGiftLibrary', params }),

  // 赠送礼物
  // saveOrUpdateGiftLog: params => ajax({ url: '/splive/app/gift/saveOrUpdateGiftLog', params, method: 'post' }),

  // 周榜
  // getWeekContributionList: params => ajax({ url: '/splive/app/gift/getWeekContributionList', params, method: 'post' }),
  // 总榜
  // getTotalContributionList: params => ajax({ url: '/splive/app/gift/getTotalContributionList', params, method: 'post' }),

  //-专题页
  // getCupSchedule: params => ajax({ url: '/splive/feijing/getCupSchedule', params }),

  //- 专题页
  // getCupScore: params => ajax({ url: '/splive/feijing/getCupScore', params }),

  // 查询赛事是否结束
  // getMatchIsOver: params => ajax({ url: '/splive/app/matchIsOver', params, method: 'post' }),

  //- 进入直播间检测
  // checkGroup: params => ajax({ url: `/splive/app/checkGroup?groupId=${params.groupId}`, params, method: 'post' }),

  //- 获取直播间ID
  // getSdkAppId: params => ajax({ url: '/splive/im/getSdkAppId' }),

  //- 获取晒单列表
  // getShowBetList: params => ajax({ url: '/splive/app/show/listShownBetLog', params }),

  // 首页大屏推荐
  getBigScreenList: () => ajax({ url: '/splive/app/big/screen/getAppBigScreenList', method: 'post' }),

  // 更新进入直播间的人数
  // updateAnchorTotal: ({ userId, matchScheduleId }) => ajax({ url: `/splive/app/updateAnchorTotal?userId=${userId}&matchScheduleId=${matchScheduleId}`, method: 'post' }),

  //- 查询当前用户下的跟单列表
  getListFollowBetLogsForUser: (params: LiveAPI.getListFollowBetLogsForUserParams): Promise<LiveAPI.getListShownBetLogsForUserParamsRes> => ajax({ url: '/splive/app/show/getListFollowBetLogsForUser', params, method: 'post' }),

  //- 查询当前用户下的晒单列表
  getListShownBetLogsForUser: (params: LiveAPI.getListShownBetLogsForUserParams): Promise<LiveAPI.getListShownBetLogsForUserParamsRes> => ajax({ url: '/splive/app/show/getListShownBetLogsForUser', params, method: 'post' }),
}
