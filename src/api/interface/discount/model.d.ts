declare namespace DiscountType {
  type ActivityCatListPage = {
    id: number;
    catName: string;
    catMemo?: any;
    available: number;
    sort: number;
    createTime: string;
    disable: string;
    list: ActivityListResPageList[];
  }

  type ActivityCatListResponse = {
    msg: string;
    code: number;
    page: ActivityCatListPage[];
  }

  type discountDataType = Record<string, ActivityCatListPage>;


  type bannerType = {
    evebNum?: any;
    clientShow: number;
    advType?: any;
    picTarget: number;
    actId?: any;
    activityId?: any;
    outStation: string;
    path?: any;
    picPcPath: string;
    picMbPath: string;
    title?: any;
    inType?: any;
    inPageType?: any;
  }

  type ActivityListResPageData = {
    youhuiBanners: bannerType[];
  }

  type ActivityListResPageList = {
    flag?: string;
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
    donateType?: any;
    multipleWater?: any;
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

  type ActivityListResPage = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: ActivityListResPageList[];
    pageTotalCount: number;
  }

  type ActivityListRes = {
    msg: string;
    code: number;
    data: ActivityListResPageData;
    page: ActivityListResPage;
  }
}