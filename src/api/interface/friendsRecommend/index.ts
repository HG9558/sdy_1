import ajax from '../../http.js'

export default {
  //- 获取返点收益
  // getRebateReportList: ({ startTime, endTime }) =>
  //   ajax({
  //     url: `/promotion/rebateReport?startTime=${startTime}&endTime=${endTime}`,
  //   }),

  //- 获取好友查看页面
  getRebateInfo: () => ajax({ url: `/promotion/info` }),

  //- 保存活动规则
  // saveActivityRule: () =>
  //   ajax({
  //     url: `/operate/activity/saveActivityRule`,
  //     method: "post",
  //     selfUrl: true,
  //   }),

  //- 获取好友推荐比例
  getRemmendRule: (): Promise<FriendAPI.getRemmendRuleResType> => ajax({ url: "/friendRebate/rule" }),

  //- 获取好友返利列表
  getFriendRebateList: (params: FriendAPI.getFriendRebateListParams): Promise<FriendAPI.getFriendRebateListResType> => ajax({ url: "/friendRebate/getFriendRebateList", params }),

  //- 获取好友返详情
  getFriendRebateDetails: (params: FriendAPI.getFriendRebateDetailsParams): Promise<FriendAPI.getFriendRebateDetailsResType> => ajax({ url: "/friendRebate/getFriendRebateDetails", params }),

  //-获取收益日报表
  getFriendRebateRewardReportForDay: (params: FriendAPI.getFriendRebateRewardReportForDayParams): Promise<FriendAPI.getFriendRebateRewardReportForDayResType> => ajax({ url: "/friendRebate/getFriendRebateRewardReportForDay", params }),

  //-获取收益月报表
  getFriendRebateRewardReportForMonth: (params: FriendAPI.getFriendRebateRewardReportForDayParams): Promise<FriendAPI.getFriendRebateRewardReportForDayResType> => ajax({ url: "/friendRebate/getFriendRebateRewardReportForMonth", params }),

  //- 好友推荐汇总，昨日和总收益
  getFriendRebateSummary: (): Promise<FriendAPI.getFriendRebateSummaryResType> => ajax({ url: "/friendRebate/getFriendRebateSummary" }),

  //- 收益统计
  getFriendRebateFriendsRewardSummary: (params: FriendAPI.getFriendRebateFriendsRewardSummaryParams): Promise<FriendAPI.getFriendRebateFriendsRewardSummaryResType> => ajax({ url: "/friendRebate/getFriendRebateFriendsRewardSummary", params }),

  //- 是否显示好友推荐
  getFriendRebateInfo: (): Promise<FriendAPI.getFriendRebateInfoRes> => ajax({ url: "/friendRebate/getFriendRebateInfo" }),
}
