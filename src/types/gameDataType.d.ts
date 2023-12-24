declare namespace GameDataType {

  type SportsMenu = {
    saveName: string;
    saveType: string;
    catId: number;
    list: List[];
  }

  type SabongNemu = {
    saveName: string;
    saveType: string;
    catId: number;
    list: List[];
  }

  type RealMenu = {
    saveType: string;
    saveName: string;
    catId: number;
    list: List[];
  }

  type RollingBallMenu = {
    saveType: string;
    saveName: string;
    catId: number;
    list: List[];
  }

  type ChessMenu = {
    saveType: string;
    saveName: string;
    catId: number;
    list: List[];
  }

  type ElectronicMenu = {
    saveType: string;
    saveName: string;
    catId: number;
    list: List[];
  }

  type CockfightingMenu = {
    saveType: string;
    saveName: string;
    catId: number;
    list: List[];
  }

  type FishMenu = {
    saveType: string;
    saveName: string;
    catId: number;
    list: List[];
  }


  type List = {
    depotCode: string;
    zh_txt: string;
    vi_txt?: string;
    en_txt?: string;
    ms_txt?: string;
    zh_tw_txt?: string;
    topGameType?: string;
    zh_slogan?: string | null;
    en_slogan?: string | null;
    vi_slogan?: string | null;
    ms_slogan?: string | null;
    zh_tw_slogan?: string | null;
  }

  type LotteryMenu = {
    saveType: string;
    saveName: string;
    catId: number;
    list: List[];
  }

  type SlotMenu = {
    saveType: string;
    saveName: string;
    cmName: string;
    catId: number;
    list: List[];
  }

  type DiscountMenu = {
    saveType: string;
    saveName: string;
    list: List[];
    catId: null;
  }

  type PartnerMenu = {
    saveType: string;
    showBtn: boolean;
    saveName: string;
    leftImgLink: string;
    btnList: string[];
    list?: List[];
    catId: null;
  }

  type IBaseMenuData = {
    sportsMenu: SportsMenu;
    // sabongNenu?: SabongNemu;
    realMenu: RealMenu;
    chessMenu: ChessMenu;
    eSportMenu: ElectronicMenu;
    cockfightingMenu: CockfightingMenu;
    lotteryMenu: LotteryMenu;
    slotMenu: SlotMenu;
    discountMenu: DiscountMenu;
    partnerMenu: PartnerMenu;
    fishMenu: FishMenu;
    rollingBallMenu: RollingBallMenu;
  }

  type HomeTitle = {
    zh_txt: string;
    type: string;
    zh_slogan: string;
    en_slogan: string;
    vi_slogan: string;
    ms_slogan: string;
    depotCode: string;
    zh_tw_txt: string;
    vi_txt: string;
    ms_txt: string;
    en_txt: string;
    zh_tw_slogan: string;
  }
}
