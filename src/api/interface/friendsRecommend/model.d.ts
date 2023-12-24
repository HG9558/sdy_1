declare namespace FriendAPI {
  type getFriendRebateInfoMsg = {
    isShowFriendRebate: boolean;
    codeId: string;
  }

  type getFriendRebateInfoRes = {
    msg: getFriendRebateInfoMsg;
    code: number;
  }

  type RebateFirstChargeDto = {
    minCharge: number;
    maxCharge: number;
    referrer: number;
    referee: number;
  }

  type RebateVipDtoList = {
    level: number;
    award: number;
  }

  type CatDtoList = {
    validBet: number;
    topRebate: number;
    catId: number;
    catName: string;
  }

  type RebateChargeDtoList = {
    num: number;
    minCharge: number;
    name: string;
    award: number;
    multiple: number;
  }

  type RebateVipDtoMapItem = {
    level: number;
    award: number;
  }


  type RebateVipDtoMap = {
    1: RebateVipDtoMapItem;
    2: RebateVipDtoMapItem;
    3: RebateVipDtoMapItem;
    4: RebateVipDtoMapItem;
    5: RebateVipDtoMapItem;
    6: RebateVipDtoMapItem;
    7: RebateVipDtoMapItem;
    8: RebateVipDtoMapItem;
    9: RebateVipDtoMapItem;
    10: RebateVipDtoMapItem;
  }

  type CatDtoMapItem = {
    validBet: number;
    topRebate: number;
    catId: number;
    catName: string;
  }



  type CatDtoMap = {
    1: CatDtoMapItem;
    3: CatDtoMapItem;
    5: CatDtoMapItem;
    6: CatDtoMapItem;
    8: CatDtoMapItem;
    9: CatDtoMapItem;
    12: CatDtoMapItem;
  }

  type RebateChargeDtoMapItem = {
    num: number;
    minCharge: number;
    name: string;
    award: number;
    multiple: number;
  }


  type RebateChargeDtoMap = {
    1: RebateChargeDtoMapItem;
    2: RebateChargeDtoMapItem;
    3: RebateChargeDtoMapItem;
  }

  type getRemmendRuleMsg = {
    level: number;
    rebateFirstChargeDto: RebateFirstChargeDto;
    rebateVipDtoList: RebateVipDtoList[];
    catDtoList: CatDtoList[];
    rebateChargeDtoList: RebateChargeDtoList[];
    rebateVipDtoMap: RebateVipDtoMap;
    catDtoMap: CatDtoMap;
    rebateChargeDtoMap: RebateChargeDtoMap;
  }

  type getRemmendRuleResType = {
    msg: getRemmendRuleMsg;
    code: number;
  }

  type getFriendRebateFriendsRewardSummaryParams = {
    subLoginName: string;
    firstChargeStartTime: string;
    startTime: string;
    endTime: string;
  }

  type getFriendRebateFriendsRewardSummaryMsg = {
    accountId: number;
    firstChargeReward: number;
    validBetReward: number;
  }

  type getFriendRebateFriendsRewardSummaryResType = {
    msg: getFriendRebateFriendsRewardSummaryMsg;
    code: number;
  }

  type getFriendRebateListParams = {
    pageNo: number,
    pageSize: number,
    subLoginName: string,
    firstChargeStartTime: string,
    startTime: string,
    endTime: string,
    showAll: number
  }


  type getFriendRebateListMsg = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: getFriendRebateList[];
    pageTotalCount: number;
  }

  type getFriendRebateListResType = {
    msg: getFriendRebateListMsg;
    code: number;
  }

  type getFriendRebateRewardReportForDayParams = {
    pageNo: number,
    pageSize: number,
    endTime: string,
    startTime: string
  }

  type getFriendRebateRewardReportForDayList = {
    time: string;
    num: number;
    firstChargeReward: number;
    validBetReward: number;
    rnum: number;
  }

  type getFriendRebateList = {
    subLoginName: string;
    subAccountId: number;
    firstChargeTime: string | number;
    firstCharge?: any;
    firstChargeReward: number;
    validBetReward: number;
    tyValidBetReward?: any;
    dzValidBetReward?: any;
    qpValidBetReward?: any;
    cpValidBetReward?: any;
    djValidBetReward?: any;
    zrValidBetReward?: any;
    totalDeposit: number;
    lastLoginTime?: any;
    vipLevel?: any;
  }


  type getFriendRebateRewardReportForDayMsg = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: getFriendRebateRewardReportForDayList[];
    pageTotalCount: number;
  }

  type getFriendRebateRewardReportForDayResType = {
    msg: getFriendRebateRewardReportForDayMsg;
    code: number;
  }

  type getFriendRebateSummaryMsg = {
    ydActualReward: number;
    ydFirstChargeReward: number;
    ydValidBetReward: number;
    sumActualReward: number;
    sumFirstChargeReward: number;
    sumValidBetReward: number;
    num: number;
  }

  type getFriendRebateSummaryResType = {
    msg: getFriendRebateSummaryMsg;
    code: number;
  }

  type getFriendRebateDetailsParams = {
    subLoginName: string;
    startTime: string;
    endTime: string;
  }

  type getFriendRebateDetailsMsg = {
    subLoginName: string;
    subAccountId?: any;
    firstChargeTime?: any;
    firstCharge?: any;
    firstChargeReward?: any;
    validBetReward?: any;
    tyValidBetReward: number;
    dzValidBetReward: number;
    qpValidBetReward: number;
    cpValidBetReward: number;
    djValidBetReward: number;
    zrValidBetReward: number;
    totalDeposit?: any;
    lastLoginTime: string;
    vipLevel: number;
  }

  type getFriendRebateDetailsResType = {
    msg: getFriendRebateDetailsMsg;
    code: number;
  }

  type tableLabelType = {
    label: string;
    prop: string
  }
}