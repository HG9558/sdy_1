import { lang, _lang } from "@/i18n";
const { VUE_APP_APP_TITLE, VUE_APP_APP_SIGN } = process.env

//- 备选游戏清单
let baseMenuData = {
  sportsMenu: {
    saveName: 'sport',
    saveType: 'set_sport',
    catId: 1,  // - 请求游戏参数表示
    list: [
			// { depotCode: 'FBSP', img_src: 'sports_fb', title:  lang('FB体育'), enTxt: 'FB SPORTS' },
			// { depotCode: 'OBSP', img_src: 'sports_bog', title: 'SDY体育', enTxt: 'SDY SPORTS' },
      // { depotCode: 'SBA', img_src: 'sports_saba', title: '沙巴体育', enTxt: 'SABA SPORTS' },
      { depotCode: 'M8', img_src: 'sports_m8bet', title: lang('M8BET体育'), enTxt: 'M8BET SPORTS' },
      // { depotCode: 'IM2', img_src: 'sports_im2', title: 'IM体育', enTxt: 'IM SPORTS' },
      { depotCode: 'PLSP', img_src: 'sports_bl', title: lang('保利体育'), enTxt: 'PL SPORTS' },
      // { depotCode: 'XJ', img_src: 'sports_another', title: 'SDY体育', enTxt: 'SDY SPORTS' },
      // { depotCode: 'XM', img_src: 'sports_another', title: '熊猫体育', enTxt: 'XJ SPORTS'},
    ]
  },
  realMenu: {
    saveType: 'set_real',
    saveName: 'real',
    catId: 3,
    list: [
      // { depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
      // { depotCode: 'BBIN2', img_src: 'real_bbin', title: lang('BBIN真人'), enTxt: 'BBIN LIVE CASINO' },
      // { depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
      // { depotCode: 'OBLI', img_src: 'real_ob', title: lang('OB真人'), enTxt: 'OB LIVE CASINO' },
      { depotCode: 'DG', img_src: 'real_dg', title: lang('DG真人'), enTxt: 'DG LIVE CASINO' },
      { depotCode: 'WM', img_src: 'real_wm', title: lang('WM真人'), enTxt: 'WM LIVE CASINO' },
			{ depotCode: 'EVO', img_src: 'real_evo', title: lang('EVO真人'), enTxt: 'EVO LIVE CASINO' },
		]
  },
  chessMenu: {
    saveType: 'set_poker',
    saveName: 'poker',
    catId: 6,
    list: [
      { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: lang('开元棋牌'), topGameType: 'poker' },
      { depotCode: 'LC', img_src: 'chess_kx', enTxt: 'KX CHESS', title: lang('凯旋棋牌'), topGameType: 'poker' },
      // { depotCode: 'OBQP', img_src: 'chess_ob', enTxt: 'OB CHESS', title: 'OB棋牌', topGameType: 'poker' },
			{ depotCode: 'KM', img_src: 'chess_km', enTxt: 'KM CHESS', title: lang('KM棋牌'), topGameType: 'poker' },
    ]
  },
  electronicMenu: {
    saveType: 'set_esport',
    saveName: 'esport',
    catId: 9,
    list: [
      { depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
      // { depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: lang('IM电竞') },
      // { depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA ESPORTS', title: lang('小艾电竞') },
    ]
  },
  // lotteryMenu: {
  //   saveType: 'set_lottery',
  //   saveName: 'lottery',
  //   catId: 12,
  //   list: [
  //     { depotCode: 'IGGF', img_src: 'lottery_iggf', title: lang('IG官方彩'), enTxt: 'IG LOTTERY GAME', topGameType: 'lottery' },
  //     { depotCode: 'IGSS', img_src: 'lottery_igss', title: lang('IG传统彩'), enTxt: 'IG LOTTERY GAME', topGameType: 'lottery' },
  //     { depotCode: 'OBCP', img_src: 'lottery_obcp', title: lang('OB彩票'), enTxt: 'OB LOTTERY GAME', topGameType: 'lottery' },
  //     { depotCode: 'SY', img_src: 'lottery_sy', title: lang('双赢彩票'), enTxt: 'SY LOTTERY GAME', topGameType: 'lottery' },
  //     { depotCode: 'TC', img_src: 'lottery_tc', title: lang('天成彩票'), enTxt: 'TC LOTTERY GAME', topGameType: 'lottery' },
  //   ]
  // },
  slotMenu: {
    saveType: 'set_electronic',
    saveName: 'electronic',
    cmName: 'SlotMenu',
    catId: -1,
    list: [
      // { depotCode: 'PGS', img_src: 'slot_pgs', enTxt: 'PGS GAME', title: lang('PGS电子'), topGameType: 'electronic' },
      // { depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 GAME', title: lang('CQ9电子'), topGameType: 'electronic' },
      { depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB GAME', title: lang('JDB电子'), topGameType: 'electronic' },
      // { depotCode: 'AGST', img_src: 'slot_ag', enTxt: 'AG GAME', title: lang('AG电子'), topGameType: 'electronic' },
      { depotCode: 'GR', img_src: 'slot_gr', enTxt: 'GR GAME', title: lang('好路电子'), topGameType: 'electronic' },
          // { depotCode: 'MG2', img_src: 'slot_mg2', enTxt: 'MG2 GAME', title: 'MG2电子', topGameType: 'electronic' },
      { depotCode: 'FISH', img_src: 'slot_fish', enTxt: 'FISH GAME', title: lang('捕鱼游戏'), topGameType: 'electronic' },
    ]
  },
  discountMenu: {
    list: [
      { img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
      { img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
      { img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
      { img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
      { img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
      { img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
    ]
  },
  partnerMenu: {
    showBtn: false,
    leftImgLink: 'special_ios',
    btnList:  [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')]
  },
}

const baseMenuData_goa = {
	sportsMenu: {
		saveName: 'sport',
		saveType: 'set_sport',
		catId: 1,  // - 请求游戏参数表示
		list: [
			{ depotCode: 'FBSP', img_src: 'sports_fb', title:  lang('FB体育'), enTxt: 'FB SPORTS' },
			{ depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
			{ depotCode: 'M8', img_src: 'sports_m8bet', title: lang('M8BET体育'), enTxt: 'M8BET SPORTS' },
			{ depotCode: 'PLSP', img_src: 'sports_bl', title: lang('保利体育'), enTxt: 'PL SPORTS' },
			// { depotCode: 'OBSP', img_src: 'sports_bog', title: 'SDY体育', enTxt: 'SDY SPORTS' },
			// { depotCode: 'IM2', img_src: 'sports_im2', title: 'IM体育', enTxt: 'IM SPORTS' },
			// { depotCode: 'XJ', img_src: 'sports_another', title: 'SDY体育', enTxt: 'SDY SPORTS' },
			// { depotCode: 'XM', img_src: 'sports_another', title: '熊猫体育', enTxt: 'XJ SPORTS'},
		]
	},
	realMenu: {
		saveType: 'set_real',
		saveName: 'real',
		catId: 3,
		list: [
			{ depotCode: 'BBIN2', img_src: 'real_bbin', title: lang('BBIN真人'), enTxt: 'BBIN LIVE CASINO' },
			{ depotCode: 'SA', img_src: 'real_sa', title: lang('SA真人'), enTxt: 'SA LIVE CASINO' },
			// { depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
			// { depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
			// { depotCode: 'OBLI', img_src: 'real_ob', title: lang('OB真人'), enTxt: 'OB LIVE CASINO' },
			// { depotCode: 'DG', img_src: 'real_dg', title: lang('DG真人'), enTxt: 'DG LIVE CASINO' },
			// { depotCode: 'WM', img_src: 'real_wm', title: lang('WM真人'), enTxt: 'WM LIVE CASINO' },
		]
	},
	chessMenu: {
		saveType: 'set_poker',
		saveName: 'poker',
		catId: 6,
		list: [
			{ depotCode: 'BL', img_src: 'chess_bl', enTxt: 'BL CHESS', title: lang('博乐棋牌'), topGameType: 'poker' },
			// { depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: lang('开元棋牌'), topGameType: 'poker' },
			// { depotCode: 'LC', img_src: 'chess_kx', enTxt: 'KX CHESS', title: lang('凯旋棋牌'), topGameType: 'poker' },
			// { depotCode: 'OBQP', img_src: 'chess_ob', enTxt: 'OB CHESS', title: 'OB棋牌', topGameType: 'poker' },
		]
	},
	electronicMenu: {
		saveType: 'set_esport',
		saveName: 'esport',
		catId: 9,
		list: [
			{ depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
			{ depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA ESPORTS', title: lang('小艾电竞') },
			// { depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: lang('IM电竞') },
		]
	},
	lotteryMenu: {
		saveType: 'set_lottery',
		saveName: 'lottery',
		catId: 12,
		list: [
			{ depotCode: 'OBCP', img_src: 'lottery_obcp', title: lang('OB彩票'), enTxt: 'OB LOTTERY GAME', topGameType: 'lottery' },
			{ depotCode: 'YBCP', img_src: 'lottery_ybcp', title: lang('云博彩票'), enTxt: 'YB LOTTERY GAME', topGameType: 'lottery' },
			// { depotCode: 'IGGF', img_src: 'lottery_iggf', title: lang('IG官方彩'), enTxt: 'IG LOTTERY GAME', topGameType: 'lottery' },
			// { depotCode: 'IGSS', img_src: 'lottery_igss', title: lang('IG传统彩'), enTxt: 'IG LOTTERY GAME', topGameType: 'lottery' },
			// { depotCode: 'SY', img_src: 'lottery_sy', title: lang('双赢彩票'), enTxt: 'SY LOTTERY GAME', topGameType: 'lottery' },
			// { depotCode: 'TC', img_src: 'lottery_tc', title: lang('天成彩票'), enTxt: 'TC LOTTERY GAME', topGameType: 'lottery' },
		]
	},
	slotMenu: {
		saveType: 'set_electronic',
		saveName: 'electronic',
		cmName: 'SlotMenu',
		catId: -1,
		list: [
			{ depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 GAME', title: lang('CQ9电子'), topGameType: 'electronic' },
			{ depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB GAME', title: lang('JDB电子'), topGameType: 'electronic' },
			{ depotCode: 'GR', img_src: 'slot_gr', enTxt: 'GR GAME', title: lang('好路电子'), topGameType: 'electronic' },
			{ depotCode: 'FISH', img_src: 'slot_fish', enTxt: 'FISH GAME', title: lang('捕鱼游戏'), topGameType: 'electronic' },
			// { depotCode: 'PGS', img_src: 'slot_pgs', enTxt: 'PGS GAME', title: lang('PGS电子'), topGameType: 'electronic' },
			// { depotCode: 'AGST', img_src: 'slot_ag', enTxt: 'AG GAME', title: lang('AG电子'), topGameType: 'electronic' },
			// { depotCode: 'MG2', img_src: 'slot_mg2', enTxt: 'MG2 GAME', title: 'MG2电子', topGameType: 'electronic' },
		]
	},
	discountMenu: {
		list: [
			{ img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
			{ img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
			{ img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
			{ img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
			{ img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
			{ img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
		]
	},
	partnerMenu: {
		showBtn: false,
		leftImgLink: 'special_ios',
		btnList:  [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')]
	},
}

const baseMenuData_vvi = {
	sportsMenu: {
		saveName: 'sport',
		saveType: 'set_sport',
		catId: 1,  // - 请求游戏参数表示
		list: [
			{ depotCode: 'SBA', img_src: 'sports_saba', title: lang('沙巴体育'), enTxt: 'SABA SPORTS' },
		]
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
		]
	},
	chessMenu: {
		saveType: 'set_poker',
		saveName: 'poker',
		catId: 6,
		list: [
			{ depotCode: 'BL', img_src: 'chess_bl', enTxt: 'BL CHESS', title: lang('博乐棋牌'), topGameType: 'poker' },
		]
	},
	electronicMenu: {
		saveType: 'set_esport',
		saveName: 'esport',
		catId: 9,
		list: [
			{ depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
			{ depotCode: 'XA', img_src: 'electronic_xa', enTxt: 'IA ESPORTS', title: lang('小艾电竞') },
		]
	},
	lotteryMenu: {
		saveType: 'set_lottery',
		saveName: 'lottery',
		catId: 12,
		list: [
			{ depotCode: 'YBCP', img_src: 'lottery_ybcp', title: lang('云博彩票'), enTxt: 'YB LOTTERY GAME', topGameType: 'lottery' },
		]
	},
	slotMenu: {
		saveType: 'set_electronic',
		saveName: 'electronic',
		cmName: 'SlotMenu',
		catId: -1,
		list: [
			{ depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 GAME', title: lang('CQ9电子'), topGameType: 'electronic' },
			{ depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB GAME', title: lang('JDB电子'), topGameType: 'electronic' },
			{ depotCode: 'JILI', img_src: 'slot_jili', enTxt: 'JILI GAME', title: lang('JILI电子'), topGameType: 'electronic' },
			{ depotCode: 'SPG', img_src: 'slot_sg', enTxt: 'SPG GAME', title: lang('SPG电子'), topGameType: 'electronic' },
			{ depotCode: 'FISH', img_src: 'slot_fish', enTxt: 'FISH GAME', title: lang('捕鱼游戏'), topGameType: 'electronic' },
		]
	},
	discountMenu: {
		list: [
			{ img_src: 'discount_spots', title: lang('体育优惠'), text: lang('体育') },
			{ img_src: 'discount_real', title: lang('真人优惠'), text: lang('真人') },
			{ img_src: 'discount_lottery', title: lang('彩票优惠'), text: lang('彩票') },
			{ img_src: 'discount_electronic', title: lang('电竞优惠'), text: lang('电竞') },
			{ img_src: 'discount_slot', title: lang('电子优惠'), text: lang('电子') },
			{ img_src: 'discount_chess', title: lang('棋牌优惠'), text: lang('棋牌') },
		]
	},
	partnerMenu: {
		showBtn: false,
		leftImgLink: 'special_ios',
		btnList:  [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')]
	},
}

let hotGameList = [
	{
		type: 'sport',
		title: lang("体育"),
		gameNameTitle: lang("体育赛事"),
		gameNameEnglish: "SPORTS EVENTS",
		gameInner: lang('业内最高赔率,覆盖世界各地赛事,让球、大小、半全场、波胆单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播、让您轻松体验聊球投注,乐在其中。')
	},
	{
		type: 'real',
		title: lang("真人"),
		gameNameTitle: lang("真人娱乐"),
		gameNameEnglish: "LIVE CASINO",
		gameInner: lang('互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。')
	},
	{
		type: 'poker',
		title: lang("棋牌"),
		gameNameTitle: lang("棋牌游戏"),
		gameNameEnglish: "CHESS & CARD GAMES",
		gameInner: lang('提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。')
	},
	{
		type: 'esport',
		title: lang("电竞"),
		gameNameTitle: lang("电子竞技"),
		gameNameEnglish: "ESPORTS GAMES",
		gameInner: lang('提供所有大型赛事，每月玩家可期待超过百場比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。')
	},
	{
		type: 'lottery',
		title: lang("彩票"),
		gameNameTitle: lang("彩票投注"),
		gameNameEnglish: "LOTTERY GAMES",
		gameInner: _lang('lotteryGameInner', { siteTitle: VUE_APP_APP_TITLE }),
	},
	{
		type: 'electronic',
		title: lang("电子"),
		gameNameTitle: lang("电子游艺"),
		gameNameEnglish: "GREAT GAMES",
		gameInner: lang('提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。')
	},
]

const hotGameList_ywb = [
	{
		type: 'sport',
		title: lang("体育"),
		gameNameTitle: lang("体育赛事"),
		gameNameEnglish: "SPORTS EVENTS",
		gameInner: lang('业内最高赔率,覆盖世界各地赛事,让球、大小、半全场、波胆单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播、让您轻松体验聊球投注,乐在其中。')
	},
	{
		type: 'real',
		title: lang("真人"),
		gameNameTitle: lang("真人娱乐"),
		gameNameEnglish: "LIVE CASINO",
		gameInner: lang('互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。')
	},
	// {
	//   type: 'poker',
	//   title: lang("棋牌"),
	//   gameNameTitle: lang("棋牌游戏"),
	//   gameNameEnglish: "CHESS & CARD GAMES",
	//   gameInner: lang('提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。')
	// },
	{
		type: 'esport',
		title: lang("电竞"),
		gameNameTitle: lang("电子竞技"),
		gameNameEnglish: "ESPORTS GAMES",
		gameInner: lang('提供所有大型赛事，每月玩家可期待超过百場比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。')
	},
	// {
	//   type: 'lottery',
	//   title: lang("彩票"),
	//   gameNameTitle: lang("彩票投注"),
	//   gameNameEnglish: "LOTTERY GAMES",
	//   gameInner: _lang('lotteryGameInner', { siteTitle: VUE_APP_APP_TITLE }),
	// },
	{
		type: 'electronic',
		title: lang("电子"),
		gameNameTitle: lang("电子游艺"),
		gameNameEnglish: "GREAT GAMES",
		gameInner: lang('提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。')
	},
]

if (VUE_APP_APP_SIGN === 'ywb') {
	hotGameList = hotGameList_ywb
}

if (VUE_APP_APP_SIGN === 'goa') {
	baseMenuData = baseMenuData_goa
}

if (VUE_APP_APP_SIGN === 'vvi') {
	baseMenuData = baseMenuData_vvi
}

export { baseMenuData, hotGameList }
