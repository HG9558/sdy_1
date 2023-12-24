export default {
  token: '',       // - 用户登录token
  nickNameInfo: {},
  userInfo: {},
  centerBalanceMoney: '0.00',
  serUrl: '',      //- 客服地址
  unMessageCount: '',//-用户未读取消息数量
  mailBoxMsg: false,
  isRefresh: false, //- 刷新小图标的状态
  crFlag: false,  //- 是否需要使用usdt
  isRecoverShow: false, //- 余额回转提示
  waitOpenGameList: [], //- 等待余额回转完成后替换 url 方法列表
  regSetting: {     //- 用户注册项
    accWebRegister: true,
    addressisRequire: false,
    addressisVisible: false,
    captcharegisRequire: true,
    captcharegisVisible: true,
    emailisRequire: false,
    emailisVisible: false,
		mailCaptcharegisVisible: false,
		mailCaptcharegisRequire: false,
    loginNameisRequire: true,
    loginNameisVisible: true,
    loginPwdisRequire: true,
    loginPwdisVisible: true,
    mobileCaptcharegisRequire: false,
    mobileCaptcharegisVisible: false,
    mobileisRequire: false,
    mobileisVisible: false,
    qqisRequire: false,
    qqisVisible: false,
    reLoginPwdisRequire: true,
    reLoginPwdisVisible: true,
    realNameisRequire: false,
    realNameisVisible: false,
    registerMethod: '1',
    smsMobileCompelBindisRequire: false,
    weChatisRequire: false,
    weChatisVisible: false,
    whatsappisRequire: false,
    whatsappisVisible: false,
    telegramisRequire: false,
    telegramisVisible: false,
  },
  alipayEnable:true,
  ebPayWithdrawEnable:true,
  toPayWithdrawEnable:true,
  ecnyWithdrawEnable:true,
  cnyWithdrawEnable:true,
  eMoneyPayWithdrawEnable:true,
  //- 用户银行卡信息
  bankcardData: {
    rmb: [],
    crypto: [],
    alipay: [],
    otherpay: [],
    ecny: [],
    elec: [],
  },
  bankDifferentName: false, // 添加不同姓名银行卡
  isShowService: false, // 是否显示小额支付
}
