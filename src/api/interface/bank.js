import ajax from '../http.js'

//- 限额
export const withdrawalCond = params => ajax({ url: '/user/withdrawalCond', params })

//- 人名币银行卡取款
export const withdrawal = params => ajax({ url: '/user/withdrawal', params, type: 'post' })

//- 获取稽核是否通过
export const isWithdrawal = params => ajax({ url: '/user/isWithdrawal', params })

//- 返回最近未完成paybus提款信息
export const getLastC2CWithdrawal = params => ajax({ url: '/user/getLastC2CWithdrawal', params })

//- 获取省
export const getProvs = () => ajax({ url: '/sys/provs' })

//- 获取市
export const getCitys = params => ajax({ url: '/sys/citys', params })

//- 短信验证-发送验证码
export const sendSecurityMobCode = params => ajax({ url: '/user/sendSecurityMobCode', params, type: 'post' })

//- 短信验证码验证
export const vfySecurityMobCode = params => ajax({ url: '/user/vfySecurityMobCode', params, type: 'post' })

//-添加银行卡
// address: "上海哦支行"
// bankName: "中国农业银行"
// cardNo: "3214582948578939"
// city: "上海市"
// province: "上海市"
export const saveBankCard = params => ajax({ url: '/user/saveBankCard', params, type: 'post' })

//-解绑银行卡
export const unbindCardList = params => ajax({ url: '/user/unbindCardList', params })

//-解绑虚拟币
export const unbindWalletList = params => ajax({ url: '/user/unbindWalletList', params })

//-新增加密钱包
export const saveCryptoCurrencies = params => ajax({ url: '/user/saveCryptoCurrencies', params, type: 'post' })


//-获取银行卡列表·
export const getBankListData = params => ajax({ url: '/user/bankCardList', params, type: 'post' })

//- 会员查询加密钱包列表
export const getCryptoList = () => ajax({ url: '/user/cryptoCurrenciesList' })

//- 会员查询数字人民币列表
export const getEcnyList = () => ajax({ url: '/user/ECNYList' , type: 'post'})

//- 会员查询银行卡列表
export const getBankCardList = params => ajax({ url: '/user/bankCardList', type: 'post', params })

//- 会员查询电子钱包列表
export const getElecList = params => ajax({ url: '/user/eMoneyList', type: 'post', params })

//- 各个平台钱包余额获取
export const getBalanceData = params => ajax({ url: '/depotWallet/depotBalance', params })

//- 获取银行卡列表
export const getBackEndBankList = params => ajax({ url: '/sys/banks', params })

//- 获取电子钱包类型列表
export const getElecTypeList = params => ajax({ url: '/sys/eMoneys', params })

//- 获取支付宝列表
export const getZfbList = () => ajax({ url: '/user/ailpayAccountList', type: 'post', })

//- 新增支付宝钱包
export const saveAlipayAccount = params => ajax({ url: '/user/saveAlipayAccount', type: 'post', params })

//- 新增数字人民币钱包
export const saveEcnyAccount = params => ajax({ url: '/user/saveECNYAccount', type: 'post', params })

//- 新增电子钱包
export const saveElec = params => ajax({ url: '/user/saveEMoneyAccount', params, type: 'post' })
