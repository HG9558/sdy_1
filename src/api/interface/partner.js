import ajax from '../http.js'

//- 合影计划图片获取
export const getVenturePlanPic = params => ajax({ url: '/sys/queryVenturePlanPic', params })

