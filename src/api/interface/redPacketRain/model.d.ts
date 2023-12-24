declare namespace RedEnvelopeEntranceAPI {
  type endCountDownType = {
    d: string | number;
    h: string | number;
    h_in_d: string | number;
    m: string | number;
    s: string | number;
  }
  type redPacketRainInfoData = {
    startTime: string;
    endTime: string;
    validDates: number[];
    bonusAmount?: any;
    total: number;
    redPacketNum: number;
    redPacketRainRuleDtos?: any;
  }

  type redPacketRainInfoType = {
    msg: string;
    code: number;
    data: redPacketRainInfoData;
  }

  type newRedPacketRainInfoType = {
    msg: string;
    code: number;
    data: {
      endMinute: number;
      validDates: number[];
      timestamp: number;
      start: boolean;
    };
  };


  type RedPacketRainRuleDto = {
    minAmount: number;
    number: number;
    isAward: boolean;
    isValid: boolean;
    geted: boolean;
  }

  type sdyactivityData = {
    startTime?: any;
    endTime?: any;
    validDates?: any;
    bonusAmount: number;
    total: number;
    redPacketNum: number;
    redPacketRainRuleDtos: RedPacketRainRuleDto[];
  }

  type sdyactivityType = {
    msg: string;
    code: number;
    data: sdyactivityData;
  }

  type applyNewRedEnvelopeRes = {
    msg: string;
    code: number;
    data?: {
      amount?: number | null;
      adMsg?: string;
      msg?: string;
    };
  };

  type RedEnvelopeReward = {
    loginName: string;
    amount: number;
  };

  type redEnvelopeRecordRes = {
    msg: string;
    code: number;
    data: {
      msg?: string;
      newRedEnvelopeRewardDtoList: RedEnvelopeReward[];
      maxCount: number;
      applyCount: number;
      applyAmount: number;
    };
  };

}