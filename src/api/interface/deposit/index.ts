import ajax from '../../http.js'

export default {
  //- 投注平台数据
  //- 获取投注记录平台
  getBettingRecordList: (terminal: DepositType.getBettingRecordListParams): Promise<DepositType.getBettingRecordListResType> => ajax({ url: `/sys/siteCatList?url=${terminal.url}` }),

  //- 获取投注记录平台数据列表
  getBettingRecordDataList: ({ pageSize, pageNo, gameCatId, betStrTime, betEndTime }: DepositType.getBettingRecordDataListParams): Promise<DepositType.getBettingRecordDataListResType> => ajax({ url: `/user/BetDetailList?&pageSize=${pageSize}&pageNo=${pageNo}&gameCatId=${gameCatId}&betStrTime=${betStrTime}&betEndTime=${betEndTime}` }),
  // //- 投注记录平台原生体育（）提前结算
  // orderPreSettle: (params) => ajax({ url: '/splive/panda/XM/orderPreSettle', method: 'post', params }),

  //- 投注记录平台沙巴原生体育（）提前结算顺序排列1->2->3
  // 1, getCashoutPrice
  // getCashoutPrice: (params) => ajax({ url: '/splive/sbod/sbod/getCashoutPrice', method: 'post', params }),
  // 2, sellBack
  // sellBack: (params) => ajax({ url: '/splive/sbod/sbod/sellBack', method: 'post', params }),
  // 3, checkSellingStatus
  // checkSellingStatus: (params) => ajax({ url: '/splive/sbod/sbod/checkSellingStatus', method: 'post', params }),

  //- 交易平台数据
  //- 获取交易记录平台存款数据列表
  getTransactionDataList: ({ pageSize, pageNo, mark, startTime, entTime }: DepositType.requestApiListParams): Promise<DepositType.requestApiListRes> => ajax({ url: `/OnlinePay/pzPay/getFundDepositList?&pageSize=${pageSize}&pageNo=${pageNo}&mark=${mark}&createTimeFrom=${startTime}&createTimeTo=${entTime}` }),

  //- 获取投注记录提款数据列表
  getwdAppRecordList: ({ pageSize, pageNo, startTime, entTime }: DepositType.requestApiListParams): Promise<DepositType.wdApplyListRes> => ajax({ url: `/user/wdApplyList?&pageSize=${pageSize}&pageNo=${pageNo}&startTime=${startTime}&entTime=${entTime}` }),

  //- 获取投注记录优惠数据列表
  getBonusListList: ({ pageSize, pageNo, startTime, entTime }: DepositType.requestApiListParams): Promise<DepositType.wdApplyListRes> => ajax({ url: `/user/bonusAndTaskList?&pageSize=${pageSize}&pageNo=${pageNo}&startTime=${startTime}&entTime=${entTime}` }),

  //- 获取投注记录返水数据列表
  getdepotWaterDetailList: ({ pageSize, pageNo, startTime, entTime }: DepositType.requestApiListParams): Promise<DepositType.depotWaterDetailListRes> => ajax({ url: `/user/depotWaterDetailList?&pageSize=${pageSize}&pageNo=${pageNo}&startTime=${startTime}&entTime=${entTime}` }),

  //- 获取投注记录返利列表
  rewardList: (params: DepositType.requestApiListParams) => ajax({ url: '/friendRebate/rewardList', params }),
  //- 提交催单
  cuiDanWithdraw: (orderId: number): Promise<DepositType.cuiDanWithdrawRes> => ajax({ url: `/user/cuiDanWithdraw?&orderId=${orderId}` }),

  //- 取消存款
  withdrawalCancel: (params: DepositType.withdrawalCancelParams): Promise<DepositType.withdrawalCancelRes> => ajax({ url: `/user/withdrawalCancel`, params, method: 'post' }),
  /***
   * @加密货币
   */
  //- 催单
  getRemind: (): Promise<DepositType.getExchangeRateRes> => ajax({ url: '/OfflinePay/memberReminder' }),

  //- 获取参考汇率
  getExchangeRate: (params?: { crId: number }): Promise<DepositType.getExchangeRateRes> => ajax({ url: '/OfflinePay/getExchangeRate', params }),

  //- 获取取款参考汇率
  getUserExchangeRate: (): Promise<DepositType.getExchangeRateRes> => ajax({ url: '/user/getExchangeRate' }),

  //- 加密货币入款列表
  getCrList: (): Promise<DepositType.crListRes> => ajax({ url: '/OfflinePay/crList' }),

  //- 获取数字货币钱包/平台logo
  getCrLogo: (): Promise<DepositType.getCrLogoRes> => ajax({ url: '/OfflinePay/getCrLogo' }),

  //- 加密货币支付提单
  applyCrPay: (params: DepositType.applyCrPayParams): Promise<DepositType.applyCrPayRes> => ajax({ url: '/OfflinePay/applyCrPay', params, method: 'post' }),

  /***
   * @人名币
   */

  //- 银行卡1
  getBankList: (): Promise<DepositType.bankListRes> => ajax({ url: '/OfflinePay/bankList', config: { noStop: true } }),

  //- 银行卡2
  getFastBankList: (params: DepositType.fatBankParams): Promise<DepositType.fastBankListRes> => ajax({ url: '/OfflinePay/fastBankList', params, config: { noStop: true } }),

  //- 扫码支付
  applyQrPay: (params: DepositType.applyQrPayParams): Promise<DepositType.applyQrPayRes> => ajax({ url: '/OfflinePay/applyQrPay', params, method: 'post', config: { noStop: true } }),

  //-获取支付类型相对的支付方式及图片路径
  getPzpayPictureUrl: (): Promise<DepositType.getPzpayPictureUrlRes> => ajax({ url: '/OnlinePay/pzPay/getPzpayPictureUrl', config: { noStop: true } }),

  //- 存款--线上支付_/api/OnlinePay/pzPay/payUrl
  getPayUrl: (params: DepositType.payUrlParams): Promise<DepositType.payUrlRes> => ajax({ url: '/OnlinePay/pzPay/payUrl', params }),

  //- 存款--银行卡_/api/OfflinePay/applyPay
  getPayUrlBank: (params: DepositType.applyPayParams): Promise<DepositType.applyPayBankRes> => ajax({ url: '/OfflinePay/applyPay', params, method: 'post' }),

  //- 检测存款限制 /api/user/depositLockStatus
  getDepositLockStatus: (): Promise<DepositType.depositLockStatusRes> => ajax({ url: '/user/depositLockStatus' }),

  //- 在线存款接口
  getJDepositActivityRules: (): Promise<DepositType.getJDepositActivityRulesRes> => ajax({ url: '/OfflinePay/getJDepositActivityRules' }),

  //- 是否显示小额支付
  getLineService: (): Promise<DepositType.lineServiceRes> => ajax({ url: '/user/lineService' }),

  //- 小额支付统计点击统计
  getLineServiceCount: (): Promise<DepositType.getExchangeRateRes> => ajax({ url: '/user/lineServiceCount' }),

  // paybus
  //- paybus接口提款确认
  // getWithdrawalConfirm: params => ajax({ url: '/user/withdrawalConfirm', params }),

  //- paybus提款金额
  // getC2CWithdrawalCharge: params => ajax({ url: '/user/getC2CWithdrawalCharge', params }),

}
