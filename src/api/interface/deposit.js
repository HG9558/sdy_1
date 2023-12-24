import ajax from '../http.js'

//- 投注平台数据
//- 获取投注记录平台
export const getBettingRecordList = ({ terminal }) => ajax({ url: `/sys/siteCatList?url=${terminal}` })

//- 获取投注记录平台数据列表
export const getBettingRecordDataList = ({ pageSize, pageNo, gameCatId, betStrTime, betEndTime }) => ajax({ url: `/user/BetDetailList?&pageSize=${pageSize}&pageNo=${pageNo}&gameCatId=${gameCatId}&betStrTime=${betStrTime}&betEndTime=${betEndTime}` })
// //- 投注记录平台原生体育（）提前结算
export const orderPreSettle = (params) => ajax({ url: '/splive/panda/XM/orderPreSettle', type: 'post', params })

//- 投注记录平台沙巴原生体育（）提前结算顺序排列1->2->3
// 1, getCashoutPrice
export const getCashoutPrice = (params) => ajax({ url: '/splive/sbod/sbod/getCashoutPrice', type: 'post', params })
// 2, sellBack
export const sellBack = (params) => ajax({ url: '/splive/sbod/sbod/sellBack', type: 'post', params })
// 3, checkSellingStatus
export const checkSellingStatus = (params) => ajax({ url: '/splive/sbod/sbod/checkSellingStatus', type: 'post', params })

//- 交易平台数据
//- 获取交易记录平台存款数据列表
export const getTransactionDataList = ({ pageSize, pageNo, mark, startTime, entTime }) => ajax({ url: `/OnlinePay/pzPay/getFundDepositList?&pageSize=${pageSize}&pageNo=${pageNo}&mark=${mark}&createTimeFrom=${startTime}&createTimeTo=${entTime}` })

//- 获取投注记录提款数据列表
export const getwdAppRecordList = ({ pageSize, pageNo, startTime, entTime }) => ajax({ url: `/user/wdApplyList?&pageSize=${pageSize}&pageNo=${pageNo}&startTime=${startTime}&entTime=${entTime}` })

//- 获取投注记录优惠数据列表
export const getBonusListList = ({ pageSize, pageNo, startTime, entTime }) => ajax({ url: `/user/bonusAndTaskList?&pageSize=${pageSize}&pageNo=${pageNo}&startTime=${startTime}&entTime=${entTime}` })

//- 获取投注记录返水数据列表
export const getdepotWaterDetailList = ({ pageSize, pageNo, startTime, entTime }) => ajax({ url: `/user/depotWaterDetailList?&pageSize=${pageSize}&pageNo=${pageNo}&startTime=${startTime}&entTime=${entTime}` })

//- 获取投注记录返利列表
export const rewardList = (params) => ajax({ url: '/friendRebate/rewardList', params })
//- 提交催单
export const cuiDanWithdraw = (orderId) => ajax({ url: `/user/cuiDanWithdraw?&orderId=${orderId}` })
// 申请取消提款
export const withdrawalCancel = ( params ) => ajax({ url: `/user/withdrawalCancel`, params, type: 'post' })
/***
 * @加密货币
 */
//- 催单
export const getRemind = params => ajax({ url: '/OfflinePay/memberReminder', params })

//- 获取参考汇率
export const getExchangeRate = params => ajax({ url: '/OfflinePay/getExchangeRate', params })

//- 获取取款参考汇率
export const getUserExchangeRate = params => ajax({ url: '/user/getExchangeRate', params })

//- 加密货币入款列表
export const getCrList = params => ajax({ url: '/OfflinePay/crList', params })

//- 获取数字货币钱包/平台logo
export const getCrLogo = params => ajax({ url: '/OfflinePay/getCrLogo', params })

//- 加密货币支付提单
export const applyCrPay = params => ajax({ url: '/OfflinePay/applyCrPay', params, type: 'post' })

/***
 * @人名币
 */

//- 银行卡1
export const getBankList = params => ajax({ url: '/OfflinePay/bankList', params })

//- 银行卡2
export const getFastBankList = params => ajax({ url: '/OfflinePay/fastBankList', params })

//- 扫码支付
export const applyQrPay = params => ajax({ url: '/OfflinePay/applyQrPay', params, type: 'post' })

//-获取支付类型相对的支付方式及图片路径
export const getPzpayPictureUrl = params => ajax({ url: '/OnlinePay/pzPay/getPzpayPictureUrl', params })


// EBpay
// 绑定其他钱包接口：
export const saveOtherPayAccount = params => ajax({ url: '/user/saveOtherPayAccount', params, type: 'post' })
// 获取其他钱包列表接口：
export const getOtherPayAccountList = params => ajax({ url: '/user/otherPayAccountList', params, type: 'post' })

//- 存款--线上支付_/api/OnlinePay/pzPay/payUrl
export const getPayUrl = params => ajax({ url: '/OnlinePay/pzPay/payUrl', params })

//- 存款--银行卡_/api/OfflinePay/applyPay
export const getPayUrlBank = params => ajax({ url: '/OfflinePay/applyPay', params, type: 'post' })

//- 检测存款限制 /api/user/depositLockStatus
export const getDepositLockStatus = params => ajax({ url: '/user/depositLockStatus', params })

//- 在线存款接口
export const getJDepositActivityRules = params => ajax({ url: '/OfflinePay/getJDepositActivityRules', params })

//- 是否显示小额支付
export const getLineService = params => ajax({ url: '/user/lineService', params })

//- 小额支付统计点击统计
export const getLineServiceCount = params => ajax({ url: '/user/lineServiceCount', params })

// paybus
//- paybus接口提款确认
export const getWithdrawalConfirm = params => ajax({ url: '/user/withdrawalConfirm', params })

//- paybus提款金额
export const getC2CWithdrawalCharge = params => ajax({ url: '/user/getC2CWithdrawalCharge', params })

//- 上传图片
export const uploadImage = params => ajax({ url: '/user/uploadImage', params, type: 'post' })

//- 上传凭证
export const depositCertUploadConfirm = params => ajax({ url: '/user/depositCertUploadConfirm', params, type: 'post' })

//- 更新充值附言
export const updateDepositPostScript = params => ajax({ url: '/OnlinePay/pzPay/updateDepositPostScript', params })
