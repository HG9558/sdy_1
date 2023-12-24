import ajax from '../http.js'

//- 获取用户未读取信息数量
export const getMessageUnread = params => ajax({ url: '/user/messageUnread', params })

//- 验证码发送
export const reqGet = params => ajax({
  url: '/user/captcha/new/get',
  params,
  type: 'post',
  config: { timeout: 15000, noStop: true },
})

//- 发送结果检测
export const reqCheck = params => ajax({ url: '/user/captcha/new/check', params, type: 'post', config: { noStop: true } })

//- 获取注册配置项
export const getRegistSetting = () => ajax({ url: '/user/getRegistSetting' })

//- 用户登录
export const userLogin = params => ajax({ url: '/user/login', type: 'post', params })

//- 获取用户基本信息
export const getNickNameInfo = () => ajax({ url: '/splive/app/user/getUser' })

//- 获取用户详细信息接口
export const getUserInfo = () => ajax({ url: '/user/getUserInfo' })

//- 是否需要usdt
export const searchCrFlagType = () => ajax({ url: '/user/isCrWithraw' })

//- 用户登录设备id
export const sendEquipmentId = params => ajax({ url: '/user/deviceBind', type: 'post', params })

// -登录使用短信验证码
export const sendMobCodeLog = params => ajax({ url: '/user/sendMobCodeLog', type: 'post', params })

// -注册使用短信验证码
export const getSendMobCodeReg = params => ajax({ url: '/user/sendMobCodeReg', type: 'post', params })


//- 用户注册获取图片验证码
export const getCaptcha = params => ajax({ url: '/user/captcha/jpg', type: 'get', params })

//- 用户注册接口
export const sendRegisterInfo = params => ajax({ url: '/user/register', type: 'post', params })

//- 中心钱包获取接口
export const getCenterBalance = () => ajax({ url: '/pay/checkBalance', type: 'post' })

// - 设置免转/手动
export const setFreeWalletSwitch = params => ajax({ url: '/pay/freeWalletSwitch', type: 'get', params })

// 单个平台转出，中心钱包->平台
export const transferInPlatform = params => ajax({ url: '/pay/transferInPlatform', type: 'post', params })

// 单个平台转入，平台 -> 中心钱包
export const transferOutPlatform = params => ajax({ url: '/pay/transferOutPlatform', type: 'post', params })

//- 全民代理基础信息
export const getAgentInfo = () => ajax({ url: '/mbrRebateAgent/mbrRebateAgentInfo' })

//- 退出登录
export const getLoginOut = params => ajax({ url: '/user/loginOut', type: 'post', params })

//- 修改会员真实姓名
export const modRealName = params => ajax({ url: '/user/modRealName', type: 'post', params })

//- 修改会员昵称
export const updateNickName = params => ajax({ url: `/splive/app/user/updateNickName?nick=${params.nick}`, type: 'post' })

//- 修改性别
export const setGender = params => ajax({ url: '/user/setGender', type: 'post', params })

//- 修改性别
export const setBirthday = params => ajax({ url: '/user/setBirthday', type: 'post', params })

//- 修改会员密码
export const modPwd = params => ajax({ url: '/user/modPwd', type: 'post', params })

//- 验证原密码
export const verifyPwd = params => ajax({ url: '/user/verifyPwd', type: 'post', params })

//- 邮箱绑定
export const setAccMail = params => ajax({ url: '/user/setAccMail', type: 'post', params })

//- 获取验证码
export const sendMobCode = params => ajax({ url: '/user/sendMobCode', type: 'post', params })

//- 绑定手机号码
export const vfyMobCode = params => ajax({ url: '/user/vfyMobCode', type: 'post', params })

//- 申请全民代理
export const applyMbrAgent = () => ajax({ url: '/mbrRebateAgent/applyMbrAgent' })

//- 全民代理会员数据
export const qryRebateInfo = params => ajax({ url: '/mbrRebateAgent/qryRebateInfo', params })

//- 忘记密码手机找回获取验证码
export const getforgetpsw = params => ajax({ url: '/retrvpwd/retrvwayEx', params })

//- 忘记密码手机找回校验验证码
export const getValidCode = params => ajax({ url: '/retrvpwd/validCode', params })

//- 忘记密码手机找回修改密码
export const getModpwd = params => ajax({ url: '/retrvpwd/modpwd', params })

//- 忘记密码验证用户名
export const getUserName = params => ajax({ url: '/retrvpwd/validUser', params, type: 'post' })

// //- 检查是否为常用设备id
// export const checkVfydevice = params => ajax({ url: '/user/vfydevice', params, type: 'post' })

// //- 拉取滑块 来触发 验证接口  第二步
// export const sendSecurityMobCodeTwo = params => ajax({ url: '/user/sendSecurityMobCodeTwo', params, type: 'post' })

// //- 拉取滑块 来触发 验证接口  验证登录   第三步
// export const vfySecurityMobCodeTwo = params => ajax({ url: '/user/vfySecurityMobCodeTwo', params, type: 'post' })

//- 判断登录注册之前是否需要滑块验证
export const isNeedSliderCheck = params => ajax({ url: '/user/vfyRegisteAndLogin', params, type: 'post' })
