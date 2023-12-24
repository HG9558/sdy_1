declare namespace StoreType {
  type UserStateType = {
    token: string;
    userInfo: API.userInfoType;
    nickNameInfo: API.nickNameType;
    serUrl: string;
    bankcardData: BankAPI.bankcardDataType;
    vipData: VipAPI.vipInfoData;
    bankDifferentName: boolean;
    isRefresh: boolean;
    centerBalanceMoney: number;
    unMessageCount: number;
    mailBoxMsg: boolean;
    crFlag: boolean;
    sysConditions: any,
    ebPayWithdrawEnable: boolean;
    toPayWithdrawEnable: boolean;
    goPayWithdrawEnable: boolean;
    ecnyWithdrawEnable: boolean;
    cnyWithdrawEnable: boolean;
    eMoneyPayWithdrawEnable: boolean;
    alipayEnable: boolean;
    isShowService: boolean;
    regSetting: API.regSettingType;
    depositLen: {
      [key: string]: number;
    }
  };

  type microDataType = {
    depotCode: string;
    url: string;
    firstPageShow?: boolean;
    [key: string]: string;
  }

  type GameStateType = {
    esport: API.normalGameType[];
    cockfighting: API.normalGameType[];
    sport: API.normalGameType[];
    topSport: API.normalGameType[];
    sabong: API.normalGameType[];
    real: API.normalGameType[];
    poker: API.normalGameType[];
    lottery: API.normalGameType[];
    electronic: (API.normalGameType & API.GameType)[];
    fish: API.normalGameType[];
    rollingBall: API.normalGameType[];
    catchfish: API.normalGameType[];
    selectElectronicDepotCode: string;
    selectPokerDepotCode: string;
    selectLotteryDepotCode: string;
    selectFishDepotCode: string;
    fetchGameDataTemp: { sport: GameDataType.List[], e_sport: GameDataType.List[], cockfighting: GameDataType.List[], real: GameDataType.List[], lottery: GameDataType.List[]; chess: GameDataType.List[], electronic: GameDataType.List[], fish: GameDataType.List[], rollingBall: GameDataType.List[] };
    fetchHomeTitleList: GameDataType.HomeTitle[] | null;
    [key: string]: any;
  }
}
