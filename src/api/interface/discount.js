import ajax from '../http.js'


//- 优惠活动类型
export const getDiscountTypeList = () => ajax({ url: '/sys/ActivityCatList' })

//- 优惠活动详情 登录用户访问接口discount=0&pageNo=1&pageSize=100
export const getDiscountDataList = actCatId => ajax({
  url: '/user/ActivityList',
  params: { discount: 0, pageNo: 1, pageSize: 100, actCatId }
})

//- 优惠活动 未登录获取活动里诶博啊
export const getNoTokenDiscountDataList = actCatId => ajax({
  url: '/sys/ActivityList',
  params: { discount: 0, pageNo: 1, pageSize: 100, actCatId }
})

// 获取抽奖信息
export const getLotteryInfo = () => ajax({
  url: '/sdyactivity/lotteryInfo',
})

// 抽奖
export const accountLottery = (params) => ajax({
  url: '/sdyactivity/accountLottery?prizeArea=1',
}, params)
