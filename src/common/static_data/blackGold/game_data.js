import { lang, _lang, language } from '@/i18n'
const { VUE_APP_APP_TITLE, VUE_APP_APP_SIGN, VUE_APP_APP_BANK_ARE_CODE } = process.env

//- 备选游戏清单
let baseMenuData = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: [
      { depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
      { depotCode: 'SBOS', img_src: 'sports_sbosbet', title: lang('SBO体育'), enTxt: 'SBO SPORTS' },
      { depotCode: 'FBSP', img_src: 'sports_fb', title: lang('FB体育'), enTxt: 'FB SPORTS' },
      { depotCode: 'IM2', img_src: 'sports_im2', title: lang('IM体育'), enTxt: 'IM SPORTS' },
    ],
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      { depotCode: 'EB', img_src: 'real_eb', title: lang('EB真人'), enTxt: 'EB LIVE CASINO' },
      { depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
      { depotCode: 'WM', img_src: 'real_wm', title: lang('完美真人'), enTxt: 'WM LIVE CASINO' },
      { depotCode: 'BBIN2', img_src: 'real_bbin', title: lang('BBIN真人'), enTxt: 'BBIN LIVE CASINO' },
      { depotCode: 'PP', img_src: 'real_pp', title: lang('PP真人'), enTxt: 'PP LIVE CASINO' },
      { depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
      { depotCode: 'MG2', img_src: 'real_mg2', title: lang('MG真人'), enTxt: 'MG LIVE CASINO' },
      { depotCode: 'OGLIVE', img_src: 'real_oglive', title: lang('OG真人'), enTxt: 'OG LIVE CASINO' },
      { depotCode: 'EVO', img_src: 'real_evo', title: lang('EVO真人'), enTxt: 'EVO LIVE CASINO' },
      { depotCode: 'PTL', img_src: 'real_ptl', title: lang('PT真人'), enTxt: 'PT LIVE CASINO' },
      { depotCode: 'SA', img_src: 'real_sa', title: lang('SA真人'), enTxt: 'SA LIVE CASINO' },
    ],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY Poker', title: lang('开元棋牌'), topGameType: 'poker' },
      { depotCode: 'BL', img_src: 'chess_bl', enTxt: 'BL Poker', title: lang('博乐棋牌'), topGameType: 'poker' },
      { depotCode: 'KMQM', img_src: 'chess_km', enTxt: 'KM Poker', title: lang('KM棋牌'), topGameType: 'poker' },
      { depotCode: 'V8', img_src: 'chess_v8', enTxt: 'V8 Poker', title: lang('V8棋牌'), topGameType: 'poker' },
      { depotCode: 'MG2', img_src: 'chess_mg2', enTxt: 'MG Poker', title: lang('MG棋牌'), topGameType: 'poker' },
    ],
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: [
      { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
      { depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: lang('IM电竞') },
      { depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA ESPORTS', title: lang('小艾电竞') },
      { depotCode: 'OBES', img_src: 'electronic_obes', enTxt: 'PM ESPORTS', title: lang('PM电竞') },
    ],
  },
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: [
      { depotCode: 'YBCP', img_src: 'lottery_ybcp', enTxt: 'YB LOTTERY GAME', title: lang('云博彩票') },
      { depotCode: 'QQK', img_src: 'lottery_qqk', enTxt: 'QQ LOTTERY GAME', title: lang('QQ彩票') },
      { depotCode: 'TCG', img_src: 'lottery_tc', enTxt: 'TC LOTTERY GAME', title: lang('天成彩票') },
      // { depotCode: 'AECP', img_src: 'lottery_aecp', enTxt: 'AE LOTTERY GAME', title: lang('AE彩票') },
      // { depotCode: 'LB', img_src: 'lottery_lb', enTxt: 'LB LOTTERY GAME', title: lang('LB彩票') },
    ],
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      { depotCode: 'PTL', img_src: 'slot_ptl', enTxt: 'PT Slot', title: lang('PT电子'), topGameType: 'electronic' },
      {
        depotCode: 'JILI2',
        img_src: 'slot_jili',
        enTxt: 'JILI Slot',
        title: lang('JILI电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'JOKER',
        img_src: 'slot_joke',
        enTxt: 'JOKER Slot',
        title: lang('JOKER电子'),
        topGameType: 'electronic',
      },
      { depotCode: 'PGS', img_src: 'slot_pgs', enTxt: 'PGS Slot', title: lang('PGS电子'), topGameType: 'electronic' },
      { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 Slot', title: lang('CQ9电子'), topGameType: 'electronic' },
      { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB Slot', title: lang('JDB电子'), topGameType: 'electronic' },
      { depotCode: 'PP', img_src: 'slot_pp', enTxt: 'PP Slot', title: lang('PP电子'), topGameType: 'electronic' },
      { depotCode: 'FC', img_src: 'slot_fc', enTxt: 'FC Slot', title: lang('FC电子'), topGameType: 'electronic' },
      {
        depotCode: 'GP',
        img_src: 'slot_gp',
        enTxt: 'GAME PLAY Slot',
        title: lang('GAME PLAY电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'PS',
        img_src: 'slot_ps',
        enTxt: 'PLAY STAR Slot',
        title: lang('PLAY STAR电子'),
        topGameType: 'electronic',
      },
      { depotCode: 'YGG', img_src: 'slot_ygg', enTxt: 'YGG Slot', title: lang('YGG电子'), topGameType: 'electronic' },
      { depotCode: 'PNG2', img_src: 'slot_png2', enTxt: 'PNG Slot', title: lang('PNG电子'), topGameType: 'electronic' },
      {
        depotCode: 'NS',
        img_src: 'slot_ns',
        enTxt: 'NEXT SPIN Slot',
        title: lang('NEXT SPIN电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'HABN',
        img_src: 'slot_habn',
        enTxt: 'HABANERO Slot',
        title: lang('HABANERO电子'),
        topGameType: 'electronic',
      },
      { depotCode: 'MG2', img_src: 'slot_mg2', enTxt: 'MG Slot', title: lang('MG电子'), topGameType: 'electronic' },
      { depotCode: 'SPG', img_src: 'slot_spg', enTxt: 'SPG Slot', title: lang('SPG电子'), topGameType: 'electronic' },
      { depotCode: 'GR', img_src: 'slot_gr', enTxt: 'GR Slot', title: lang('GR电子'), topGameType: 'electronic' },
      { depotCode: 'TTG', img_src: 'slot_ttg', enTxt: 'TOPTREND Slot', title: lang('TOPTREND电子'), topGameType: 'electronic' },
      { depotCode: 'BBIS', img_src: 'slot_bbis', enTxt: 'BBIN Slot', title: lang('BBIN电子'), topGameType: 'electronic' },
    ],
  },
  catchFishMenu: {
    saveType: 'set_catchfish',
    saveName: 'catchfish',
    cmName: 'CatchFishMenu',
    catId: -2,
    list: [
      {
        depotCode: 'CQ9',
        img_src: 'catchfish_cq9',
        enTxt: 'FISH GAME',
        title: lang('CQ9捕鱼'),
        topGameType: 'catchfish',
      },
      {
        depotCode: 'OBDY',
        img_src: 'catchfish_obdy',
        enTxt: 'FISH GAME',
        title: lang('PM捕鱼'),
        topGameType: 'catchfish',
      },
      {
        depotCode: 'BBSH',
        img_src: 'catchfish_bbin',
        enTxt: 'FISH GAME',
        title: lang('BBIN捕鱼'),
        topGameType: 'catchfish',
      },
      {
        depotCode: 'MG2',
        img_src: 'catchfish_mg',
        enTxt: 'FISH GAME',
        title: lang('MG捕鱼'),
        topGameType: 'catchfish',
      },
    ],
  },
  discountMenu: {
    list: (() => {
      const list = [
        { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
        { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
        { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
        { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
        { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
        { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
      ];
      return list;
    })(),
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

// wpe站点
const baseMenuDataWpe = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: [
      { depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
      { depotCode: 'SBOS', img_src: 'sports_sbosbet', title: lang('SBO体育'), enTxt: 'SBO SPORTS' },
      { depotCode: 'CMD', img_src: 'sports_cmd', title: lang('CMD体育'), enTxt: 'CMD SPORTS' },
      { depotCode: 'FBSP', img_src: 'sports_fb', title: lang('FB体育'), enTxt: 'FB SPORTS' },
    ],
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      { depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
      { depotCode: 'EVO', img_src: 'real_evo', title: lang('EVO真人'), enTxt: 'EVO LIVE CASINO' },
      { depotCode: 'EB', img_src: 'real_eb', title: lang('EB真人'), enTxt: 'EB LIVE CASINO' },
      { depotCode: 'PP', img_src: 'real_pp', title: lang('PP真人'), enTxt: 'PP LIVE CASINO' },
      { depotCode: 'WM', img_src: 'real_wm', title: lang('WM真人'), enTxt: 'WM LIVE CASINO' },
      { depotCode: 'MG2', img_src: 'real_mg2', title: lang('MG真人'), enTxt: 'MG LIVE CASINO' },
      { depotCode: 'SEX', img_src: 'real_se', title: lang('SE真人'), enTxt: 'SE LIVE CASINO' },
    ],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'BL', img_src: 'chess_bl', enTxt: 'BL Poker', title: lang('博乐棋牌'), topGameType: 'poker' },
      { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY Poker', title: lang('开元棋牌'), topGameType: 'poker' },
      { depotCode: 'KMQM', img_src: 'chess_kmqm', enTxt: 'KMQM Poker', title: lang('KM棋牌'), topGameType: 'poker' },
      { depotCode: 'MG2', img_src: 'chess_mg2', enTxt: 'MG Poker', title: lang('MG棋牌'), topGameType: 'poker' },
    ],
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: [
      { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
      { depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA ESPORTS', title: lang('小艾电竞') },
    ],
  },
  // lotteryMenu: {
  // 	saveType: 'set_lottery',
  // 	saveName: 'lottery',
  // 	catId: 12,
  // 	list: [
  // 	]
  // },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      {
        depotCode: 'JILI2',
        img_src: 'slot_jili',
        enTxt: 'JILI Slot',
        title: lang('JILI电子'),
        topGameType: 'electronic',
      },
      { depotCode: 'SPG', img_src: 'slot_spg', enTxt: 'SPG Slot', title: lang('SPG电子'), topGameType: 'electronic' },
      { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB Slot', title: lang('JDB电子'), topGameType: 'electronic' },
      { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 Slot', title: lang('CQ9电子'), topGameType: 'electronic' },
      { depotCode: 'PP', img_src: 'slot_pp', enTxt: 'PP Slot', title: lang('PP电子'), topGameType: 'electronic' },
      { depotCode: 'PTL', img_src: 'slot_ptl', enTxt: 'PT Slot', title: lang('PT电子'), topGameType: 'electronic' },
      {
        depotCode: 'TTG',
        img_src: 'slot_ttg',
        enTxt: 'TOPTREND Slot',
        title: lang('TOPTREND电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'ME',
        img_src: 'slot_me',
        enTxt: 'MEGA888 Slot',
        title: lang('MEGA888电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'PU',
        img_src: 'slot_pu',
        enTxt: 'Pussy888 Slot',
        title: lang('Pussy888'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'KISS',
        img_src: 'slot_kiss',
        enTxt: '918KISS Slot',
        title: lang('918KISS'),
        topGameType: 'electronic',
      },
      { depotCode: 'FC', img_src: 'slot_fc', enTxt: 'FC Slot', title: lang('FC电子'), topGameType: 'electronic' },
      {
        depotCode: 'JOKER',
        img_src: 'slot_joker',
        enTxt: 'JOKER Slot',
        title: lang('JOKER电子'),
        topGameType: 'electronic',
      },
      { depotCode: 'PNG2', img_src: 'slot_png2', enTxt: 'PNG Slot', title: lang('PNG电子'), topGameType: 'electronic' },
      { depotCode: 'MG2', img_src: 'slot_mg', enTxt: 'MG Slot', title: lang('MG电子'), topGameType: 'electronic' },
      {
        depotCode: 'NLC',
        img_src: 'slot_nlc',
        enTxt: 'NO LIMIT Slot',
        title: lang('NO LIMIT电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'HS',
        img_src: 'slot_hs',
        enTxt: 'HACKSAW Slot',
        title: lang('HACKSAW电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'NS',
        img_src: 'slot_ns',
        enTxt: 'NS Slot',
        title: lang('NS电子'),
        topGameType: 'electronic',
      },
    ],
  },
  catchFishMenu: {
    saveType: 'set_catchfish',
    saveName: 'catchfish',
    cmName: 'CatchFishMenu',
    catId: -2,
    list: [
      {
        depotCode: 'BBSH',
        img_src: 'catchfish_bbin',
        enTxt: 'FISH GAME',
        title: lang('BBIN捕鱼'),
        topGameType: 'catchfish',
      },
      {
        depotCode: 'JDB',
        img_src: 'catchfish_jdb',
        enTxt: 'FISH GAME',
        title: lang('JDB捕鱼'),
        topGameType: 'catchfish',
      },
      {
        depotCode: 'PP',
        img_src: 'catchfish_pp',
        enTxt: 'FISH GAME',
        title: lang('PP捕鱼'),
        topGameType: 'catchfish',
      },
      {
        depotCode: 'MG2',
        img_src: 'catchfish_mg',
        enTxt: 'FISH GAME',
        title: lang('MG捕鱼'),
        topGameType: 'catchfish',
      },
    ],
  },
  discountMenu: {
    list: (() => {
      const list = [
        { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
        { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
        // { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
        { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
        { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
        { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
      ];
      return list;
    })(),
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

let hotGameList = [
	{
		type: 'electronic',
		title: lang('电子'),
		gameNameTitle: lang('电子游艺'),
		gameNameEnglish: "SLOT GAMES",
		gameInner: lang('提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。'),
	},
	{
		type: 'sport',
		title: lang('体育'),
		gameNameTitle: lang('体育赛事'),
		gameNameEnglish: "SPORTS EVENTS",
		gameInner: lang('业内最高赔率,覆盖世界各地赛事,让球、大小、半全场、波胆单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播、让您轻松体验聊球投注,乐在其中。'),
	},
	{
		type: 'real',
		title: lang('真人'),
		gameNameTitle: lang('真人娱乐'),
		gameNameEnglish: "LIVE CASINO",
		gameInner: lang('互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。'),
	},
	{
		type: 'poker',
		title: lang('棋牌'),
		gameNameTitle: lang('棋牌游戏'),
		gameNameEnglish: "Poker GAMES",
		gameInner: lang('提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。'),
	},
	{
		type: 'esport',
		title: lang('电竞'),
		gameNameTitle: lang('电子竞技'),
		gameNameEnglish: "E-SPORTS",
		gameInner: lang('提供所有大型赛事，每月玩家可期待超过百場比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。'),
	},
	{
		type: 'lottery',
		title: lang('彩票'),
		gameNameTitle: lang('彩票投注'),
		gameNameEnglish: "LOTTERY GAMES",
		gameInner: _lang('lotteryGameInner'),
	},
	{
		type: 'catchfish',
		title: lang('捕鱼'),
		gameNameTitle: lang('捕鱼游戏'),
		gameNameEnglish: "FISHING",
		gameInner: lang('提供所有大型赛事，每月玩家可期待超过百場比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。'),
	},
]

if (VUE_APP_APP_SIGN === 'wpe') {
	baseMenuData = baseMenuDataWpe
	hotGameList = hotGameList.filter( v => v.type !== 'lottery')
}

export { baseMenuData, hotGameList }
