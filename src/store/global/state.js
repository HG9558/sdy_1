const VUE_APP_LANGUAGE = process.env.VUE_APP_LANGUAGE || 'zh'

export default {
  token: '',       // - 用户登录token
  // equipmentId: '', //- 设备id
  equipmentId: localStorage.getItem('eq_uuid') || '',
  isNeedRecoverShow: false,
  reqQueue: [],   //- 当前请求队列列表
  isRecoverShow: false,
  stationSetting: null,
  mobileAreaCodes: [],
  isNeedVfySms: false,
	isNeedVfyEMail: false,
  SDKReady: false,
  subLoginName: '', //- 好友账号
  codeId: '',   //- 推荐ID
  language: localStorage.getItem('language') || VUE_APP_LANGUAGE,
  time_zone: {
    value: -1,
    label: 'GMT+7'
  },
}
