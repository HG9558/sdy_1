declare namespace VipAPI {
  type BirthdayBonusList = {
    actLevelId: number;
    validbetMin: number;
    depositMin: number;
    donateAmount: number;
    multipleWater: number;
    depositAmount?: any;
    validBet?: any;
    accountLevel: number;
    tierName: string;
  }

  type UpgradeBonusLevelDto = {
    actLevelId: number;
    donateAmount: number;
    multipleWater: number;
    accountLevel: number;
    tierName: string;
  }

  type RuleScopeDtoList = {
    actLevelId: number;
    depositAmountType: number;
    depositMin: number;
    lastDepositMin: number;
    lastDepositMinTimes: number;
    validBetType: number;
    validBetMin: number;
    lastValidBetMin: number;
    donateAmount: number;
    multipleWater: number;
    accountLevel: number;
    tierName: string;
  }

  type MonthlyBonu = {
    scope: number;
    ruleScopeDtoList: RuleScopeDtoList[];
  }

  type ActivityLevelList = {
    id: number;
    accountLevel: number;
    tierName: string;
    promoteSign: number;
    validbetMin: number;
    depositMin: number;
    downgradeBet?: any;
    feeAvailable: number;
    withDrawalTimes: number;
    withDrawalQuota: number;
  }

  type ActivityLevelCatDto = {
    accountLevelId: number;
    tierName: string;
    catName: string;
    donateRatio: number;
  }

  type vipInfoData = {
    loginName: string;
    birthday: string;
    tierName: string;
    accountLevel: number;
    depositAmount: number;
    validbet: number;
    downgradePromotion: number;
    downgradePromotionDay: number;
    birthdayBonusList: BirthdayBonusList[];
    upgradeBonusLevelDtos: UpgradeBonusLevelDto[];
    monthlyBonus: MonthlyBonu;
    activityLevelList: ActivityLevelList[];
    activityLevelCatDtos: ActivityLevelCatDto[];
    hlzs: string;
    hdgz?: any;
  }

  type vipInfoRes = {
    msg: string;
    code: number;
    data: vipInfoData;
  }

  type DepotCatDtoList = {
    catId: number;
    catName: string;
    catCode: string;
    depotId: number;
    depotName: string;
    depotCode: string;
  }

  type accountVipPrivilegesData = {
    id: number;
    catId: number;
    activityName: string;
    useStart: string;
    useEnd: string;
    useState: number;
    isShow: number;
    enablePc: number;
    enableMb: number;
    pcLogoUrl: string;
    pcRemoteFileName: string;
    mbLogoUrl: string;
    mbRemoteFileName: string;
    content: string;
    mbContent?: any;
    createTime: string;
    createUser: string;
    modifyUser: string;
    modifyTime: string;
    available: number;
    sort: number;
    isdel: number;
    labelId: number;
    labelName?: any;
    tmplName: string;
    rulename?: any;
    tmplNameTag: string;
    catName?: any;
    applyNum?: any;
    rule: string;
    tmplCode: string;
    fastDfsUrl?: any;
    ruleId: number;
    actIds?: any;
    buttonShow: number;
    amountMin: number;
    bonusAmountMin: number;
    amountMax: number;
    donateAmount: number;
    validBet: number;
    donateType: number;
    multipleWater: number;
    drawType?: any;
    actCatIdList?: any;
    actTmplIdList?: any;
    useStateList?: any;
    isAudit: number;
    actCatList?: any;
    actTmplId?: any;
    waterStart?: any;
    waterEnd?: any;
    noaudit?: any;
    pass?: any;
    reject?: any;
    isSelfHelp?: any;
    isSelfHelpShow?: any;
    isLimit?: any;
    minAmount?: any;
    depotCatDtoList: DepotCatDtoList[];
    claimedTime?: any;
    actLevelId: number;
    loginName?: any;
    status?: any;
    subCount?: any;
    accountId?: any;
    isAllSubClaime?: any;
    isOnline?: any;
    bonusId?: any;
    canApply?: any;
    canApplyBonus?: any;
    activityAlready?: any;
  }

  type accountVipPrivilegesRes = {
    msg: string;
    code: number;
    data: accountVipPrivilegesData;
  }

  type ActivityRuleDto = {
    amountMin: number;
    donateAmount: number;
    donateAmountMax: number;
    donateType: number;
    multipleWater: number;
  }

  type Depot = {
    depotId: number;
  }

  type AuditCat = {
    catId: number;
    depots: Depot[];
  }

  type ruleScopeDtosType = {
    accountLevel: number;
    actLevelId: number;
    activityRuleDtos: ActivityRuleDto[];
    auditCats: AuditCat[];
    drawNumber: number;
    drawType: number;
    formulaMode: number;
    isBank: boolean;
    isMail: boolean;
    isMobile: boolean;
    isName: boolean;
    tierName: string;
  }

  type accountBirthdayData = {
    isBirthday: boolean;
    activityId?: any;
    donateAmount?: any;
    multipleWater?: any;
  }

  type accountBirthdayRes = {
    msg: string;
    code: number;
    data: accountBirthdayData;
  }
  type actApplyParams = {
    activityId: number;
    catId?: string;
  }
  type actApplyRes = {
    code: number;
    data: number;
    msg: string;
  }

  type VipMapType = {
    title: string;
    isShow: boolean;
    list: ActivityLevelCatDto[]
  }

  export interface getGameListWithoutRebateDataGameList {
    id?: any;
    catId?: any;
    subCatId?: any;
    depotId?: any;
    gameCode?: any;
    mbGameCode?: any;
    adGameCode?: any;
    downGameCode?: any;
    gameName: string;
    gameTag?: any;
    gameParam?: any;
    mbGameParam?: any;
    available?: any;
    logo?: any;
    enablePc?: any;
    enableMb?: any;
    enableTest?: any;
    enableApp?: any;
    enableHot?: any;
    ebableNew?: any;
    enablePool?: any;
    memo?: any;
    createUser?: any;
    createTime?: any;
    modifyUser?: any;
    modifyTime?: any;
    compensateNum?: any;
    gameNameEn?: any;
    gameId?: any;
    url?: any;
    pcUrlTag?: any;
    htmlTag?: any;
    recRating?: any;
    poolCat?: any;
    poolParam?: any;
    topLink?: any;
    sortId?: any;
    clickNum?: any;
    goodNum?: any;
    monthPer?: any;
    lastdayPer?: any;
    tableCode?: any;
    catName?: any;
    depotName: string;
    gameCount?: any;
    enableGmaePc?: any;
    enableGmaeMb?: any;
    enableGmaeApp?: any;
    depotIds?: any;
    popularityGame?: any;
    memoGmae?: any;
    enablePcTem?: any;
    enableMbTem?: any;
    enableAppTem?: any;
    terminal?: any;
    isTry?: any;
    validBetType?: any;
    orientation?: any;
    waterrate?: any;
    strWaterrate?: any;
    subCatName?: any;
    tmonthPer?: any;
    tlastDayPer?: any;
  }

  export interface getGameListWithoutRebateData {
    depotName: string;
    gameList: getGameListWithoutRebateDataGameList[];
  }
  export interface getGameListWithoutRebateRes {
    msg: string;
    code: number;
    data: getGameListWithoutRebateData[];
  }
}