import { lang, _lang, language } from '@/i18n';
const { VUE_APP_APP_TITLE, VUE_APP_APP_SIGN, VUE_APP_APP_BANK_ARE_CODE } = process.env;

//- 备选游戏清单
let baseMenuData = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: [
      { depotCode: 'FBSP', img_src: 'sports_bog', title: lang('君博体育'), enTxt: 'JBO SPORTS' },
      { depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
      { depotCode: 'M8', img_src: 'sports_m8bet', title: lang('M8BET体育'), enTxt: 'M8BET SPORTS' },
      { depotCode: 'IM2', img_src: 'sports_im2', title: lang('IM体育'), enTxt: 'IM SPORTS' },
      { depotCode: 'OBSP', img_src: 'sports_fb', title: lang('PM体育'), enTxt: 'PM SPORTS' },
      // { depotCode: 'PLSP', img_src: 'sports_bl', title: '保利体育', enTxt: 'PL SPORTS' },
      { depotCode: 'PLSP', img_src: 'sports_xj', title: lang('小金体育'), enTxt: 'POLY SPORTS' }, // 小金 替换 保利， 实际还是 保利
      // todo  添加默认图片
      { depotCode: 'XJ', img_src: 'sports_another', title: lang('SDY体育'), enTxt: 'SDY SPORTS' },
      // { depotCode: 'XM', img_src: 'sports_another', title: '熊猫体育', enTxt: 'XJ SPORTS'},
    ],
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      { depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
      // { depotCode: 'WM', img_src: 'real_wm', title: '完美真人', enTxt: 'WM LIVE CASINO' },
      { depotCode: 'BBIN2', img_src: 'real_bbin', title: lang('BBIN真人'), enTxt: 'BBIN LIVE CASINO' },
      { depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
      { depotCode: 'OBLI', img_src: 'real_ob', title: lang('PM真人'), enTxt: 'PM LIVE CASINO' },
      { depotCode: 'ON', img_src: 'real_on', title: lang('ON真人'), enTxt: 'ON LIVE CASINO' },
    ],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: lang('开元棋牌'), topGameType: 'poker' },
      { depotCode: 'LC', img_src: 'chess_kx', enTxt: 'KX CHESS', title: lang('凯旋棋牌'), topGameType: 'poker' },
      { depotCode: 'OBQP', img_src: 'chess_ob', enTxt: 'PM CHESS', title: lang('PM棋牌'), topGameType: 'poker' },
    ],
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: [
      { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
      { depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: lang('IM电竞') },
    ],
  },
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: [
      {
        depotCode: 'IGGF',
        img_src: 'lottery_iggf',
        title: lang('IG官方彩'),
        enTxt: 'IG LOTTERY GAME',
        topGameType: 'lottery',
      },
      {
        depotCode: 'IGSS',
        img_src: 'lottery_igss',
        title: lang('IG传统彩'),
        enTxt: 'IG LOTTERY GAME',
        topGameType: 'lottery',
      },
      {
        depotCode: 'OBCP',
        img_src: 'lottery_obcp',
        title: lang('PM彩票'),
        enTxt: 'PM LOTTERY GAME',
        topGameType: 'lottery',
      },
      {
        depotCode: 'SY',
        img_src: 'lottery_sy',
        title: lang('双赢彩票'),
        enTxt: 'SY LOTTERY GAME',
        topGameType: 'lottery',
      },
      {
        depotCode: 'TC',
        img_src: 'lottery_tc',
        title: lang('天成彩票'),
        enTxt: 'TC LOTTERY GAME',
        topGameType: 'lottery',
      },
    ],
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      { depotCode: 'PGS', img_src: 'slot_pgs', enTxt: 'PGS GAME', title: lang('PGS电子'), topGameType: 'electronic' },
      { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 GAME', title: lang('CQ9电子'), topGameType: 'electronic' },
      { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB GAME', title: lang('JDB电子'), topGameType: 'electronic' },
      { depotCode: 'MG2', img_src: 'slot_mg2', enTxt: 'MG2 GAME', title: lang('MG2电子'), topGameType: 'electronic' },
      { depotCode: 'AGST', img_src: 'slot_ag', enTxt: 'AG GAME', title: lang('AG电子'), topGameType: 'electronic' },
      {
        depotCode: 'FISH',
        img_src: 'slot_fish',
        enTxt: 'FISH GAME',
        title: lang('捕鱼游戏'),
        topGameType: 'electronic',
      },
    ],
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
      { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ],
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

let hotGameList = [
  {
    type: 'sport',
    title: lang('体育'),
    gameNameTitle: lang('体育赛事'),
    gameNameEnglish: 'SPORTS EVENTS',
    gameInner: lang(
      '业内最高赔率,覆盖世界各地赛事,让球、大小、半全场、波胆单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播、让您轻松体验聊球投注,乐在其中。'
    ),
  },
  {
    type: 'real',
    title: lang('真人'),
    gameNameTitle: lang('真人娱乐'),
    gameNameEnglish: 'LIVE CASINO',
    gameInner: lang(
      '互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。'
    ),
  },
  {
    type: 'poker',
    title: lang('棋牌'),
    gameNameTitle: lang('棋牌游戏'),
    gameNameEnglish: 'CHESS & CARD GAMES',
    gameInner: lang(
      '提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。'
    ),
  },
  {
    type: 'esport',
    title: lang('电竞'),
    gameNameTitle: lang('电子竞技'),
    gameNameEnglish: 'E-SPORTS',
    gameInner: lang(
      '提供所有大型赛事，每月玩家可期待超过百場比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。'
    ),
  },
  {
    type: 'lottery',
    title: lang('彩票'),
    gameNameTitle: lang('彩票投注'),
    gameNameEnglish: 'LOTTERY GAMES',
    gameInner: _lang('lotteryGameInner'),
  },
  {
    type: 'electronic',
    title: lang('电子'),
    gameNameTitle: lang('电子游艺'),
    gameNameEnglish: 'SLOT GAMES',
    gameInner: lang('提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。'),
  },
];

const baseMenuData_vi = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: (() => {
      if (VUE_APP_APP_SIGN === 'lua') {
        return [
          { depotCode: 'M8', img_src: 'sports_m8bet', title: 'Thể thao M8', enTxt: 'M8 SPORTS' },
          { depotCode: 'SBOVN', img_src: 'sports_sbovnbet', title: 'Thể Thao SBO', enTxt: 'SBO SPORTS' },
          { depotCode: 'SBA', img_src: 'sports_saba', title: 'Thể Thao SABA', enTxt: 'SABA SPORTS' },
        ];
      }

      return [
        { depotCode: 'M8', img_src: 'sports_m8bet', title: 'Thể thao M8', enTxt: 'M8 SPORTS' },
        { depotCode: 'SBOVN', img_src: 'sports_sbovnbet', title: 'Thể Thao SBO', enTxt: 'SBO SPORTS' },
      ];
    })(),
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      { depotCode: 'SEX', img_src: 'real_sex', title: 'SE Live', enTxt: 'SE LIVE CASINO' },
      { depotCode: 'DG', img_src: 'real_dg', title: 'DG Live', enTxt: 'DG LIVE CASINO' },
      { depotCode: 'PP', img_src: 'real_pp', title: 'PP Live', enTxt: 'PP LIVE CASINO' },
    ],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [{ depotCode: 'V8', img_src: 'chess_vba', title: 'CHESS', enTxt: 'V8 CHESS', topGameType: 'poker' }],
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: [{ depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA E-sports', title: 'IA E-sports' }],
  },
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: [
      {
        depotCode: 'QQK',
        img_src: 'lottery_qqk',
        title: 'QQ Xổ Số',
        enTxt: 'QQK LOTTERY GAME',
        topGameType: 'lottery',
      },
    ],
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 GAME', title: 'CQ9 Slot', topGameType: 'electronic' },
      { depotCode: 'MG2', img_src: 'slot_mg2', enTxt: 'MG GAME', title: 'MG Slot', topGameType: 'electronic' },
      { depotCode: 'PP', img_src: 'slot_pp', enTxt: 'PP GAME', title: 'PP Slot', topGameType: 'electronic' },
      {
        depotCode: 'FISH',
        img_src: 'slot_fish',
        enTxt: 'FISH GAME',
        title: lang('捕鱼游戏'),
        topGameType: 'electronic',
      },
    ],
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
      { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ],
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

const hotGameList_vi = [
  {
    type: 'sport',
    title: lang('体育'),
    gameNameTitle: lang('体育赛事'),
    gameNameEnglish: 'SPORTS EVENTS',
    gameInner: lang(
        '业内最高赔率,覆盖世界各地赛事,让球、大小、半全场、波胆单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播、让您轻松体验聊球投注,乐在其中。'
    ),
  },
  {
    type: 'real',
    title: lang('真人'),
    gameNameTitle: lang('真人娱乐'),
    gameNameEnglish: 'LIVE CASINO',
    gameInner: lang(
        '互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。'
    ),
  },
  {
    type: 'esport',
    title: lang('电竞'),
    gameNameTitle: lang('电子竞技'),
    gameNameEnglish: 'E-SPORTS',
    gameInner: lang(
        '提供所有大型赛事，每月玩家可期待超过百場比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。'
    ),
  },
  {
    type: 'lottery',
    title: lang('彩票'),
    gameNameTitle: lang('彩票投注'),
    gameNameEnglish: 'LOTTERY GAMES',
    gameInner: _lang('lotteryGameInner', { siteTitle: VUE_APP_APP_TITLE }),
  },
  {
    type: 'electronic',
    title: lang('电子'),
    gameNameTitle: lang('电子游艺'),
    gameNameEnglish: 'SLOT GAMES',
    gameInner: lang('提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。'),
  },
];

const hotGameList_php = [
  {
    type: 'douji',
    title: lang('斗鸡'),
    gameNameTitle: lang('斗鸡'),
    gameNameEnglish: 'SOBONG GAMES',
    gameInner: lang('斗鸡游戏'),
  },
  {
    type: 'fish',
    title: lang('捕鱼'),
    gameNameTitle: lang('捕鱼'),
    gameNameEnglish: 'FISHING GAMES',
    gameInner: lang('捕鱼游戏'),
  },
  {
    type: 'electronic',
    title: lang('电子'),
    gameNameTitle: lang('电子游艺'),
    gameNameEnglish: 'SLOT GAMES',
    gameInner: lang('提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。'),
  },
  {
    type: 'real',
    title: lang('真人'),
    gameNameTitle: lang('真人娱乐'),
    gameNameEnglish: 'LIVE CASINO',
    gameInner: lang(
        '互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。'
    ),
  },
  {
    type: 'sport',
    title: lang('体育'),
    gameNameTitle: lang('体育赛事'),
    gameNameEnglish: 'SPORTS EVENTS',
    gameInner: lang(
        '业内最高赔率,覆盖世界各地赛事,让球、大小、半全场、波胆单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播、让您轻松体验聊球投注,乐在其中。'
    ),
  },
  {
    type: 'bingo',
    title: lang('宾果'),
    gameNameTitle: lang('宾果游戏'),
    gameNameEnglish: 'BINGO GAMES',
    gameInner: lang(
        '宾果游戏'
    ),
  },
  {
    type: 'poker',
    title: lang('棋牌'),
    gameNameTitle: lang('棋牌游戏'),
    gameNameEnglish: 'CHESS & CARD GAMES',
    gameInner: lang(
        '提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。'
    ),
  },
];

const baseMenuData_mgm = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: [
      { depotCode: 'CMD', img_src: 'sports_cmd', title: lang('CMD体育'), enTxt: 'CMD SPORTS' },
      { depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
    ],
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      // { depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
      { depotCode: 'DG', img_src: 'real_dg', title: lang('DG真人'), enTxt: 'DG LIVE CASINO' },
      { depotCode: 'AELI', img_src: 'real_aeli', title: lang('AE真人'), enTxt: 'AE LIVE CASINO' },
      { depotCode: 'SA', img_src: 'real_sa', title: lang('SA真人'), enTxt: 'SA LIVE CASINO' },
      { depotCode: 'CQYX', img_src: 'real_cqyx', title: lang('CQ9真人'), enTxt: 'CQ9 LIVE CASINO' },
      { depotCode: 'EB', img_src: 'real_eb', title: lang('EB真人'), enTxt: 'EB LIVE CASINO' },
      { depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
      { depotCode: 'PTL', img_src: 'real_ptl', title: lang('PT真人'), enTxt: 'PT LIVE CASINO' },
    ],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'BL', img_src: 'chess_bl', enTxt: 'BL CHESS', title: lang('博乐棋牌'), topGameType: 'poker' },
      { depotCode: 'KM', img_src: 'chess_km', enTxt: 'BL CHESS', title: lang('KM棋牌'), topGameType: 'poker' },
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
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: [
      {
        depotCode: 'YBCP',
        img_src: 'lottery_ybcp',
        title: lang('云博彩票'),
        enTxt: 'YB LOTTERY GAME',
        topGameType: 'lottery',
      },
    ],
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 slot', title: 'CQ9', topGameType: 'electronic' },
      { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB slot', title: 'JDB', topGameType: 'electronic' },
      { depotCode: 'JILI', img_src: 'slot_jili', enTxt: 'JILI slot', title: 'JILI', topGameType: 'electronic' },
      { depotCode: 'SPG', img_src: 'slot_sg', enTxt: 'SPG slot', title: 'SPG', topGameType: 'electronic' },
      {
        depotCode: 'JOKE',
        img_src: 'slot_joke',
        enTxt: 'JOKE slot',
        title: lang('JOKE电子'),
        topGameType: 'electronic',
      },
      { depotCode: 'FISH', img_src: 'slot_fish', enTxt: 'Fishing', title: lang('捕鱼游戏'), topGameType: 'electronic' },
    ],
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
      { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ],
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

const baseMenuData_vvi = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: [
      { depotCode: 'CMD', img_src: 'sports_cmd', title: lang('CMD体育'), enTxt: 'CMD SPORTS' },
      { depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
      { depotCode: 'SBOVN', img_src: 'sports_sbovnbet', title: 'SBO ' + lang('体育'), enTxt: 'SBO SPORTS' },
    ],
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      { depotCode: 'DG', img_src: 'real_dg', title: lang('DG真人'), enTxt: 'DG LIVE CASINO' },
      { depotCode: 'AELI', img_src: 'real_aeli', title: lang('AE真人'), enTxt: 'AE LIVE CASINO' },
      { depotCode: 'SA', img_src: 'real_sa', title: lang('SA真人'), enTxt: 'SA LIVE CASINO' },
      { depotCode: 'EB', img_src: 'real_eb', title: lang('EB真人'), enTxt: 'EB LIVE CASINO' },
      { depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
      { depotCode: 'PTL', img_src: 'real_ptl', title: lang('PT真人'), enTxt: 'PT LIVE CASINO' },
      { depotCode: 'EVO', img_src: 'real_evo', title: lang('EVO真人'), enTxt: 'EVO LIVE CASINO' },
    ],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'KM', img_src: 'chess_km', enTxt: 'KM CHESS', title: lang('KM棋牌'), topGameType: 'poker' },
      { depotCode: 'BL', img_src: 'chess_bl', enTxt: 'BL CHESS', title: lang('博乐棋牌'), topGameType: 'poker' },
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
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: [
      {
        depotCode: 'YBCP',
        img_src: 'lottery_ybcp',
        title: lang('云博彩票'),
        enTxt: 'YB LOTTERY GAME',
        topGameType: 'lottery',
      },
    ],
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      { depotCode: 'JOKE', img_src: 'slot_joke', enTxt: 'JOKER slot', title: 'JOKER', topGameType: 'electronic' },
      { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 slot', title: 'CQ9', topGameType: 'electronic' },
      { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB slot', title: 'JDB', topGameType: 'electronic' },
      { depotCode: 'JILI', img_src: 'slot_jili', enTxt: 'JILI slot', title: 'JILI', topGameType: 'electronic' },
      { depotCode: 'SPG', img_src: 'slot_sg', enTxt: 'SPG slot', title: 'SPG', topGameType: 'electronic' },
      { depotCode: 'TTG', img_src: 'slot_ttg', enTxt: 'TTG slot', title: 'TTG', topGameType: 'electronic' },
      { depotCode: 'FISH', img_src: 'slot_fish', enTxt: 'Fishing', title: lang('捕鱼游戏'), topGameType: 'electronic' },
    ],
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
      { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ],
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

const baseMenuData_bw1 = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: (() => {
      if (VUE_APP_APP_BANK_ARE_CODE === 'MY') {
        return [
          { depotCode: 'FBSP', img_src: 'sports_fb', title: lang('FB体育'), enTxt: 'FB SPORTS' },
          { depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
          { depotCode: 'CMD', img_src: 'sports_cmd', title: lang('CMD体育'), enTxt: 'CMD SPORTS' },
          { depotCode: 'OBSP', img_src: 'sports_obsp', title: lang('PM体育'), enTxt: 'PM SPORTS' },
        ];
      }

      return [
        { depotCode: 'FBSP', img_src: 'sports_fb', title: lang('FB体育'), enTxt: 'FB SPORTS' },
        { depotCode: 'M8', img_src: 'sports_m8bet', title: lang('M8BET体育'), enTxt: 'M8BET SPORTS' },
        { depotCode: 'PLSP', img_src: 'sports_bl', title: lang('保利体育'), enTxt: 'PL SPORTS' },
        { depotCode: 'SBOVN', img_src: 'sports_sbovnbet', title: lang('SBO体育'), enTxt: 'SBO SPORTS' },
        { depotCode: 'IM2', img_src: 'sports_im2', title: lang('IM体育'), enTxt: 'IM SPORTS' },
        { depotCode: 'BOS', img_src: 'sports_bos', title: lang('皇冠体育'), enTxt: 'BOS SPORTS' },
        { depotCode: 'SXSP', img_src: 'sports_sxsp', title: lang('三昇体育'), enTxt: 'SXSP SPORTS' },
      ];
    })(),
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: (() => {
      if (VUE_APP_APP_BANK_ARE_CODE === 'MY') {
        return [
          { depotCode: 'OBLI', img_src: 'real_ob', title: lang('PM真人'), enTxt: 'PM LIVE CASINO' },
          { depotCode: 'CQYX', img_src: 'real_cqyx', title: lang('CQ9真人'), enTxt: 'CQ9 LIVE CASINO' },
          { depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
          { depotCode: 'BBIN2', img_src: 'real_bbin', title: lang('BBIN真人'), enTxt: 'BBIN LIVE CASINO' },
          { depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
          { depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
        ];
      }

      return [
        { depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
        { depotCode: 'BBIN2', img_src: 'real_bbin', title: lang('BBIN真人'), enTxt: 'BBIN LIVE CASINO' },
        { depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
        { depotCode: 'OBLI', img_src: 'real_ob', title: lang('PM真人'), enTxt: 'PM LIVE CASINO' },
        { depotCode: 'DG', img_src: 'real_dg', title: lang('DG真人'), enTxt: 'DG LIVE CASINO' },
        { depotCode: 'CQYX', img_src: 'real_cqyx', title: lang('CQ9真人'), enTxt: 'CQ9 LIVE CASINO' },
        { depotCode: 'WM', img_src: 'real_wm', title: lang('完美真人'), enTxt: 'WM LIVE CASINO' },
        { depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
        { depotCode: 'EB', img_src: 'real_eb', title: lang('EB真人'), enTxt: 'EB LIVE CASINO' },
        { depotCode: 'SEX', img_src: 'real_sex', title: lang('SE真人'), enTxt: 'SE LIVE CASINO' },
      ];
    })(),
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: (() => {
      if (VUE_APP_APP_BANK_ARE_CODE === 'MY') {
        return [
          { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: lang('开元棋牌'), topGameType: 'poker' },
          { depotCode: 'OBQP', img_src: 'chess_ob', enTxt: 'PM CHESS', title: lang('PM棋牌'), topGameType: 'poker' },
          { depotCode: 'BL', img_src: 'chess_bl', enTxt: 'BL CHESS', title: lang('博乐棋牌'), topGameType: 'poker' },
        ];
      }
      return [
        { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: lang('开元棋牌'), topGameType: 'poker' },
        { depotCode: 'LC', img_src: 'chess_kx', enTxt: 'KX CHESS', title: lang('凯旋棋牌'), topGameType: 'poker' },
        { depotCode: 'KM', img_src: 'chess_km', enTxt: 'KM CHESS', title: lang('KM棋牌'), topGameType: 'poker' },
      ];
    })(),
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: (() => {
      if (VUE_APP_APP_BANK_ARE_CODE === 'MY') {
        return [
          { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
          { depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA ESPORTS', title: lang('小艾电竞') },
        ];
      }
      return [
        { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
        { depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA ESPORTS', title: lang('小艾电竞') },
        { depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: lang('IM电竞') },
        { depotCode: 'OBES', img_src: 'electronic_obes', enTxt: 'PM ESPORTS', title: lang('PM电竞') },
      ];
    })(),
  },
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: (() => {
      if (VUE_APP_APP_BANK_ARE_CODE === 'MY') {
        if (language === 'zh') {
          return [
            {
              depotCode: 'OBCP',
              img_src: 'lottery_obcp',
              title: lang('PM彩票'),
              enTxt: 'PM LOTTERY GAME',
              topGameType: 'lottery',
            },
            {
              depotCode: 'TC',
              img_src: 'lottery_tc',
              title: lang('天成彩票'),
              enTxt: 'TC LOTTERY GAME',
              topGameType: 'lottery',
            },
            {
              depotCode: 'YBCP',
              img_src: 'lottery_ybcp',
              title: lang('云博彩票'),
              enTxt: 'YB LOTTERY GAME',
              topGameType: 'lottery',
            },
          ];
        }

        return [
          {
            depotCode: 'OBCP',
            img_src: 'lottery_obcp',
            title: lang('PM彩票'),
            enTxt: 'PM LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'YBCP',
            img_src: 'lottery_ybcp',
            title: lang('云博彩票'),
            enTxt: 'YB LOTTERY GAME',
            topGameType: 'lottery',
          },
        ];
      }

      if (language === 'zh') {
        return [
          {
            depotCode: 'IGGF',
            img_src: 'lottery_iggf',
            title: lang('IG官方彩'),
            enTxt: 'IG LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'IGSS',
            img_src: 'lottery_igss',
            title: lang('IG传统彩'),
            enTxt: 'IG LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'OBCP',
            img_src: 'lottery_obcp',
            title: lang('PM彩票'),
            enTxt: 'PM LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'SY',
            img_src: 'lottery_sy',
            title: lang('双赢彩票'),
            enTxt: 'SY LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'TC',
            img_src: 'lottery_tc',
            title: lang('天成彩票'),
            enTxt: 'TC LOTTERY GAME',
            topGameType: 'lottery',
          },
        ];
      }

      return [
        {
          depotCode: 'OBCP',
          img_src: 'lottery_obcp',
          title: lang('PM彩票'),
          enTxt: 'PM LOTTERY GAME',
          topGameType: 'lottery',
        },
      ];
    })(),
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: (() => {
      if (VUE_APP_APP_BANK_ARE_CODE === 'MY') {
        return [
          {
            depotCode: 'PGS',
            img_src: 'slot_pgs',
            enTxt: 'PGS GAME',
            title: lang('PGS电子'),
            topGameType: 'electronic',
          },
          {
            depotCode: 'CQ9',
            img_src: 'slot_cq9',
            enTxt: 'CQ9 GAME',
            title: lang('CQ9电子'),
            topGameType: 'electronic',
          },
          {
            depotCode: 'JDB',
            img_src: 'slot_jdb',
            enTxt: 'JDB GAME',
            title: lang('JDB电子'),
            topGameType: 'electronic',
          },
          {
            depotCode: 'MG2',
            img_src: 'slot_mg2',
            enTxt: 'MG2 GAME',
            title: lang('MG2电子'),
            topGameType: 'electronic',
          },
          {
            depotCode: 'JILI',
            img_src: 'slot_jili',
            enTxt: 'JILI GAME',
            title: lang('JILI电子'),
            topGameType: 'electronic',
          },
          { depotCode: 'PP', img_src: 'slot_pp', enTxt: 'PP GAME', title: lang('PP电子'), topGameType: 'electronic' },
          { depotCode: 'XE', img_src: 'slot_xe', enTxt: 'XE GAME', title: lang('XE电子'), topGameType: 'electronic' },
          { depotCode: 'ME', img_src: 'slot_me', enTxt: 'ME GAME', title: lang('ME电子'), topGameType: 'electronic' },
          {
            depotCode: 'FISH',
            img_src: 'slot_fish',
            enTxt: 'FISH GAME',
            title: lang('捕鱼游戏'),
            topGameType: 'electronic',
          },
        ];
      }

      return [
        { depotCode: 'PGS', img_src: 'slot_pgs', enTxt: 'PGS GAME', title: lang('PGS电子'), topGameType: 'electronic' },
        { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 GAME', title: lang('CQ9电子'), topGameType: 'electronic' },
        { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB GAME', title: lang('JDB电子'), topGameType: 'electronic' },
        { depotCode: 'AGST', img_src: 'slot_ag', enTxt: 'AG GAME', title: lang('AG电子'), topGameType: 'electronic' },
        { depotCode: 'GR', img_src: 'slot_gr', enTxt: 'GR GAME', title: lang('好路电子'), topGameType: 'electronic' },
        { depotCode: 'SPG', img_src: 'slot_sg', enTxt: 'SPG GAME', title: lang('SPG电子'), topGameType: 'electronic' },
        {
          depotCode: 'FISH',
          img_src: 'slot_fish',
          enTxt: 'FISH GAME',
          title: lang('捕鱼游戏'),
          topGameType: 'electronic',
        },
      ];
    })(),
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
      { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ],
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

const baseMenuData_jss = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: [
      { depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
      { depotCode: 'IM2', img_src: 'sports_im2', title: lang('IM体育'), enTxt: 'IM SPORTS' },
      { depotCode: 'PLSP', img_src: 'sports_bl', title: lang('保利体育'), enTxt: 'PL SPORTS' },
      { depotCode: 'M8', img_src: 'sports_m8bet', title: lang('M8BET体育'), enTxt: 'M8BET SPORTS' },
      { depotCode: 'OBSP', img_src: 'sports_obsp', title: lang('PM体育'), enTxt: 'PM SPORTS' },
      { depotCode: 'FBSP', img_src: 'sports_fb', title: lang('FB体育'), enTxt: 'FB SPORTS' },
    ],
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
			{ depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
			{ depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
			{ depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
			{ depotCode: 'WM', img_src: 'real_wm', title: lang('完美真人'), enTxt: 'WM LIVE CASINO' },
			{ depotCode: 'CQYX', img_src: 'real_cqyx', title: lang('CQ9真人'), enTxt: 'CQ9 LIVE CASINO' },
			{ depotCode: 'OBLI', img_src: 'real_ob', title: lang('PM真人'), enTxt: 'PM LIVE CASINO' },
			{ depotCode: 'ON', img_src: 'real_on', title: lang('ON真人'), enTxt: 'ON LIVE CASINO' },
			{ depotCode: 'BBIN2', img_src: 'real_bbin', title: lang('BBIN真人'), enTxt: 'BBIN LIVE CASINO' },
		],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'LC', img_src: 'chess_kx', enTxt: 'KX CHESS', title: lang('凯旋棋牌'), topGameType: 'poker' },
      { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: lang('开元棋牌'), topGameType: 'poker' },
      { depotCode: 'OBQP', img_src: 'chess_obqp', enTxt: 'PM CHESS', title: lang('PM棋牌'), topGameType: 'poker' },
    ],
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: [
      { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
      { depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: lang('IM电竞') },
      { depotCode: 'OBES', img_src: 'electronic_obes', enTxt: 'PM ESPORTS', title: lang('PM电竞') },
    ],
  },
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: (() => {
      if (language === 'zh') {
        return [
          {
            depotCode: 'IGGF',
            img_src: 'lottery_iggf',
            title: lang('IG官方彩'),
            enTxt: 'IG LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'IGSS',
            img_src: 'lottery_igss',
            title: lang('IG传统彩'),
            enTxt: 'IG LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'SY',
            img_src: 'lottery_sy',
            title: lang('双赢彩票'),
            enTxt: 'SY LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'OBCP',
            img_src: 'lottery_obcp',
            title: lang('PM彩票'),
            enTxt: 'PM LOTTERY GAME',
            topGameType: 'lottery',
          },
          {
            depotCode: 'TC',
            img_src: 'lottery_tc',
            title: lang('天成彩票'),
            enTxt: 'TC LOTTERY GAME',
            topGameType: 'lottery',
          },
        ];
      }
      return [
        {
          depotCode: 'OBCP',
          img_src: 'lottery_obcp',
          title: lang('PM彩票'),
          enTxt: 'PM LOTTERY GAME',
          topGameType: 'lottery',
        },
      ];
    })(),
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      {
        depotCode: 'PGS',
        img_src: 'slot_pgs',
        enTxt: 'PGS GAME',
        title: lang('PGS电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'CQ9',
        img_src: 'slot_cq9',
        enTxt: 'CQ9 GAME',
        title: lang('CQ9电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'JDB',
        img_src: 'slot_jdb',
        enTxt: 'JDB GAME',
        title: lang('JDB电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'MG2',
        img_src: 'slot_mg2',
        enTxt: 'MG2 GAME',
        title: lang('MG2电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'FISH',
        img_src: 'slot_fish',
        enTxt: 'FISH GAME',
        title: lang('捕鱼游戏'),
        topGameType: 'electronic',
      },
    ],
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
      { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ],
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

const baseMenuData_php = {
  doujiMenu: {
    saveType: 'set_douji',
    saveName: 'douji',
    cmName: 'DouJiMenu',
    catId: 49,
    list: [
      {
        depotCode: 'DSCF',
        img_src: 'sabong_dscf',
        enTxt: 'DS88 GAME',
        title: lang('DS88'),
        topGameType: 'douji',
      },
      {
        depotCode: 'SAB',
        img_src: 'sabong_sab',
        enTxt: 'SABONG GAME',
        title: lang('SABONG'),
        topGameType: 'douji',
      },
    ],
  },
  fishMenu: {
    saveType: 'set_catchfish',
    saveName: 'catchfish',
    cmName: 'FishMenu',
    catId: -2,
    list: [
      {
        depotCode: 'CQ9',
        img_src: 'fish_cq9',
        enTxt: 'CQ9',
        title: lang('CQ9捕鱼'),
        topGameType: 'fish',
      },
      {
        depotCode: 'JDB',
        img_src: 'fish_jdb',
        enTxt: 'JDB',
        title: lang('JDB捕鱼'),
        topGameType: 'fish',
      },
    ],
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      {
        depotCode: 'CQ9',
        img_src: 'slot_cq9',
        enTxt: 'CQ9 GAME',
        title: lang('CQ9电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'JDB',
        img_src: 'slot_jdb',
        enTxt: 'JDB GAME',
        title: lang('JDB电子'),
        topGameType: 'electronic',
      },
      {
        depotCode: 'JILI2',
        img_src: 'slot_jili',
        enTxt: 'JILI GAME',
        title: 'JILI Slot',
        topGameType: 'electronic'
      },
      {
        depotCode: 'YBG',
        img_src: 'slot_ybg',
        enTxt: 'YBG GAME',
        title: 'YBG Slot',
        topGameType: 'electronic'
      },
			{
				depotCode: 'PGS',
				img_src: 'slot_pgs',
				enTxt: 'PGS GAME',
				title: lang('PGS电子'),
				topGameType: 'electronic',
			},
      {
        depotCode: 'WMST',
        img_src: 'slot_wmst',
        enTxt: 'WM GAME',
        title: lang('WM电子'),
        topGameType: 'electronic',
      },
			{
				depotCode: 'YBG',
				img_src: 'slot_ybg',
				enTxt: 'YES BINGO',
				title: 'YES BINGO',
				topGameType: 'electronic',
			},
      {
        depotCode: 'FC2',
        img_src: 'slot_fc2',
        enTxt: 'FACAI GAME',
        title: lang('发财电子'),
        topGameType: 'electronic',
      },
    ],
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: (() => {
      return [
        { depotCode: 'DG', img_src: 'real_dg', title: lang('DG真人'), enTxt: 'DG LIVE CASINO' },
        { depotCode: 'EVO', img_src: 'real_evo', title: lang('EVO真人'), enTxt: 'EVO LIVE CASINO' },
				{ depotCode: 'SEX', img_src: 'real_sex', title: lang('SE真人'), enTxt: 'SE LIVE CASINO' },
				{ depotCode: 'WM', img_src: 'real_wm', title: lang('完美真人'), enTxt: 'WM LIVE CASINO' },
      ];
    })(),
  },
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1, // - 请求游戏参数表示
    list: [{ depotCode: 'FBSP', img_src: 'sports_fb', title: lang('FB体育'), enTxt: 'FB SPORTS' }],
  },
  bingoMenu: {
    saveType: 'set_bingo',
    saveName: 'bingo',
    cmName: 'BingoMenu',
    catId: -11,
    list: [
      {
        depotCode: 'JILI2',
        img_src: 'bingo_jili',
        enTxt: 'JILI bingo',
        title: lang('JILI宾果'),
        topGameType: 'bingo',
      },
      {
        depotCode: 'YBG',
        img_src: 'bingo_ybg',
        enTxt: 'YBG bingo',
        title: 'YBG BINGO',
        topGameType: 'bingo',
      },
    ],
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [{ depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY POKER', title: lang('开元棋牌'), topGameType: 'poker' },
   ],
  },
  discountMenu: {
    list: [
      { img_src: 'discount_douji', title: lang('斗鸡优惠'), text: lang('斗鸡') },
      { img_src: 'discount_catchfish', title: lang('捕鱼优惠'), text: lang('捕鱼') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_bingo', title: lang('宾果优惠'), text: lang('宾果') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ],
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_android',
    btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')],
  },
};

if (VUE_APP_APP_SIGN === 'jvi' || VUE_APP_APP_SIGN === 'lua') {
  baseMenuData = baseMenuData_vi;
  hotGameList = hotGameList_vi;
}

if (VUE_APP_APP_SIGN === 'mgm') {
  baseMenuData = baseMenuData_mgm;
}

if (VUE_APP_APP_SIGN === 'vvi') {
  baseMenuData = baseMenuData_vvi;
}

if (VUE_APP_APP_SIGN === 'bw1') {
  baseMenuData = baseMenuData_bw1;
}
if (VUE_APP_APP_SIGN === 'jss') {
  baseMenuData = baseMenuData_jss;
}
if (VUE_APP_APP_SIGN === 'php') {
  baseMenuData = baseMenuData_php;
  hotGameList = hotGameList_php;
}

export { baseMenuData, hotGameList };
