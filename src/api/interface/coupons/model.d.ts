declare namespace couponsAPI {
  type ActivityListParams = {
    discount: number;
    pageSize: number;
    pageNo: number;
    buttonShow: number;
  }

  type Data = {
    youhuiBanners: any[];
  }

  type DepotCatDtoList = {
    catId: number;
    catName: string;
    catCode: string;
    depotId: number;
    depotName: string;
    depotCode: string;
  }

  type ActivityDataList = {
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
    labelName: string;
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

  type ActivityListPage = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: ActivityDataList[];
    pageTotalCount: number;
  }

  type ActivityListRes = {
    msg: string;
    code: number;
    data: Data;
    page: ActivityListPage;
  }
  type getMixingParams = {
    activityId: number;
  }
  type getMixingData = {
    id: number;
    catId?: any;
    activityName: string;
    useStart?: any;
    useEnd?: any;
    useState: number;
    isShow?: any;
    enablePc?: any;
    enableMb?: any;
    pcLogoUrl?: any;
    pcRemoteFileName?: any;
    mbLogoUrl?: any;
    mbRemoteFileName?: any;
    content?: any;
    mbContent?: any;
    createTime?: any;
    createUser?: any;
    modifyUser?: any;
    modifyTime?: any;
    available?: any;
    sort?: any;
    isdel?: any;
    labelId?: any;
    labelName?: any;
    tmplName?: any;
    rulename?: any;
    tmplNameTag?: any;
    catName?: any;
    applyNum?: any;
    rule: string;
    tmplCode: string;
    fastDfsUrl?: any;
    ruleId?: any;
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
    isAudit?: any;
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
    depotCatDtoList?: any;
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

  type getMixingResType = {
    msg: string;
    code: number;
    data: getMixingData[];
  }

  type getActivityListTwoParams = {
    discount: number;
    pageSize: number;
    pageNo: number;
    buttonShow: number;
  }
  type DepotCatDtoList = {
    catId: number;
    catName: string;
    catCode: string;
    depotId: number;
    depotName: string;
    depotCode: string;
  }

  type claimedActivitiesList = {
    id: number;
    catId?: any;
    activityName: string;
    useStart: string;
    useEnd: string;
    useState: number;
    isShow: number;
    enablePc: number;
    enableMb: number;
    pcLogoUrl?: any;
    pcRemoteFileName?: any;
    mbLogoUrl?: any;
    mbRemoteFileName?: any;
    content?: any;
    mbContent?: any;
    createTime: string;
    createUser: string;
    modifyUser?: any;
    modifyTime?: any;
    available: number;
    sort: number;
    isdel: number;
    labelId?: any;
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
    buttonShow?: any;
    amountMin: number;
    bonusAmountMin: number;
    amountMax: number;
    donateAmount: number;
    validBet: number;
    donateType?: any;
    multipleWater?: any;
    drawType?: any;
    actCatIdList?: any;
    actTmplIdList?: any;
    useStateList?: any;
    isAudit?: any;
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
    claimedTime: string;
    actLevelId: number;
    loginName?: any;
    status?: any;
    subCount: number;
    accountId: number;
    isAllSubClaime?: any;
    isOnline?: any;
    bonusId: number;
    canApply?: any;
    canApplyBonus?: any;
    activityAlready?: any;
  }

  type claimedActivitiesListData = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: claimedActivitiesList[];
    pageTotalCount: number;
  }

  type getActivityListTwoResType = {
    msg: string;
    code: number;
    data: claimedActivitiesListData;
  }

  type RuleTypeDepot = {
    depotId: number;
  }

  type AuditCat = {
    catId: number;
    depots: RuleTypeDepot[];
  }

  type ActivityRuleDto = {
    amountMax: number;
    amountMin: number;
    donateType: number;
    donateAmount: number;
    multipleWater: number;
    donateAmountMax: number;
  }

  type RuleScopeDto = {
    isApp: boolean;
    isBank: boolean;
    isMail: boolean;
    isName: boolean;
    isMobile: boolean;
    validDate: number;
    actLevelId: number;
    depositType: number;
    activityRuleDtos: ActivityRuleDto[];
  }

  type RuleType = {
    scope: number;
    auditCats: AuditCat[];
    ruleScopeDtos: RuleScopeDto[];
  }

  type bettingGiftRuleDtosDepot = {
    depotId: number;
  }

  type AuditCat = {
    catId: number;
    depots: bettingGiftRuleDtosDepot[];
  }

  type BettingGiftRuleDto = {
    depositMin: number;
    donateType: number;
    validBetMax: number;
    validBetMin: number;
    donateAmount: number;
    multipleWater: number;
    depositAmountType: number;
    amountMin?: number;
  }

  type bettingGiftRuleDtosType = {
    isBank: boolean;
    isName: boolean;
    drawType: number;
    isMobile: boolean;
    auditCats: AuditCat[];
    bettingGiftRuleDtos: BettingGiftRuleDto[];
  }
}