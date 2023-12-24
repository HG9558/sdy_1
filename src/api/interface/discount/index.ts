import ajax from '../../http.js'

export default {
  //- 优惠活动类型
  getDiscountTypeList: (): Promise<DiscountType.ActivityCatListResponse> => ajax({ url: '/sys/ActivityCatList' }),
  //- 优惠活动详情 登录用户访问接口discount=0&pageNo=1&pageSize=100
  getDiscountDataList: (actCatId: number): Promise<DiscountType.ActivityListRes> => ajax({
    url: '/user/ActivityList',
    params: { discount: 0, pageNo: 1, pageSize: 100, actCatId }
  }),
  //- 优惠活动 未登录获取活动里诶博啊
  getNoTokenDiscountDataList: (actCatId: number): Promise<DiscountType.ActivityListRes> => ajax({
    url: '/sys/ActivityList',
    params: { discount: 0, pageNo: 1, pageSize: 100, actCatId }
  }),
  //- 获取抽奖信息
  getLotteryInfo: () => ajax({ url: '/sdyactivity/lotteryInfo' }),
  //- 抽奖
  // accountLottery: (params: any) => ajax({
  //   url: '/sdyactivity/accountLottery?prizeArea=1',
  // }, params),
}
