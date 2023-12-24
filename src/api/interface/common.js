import ajax from '../http.js'

//- 获取SToken
export const getSiteCode = params => ajax({ url: '/sys/getSiteCode', params })

//- 在线客服链接获取
export const getServicerUrl = params => ajax({ url: '/sys/getSerUrl', params })

//- 获取获取站点设置是否允许前端注册
export const getQueryStationSe = params => ajax({ url: '/sys/queryStationSet', params })

//- 获取手机区号列表
export const getMobileAreaCodes = params => ajax({ url: '/sys/mobileAreaCodes', params })

//- 获取后台短信验证码开关
export const getIsNeedVfySecurity = params => ajax({ url: '/user/isNeedVfySecurity', params })

//- 发送邮箱验证码
export const sendMailCode = params => ajax({ url: '/user/sendSecurityMailCode', params, type: 'post' })

//- 邮箱验证
export const vfyMailCode = params => ajax({ url: '/user/vfySecurityEmailCode', params, type: 'post' })

//- 发送邮箱验证码（注册）
export const sendEmailCodeReg = params => ajax({ url: '/user/sendEmailCodeReg', params, type: 'post' })

//- 发送邮箱验证码（登录）
export const sendEmailCodeLog = params => ajax({ url: '/user/sendEmailCodeLog', params, type: 'post' })

//- 邮箱登陆
export const loginByEmail = params => ajax({ url: '/user/loginByEmail', params, type: 'post' })
