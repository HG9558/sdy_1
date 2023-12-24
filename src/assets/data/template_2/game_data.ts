import { gameLists } from './game_data_template';
import { lang } from "@/i18n"

export const baseMenuData: GameDataType.IBaseMenuData = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1,
    list: gameLists.sport
  },
  // sabongNenu: {
  //   saveName: 'sabong',
  //   saveType: 'set_sabong',
  //   catId: 49,
  //   list: [
  //     { depotCode: 'SABG', zh_txt: lang('斗鸡'), en_txt: 'SABONG GAMING' },
  //   ]
  // },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: gameLists.real
  },
  rollingBallMenu: {
    saveType: 'set_rolling',
    saveName: 'rolling',
    catId: 58,
    list: gameLists.rollingBall ?? []
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: gameLists.chess
  },
  eSportMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: gameLists.e_sport
  },
  cockfightingMenu: {
    saveType: 'set_cockfighting',
    saveName: 'cockfighting',
    catId: 49,
    list: gameLists.cockfighting
  },
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: gameLists.lottery
  },
  fishMenu: {
    saveType: 'set_fish',
    saveName: 'fish',
    catId: 8,
    list: gameLists.fish
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: gameLists.electronic
  },
  discountMenu: {
    saveName: '',
    saveType: '',
    list: [
      { depotCode: 'spots', zh_txt: lang('体育优惠') },
      { depotCode: 'real', zh_txt: lang('真人优惠') },
      { depotCode: 'lottery', zh_txt: lang('彩票优惠') },
      { depotCode: 'electronic', zh_txt: lang('电竞优惠') },
      { depotCode: 'slot', zh_txt: lang('电子优惠') },
      { depotCode: 'chess', zh_txt: lang('棋牌优惠') },
    ],
    catId: null,
  },
  partnerMenu: {
    saveType: '',
    saveName: '',
    showBtn: false,
    leftImgLink: 'partner_bg',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
    catId: null,
  },
}
