import ajax from '../http.js'

//- 我的优惠 登录时候用 discount=1&pageSize=20&pageNo=1&buttonShow=-1
export const getActivityList = ({ discount, pageSize, pageNo, buttonShow }) => ajax({ url: `/user/ActivityList?&discount=${discount}&pageSize=${pageSize}&pageNo=${pageNo}&buttonShow=${buttonShow}` })

//- 立即领取
export const getActApply = params => ajax({ url: `/user/actApply`, params, type: "post" })

//- 获取混合规则详情
export const getMixing = params => ajax({ url: `/user/getMixActivity`, params })

//- 获取混合规则已领取详情
export const getDoneMixing = params => ajax({ url: `/user/getMixActivityClaimeAll`, params })

//- 我的优惠
export const getActivityListTwo = ({ discount, pageSize, pageNo, buttonShow }) => ajax({ url: `/user/claimedActivities?&discount=${discount}&pageSize=${pageSize}&pageNo=${pageNo}&buttonShow=${buttonShow}` })
