import ajax from '../../http.js'

export default {
  //- 我的优惠 登录时候用 discount=1&pageSize=20&pageNo=1&buttonShow=-1
  getActivityList: (params: couponsAPI.ActivityListParams): Promise<couponsAPI.ActivityListRes> => ajax({ url: '/user/ActivityList', params }),
  //- 获取混合规则详情
  getMixing: (params: couponsAPI.getMixingParams): Promise<couponsAPI.getMixingResType> => ajax({ url: `/user/getMixActivity`, params }),
  //- 获取混合规则已领取详情
  getDoneMixing: (params: couponsAPI.getMixingParams): Promise<couponsAPI.getMixingResType> => ajax({ url: `/user/getMixActivityClaimeAll`, params }),
  //- 我的优惠
  getActivityListTwo: ({ discount, pageSize, pageNo, buttonShow }: couponsAPI.getActivityListTwoParams): Promise<couponsAPI.getActivityListTwoResType> => ajax({ url: `/user/claimedActivities?&discount=${discount}&pageSize=${pageSize}&pageNo=${pageNo}&buttonShow=${buttonShow}` }),
}