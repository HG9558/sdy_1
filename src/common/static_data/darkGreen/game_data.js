import { lang, _lang, language } from '@/i18n'
const { VUE_APP_APP_TITLE, VUE_APP_APP_SIGN, VUE_APP_APP_BANK_ARE_CODE } = process.env

//- 备选游戏清单
let baseMenuData = {
	sportsMenu: {
		saveName: 'sport',
		saveType: 'set_sport',
		catId: 1,  // - 请求游戏参数表示
		list: [
			{ depotCode: 'M8', img_src: 'sports_m8bet', title: lang('M8BET体育'), enTxt: 'M8BET SPORTS' },
			{ depotCode: 'IM2', img_src: 'sports_im2', title: lang('IM体育'), enTxt: 'IM SPORTS' },
			{ depotCode: 'SBOS', img_src: 'sports_sbosbet', title: lang('SBO体育'), enTxt: 'SBO SPORTS' },
			{ depotCode: 'SXSP', img_src: 'sports_sxsp', title: lang('三昇体育'), enTxt: 'SXSP SPORTS' },
		]
	},
	realMenu: {
		saveType: 'set_real',
		saveName: 'real',
		catId: 3,
		list: [
			{ depotCode: 'AGIN', img_src: 'real_ag', title: lang('AG真人'), enTxt: 'AG LIVE CASINO' },
			{ depotCode: 'BG', img_src: 'real_bg', title: lang('BG真人'), enTxt: 'BG LIVE CASINO' },
			{ depotCode: 'EB', img_src: 'real_eb', title: lang('EB真人'), enTxt: 'EB LIVE CASINO' },
			{ depotCode: 'CQYX', img_src: 'real_cqyx', title: lang('CQ9真人'), enTxt: 'CQ9 LIVE CASINO' },
			{ depotCode: 'OBLI', img_src: 'real_ob', title: lang('PM真人'), enTxt: 'PM LIVE CASINO' },
			{ depotCode: 'ABET', img_src: 'real_abet', title: lang('AB真人'), enTxt: 'AB LIVE CASINO' },
			{ depotCode: 'PP', img_src: 'real_pp', title: lang('PP真人'), enTxt: 'PP LIVE CASINO' },
		]
	},
	chessMenu: {
		saveType: 'set_poker',
		saveName: 'poker',
		catId: 6,
		list: [
			{ depotCode: 'KY', img_src: 'chess_ky', enTxt: 'KY CHESS', title: lang('开元棋牌'), topGameType: 'poker' },
			{ depotCode: 'LC', img_src: 'chess_kx', enTxt: 'KX CHESS', title: lang('凯旋棋牌'), topGameType: 'poker' },
			{ depotCode: 'KMQM', img_src: 'chess_km', enTxt: 'KM CHESS', title: lang('KM棋牌'), topGameType: 'poker' },
		]
	},
	electronicMenu: {
		saveType: 'set_esport',
		saveName: 'esport',
		catId: 9,
		list: [
			{ depotCode: 'TF', img_src: 'electronic_tf', enTxt: 'TF ESPORTS', title: lang('雷火电竞') },
			{ depotCode: 'IM', img_src: 'electronic_im', enTxt: 'IM ESPORTS', title: lang('IM电竞') },
		]
	},
	lotteryMenu: {
		saveType: 'set_lottery',
		saveName: 'lottery',
		catId: 12,
		list: [
			{ depotCode: 'IGGF', img_src: 'lottery_iggf', title: lang('IG官方彩'), enTxt: 'IG LOTTERY Slot', topGameType: 'lottery' },
			{ depotCode: 'IGSS', img_src: 'lottery_igss', title: lang('IG传统彩'), enTxt: 'IG LOTTERY Slot', topGameType: 'lottery' },
			{ depotCode: 'SY', img_src: 'lottery_sy', title: lang('双赢彩票'), enTxt: 'SY LOTTERY Slot', topGameType: 'lottery' },
		]
	},
	slotMenu: {
		saveType: 'set_electronic',
		saveName: 'electronic',
		cmName: 'SlotMenu',
		catId: -1,
		list: [
			{ depotCode: 'PGS', img_src: 'slot_pgs', enTxt: 'PGS Slot', title: lang('PGS电子'), topGameType: 'electronic' },
			{ depotCode: 'CQ9', img_src: 'slot_cq9', enTxt: 'CQ9 Slot', title: lang('CQ9电子'), topGameType: 'electronic' },
			{ depotCode: 'JDB', img_src: 'slot_jdb', enTxt: 'JDB Slot', title: lang('JDB电子'), topGameType: 'electronic' },
			{ depotCode: 'GR', img_src: 'slot_gr', enTxt: 'GR Slot', title: lang('好路电子'), topGameType: 'electronic' },
			{ depotCode: 'JILI', img_src: 'slot_jili', enTxt: 'JILI Slot', title: lang('JILI电子'), topGameType: 'electronic' },
			{ depotCode: 'BBIS', img_src: 'slot_bbis', enTxt: 'BBIN Slot', title: lang('BBIN电子'), topGameType: 'electronic' },
			{ depotCode: 'JOKE', img_src: 'slot_joke', enTxt: 'JOKER Slot', title: lang('JOKER电子'), topGameType: 'electronic' },
			{ depotCode: 'AGST', img_src: 'slot_ag', enTxt: 'AG Slot', title: lang('AG电子'), topGameType: 'electronic' },
			{ depotCode: 'SPG', img_src: 'slot_spg', enTxt: 'SPG Slot', title: lang('SPG电子'), topGameType: 'electronic' },
			{ depotCode: 'YGG', img_src: 'slot_ygg', enTxt: 'YGG Slot', title: lang('YGG电子'), topGameType: 'electronic' },
			{ depotCode: 'PP', img_src: 'slot_pp', enTxt: 'PP Slot', title: lang('PP电子'), topGameType: 'electronic' },
			{ depotCode: 'LI', img_src: 'slot_li', enTxt: 'LIVE22 Slot', title: lang('LIVE22电子'), topGameType: 'electronic' },
			{ depotCode: 'DSST', img_src: 'slot_dsst', enTxt: 'DSST Slot', title: lang('DS电子'), topGameType: 'electronic' },
			{ depotCode: 'AMB', img_src: 'slot_amb', enTxt: 'AMEBA Slot', title: lang('AMEBA电子'), topGameType: 'electronic' },
			{ depotCode: 'FISH', img_src: 'slot_fish', enTxt: 'Fishing', title: lang('捕鱼游戏'), topGameType: 'electronic' },
		]
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
			]

			if (VUE_APP_APP_SIGN === 'aus') {
				return list.filter( v => v.img_src !== 'discount_lottery')
			}
			return list
		})()
	},
	partnerMenu: {
		showBtn: false,
		leftImgLink: 'special_android',
		btnList: [lang('超级返佣比例'), lang('最优质的产品'), lang('最精确的数据')]
	},
}

let hotGameList = [
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
		gameNameEnglish: "CHESS & CARD GAMES",
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
		type: 'electronic',
		title: lang('老虎机'),
		gameNameTitle: lang('老虎机'),
		gameNameEnglish: "SLOT GAMES",
		gameInner: lang('提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大奖等你来。'),
	},
]

if (VUE_APP_APP_SIGN === 'aus') {
	delete baseMenuData.lotteryMenu

	hotGameList = hotGameList.filter( v => {
		return v.type !== 'lottery'
	})
}


export { baseMenuData, hotGameList }
