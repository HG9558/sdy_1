import ajax from '../../http.js'


export default {
  //- 获取用户未读取信息数量
  getMessageUnread: (params: API.messageUnreadParams): Promise<API.messageUnreadType> => ajax({ url: '/user/messageUnread', params }),

  //- 验证码发送
  reqGet: (params: API.reqGetParams): Promise<API.reqGetResType> => ajax({
    url: '/user/captcha/new/get',
    params,
    method: 'post',
    config: { timeout: 15000, noStop: true },
  }),

  //- 发送结果检测
  reqCheck: (params: API.reqCheckParams): Promise<API.reqCheckResType> => ajax({ url: '/user/captcha/new/check', params, method: 'post', config: { noStop: true } }),

  //- 获取注册配置项
  getRegistSetting: (): Promise<API.regSettingResType> => ajax({ url: '/user/getRegistSetting' }),

  //- 用户登录
  userLogin: (params: API.loginParams): Promise<API.loginResType> => ajax({ url: '/user/login', method: 'post', params }),

  //- 检测用户账户名登录状态
  chkUser: (params: API.chkUserParams): Promise<API.loginResType> => ajax({ url: '/user/chkUser', params }),

  //- 获取用户基本信息
  getNickNameInfo: (): Promise<API.nickNameInfoResType> => ajax({ url: '/splive/app/user/getUser' }),

  //- 获取用户详细信息接口
  getUserInfo: (): Promise<API.getUserInfoRes> => ajax({ url: '/user/getUserInfo' }),

  //- 是否需要usdt
  searchCrFlagType: (): Promise<API.isCrWithrawType> => ajax({ url: '/user/isCrWithraw' }),

  //- 用户登录设备id
  sendEquipmentId: (params: API.sendEquipmentIdParams): Promise<API.sendEquipmentIdType> => ajax({ url: '/user/deviceBind', method: 'post', params }),

  // -登录使用短信验证码
  sendMobCodeLog: (params: API.sendMobCodeLogParams): Promise<API.sendMobCodeLogResType> => ajax({ url: '/user/sendMobCodeLog', method: 'post', params }),

  // -注册使用短信验证码
  getSendMobCodeReg: (params: API.getSendMobCodeRegParams): Promise<API.getSendMobCodeRegResType> => ajax({ url: '/user/sendMobCodeReg', method: 'post', params }),


  //- 用户注册获取图片验证码
  getCaptcha: (params: API.captchajpgParams): Promise<API.captchajpgType> => ajax({ url: '/user/captcha/jpg', params }),

  //- 用户注册接口
  sendRegisterInfo: (params: API.registerParams): Promise<API.registerResType> => ajax({ url: '/user/register', method: 'post', params }),

  //- 中心钱包获取接口
  getCenterBalance: (): Promise<API.checkBalanceType> => ajax({ url: '/pay/checkBalance', method: 'post' }),

  // - 设置免转/手动
  setFreeWalletSwitch: (params: API.freeWalletSwitchParams): Promise<API.freeWalletSwitchRes> => ajax({ url: '/pay/freeWalletSwitch', params }),

  // 单个平台转出，中心钱包->平台
  transferInPlatform: (params: API.transferInPlatformParams): Promise<API.freeWalletSwitchRes> => ajax({ url: '/pay/transferInPlatform', method: 'post', params }),

  // 单个平台转入，平台 -> 中心钱包
  transferOutPlatform: (params: API.transferInPlatformParams): Promise<API.freeWalletSwitchRes> => ajax({ url: '/pay/transferOutPlatform', method: 'post', params }),

  //- 全民代理基础信息
  getAgentInfo: (): Promise<API.mbrRebateAgentInfoRes> => ajax({ url: '/mbrRebateAgent/mbrRebateAgentInfo' }),

  //- 退出登录
  getLoginOut: (params: API.loginOutParams): Promise<API.loginOutType> => ajax({ url: '/user/loginOut', method: 'post', params }),

  //- 修改会员真实姓名
  modRealName: (params: API.modRealNameParams): Promise<API.sendEquipmentIdType> => ajax({ url: '/user/modRealName', method: 'post', params }),

  //- 修改会员昵称
  updateNickName: (params: API.updateNickNameParas): Promise<API.loginOutType> => ajax({ url: `/splive/app/user/updateNickName?nick=${params.nick}`, method: 'post' }),

  //- 修改性别
  setGender: (params: API.setGenderParams): Promise<API.sendEquipmentIdType> => ajax({ url: '/user/setGender', method: 'post', params }),

  //- 修改性别
  setBirthday: (params: API.setBirthdayParams): Promise<API.sendEquipmentIdType> => ajax({ url: '/user/setBirthday', method: 'post', params }),

  //- 修改会员密码
  modPwd: (params: API.modPwdParams): Promise<API.loginOutType> => ajax({ url: '/user/modPwd', method: 'post', params }),

  //- 验证原密码
  verifyPwd: (params: API.verifyPwdParams): Promise<API.loginOutType> => ajax({ url: '/user/verifyPwd', method: 'post', params }),

  //- 邮箱绑定
  setAccMail: (params: API.setAccMailParams): Promise<API.sendMobCodeLogResType> => ajax({ url: '/user/setAccMail', method: 'post', params }),

  //- 获取验证码
  sendMobCode: (params: API.sendMobCodeParams): Promise<API.loginOutType> => ajax({ url: '/user/sendMobCode', method: 'post', params }),

  //- 绑定手机号码
  vfyMobCode: (params: API.vfyMobCodeParams): Promise<API.getSendMobCodeRegResType> => ajax({ url: '/user/vfyMobCode', method: 'post', params }),

  //- 申请全民代理
  applyMbrAgent: () => ajax({ url: '/mbrRebateAgent/applyMbrAgent' }),

  //- 全民代理会员数据
  qryRebateInfo: (params: any) => ajax({ url: '/mbrRebateAgent/qryRebateInfo', params }),

  //- 忘记密码手机找回获取验证码
  getforgetpsw: (params: API.forgetpswParams): Promise<API.forgetpswResType> => ajax({ url: '/retrvpwd/retrvwayEx', params }),

  //- 忘记密码手机找回校验验证码
  getValidCode: (params: API.validCodeParams): Promise<API.validCodeResType> => ajax({ url: '/retrvpwd/validCode', params }),

  //- 忘记密码手机找回修改密码
  getModpwd: (params: API.modpwdParams): Promise<API.modpwdResType> => ajax({ url: '/retrvpwd/modpwd', params }),

  //- 忘记密码验证用户名
  getUserName: (params: any) => ajax({ url: '/retrvpwd/validUser', params, method: 'post' }),

  //- 获取zalo是否开启
  getZalo: () => ajax({ url: '/user/isZaloOpen' }),

  //- 获取谷歌验证二维码
  getGoogleAuthQRCode: () => ajax({ url: '/user/getGoogleAuthQRCode' }),

  //- 绑定谷歌验证
  bindGoogleAuth: (params: any) => ajax({ url: '/user/bindGoogleAuth', params, method: 'post' }),

  // //- 检查是否为常用设备id
  //  checkVfydevice:  params => ajax({ url: '/user/vfydevice', params, method: 'post' }),

  // //- 拉取滑块 来触发 验证接口  第二步
  //  sendSecurityMobCodeTwo:  params => ajax({ url: '/user/sendSecurityMobCodeTwo', params, method: 'post' }),

  // //- 拉取滑块 来触发 验证接口  验证登录   第三步
  //  vfySecurityMobCodeTwo:  params => ajax({ url: '/user/vfySecurityMobCodeTwo', params, method: 'post' }),

  //- 判断登录注册之前是否需要滑块验证
  isNeedSliderCheck: (params: API.isNeedSliderCheckParams): Promise<API.isNeedSliderCheckResType> => ajax({ url: '/user/vfyRegisteAndLogin', params, method: 'post' }),

  //- 获取出入款设置
  queryCondition: () => ajax({ url: '/sys/queryCondition' }),

  //- 设置支付密码
  setSecurePwdOfFirst: (params: any) => ajax({ url: '/user/setSecurePwdOfFirst', params }).then((res: any) => res.data || res, (err: any) => err.data || err),

  //- 更改支付密码
  modScPwd: (params: any) => ajax({ url: '/user/modScPwd', params, method: 'post' }).then((res: any) => res.data || res, (err: any) => err.data || err),

}
