declare namespace API {
  type gameParams = {
    catId: number
  }

  type fishParams = {
    lableName: string;
    depotId?: number;
  }

  type transitListParams = {
    gameId: number;
  }

  type FishResData = {
    msg: string;
    code: number;
    tGmDepots: FishRes[];
  }


  type FishRes = {
    depotName: string;
    hasAccount?: any;
    endDate?: any;
    mbPicUrl?: any;
    available?: any;
    hasTransfer?: any;
    depotId?: any;
    memo: string;
    catNames?: any;
    terminal?: any;
    isTry: number;
    availableWh: number;
    modifyUser?: any;
    catId?: any;
    modifyTime?: any;
    createTime: string;
    sortId: number;
    catName?: any;
    depotCode: string;
    logo?: any;
    createUser?: any;
    id: number;
    isSingleOne?: any;
    startDate?: any;
  }

  type CatDepot = {
    id: number;
    depotId: number;
    catId: number;
    catName: string;
    depotName: string;
    logo2?: any;
    type?: string;
    logo?: any;
    picUrl: string;
    logoPc: string;
    mbPicUrl: string;
    logoMb: string;
    appPicUrl?: any;
    logoApp: string;
    depotBackgroundImage: string;
    gameTag: string;
    titleTag: string;
    sortId: string;
    pcUrlTag?: any;
    availableWh: number;
    isTry: number;
    isHall: number;
    depotCode: string;
    gameList?: any;
    terminal?: any;
    siteCode?: any;
    orientation: number;
    memo: string;
    sloginsData?: string;
    renderList?: gameListPageList[];
    totalCount?: number;
    isMicroGame?: boolean;
    firstPageShow?: boolean;
  }

  type CatDepotList = {
    msg: string;
    code: number;
    catDepots: CatDepot[];
  }

  type TGmDepot = {
    id: number;
    depotCode: string;
    depotName: string;
    available?: any;
    memo: string;
    createUser?: any;
    createTime: string;
    modifyUser?: any;
    modifyTime?: any;
    startDate?: any;
    endDate?: any;
    sortId: number;
    logo?: any;
    mbPicUrl?: any;
    catNames?: any;
    hasAccount?: any;
    hasTransfer?: any;
    terminal?: any;
    catName?: any;
    catId?: any;
    depotId?: any;
    availableWh: number;
    isTry: number;
    isSingleOne?: any;
    picUrl: any;
    logoPc: any;
    logoMb: any;
    logoApp: any;
    depotBackgroundImage: any;
    gameTag: any;
    titleTag: any;
    isHall: any;
    orientation: any;
    moneyBlance?: number;
  }

  type ElecDepotList = {
    msg: string;
    code: number;
    tGmDepots: TGmDepot[];
  }

  type List = {
    id: number;
    depotId: number;
    gameName: string;
    logo: string;
    logo2?: any;
    clickNum: number;
    popularity?: any;
    recRating: number;
    depotName: string;
    catName?: any;
    enablePool?: any;
    enableTest: string;
    goodNum: number;
    enablePc: number;
    enableMb: number;
    enableApp: number;
    isTry: number;
    tableCode?: any;
    picUrl?: any;
    mbPicUrl?: any;
    appPicUrl?: any;
    logoPc?: any;
    logoApp?: any;
    logoMb?: any;
    depotBackgroundImage?: any;
    orientation: number;
  }

  type Page = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: List[];
    pageTotalCount: number;
  }

  type GameFishList = {
    msg: string;
    code: number;
    page: Page;
  }


  type GameType = {
    [x: string]: any;
    depotCode: string;
    zh_txt: string;
    vi_txt?: string;
    ms_txt?: string;
    type?: string;
    zh_tw_txt?: string;
    topGameType?: string;
    zh_slogan?: string | null;
    zh_tw_slogan?: string | null;
    en_slogan?: string | null;
    vi_slogan?: string | null;
    ms_slogan?: string | null;
    topGameType: string;
    renderList: List[];
    totalCount: number;
  }

  type PalyGameType = {
    msg: string;
    code: number;
    tryPlayFlag?: boolean;
    errMsg?: string;
  }

  type normalGameType = CatDepot & GameDataType.List;

  type recoverBalanceType = {
    msg: string;
    code: number;
    error?: string;
    isSign?: string;
  }

  type gameListParams = {
    depotId: number;
    page?: number;
    lableName?: string;
  }

  type fishListParams = {
    depotId: number;
    page?: number;
    catId?: number;
  }

  type gameListPageList = {
    id: number;
    depotId?: any;
    gameName: string;
    logo: string;
    logo2?: any;
    clickNum: number;
    popularity?: any;
    recRating: number;
    depotName: string;
    catName: string;
    enablePool: string;
    enableTest: string;
    goodNum: number;
    enablePc: number;
    enableMb: number;
    enableApp: number;
    isTry: number;
    tableCode?: any;
    picUrl?: any;
    mbPicUrl?: any;
    appPicUrl?: any;
    logoPc?: any;
    logoApp?: any;
    logoMb?: any;
    depotBackgroundImage?: any;
    orientation?: any;
  }

  type gameListPage = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: gameListPageList[];
    pageTotalCount: number;
  }

  type gameListRes = {
    msg: string;
    code: number;
    page: gameListPage;
    [key]: any;
  }


}