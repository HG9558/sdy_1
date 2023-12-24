/*
  * strVal 为字符串类型
  * objVal  为对象类型,
  * bolVal  布尔值
  * arrVal   数组_
 */
export default {
  //- 用户第一次打开界面
  set_first_open (state, bol) {
    state.firstOpen = bol
  },
  //- 通知弹窗
  set_notice_list (state, arr) {
    state.noticeList = arr
  },
  //- banner轮播图
  set_banner_list (state, arr) {
    state.bannerList = arr
  },
  //- 公告栏信息
  set_popup_list (state, arr) {
    state.popUpList = arr
  },
  //- 新红包雨排行榜
  set_red_envelope_recordList (state, arr) {
    state.redEnvelopeRecordList = arr
  },
  //- 新红包雨是否显示
  set_is_red_envelop_show (state, bol) {
    state.isRedEnvelopShow = bol
  }
}
