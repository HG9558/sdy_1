declare namespace LiveAPI {
  type getListShownBetLogsForUserParams = {
    pageNo: number;
    pageSize: number;
    betStartTime?: string;
    betEndTime?: string;
  }
  type getListFollowBetLogsForUserParams = {
    pageNo: number;
    pageSize: number;
    startTime?: string;
    endTime?: string;
  }
  type getListShownBetLogsForUserParamsDataCountList = {
    id: string;
    userName: string;
    betTime: string;
    bet: number;
    validBet: number;
    payout: number;
    betOdd: number;
    gameName: string;
    betType: string;
    leagueName: string;
    platform: string;
    platformName: string;
    home: string;
    away: string;
    openResultDetail: string;
    result: string;
    status: string;
    payoutTime: string;
    estimatedPayout: number;
  }

  type getListShownBetLogsForUserParamsDataCount = {
    payOutTotal: string;
    validBetTotal: string;
    betTotal: string;
    totalCount?: number;
    [key: string]: any;
  }

  type getListShownBetLogsForUserParamsData = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: getListShownBetLogsForUserParamsDataCountList[];
    listCompressStr?: any;
    count: getListShownBetLogsForUserParamsDataCount;
  }

  type getListShownBetLogsForUserParamsRes = {
    msg: string;
    code: number;
    data: getListShownBetLogsForUserParamsData;
  }

  type FormBetType = {
    region: DepositType.TGmCat[]
  }
}