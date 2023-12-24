declare namespace DepositType {
  type getCrLogoData = {
    id: number;
    evebNum: number;
    name: string;
    clientShow: number;
    picpcpath: string;
    picMbPath: string;
    orderId?: any;
  }

  type getCrLogoRes = {
    msg: string;
    code: number;
    data: getCrLogoData[];
  }

  type getExchangeRateRes = {
    code: number;
    msg: string;
  }

  type lineServiceRes = {
    code: number;
    data: boolean;
    msg: string;
  }

  type JDepositActivityRule = {
    amountMin: number;
    amountMax: number;
    donateType: number;
    donateAmount: number;
    donateAmountMax: number;
    multipleWater: number;
    paymentType: number;
  }

  type getJDepositActivityRulesRes = {
    msg: string;
    code: number;
    jDepositActivityRules: JDepositActivityRule[];
  }

  type rmPayActivityRulesType = {
    allActiveText: string | undefined;
    textArr: (string | undefined)[]
  }

  type CrList = {
    id: number;
    available?: any;
    name?: string;
    showName: string;
    feeTop?: any;
    feeScale?: any;
    feeFixed?: any;
    feeWay?: any;
    dayMaxAmout?: any;
    merNo?: any;
    password?: any;
    createUser?: any;
    createTime?: any;
    modifyUser?: any;
    modifyTime?: any;
    depositAmount?: any;
    isDelete?: any;
    minAmout: number;
    maxAmout?: any;
    isHot: boolean;
    isRecommend: boolean;
    groupList?: any;
    groupId?: any;
    groupIds?: any;
    bankIds?: any;
    sortItem?: any;
    sort?: any;
    sortBy?: any;
    devSource?: any;
    isQueue: number;
    bankList?: any;
    selected?: any;
    urlMethod: number;
    crName: string;
    bankCode?: any;
    category: string;
    bankCardId?: any;
    bankLog: string;
    backBankImg: string;
    currencyCode?: any;
    currencyProtocol?: any;
    bankLogo?: any;
    icoUrl?: string;
    label?: string;
    limitLabel?: string;
  }

  type crListRes = {
    msg: string;
    code: number;
    crList: CrList[] | null;
  }

  type applyCrPayParams = {
    depositId: number;
    exchangeRate: string;
    fee: number;
  }

  type applyCrPayInfo = {
    orderNo?: any;
    walletAddress: string;
    createTime: string;
    depositAmount: number;
    depositAmountCNY: number;
    qrCode: string;
  }

  type applyCrPayRes = {
    msg: string;
    code: number;
    info?: applyCrPayInfo;
    onlineInfo?: any
  }

  type QqList = {
    name?: string;
    onlinePayId?: number;
    amountType?: number;
    minAmout?: number;
    maxAmout?: number;
    fixedAmount?: any;
    showName?: string;
    alipayFlg?: number;
    ewmLogo?: string;
    bankLogo?: string;
    disableLogo?: string;
    urlMethod?: number;
    payData?: any;
    paymentType?: number;
    payId?: number;
    id?: number;
    dayMaxAmout?: number;
    depositAmount?: number;
    depositName?: any;
    isQueue?: number;
    isHot?: boolean;
    isRecommend?: boolean;
    isJump?: number;
    certType?: any;
    onlinePayId?: number;
    payType?: string;
  }

  type BankTransferList = {
    alipayFlg?: number;
    name?: string;
    onlinePayId?: number;
    id?: number;
    amountType?: number;
    minAmout?: number;
    maxAmout?: number;
    fixedAmount?: any;
    showName?: string;
    ewmLogo?: any;
    bankLogo?: any;
    disableLogo?: any;
    depositName?: string;
    urlMethod?: number;
    payData?: any;
    paymentType?: number;
    bankLog?: string;
    payId?: number;
    dayMaxAmout?: number;
    depositAmount?: number;
    isQueue?: number;
    isHot?: boolean;
    isRecommend?: boolean;
    logoUrl?: string;
    isJump?: number;
    certType?: any;
    payType?: string;
  }

  type EbpayList = {
    name?: string;
    onlinePayId?: number;
    amountType?: number;
    minAmout?: number;
    maxAmout?: number;
    fixedAmount?: any;
    showName?: string;
    ewmLogo?: string;
    bankLogo?: string;
    disableLogo?: string;
    urlMethod?: number;
    payData?: any;
    paymentType?: number;
    payId?: number;
    dayMaxAmout?: number;
    depositAmount?: number;
    isQueue?: number;
    isHot?: boolean;
    isRecommend?: boolean;
    isJump?: number;
    certType?: any;
  }

  type EcnyPayList = {
    name?: string;
    onlinePayId?: number;
    amountType?: number;
    minAmout?: number;
    maxAmout?: number;
    fixedAmount?: any;
    showName?: string;
    ewmLogo?: any;
    bankLogo?: any;
    disableLogo?: any;
    urlMethod?: number;
    payData?: any;
    paymentType?: number;
    payId?: number;
    dayMaxAmout?: number;
    depositAmount?: number;
    isQueue?: number;
    isHot?: boolean;
    isRecommend?: boolean;
    isJump?: number;
    certType?: any;
  }

  type WeChatList = {
    name: string;
    onlinePayId: number;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount?: any;
    showName: string;
    ewmLogo: string;
    bankLogo: string;
    disableLogo: string;
    urlMethod: number;
    payData?: any;
    paymentType?: number;
    payId: number;
    dayMaxAmout: number;
    depositAmount: number;
    isQueue: number;
    logoUrl?: any;
    isHot: boolean;
    isRecommend: boolean;
    isJump: number;
    certType?: any;
  }

  type AlipayList = {
    name: string;
    onlinePayId: number;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount: string;
    showName: string;
    ewmLogo: string;
    bankLogo: string;
    disableLogo: string;
    urlMethod: number;
    payData?: any;
    depositName?: any;
    paymentType: number;
    payId: number;
    dayMaxAmout: number;
    depositAmount: number;
    isQueue: number;
    logoUrl?: any;
    isHot: boolean;
    isRecommend: boolean;
    isJump: number;
    certType?: any;
  }

  type WyList = {
    name: string;
    onlinePayId: number;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount?: any;
    showName: string;
    ewmLogo: string;
    bankLogo: string;
    disableLogo: string;
    urlMethod: number;
    payData: any[];
    paymentType: number;
    payId: number;
    dayMaxAmout: number;
    depositAmount: number;
    isQueue: number;
    logoUrl?: any;
    isHot: boolean;
    isRecommend: boolean;
    isJump: number;
    certType?: any;
  }

  type QrCodeList = {
    id: number;
    available?: any;
    name?: string;
    showName?: any;
    feeTop?: any;
    feeScale?: any;
    feeFixed?: any;
    feeWay?: any;
    dayMaxAmout?: any;
    qrImgFileName?: any;
    qrImgUrl?: any;
    createUser?: any;
    createTime?: any;
    modifyUser?: any;
    modifyTime?: any;
    depositAmount?: any;
    isDelete?: any;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount?: any;
    isHot: boolean;
    isRecommend: boolean;
    groupList?: any;
    bankIds?: any;
    sort?: any;
    devSource?: any;
    groupId?: any;
    sortBy?: any;
    groupIds?: any;
    paymentType?: string;
    isQueue: number;
    bankList?: any;
    selected?: any;
    depositName?: string;
    bankNamesStr?: string;
    urlMethod: number;
    ewmLogo: string;
    bankLogo: string;
    disableLogo: string;
    sortItem?: any;
    payType: string;
  }

  type EeziePayPayList = {
    name: string;
    onlinePayId: number;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount?: any;
    showName: string;
    ewmLogo?: any;
    bankLogo: string;
    disableLogo?: any;
    urlMethod: number;
    depositName: ?string;
    payData?: any;
    paymentType?: number;
    payId: number;
    dayMaxAmout: number;
    depositAmount: number;
    isQueue: number;
    logoUrl: string;
    isHot: boolean;
    isRecommend: boolean;
    isJump: number;
    certType?: any;
    id?: any;
    payType?: any;
  }

  type OtherWalletPayList = {
    name: string;
    onlinePayId: number;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount?: any;
    showName?: any;
    ewmLogo?: any;
    bankLogo?: any;
    disableLogo?: any;
    urlMethod: number;
    payData?: any;
    paymentType: number;
    payId: number;
    dayMaxAmout: number;
    depositAmount: number;
    isQueue: number;
    logoUrl?: any;
    isHot: boolean;
    isRecommend: boolean;
    isJump: number;
    certType?: any;
  }

  type TopayList = {
    name: string;
    onlinePayId: number;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount?: any;
    showName: string;
    ewmLogo: string;
    bankLogo: string;
    disableLogo: string;
    urlMethod: number;
    payData?: any;
    paymentType: number;
    payId: number;
    dayMaxAmout: number;
    depositAmount: number;
    isQueue: number;
    logoUrl?: any;
    isHot: boolean;
    isRecommend: boolean;
    isJump: number;
    certType?: any;
  }

  type EmoneyPayList = {
    name: string;
    onlinePayId: number;
    amountType: number;
    minAmout: number;
    maxAmout: number;
    fixedAmount: null | number;
    showName: string;
    ewmLogo: null | string;
    bankLogo: string;
    disableLogo: null | string;
    urlMethod: number;
    payData: null | string;
    paymentType: number;
    payId: number;
    dayMaxAmout: number;
    depositAmount: number;
    isQueue: number;
    logoUrl: string;
    isHot: boolean;
    isRecommend: boolean;
    isJump: number;
    certType: null | string;
  }

  type Re = {
    qqList?: QqList[];
    weChatList?: WeChatList[];
    jdList?: any;
    alipayList?: AlipayList[];
    wyList?: WyList[];
    bankList?: any;
    qrCodeList?: QrCodeList[];
    crList?: any;
    bankTransferList?: any;
    aggregationPayList?: any;
    jscPayList?: any;
    otherPayList?: any;
    ebpayList?: EbpayList[];
    topayList?: TopayList[];
    gopayList?: TopayList[];
    otherWalletPayList?: OtherWalletPayList[];
    eeziePayPayList?: EeziePayPayList[];
    ecnyPayList?: EcnyPayList[];
    emoneyPayList?: EmoneyPayList[];
  }

  type PayTypeList = {
    id: number;
    name: string;
    code: string;
    isShow: number;
    isHot: number;
    isRecommend: number;
    createUser?: any;
    createTime: string;
    modifyUser: string;
    modifyTime: string;
  }

  type getPzpayPictureUrlRes = {
    msg: string;
    res: Re;
    payTypeList: PayTypeList[] | null;
    code: number;
  }

  type BankCard = {
    id?: number;
    available?: number;
    bankAccount?: string;
    realName?: string;
    bankName?: string;
    bankId?: number;
    bankBranch?: string;
    province?: any;
    amountType?: any;
    alipayFlg?: number;
    paymentType?: any;
    depositName?: any;
    city?: any;
    feeTop?: number;
    feeScale?: number;
    feeFixed?: number;
    feeWay?: number;
    dayMaxAmout?: number;
    dayDepAmt?: any;
    createUser?: string;
    createTime?: string;
    modifyUser?: any;
    onlinePayId?: number;
    modifyTime?: any;
    depositAmount?: number;
    isDelete?: number;
    minAmout?: number;
    maxAmout?: number;
    fixedAmount?: any;
    fastPayId?: any;
    type?: number;
    isShow?: any;
    isHot?: boolean;
    isRecommend?: boolean;
    certType?: number;
    groupList?: any;
    sort?: any;
    devSource?: any;
    bankLog?: string;
    tier?: number;
    sortItem?: any;
    sortBy?: any;
    bankLogo?: any;
    bankCode?: any;
    payUrl?: any;
    password?: any;
    groupIds?: any;
    cid?: any;
    evebBankId?: any;
    category?: any;
    isQueue?: number;
    areaCode?: any;
    payType?: string;
  }

  type bankListData = {
    bankCards: BankCard[];
    bankName: string;
    ewmLogo: string;
    bankLogo: string;
    disableLogo: string;
    maxAmout: number;
    minAmout: number;
    urlMethod?: any;
    showName?: any;
    paymentType?: any;
    alipayFlg?: any;
    amountType: number;
    isHot?: any;
    isRecommend?: any;
    depositName?: any;
    fastDWAmount?: any;
    fastDWPayId?: any;
  }

  type bankListRes = {
    msg: string;
    code: number;
    data: bankListData;
  }

  type fastBankListBankCard = {
    id?: number;
    available?: number;
    bankAccount?: string;
    realName?: string;
    bankName?: string;
    alipayFlg?: number;
    bankId?: number;
    bankBranch?: string;
    province?: any;
    amountType?: any;
    paymentType?: any;
    depositName?: any;
    city?: any;
    feeTop?: any;
    feeScale?: any;
    feeFixed?: any;
    feeWay?: any;
    dayMaxAmout?: number;
    dayDepAmt?: any;
    createUser?: string;
    createTime?: string;
    modifyUser?: string;
    modifyTime?: string;
    depositAmount?: number;
    isDelete?: number;
    minAmout?: number;
    maxAmout?: number;
    fixedAmount?: any;
    fastPayId?: number;
    type?: number;
    isShow?: number;
    isHot?: boolean;
    isRecommend?: boolean;
    certType?: number;
    groupList?: any;
    sort?: any;
    devSource?: any;
    bankLog?: string;
    tier?: any;
    sortItem?: any;
    sortBy?: any;
    bankLogo?: any;
    bankCode?: string;
    payUrl?: any;
    password?: any;
    groupIds?: any;
    onlinePayId?: number;
    cid?: any;
    evebBankId?: any;
    category?: any;
    isQueue?: any;
    areaCode?: any;
    payType?: string;
    name?: any;
    showName?: any;
    ewmLogo?: any;
    disableLogo?: any;
    urlMethod?: any;
    payData?: any;
    payId?: any;
    logoUrl?: any;
    isJump?: any;
  }

  type CombinedType = EmoneyPayList & fastBankListBankCard;

  type FastBank = {
    bankCards: fastBankListBankCard[];
    bankName: string;
    ewmLogo: string;
    bankLogo: string;
    disableLogo: string;
    maxAmout: number;
    minAmout: number;
    urlMethod?: any;
    showName?: any;
    paymentType: number;
    alipayFlg: string;
    amountType: number;
    isHot: boolean;
    isRecommend: boolean;
    depositName?: number;
    fastDWAmount?: any;
    fastDWPayId?: any;
  }

  type fastBankListRes = {
    msg: string;
    code: number;
    fastBanks: FastBank[];
  }

  type RenderMapType = {
    [key: string]: BankRenderListType[]
  }


  type bankListType = {
    alipayFlg?: number;
    name?: string;
    onlinePayId?: number;
    id?: number;
    amountType?: number;
    minAmout?: number;
    maxAmout?: number;
    fixedAmount?: any;
    showName?: string;
    ewmLogo?: any;
    bankName?: string;
    bankLogo?: any;
    disableLogo?: any;
    depositName?: any;
    urlMethod?: number;
    payData?: any;
    paymentType?: any;
    bankLog?: string;
    payId?: number;
    dayMaxAmout?: number;
    depositAmount?: number;
    isQueue?: number;
    isHot?: boolean;
    isRecommend?: boolean;
    logoUrl?: string;
    isJump?: number;
    certType?: any;
    payType?: string;
    available?: any;
    feeTop?: any;
    feeScale?: any;
    feeFixed?: any;
    feeWay?: any;
    qrImgUrl?: any;
    createUser?: any;
    createTime?: any;
    modifyUser?: any;
    modifyTime?: any;
    isDelete?: any;
    groupList?: any;
    bankIds?: any;
    sort?: any;
    devSource?: any;
    groupId?: any;
    sortBy?: any;
    groupIds?: any;
    bankList?: any;
    selected?: any;
    bankNamesStr?: string;
    sortItem?: any;
  }

  type BankRenderListType = {
    label: string;
    children: bankListType[];
    imageUrl: string;
    isShow?: number;
    isHot?: number;
    isRecommend?: number;
    code?: string;
  }
  type depositLockStatusData = {
    id: number;
    accountId: number;
    startDay: string;
    num: number;
    isUpdateDepositLock: boolean;
    depositLock: number;
    isSuccessDeposit: boolean;
    numRest?: any;
    isReminder: boolean;
  }

  type depositLockStatusRes = {
    msg: string;
    code: number;
    data: depositLockStatusData;
  }

  type applyQrPayParams = {
    depositId: number;
    fee: number;
  }

  type Info = {
    orderNo: string;
    urlMethod: number;
    url: string;
    createTime: string;
    depositPostscript: string;
    depositAmount: number;
    [key: string]: any;
  }

  type applyQrPayRes = {
    msg: string;
    code: number;
    info: Info;
  }

  type applyPayParams = {
    depositId: number;
    fee: number;
    terminal: number;
    userName: string;
  }
  type applyPayBankInfo = {
    bankName: string;
    bankAccount: string;
    realName: string;
    bankBranch: string;
    depositAmount: number;
    depositPostscript: string;
    urlMethod: number;
    url?: any;
    depositorsName?: any;
    depositUserAcc?: any;
    succeed: boolean;
    error?: any;
    orderNo?: any;
    sign?: any;
    receiveUserName?: any;
    receiveCardNum?: any;
    orderId?: any;
    [key: string]: any;
  }

  type applyPayBankRes = {
    msg: string;
    code: number;
    info: applyPayBankInfo;
  }

  type payUrlParams = {
    terminal: number;
    userName: string;
    fee: number;
    onlinePayId: number;
  }

  type payUrlRe = {
    urlMethod: number;
    url: string;
    status: boolean;
    errMsg?: any;
  }

  type payUrlRes = {
    msg: string;
    res: payUrlRe | null;
    code: number;
  }

  type getBettingRecordListParams = {
    url: number;
  }

  type getBettingRecordListResType = {
    msg: string;
    code: number;
    tGmCats: TGmCat[];
  }

  type TGmCat = {
    id?: number | string;
    catCode?: any;
    catName: string;
    sortId?: any;
    available?: any;
    memo?: any;
    createUser?: any;
    createTime?: any;
    modifyUser?: any;
    modifyTime?: any;
    parentId?: any;
    treeId?: any;
    catMbShowLogo?: string;
    catMbDefaultLogo?: string;
    catTemplateName?: string;
    enablePc?: any;
    enableMb?: any;
    enableApp?: any;
    gameCount?: any;
    tmonthPer?: any;
    tlastdayPer?: any;
  }

  type getBettingRecordDataListParams = {
    pageSize: number;
    pageNo: number;
    gameCatId: number | string;
    betStrTime: string;
    betEndTime: string;
  }

  type getBettingRecordDataListResType = {
    msg: string;
    total: BettingRecordDataListTotal;
    code: number;
    page: BettingRecordDataListPage;
  }

  type BettingRecordDataListTotal = {
    bet: string;
    jackpotPayout: number;
    betCount: number;
    counts: number;
    payout: string;
    validBet: string;
    jackpotBet: number;
    [key: string]: any;
  }

  type BettingRecordDataListPage = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: any[];
    pageTotalCount: number;
  }

  type requestApiListParams = {
    pageSize: number;
    pageNo: number;
    startTime: string;
    entTime: string;
    mark?: number;
  }

  type depotWaterDetailListRes = {
    msg: string;
    code: number;
    data: {
      totalCount: number;
      pageSize: number;
      totalPage: number;
      currPage: number;
      list: any[]; // 这里假定 list 中的元素是任意类型的数组
      pageTotalCount: number;
    }
  }

  type requestApiListDataList = {
    id: number;
    accountId: number;
    companyPayId?: any;
    onlinePayId?: any;
    qrCodeId?: any;
    crId?: any;
    hash?: any;
    mark: number;
    status: number;
    isPayment: boolean;
    depositAmount: number;
    depositAmountCr?: any;
    depositUser: string;
    handlingCharge: number;
    actualArrival: number;
    auditUser: string;
    auditTime: string;
    ip: string;
    activityId?: any;
    memo: string;
    createUser: string;
    createTime: string;
    modifyUser: string;
    modifyTime: string;
    exchangeRate?: any;
    orderNo: string;
    orderPrefix: string;
    billDetailId?: any;
    depositPostscript: string;
    handingback?: any;
    fundSource?: any;
    feeType?: any;
    payOrderNo?: any;
    verifyCode?: any;
    spreadCode?: any;
    payUrl?: any;
    discountAmount?: any;
    modifyTimeEnd?: any;
    loginName?: any;
    groupName?: any;
    agyAccount?: any;
    agyAccountStr?: any;
    isTest?: any;
    agyTopAccountId?: any;
    agyAccountId?: any;
    depositId?: any;
    createTimeFrom?: any;
    createTimeTo?: any;
    groupId?: any;
    depositCount?: any;
    onlinePayName?: any;
    depositType?: any;
    isDrawings?: any;
    realName?: any;
    isSign: number;
    statusStr?: any;
    auditTimeFrom?: any;
    auditTimeTo?: any;
    auditTimeFromStr?: any;
    auditTimeToStr?: any;
    loginSysUserName?: any;
    agyTopAccountIds?: any;
    accountIds?: any;
    companyPayIds?: any;
    agyAccountIds?: any;
    crIds?: any;
    groupIds?: any;
    depositTypes?: any;
    statuss?: any;
    onlinePayIds?: any;
    fundSourceList?: any;
    platfromName?: any;
    markStr?: any;
    orderNoStr?: any;
    payType?: any;
    depositTypeName: string;
    tagencyId?: any;
    isActivityPass?: any;
    todayDeposit?: any;
    qrCodePayIds?: any;
    currencyCode?: any;
    currencyCodes?: any;
    currencyProtocol?: any;
    currencyProtocols?: any;
    depositUserAcc?: any;
    auditAddType?: any;
    startAuditTime?: any;
    endAuditTime?: any;
    tierName?: any;
    fastDeposit?: any;
    fastDepositPicture?: any;
    orderBy?: any;
    minDepositAmount?: any;
    maxDepositAmount?: any;
    cerCreatetime?: string;
    depositPictures?: string;
  }

  type requestApiListRe = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: requestApiListDataList[];
    pageTotalCount: number;
  }

  type requestApiListRes = {
    msg: string;
    res: requestApiListRe;
    code: number;
    totalCount: number;
  }

  type cuiDanWithdrawRes = {
    msg: string;
    code: number;
  }

  type wdApplyListResList = {
    id: number;
    orderNo: string;
    orderPrefix: string;
    accountId: number;
    status: number;
    type?: any;
    drawingAmount: number;
    handlingCharge: number;
    cutAmount: number;
    discountAmount: number;
    actualArrival: number;
    actualArrivalCr?: any;
    exchangeRate?: any;
    auditUser?: any;
    auditTime?: any;
    passUser?: any;
    passTime?: any;
    ip?: any;
    memo?: any;
    createUser?: any;
    createTime: string;
    modifyUser?: any;
    modifyTime?: any;
    billDetailId?: any;
    withdrawSource?: any;
    feeType?: any;
    memoWithdraw?: any;
    bankCardId?: any;
    cryptoCurrenciesId?: any;
    methodType: number;
    lockStatus?: any;
    lockOperator?: any;
    lastLockTime?: any;
    cuiCount: number;
    isCurrentUserLock?: any;
    hash?: any;
    changeMemo?: any;
    source?: any;
    isExempt?: any;
    exemptUser?: any;
    exemptTime?: any;
    exemptMemo?: any;
    relatedOrderno?: any;
    fundMerchantPayId?: any;
    isConfirm?: any;
    confirmTime?: any;
    modifyTimeEnd?: any;
    realName?: any;
    groupId?: any;
    groupName?: any;
    loginName?: any;
    tierName?: any;
    agyAccount?: any;
    topAgyAccount?: any;
    agyTopAccountId?: any;
    agyAccountId?: any;
    createTimeFrom?: any;
    createTimeTo?: any;
    mbrBankcard?: any;
    withdrawCount?: any;
    loginSysUserName?: any;
    bankName?: any;
    address?: any;
    notStatus?: any;
    baseAuth?: any;
    merchantId?: any;
    transId?: any;
    orderId?: any;
    merchantDetailId?: any;
    topAgyAccounts?: any;
    agyAccountIds?: any;
    groupIds?: any;
    statuss?: any;
    withdrawSourceList?: any;
    tagencyId?: any;
    statusStr?: any;
    typeStr?: any;
    methodTypeStr?: any;
    todayWithdraw?: any;
    walletName?: any;
    walletAddress?: any;
    currencyCode?: any;
    currencyProtocol?: any;
    depositAmount?: any;
    auditAmount?: any;
    inMailType?: any;
    startPassTime?: any;
    endPassTime?: any;
    canChangeStatus?: any;
    siteCode?: any;
    verifyCode?: any;
    orderBy?: any;
    minDrawingAmount?: any;
    maxDrawingAmount?: any;
    cardNo: string;
  }

  type wdApplyListPage = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: wdApplyListResList[];
    pageTotalCount: number;
  }

  type wdApplyListRes = {
    msg: string;
    code: number;
    page: wdApplyListPage;
    totalActuals: number;
    time: number;
  }

  type fatBankParams = {
    areaCode?: string
  }

  type withdrawalCancelParams = {
    id: number;
    status: number;
  }
  type withdrawalCancelRes = {
    code: number;
    msg: string;
  }
}