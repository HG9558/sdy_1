import ajax from '../http.js'

//- 获取赛事分类
export const getMatchCategories = params => ajax({ url: '/splive/app/listLandingPageHeadLine', params })

// -获取赛事列表
export const getMatchList = params => ajax({ url: '/splive/app/listLandingPageEvent', params, type: 'post' })

//- 获取首页直播内容
export const getActiveLiveMatch = () => ajax({ url: '/splive/app/getOneOfEventToAppHome', type: 'post' })

//- 获取聊天登录凭证
export const getUserSig = params => ajax({ url: '/splive/app/getUserSig', params })

//-- 获取赛事列表
export const apiGetMatchs = params => ajax({ url: '/splive/app/listLandingPageEvent', params, type: 'post' })

// 通过赛程ID（matchScheduleId）查询赛程数据
export const getScheduleId = params => ajax({ url: '/splive/app/getMatchScheduleByMatchScheduleId', params })

// 获取赛程列表
export const getSatchs = params => ajax({ url: '/splive/app/listLandingPageSchedule', params, type: 'post' })

// 礼物
export const getGiftList = params => ajax({ url: '/splive/app/gift/listAppSpGiftLibrary', params})

// 赠送礼物
export const saveOrUpdateGiftLog = params => ajax({ url: '/splive/app/gift/saveOrUpdateGiftLog', params, type: 'post' })

// 周榜
export const getWeekContributionList = params => ajax({ url: '/splive/app/gift/getWeekContributionList', params, type: 'post' })
// 总榜
export const getTotalContributionList = params => ajax({ url: '/splive/app/gift/getTotalContributionList', params, type: 'post' })

//-专题页
export const getCupSchedule = params => ajax({ url: '/splive/feijing/getCupSchedule', params })

//- 专题页
export const getCupScore = params => ajax({ url: '/splive/feijing/getCupScore', params })

// 查询赛事是否结束
export const getMatchIsOver = params => ajax({ url: '/splive/app/matchIsOver', params, type: 'post' })

//- 进入直播间检测
export const checkGroup = params => ajax({ url: `/splive/app/checkGroup?groupId=${params.groupId}`, params, type: 'post' })

//- 获取直播间ID
export const getSdkAppId = params => ajax({ url: '/splive/im/getSdkAppId' })

//- 获取晒单列表
export const getShowBetList = params => ajax({ url: '/splive/app/show/listShownBetLog', params, type: 'get' })

// 首页大屏推荐
export const getBigScreenList = () => ajax({ url: '/splive/app/big/screen/getAppBigScreenList', type: 'post' })

// 更新进入直播间的人数
export const updateAnchorTotal = ({userId, matchScheduleId}) => ajax({ url: `/splive/app/updateAnchorTotal?userId=${userId}&matchScheduleId=${matchScheduleId}`, type: 'post' })

//- 查询当前用户下的跟单列表
export const getListFollowBetLogsForUser = params => ajax({ url: '/splive/app/show/getListFollowBetLogsForUser', params, type: 'post' })

//- 查询当前用户下的晒单列表
export const getListShownBetLogsForUser = params => ajax({ url: '/splive/app/show/getListShownBetLogsForUser', params, type: 'post' })
