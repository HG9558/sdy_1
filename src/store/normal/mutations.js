
export default {
  //- 请求接口token
  set_site_token (state, str) {
    state.SToken = str
  },
  //- 优惠类型 discountType
  set_discount_type (state, str) {
    state.discountType = str
  },
  //- 从首页面或者用户中心进行跳转过来的内容
  set_link_data (state, obj) {
    state.linkData = obj
  },
  set_scroll_top (state, num) {
    state.scrollTop = num;
  },
  set_demo (state, num) {
    state.demo = num;
  },
  //- 当列表渲染完成请求老虎机游戏内容
  set_render_slot_game (state, bol) {
    state.renderSlotGame = bol
  },
  //- 当列表渲染完成请求捕鱼游戏内容
  set_render_catchfishGame (state, bol) {
    state.renderCatchfishGame = bol
  },
  //- 当列表渲染完成请求棋牌游戏内容
  set_render_pokerGame (state, bol) {
    state.renderPokerGame = bol
  },
  //- 当列表渲染完成请求棋牌游戏内容
  set_render_lotteryGame (state, bol) {
    state.renderLotteryGame = bol
  },
  //- 当列表渲染完成请求真人游戏内容
  set_render_realGame (state, bol) {
    state.renderRealGame = bol
  },

  //- 设置全民代理
  set_agent_Info (state, obj) {
    state.agentInfoData = obj
  },
  //- 设置全民代理
  set_scroll_app_downLoad (state, bol) {
    state.scrollAppDownLoad = bol
  },
  //- 设置TIM获取id成功状态
  set_timcreatesuccess: (state, status) => {
    state.timCreateSuccess = status
  },
}
