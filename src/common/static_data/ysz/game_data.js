//- 备选游戏清单
export const baseMenuData = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1,  // - 请求游戏参数表示
    list: [
      { depotCode: 'OBSP', img_src: 'sports_bog', title: '悟空体育', enTxt: 'GOKU SPORTS' },
      { depotCode: 'SBA', img_src: 'sports_saba', title: '沙巴体育', enTxt: 'SABA SPORTS' },
      { depotCode: 'M8', img_src: 'sports_m8bet', title: 'M8BET体育', enTxt: 'M8BET SPORTS' },
      { depotCode: 'FBSP', img_src: 'sports_fb', title: 'FB体育', enTxt: 'FB SPORTS' },
      { depotCode: 'IM2', img_src: 'sports_im2', title: 'IM体育', enTxt: 'IM SPORTS' },
      { depotCode: 'PLSP', img_src: 'sports_bl', title: '保利体育', enTxt: 'PL SPORTS' },
    ]
  },
  sabongNemu: {
    saveName: 'sabong',
    saveType: 'set_sabong',
    catId: 49,  // - 请求游戏参数表示
    list: [
      { depotCode: 'SABG', img_src: 'sabong_sabg', title: '斗鸡', enTxt: 'SABONG GAMING' }, 
    ]
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      { depotCode: 'AGIN', img_src: 'real_ag', title: 'AG真人', enTxt: 'AG LIVE CASINO' },
      { depotCode: 'WM', img_src: 'real_wm', title: '完美真人', enTxt: 'WM LIVE CASINO' },
      { depotCode: 'BBIN2', img_src: 'real_bbin', title: 'BBIN真人', enTxt: 'BBIN LIVE CASINO' },
      { depotCode: 'BG', img_src: 'real_bg', title: 'BG真人', enTxt: 'BG LIVE CASINO' },
      { depotCode: 'OBLI', img_src: 'real_ob', title: 'OB真人', enTxt: 'OB LIVE CASINO' },
    ]
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: '开元棋牌', topGameType: 'poker' },
      { depotCode: 'LC', img_src: 'chess_kx', enTxt: 'KX CHESS', title: '凯旋棋牌', topGameType: 'poker' },
      { depotCode: 'OBQP', img_src: 'chess_ob', enTxt: 'OB CHESS', title: 'OB棋牌', topGameType: 'poker' },
    ]
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: [
      { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: '雷火电竞' },
      { depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: 'IM电竞' },
    ]
  },
  lotteryMenu: {
    saveType: 'set_lottery',
    saveName: 'lottery',
    catId: 12,
    list: [
      { depotCode: 'IGGF', img_src: 'lottery_iggf', title: 'IG官方彩', enTxt: 'IG LOTTERY GAME', topGameType: 'lottery' },
      { depotCode: 'IGSS', img_src: 'lottery_igss', title: 'IG传统彩', enTxt: 'IG LOTTERY GAME', topGameType: 'lottery' },
      { depotCode: 'OBCP', img_src: 'lottery_obcp', title: 'OB彩票', enTxt: 'OB LOTTERY GAME', topGameType: 'lottery' },
      { depotCode: 'SY', img_src: 'lottery_sy', title: '双赢彩票', enTxt: 'SY LOTTERY GAME', topGameType: 'lottery' },
      { depotCode: 'TC', img_src: 'lottery_tc', title: '天成彩票', enTxt: 'TC LOTTERY GAME', topGameType: 'lottery' },
    ]
  },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      { depotCode: 'PGS', img_src: 'slot_pgs', enTxt: 'PGS GAME', title: 'PGS电子', topGameType: 'electronic' },
      { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 GAME', title: 'CQ9电子', topGameType: 'electronic' },
      { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB GAME', title: 'JDB电子', topGameType: 'electronic' },
      { depotCode: 'MG2', img_src: 'slot_mg2', enTxt: 'MG2 GAME', title: 'MG2电子', topGameType: 'electronic' },
      { depotCode: 'AGST', img_src: 'slot_agst', enTxt: 'AG GAME', title: 'AG电子', topGameType: 'electronic' },
      { depotCode: 'FISH', img_src: 'slot_fish', enTxt: 'FISH GAME', title: '捕鱼游戏', topGameType: 'electronic' },
    ]
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: '体育优惠' },
      { img_src: 'discount_real', title: '真人优惠' },
      { img_src: 'discount_lottery', title: '彩票优惠' },
      { img_src: 'discount_electronic', title: '电竞优惠' },
      { img_src: 'discount_slot', title: '电子优惠' },
      { img_src: 'discount_chess', title: '棋牌优惠' },
    ]
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'partner_bg',
    btnList: ['超级返佣比例', '最优质的产品', '最精确的数据']
  },
}

export const hotGameList = [
  {
    type: 'sport',
    title: "体育",
    gameNameTitle: "体育赛事",
    gameNameEnglish: "SPORTS EVENTS",
    gameInner: '业内最高赔率,覆盖世界各地赛事,让球、大小、半全场、波胆单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播、让您轻松体验聊球投注,乐在其中。'
  },
  {
    type: 'real',
    title: "真人",
    gameNameTitle: "真人娱乐",
    gameNameEnglish: "LIVE CASINO",
    gameInner: '互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。'
  },
  {
    type: 'poker',
    title: "棋牌",
    gameNameTitle: "棋牌游戏",
    gameNameEnglish: "CHESS & CARD GAMES",
    gameInner: '提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。'
  },
  {
    type: 'esport',
    title: "电竞",
    gameNameTitle: "电子竞技",
    gameNameEnglish: "E-SPORTS",
    gameInner: '提供所有大型赛事，每月玩家可期待超过百場比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。'
  },
  {
    type: 'lottery',
    title: "彩票",
    gameNameTitle: "彩票投注",
    gameNameEnglish: "LOTTERY GAMES",
    gameInner: '超过百种彩票玩法任您赢！悟空包网为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。'
  },
  {
    type: 'electronic',
    title: "电子",
    gameNameTitle: "电子游艺",
    gameNameEnglish: "SLOT GAMES",
    gameInner: '提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。'
  },
]
