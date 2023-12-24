import ajax from '../../http.js'

export default {
  //- 限额
  withdrawalCond: (): Promise<BankAPI.withdrawalCondRes> => ajax({ url: '/user/withdrawalCond' }),

  //- 人名币银行卡取款
  withdrawal: (params: BankAPI.withdrawalParams): Promise<BankAPI.withdrawalRes> => ajax({ url: '/user/withdrawal', params, method: 'post' }),

  //- 获取稽核是否通过
  isWithdrawal: (): Promise<BankAPI.isWithdrawalRes> => ajax({ url: '/user/isWithdrawal' }),

  //- 返回最近未完成paybus提款信息
  // getLastC2CWithdrawal: params => ajax({ url: '/user/getLastC2CWithdrawal', params }),

  //- 获取省
  getProvs: (): Promise<BankAPI.provsRes> => ajax({ url: '/sys/provs' }),

  //- 获取市
  getCitys: (params: BankAPI.cityParams): Promise<BankAPI.CityRes> => ajax({ url: '/sys/citys', params }),

  //- 短信验证-发送验证码
  sendSecurityMobCode: (params: BankAPI.sendSecurityMobCodeParams): Promise<BankAPI.sendSecurityMobCodeRes> => ajax({ url: '/user/sendSecurityMobCode', params, method: 'post' }),

  //- 短信验证码验证
  vfySecurityMobCode: (params: BankAPI.vfySecurityMobCodeParams): Promise<BankAPI.sendSecurityMobCodeRes> => ajax({ url: '/user/vfySecurityMobCode', params, method: 'post' }),

  //- 获取电子钱包列表
  eMoneys: (params: BankAPI.EMoneysParams): Promise<BankAPI.EMoneyRes> => ajax({ url: '/sys/eMoneys', params }),
  //-添加银行卡
  // address: "上海哦支行"
  // bankName: "中国农业银行"
  // cardNo: "3214582948578939"
  // city: "上海市"
  // province: "上海市"
  saveBankCard: (params: BankAPI.saveBankCardParams): Promise<BankAPI.sendSecurityMobCodeRes> => ajax({ url: '/user/saveBankCard', params, method: 'post' }),

  //-解绑银行卡
  unbindCardList: (params: BankAPI.unbindCardListParams): Promise<BankAPI.sendSecurityMobCodeRes> => ajax({ url: '/user/unbindCardList', params }),

  //-解绑虚拟币
  unbindWalletList: (params: BankAPI.unbindWalletListParams): Promise<BankAPI.unbindWalletListRes> => ajax({ url: '/user/unbindWalletList', params }),

  //-新增加密钱包
  saveCryptoCurrencies: (params: BankAPI.saveCryptoCurrenciesRes): Promise<BankAPI.saveAlipayAccountRes> => ajax({ url: '/user/saveCryptoCurrencies', params, method: 'post' }),

  //-获取银行卡列表·
  // getBankListData: params => ajax({ url: '/user/bankCardList', params, method: 'post' }),

  //- 会员查询加密钱包列表
  getCryptoList: (): Promise<BankAPI.cryptoCurrenciesListRes> => ajax({ url: '/user/cryptoCurrenciesList' }),

  //- 会员查询电子包列表
  getEMoneyList: (): Promise<BankAPI.eMoneyListRes> => ajax({ url: '/user/eMoneyList', method: 'post' }),

  //- 会员查询数字人民币列表
  getEcnyList: (): Promise<BankAPI.ECNYListRes> => ajax({ url: '/user/ECNYList', method: 'post' }),

  //- 会员查询银行卡列表
  getBankCardList: (): Promise<BankAPI.bankCardListRes> => ajax({ url: '/user/bankCardList', method: 'post' }),
  //- 获取其他钱包列表接口：
  getOtherPayAccountList: (): Promise<BankAPI.otherPayAccountListRes> => ajax({ url: '/user/otherPayAccountList', method: 'post' }),

  //- 各个平台钱包余额获取
  getBalanceData: (params: BankAPI.depotBalanceParams): Promise<BankAPI.depotBalanceRes> => ajax({ url: '/depotWallet/depotBalance', params }),

  //- 获取银行卡列表
  getBackEndBankList: (params: BankAPI.BanksRes): Promise<BankAPI.banksRes> => ajax({ url: '/sys/banks', params }),

  //- 获取支付宝列表
  getZfbList: (): Promise<BankAPI.ailpayAccountListRes> => ajax({ url: '/user/ailpayAccountList', method: 'post', }),
  //- 新增支付宝钱包
  saveAlipayAccount: (params: BankAPI.saveAlipayAccountParams): Promise<BankAPI.saveAlipayAccountRes> => ajax({ url: '/user/saveAlipayAccount', method: 'post', params }),

  // 绑定其他钱包接口：
  saveOtherPayAccount: (params: BankAPI.saveOtherPayAccountParams): Promise<BankAPI.saveAlipayAccountRes> => ajax({ url: '/user/saveOtherPayAccount', params, method: 'post' }),

  //- 新增数字人民币钱包
  saveEcnyAccount: (params: BankAPI.saveAlipayAccountParams): Promise<BankAPI.saveAlipayAccountRes> => ajax({ url: '/user/saveECNYAccount', method: 'post', params }),
  //- 新增电子钱包
  saveEMoneyAccount: (params: BankAPI.saveEMoneyAccountParams): Promise<BankAPI.saveAlipayAccountRes> => ajax({ url: '/user/saveEMoneyAccount', method: 'post', params }),

}
