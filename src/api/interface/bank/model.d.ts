declare namespace BankAPI {
  type BankCard = {
    id: number;
    ids?: any;
    accountId: number;
    bankCardId: number;
    bankName: string;
    cardNo: string;
    province: string;
    city: string;
    address: string;
    realName: string;
    bindTimePhoneNum?: any;
    available: number;
    createTime: string;
    isDel: number;
    geo?: any;
    bankLog: string;
    backBankImg: string;
    isDraw: number;
    loginName?: any;
    bankType?: any;
    areaCode?: any;
    [key: string]: any;
  }

  type bankCardListRes = {
    msg: string;
    bankCards: BankCard[];
    code: number;
    bankDifferentName: number;
  }

  type CryptoCurrency = {
    id: number;
    accountId: number;
    bankCardId: number;
    walletName: string;
    walletAddress: string;
    currencyCode: string;
    currencyProtocol: string;
    available: number;
    createTime: string;
    isDel: number;
    walletId: number;
    ids?: any;
    bankLog: string;
    walletBackImg: string;
    isDraw: number;
    [key: string]: any;
  }

  type eMoneyData = {
    id: number;
    ids?: any;
    accountId: number;
    bankCardId: number;
    bankName: string;
    cardNo: string;
    province?: any;
    city?: any;
    address?: any;
    realName: string;
    bindTimePhoneNum: string;
    available: number;
    createTime: string;
    isDel: number;
    geo?: any;
    bankLog: string;
    backBankImg: string;
    isDraw: number;
    loginName?: any;
    bankType?: any;
    areaCode?: any;
    interfaceType: boolean;
    [key: string]: any;
  }

  type cryptoCurrenciesListRes = {
    msg: string;
    code: number;
    cryptoCurrencies: CryptoCurrency[];
  }

  type eMoneyListRes = {
    msg: string;
    code: number;
    eMoneyList: eMoneyData[];
  }

  type ailpayAccountListBankCard = {
    id: number;
    ids?: any;
    accountId: number;
    bankCardId: number;
    bankName: string;
    cardNo: string;
    province?: any;
    city?: any;
    address?: any;
    realName: string;
    bindTimePhoneNum: string;
    available: number;
    createTime: string;
    isDel: number;
    geo?: any;
    bankLog: string;
    backBankImg: string;
    isDraw: number;
    loginName?: any;
    bankType?: any;
    areaCode?: any;
    [key: string]: any;
  }

  type ailpayAccountListRes = {
    msg: string;
    bankCards: ailpayAccountListBankCard[];
    code: number;
  }

  type depotBalanceData = {
    currency: string;
    balance: number;
    depotId?: any;
  }

  type depotBalanceRes = {
    msg: string;
    code: number;
    data: depotBalanceData;
    depotId: number;
  }

  type depotBalanceParams = {
    depotId: number;
  }

  type gameDataType = {
    [key: string]: API.TGmDepot
  }

  type bankcardDataType = {
    rmb: BankAPI.BankCard[];
    crypto: CryptoCurrency[];
    alipay: ailpayAccountListBankCard[];
    otherpay: ECNYListBankCard[];
    ecny: ECNYListBankCard[];
    ePay: eMoneyData[],
    [key: string]: any;
  }


  type isWithdrawalResData = {
    isPassed: boolean;
    depositValidBet: number;
    alipayEnable: number;
    ecnyPayWithdrawEnable: number;
    payBusPayWithdrawEnable: number;
    ebPayWithdrawEnable: number;
    cnyWithdrawEnable: number;
    fastWithdrawEnable: number;
    completedValidBet: number;
    toPayWithdrawEnable: number;
    goPayWithdrawEnable: number;
    eMoneyPayWithdrawEnable: number;
  }

  type isWithdrawalRes = {
    msg: string;
    code: number;
    data: isWithdrawalResData;
  }

  type Prov = {
    id?: any;
    cityIndex?: any;
    provinceId: number;
    city?: any;
    prov: string;
  }

  type provsRes = {
    msg: string;
    code: number;
    provs: Prov[];
  }

  type cityParams = {
    prov: string;
  }
  type CityData = {
    id: number;
    cityIndex?: any;
    provinceId?: any;
    city: string;
    prov: string;
  }

  type CityRes = {
    msg: string;
    code: number;
    citys: CityData[];
  }
  type BankData = {
    id: number;
    bankName: string;
    bankCode: string;
    bankLog: string;
    backBankImg: string;
    clientType: number;
    category?: any;
    areaCode: string;
    wdenable: number;
  }

  type banksRes = {
    msg: string;
    code: number;
    banks: BankData[];
  }

  type rmbBankFormType = {
    address: string;
    bankName: string;
    cardNo: string;
    city: string;
    province: string;
    code: string;
    captchareg: string;
    realName?: string;
  }

  type ProtocolType = {
    id: string;
    name: string;
  }

  type CrFormType = {
    currencyProtocol: ProtocolType | null;
    walletName: string;
    walletAddress: string;
    checkWalletAddress: string;
    code: string;
    captchareg: string;
  }
  type EcnyBankFormType = {
    cardNo: string;
    code: string;
    captchareg: string;
    realName: string;
  }

  type OtherFormType = {
    address: string | null;
    cardNo: string | null;
    checkCardNo: string;
    mobile: string;
    code: string;
    captchareg: string;
  }

  type EFormType = {
    accountType: string | null;
    realName: string | null;
    mobile: string;
    code: string;
    cardNo: string;
    captchareg: string;
  }

  type EMoneysParams = {
    areaCode: string
  }

  type aliPayFormType = {
    cardNo: string;
    code: string;
    captchareg: string;
    realName?: string;
  }

  type sendSecurityMobCodeParams = {
    captchaVerification: string;
    mobile: string;
  }

  type sendSecurityMobCodeRes = {
    code: number;
    msg: string;
  }

  type vfySecurityMobCodeParams = {
    code: string;
    mobile: string;
  }

  type saveBankCardParams = {
    address: string;
    bankName: string;
    captchareg: string;
    cardNo: string;
    city: string;
    code: string;
    province: string;
    realName: string;
  }

  type unbindCardListParams = {
    bankCardId: string | number;
  }

  type unbindWalletListParams = {
    walletId: number;
  }

  type unbindWalletListRes = {
    code: number;
    msg: string;
    status: number;
  }

  type ECNYListBankCard = {
    id: number;
    ids?: any;
    accountId: number;
    bankCardId: number;
    bankName: string;
    cardNo: string;
    province?: any;
    city?: any;
    address?: any;
    realName: string;
    bindTimePhoneNum: string;
    available: number;
    createTime: string;
    isDel: number;
    geo?: any;
    bankLog: string;
    backBankImg: string;
    isDraw: number;
    loginName?: any;
    bankType?: any;
    areaCode?: any;
    [key: string]: any;
  }

  type ECNYListRes = {
    msg: string;
    bankCards: ECNYListBankCard[];
    code: number;
  }

  type otherPayAccountListRes = {
    msg: string;
    code: number;
    otherPay: ECNYListBankCard[];
  }

  type saveAlipayAccountParams = {
    cardNo: string;
    realName: string;
  }


  type saveEMoneyAccountParams = {
    cardNo: string;
    realName: string;
    bankName: string;
  }


  type saveOtherPayAccountParams = {
    cardNo: string;
    address: string;
  }

  type saveAlipayAccountRes = {
    msg: string;
    code: number;
  }

  type saveCryptoCurrenciesRes = {
    currencyCode: string;
    currencyProtocol: string;
    walletAddress: string;
    walletId: number;
    walletName: string;
  }

  type WithdrawalCondData = {
    id: number;
    groupId: number;
    lowQuota: number;
    topQuota: number;
    lowAlipayQuota: number;
    topAlipayQuota: number;
    lowUsdt: number;
    topUsdt: number;
    chargeFeeAvailable: number;
    feeHours: number;
    feeTimes: number;
    feeTop: number;
    feeScale: number;
    feeFixed: number;
    feeWay: number;
    fastWithdrawFeePercent?: any;
    fastWithdrawFeeAmount?: any;
    feeAvailable?: any;
    withDrawalTimes?: any;
    withDrawalQuota?: any;
    withDrawalAudit: number;
    overFee: number;
    manageFee: number;
    rebateMinimum: number;
    withDrawalTimesMbr: number;
    withDrawalQuotaMbr: number;
    isShowFee?: any;
  }

  type withdrawalCondRes = {
    msg: string;
    withdrawalCond: WithdrawalCondData | null;
    code: number;
  }

  type withdrawalParams = {
    bankCardId?: number;
    methodType?: number;
    drawingAmount: number;
    cryptoCurrenciesId?: number;
    exchangeRate?: number;
    pwd?: any
  }

  export interface WithdrawInfo {
    orderNo: string;
    status: number;
    drawingAmount: number;
    createTime: string;
    cardNo?: any;
    methodType: number;
  }

  export interface withdrawalRes {
    msg: string;
    code: number;
    withdrawInfo: WithdrawInfo;
  }

  type BanksRes = {
    areaCode?: string;
  }

  type EMoney = {
    id: number;
    bankName: string;
    bankCode: string;
    bankLog: string;
    backBankImg: string;
    clientType: number;
    category?: any;
    areaCode: string;
    type: number;
    wdenable: number;
  }

  type EMoneyRes = {
    msg: string;
    eMoneys: EMoney[];
    code: number;
  }
}