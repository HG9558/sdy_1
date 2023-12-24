import i18n from '@/i18n'

/*
  * strVal 为字符串类型
  * objVal  为对象类型,
  * bolVal  布尔值
  * arrVal   数组_
 */

export default {
  change_time_zone: (state, val) => {
    localStorage.setItem('time_zone', JSON.stringify(val))
    state.time_zone = val
    window.location.reload()
  },
  change_language: (state, val) => {
    localStorage.setItem('language', val)
    window.location.reload()
    setTimeout(() => {
      state.language = val
      i18n.locale = val
    }, 300)
  },
  set_equipment (state, str) {
    state.equipmentId = str
    localStorage.setItem('eq_uuid', str)
  },
  //- 设置当前请求队列
  set_req_queue (state, arr) {
    state.reqQueue = arr;
  },
  set_need_recover_dialog (state, bol) {
    state.isNeedRecoverShow = bol
  },
  //- 余额回转提示框
  set_recover_dialog (state, bol) {
    state.isRecoverShow = bol
  },
  //- 获取当前用户注册表单选项
  set_station_setting (state, obj) {
    state.stationSetting = obj
  },
  set_mobileAreaCodes (state, obj) {
    state.mobileAreaCodes = obj
  },
  set_isNeedVfySecurity (state, data) {
    state.isNeedVfySms = data.isNeedSms
    state.isNeedVfyEMail = data.isNeedMail
  },
  SET_SDKREADY (state, payload) {
    state.SDKReady = payload
  },
  //- 保存跳转好友名称
  set_sub_login_name (state, str) {
    state.subLoginName = str
  },
  //- 保存好友推荐状态
  save_code_id (state, str) {
    state.codeId = str;
  }
}
