import ajax from '../../http.js'

export default {
  //- 合影计划图片获取
  getVenturePlanPic: (): Promise<partnerAPI.queryVenturePlanPicType> => ajax({ url: '/sys/queryVenturePlanPic' }),
}
