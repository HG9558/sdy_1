const defaultStoken = process.env.VUE_APP_DEFAULTSTOKEN

export default {
  SToken: defaultStoken,      // - token
  discountType: "",  // - 优惠类型
  linkData: {},   //- 从banner界面或弹窗进行跳转过来的
  scrollTop: 0, //- 设置初始化的滚动距离
  renderSlotGame: false,  //- 渲电子游戏
  renderPokerGame: false, //- 渲染棋牌
  renderLotteryGame: false,
  renderRealGame: false,  //- 真人
  renderCatchfishGame: false,  //- 捕鱼
  agentInfoData: {}, //- 全民代理基础信息
  scrollAppDownLoad: false, //- 社区界面跳转到首页面滚动标识
  timCreateSuccess: false,
}
