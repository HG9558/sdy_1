import ajax from "../http.js";

//- 获取返点收益
export const getRebateReportList = ({ startTime, endTime }) =>
  ajax({
    url: `/promotion/rebateReport?startTime=${startTime}&endTime=${endTime}`,
  });

//- 获取好友查看页面
export const getRebateInfo = () => ajax({ url: `/promotion/info` });

//- 保存活动规则
export const saveActivityRule = () =>
  ajax({
    url: `/operate/activity/saveActivityRule`,
    type: "post",
    selfUrl: true,
  });

//- 获取好友推荐比例
export const getRemmendRule = () => ajax({ url: "/friendRebate/rule" });

//- 获取好友返利列表
export const getFriendRebateList = params => ajax({ url: "/friendRebate/getFriendRebateList", params });

//- 获取好友返详情
export const getFriendRebateDetails = params => ajax({ url: "/friendRebate/getFriendRebateDetails", params });

//-获取收益日报表
export const getFriendRebateRewardReportForDay = params => ajax({ url: "/friendRebate/getFriendRebateRewardReportForDay", params });

//-获取收益月报表
export const getFriendRebateRewardReportForMonth = params => ajax({ url: "/friendRebate/getFriendRebateRewardReportForMonth", params });

//- 好友推荐汇总，昨日和总收益
export const getFriendRebateSummary = params => ajax({ url: "/friendRebate/getFriendRebateSummary", params });

//- 收益统计
export const getFriendRebateFriendsRewardSummary = params => ajax({ url: "/friendRebate/getFriendRebateFriendsRewardSummary", params });

//- 是否显示好友推荐
export const getFriendRebateInfo = params => ajax({ url: "/friendRebate/getFriendRebateInfo", params });
