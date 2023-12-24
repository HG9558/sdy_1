import ajax from '../../http.js'

export default {
  //- 获取SToken
  getSiteCode: (params: API.siteCode): Promise<API.ISideCodeRes> => ajax({ url: '/sys/getSiteCode', params }),
  //- 在线客服链接获取
  getServicerUrl: (params: API.IService): Promise<API.IServiceRes> => ajax({ url: '/sys/getSerUrl', params }),
  //- 获取获取站点设置是否允许前端注册
  getQueryStationSe: (): Promise<API.queryStationSetType> => ajax({ url: '/sys/queryStationSet' }),
  //- 获取手机区号列表
  getMobileAreaCodes: (): Promise<API.MobileAreaCodeObject> => ajax({ url: '/sys/mobileAreaCodes' }),
  //- 获取后台短信验证码开关
  getIsNeedVfySecurity: (): Promise<API.IsNeedVfySecurityRes> => ajax({ url: '/user/isNeedVfySecurity' }),

  //- 发送邮箱验证码
  sendMailCode: (params: API.sendSecurityMailCodeParams): Promise<API.sendEmailCodeLogRes> => ajax({ url: '/user/sendSecurityMailCode', params, method: 'post' }),

  //- 邮箱验证
  vfyMailCode: (params: API.vfySecurityEmailCodeParams): Promise<API.vfySecurityEmailCodeParamsRes> => ajax({ url: '/user/vfySecurityEmailCode', params, method: 'post' }),

  //- 发送邮箱验证码（注册）
  sendEmailCodeReg: (params: API.sendEmailCodeRegParams): Promise<API.sendEmailCodeRegRes> => ajax({ url: '/user/sendEmailCodeReg', params, method: 'post' }),

  //- 发送邮箱验证码（登录）
  sendEmailCodeLog: (params: API.sendEmailCodeLogParams): Promise<API.sendEmailCodeLogRes> => ajax({ url: '/user/sendEmailCodeLog', params, method: 'post' }),
  //- 邮箱登陆
  loginByEmail: (params: API.loginByEmailParams): Promise<API.loginResType> => ajax({ url: '/user/loginByEmail', params, method: 'post' }),

  //- 谷歌验证登陆
  loginByGoogle: (params: API.loginByGoogleParams): Promise<API.loginResType> => ajax({ url: '/user/loginByGoogle', params, method: 'post' }),

  //- 谷歌验证 module    模块  4：绑定银行卡 6:好友转账 
  vfyGoogleCode: (params: any): any => ajax({ url: '/user/vfySecurityGoogleCode ', params, method: 'post' }),
}