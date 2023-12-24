import { lang } from '@/i18n'
const { VUE_APP_APP_SIGN } = process.env

let navigatorList_default = [
    { name: lang('首页'), componentName: "HomeMenu", path: "/", icon: 'home', },
    { name: lang('体育'), componentName: "SportsMenu", path: "/physical", icon: 'sports', },
    { name: lang('真人'), componentName: "RealMenu", path: "/real", icon: 'person', },
    { name: lang('棋牌'), componentName: "ChessMenu", path: "/poker", icon: 'chess', },
    { name: lang('电竞'), componentName: "EsportMenu", path: "/e_sport", icon: 'slot', },
    { name: lang('彩票'), componentName: "LotteryMenu", path: "/lottery", icon: 'lottery', },
    { name: lang('电游'), componentName: "ElectronicMenu", path: "/electronic", icon: 'electronic', },
    { name: lang('优惠'), componentName: "DiscountsMenu", path: "/discount", icon: 'discount', },
    { name: lang('合营'), componentName: "PartnerMenu", path: "/partner", icon: 'partner', },
    // { name: lang('历史赞助'), componentName: "", path: "/sponsor", icon: 'sponsor', },
]

let navigatorList_php = [
    { name: lang('首页'), componentName: "HomeMenu", path: "/", icon: 'home', },
    { name: lang('斗鸡'), componentName: "DouJiMenu", path: "/douji", icon: 'douji', },
    { name: lang('捕鱼'), componentName: "FishMenu", path: "/fish", icon: 'fish', },
    { name: lang('电游'), componentName: "ElectronicMenu", path: "/electronic", icon: 'electronic', },
    { name: lang('真人'), componentName: "RealMenu", path: "/real", icon: 'person', },
    { name: lang('体育'), componentName: "SportsMenu", path: "/physical", icon: 'sports', },
    { name: lang('宾果'), componentName: "BingoMenu", path: "/bingo", icon: 'bingo', },
    { name: lang('棋牌'), componentName: "ChessMenu", path: "/poker", icon: 'chess', },
    { name: lang('优惠'), componentName: "DiscountsMenu", path: "/discount", icon: 'discount', },
    // { name: lang('合营'), componentName: "PartnerMenu", path: "/partner", icon: 'partner', },
    // { name: lang('历史赞助'), componentName: "", path: "/sponsor", icon: 'sponsor', },
]

let navigatorList_jvi = [
	{ name: lang('首页'), componentName: "HomeMenu", path: "/", icon: 'home', },
	{ name: lang('体育'), componentName: "SportsMenu", path: "/physical", icon: 'sports', },
	{ name: lang('真人'), componentName: "RealMenu", path: "/real", icon: 'person', },
	{ name: lang('电竞'), componentName: "EsportMenu", path: "/e_sport", icon: 'slot', },
	{ name: lang('彩票'), componentName: "LotteryMenu", path: "/lottery", icon: 'lottery', },
	{ name: lang('电游'), componentName: "ElectronicMenu", path: "/electronic", icon: 'electronic', },
	{ name: lang('优惠'), componentName: "DiscountsMenu", path: "/discount", icon: 'discount', },
	{ name: lang('合营'), componentName: "PartnerMenu", path: "/partner", icon: 'partner', },
	{ name: "APP", componentName: "AppDownload", path: "", icon: 'appDownload', }
]

let navigatorList_lua = [
  { name: lang('首页'), componentName: "HomeMenu", path: "/", icon: 'home', },
  { name: lang('体育'), componentName: "SportsMenu", path: "/physical", icon: 'sports', },
  { name: lang('真人'), componentName: "RealMenu", path: "/real", icon: 'person', },
  { name: lang('棋牌'), componentName: "ChessMenu", path: "/poker", icon: 'chess', },
  { name: lang('电竞'), componentName: "EsportMenu", path: "/e_sport", icon: 'slot', },
  { name: lang('彩票'), componentName: "LotteryMenu", path: "/lottery", icon: 'lottery', },
  { name: lang('电游'), componentName: "ElectronicMenu", path: "/electronic", icon: 'electronic', },
  { name: lang('优惠'), componentName: "DiscountsMenu", path: "/discount", icon: 'discount', },
  { name: "APP", componentName: "AppDownload", path: "", icon: 'appDownload', }
]

export const navigatorList = (function () {
  if (VUE_APP_APP_SIGN === 'jvi') {
    return navigatorList_jvi
  }

  if (VUE_APP_APP_SIGN === 'lua') {
    return  navigatorList_lua
  }

  if (VUE_APP_APP_SIGN === 'php') {
      return  navigatorList_php
  }

  return navigatorList_default
})()

//- 头部内容列表
export const selectList = [
  {
    icon: 'header_payment.png',
    on_icon: 'header_payment_hover.png',
    val: lang('存款'),
    path: '/profile/deposit',
  },
  {
    icon: 'header_transfer.png',
    on_icon: 'header_transfer_hover.png',
		val: lang('转账'),
		path: '/profile/wallet',
  },
  {
    icon: 'header_withdrawal.png',
    on_icon: 'header_withdrawal_hover.png',
		val: lang('取款'),
		path: '/profile/withdrawal',
  },
]
//- 头部内容列表
export const informationList = [
  {
    icon: 'header_profileico',
    on_icon: 'header_profileico_hover',
		val: lang('个人资料'),
		type: 'profile',
    path: '/profile',
  },
  {
    icon: 'header_vip',
    on_icon: 'header_vip_hover',
		val: lang('VIP特权'),
		type: 'vip',
    path: '/profile/vip',
  },
  {
    icon: 'header_transction',
    on_icon: 'header_transction_hover',
		val: lang('交易记录'),
		type: 'transaction',
    path: '/profile/transaction',
  },
  {
    icon: 'header_betting',
    on_icon: 'header_betting_hover',
		val: lang('投注记录'),
		type: 'bettingRecord',
    path: '/profile/bettingRecord',
  },
  {
    icon: 'header_news',
    on_icon: 'header_news_hover',
		val: lang('消息中心'),
		type: 'message',
    path: '/profile/message',
  }
]

const returnWaterDataDefault = {
    SportsMenu: { returnWater: '1.00%', en_flag: 'sports_flag' },
    RealMenu: { returnWater: '1.00%', en_flag: 'real_flag' },
    ChessMenu: { returnWater: '1.10%', en_flag: 'chess_flag' },
    ElectronicMenu: { returnWater: '1.20%', en_flag: 'electronic_flag' },
    LotteryMenu: { returnWater: null, en_flag: 'lottery_flag' },
    EsportMenu: { returnWater: '1.10%', en_flag: 'esports_flag' },
    DiscountsMenu: { returnWater: null, en_flag: 'discount_flag' },
    PartnerMenu: { returnWater: null, en_flag: 'perate_flag' },
}

const returnWaterDataMgm = {
  SportsMenu: { returnWater: '0.90%', en_flag: 'sports_flag' },
  RealMenu: { returnWater: '0.90%', en_flag: 'real_flag' },
  ChessMenu: { returnWater: '0.90%', en_flag: 'chess_flag' },
  ElectronicMenu: { returnWater: '1.10%', en_flag: 'electronic_flag' },
  LotteryMenu: { returnWater: null, en_flag: 'lottery_flag' },
  EsportMenu: { returnWater: '1.00%', en_flag: 'esports_flag' },
  DiscountsMenu: { returnWater: null, en_flag: 'discount_flag' },
  PartnerMenu: { returnWater: null, en_flag: 'perate_flag' },
}

const returnWaterDataLua = {
	SportsMenu: { returnWater: '0.70%', en_flag: 'sports_flag' },
	RealMenu: { returnWater: '0.80%', en_flag: 'real_flag' },
	ChessMenu: { returnWater: '0.90%', en_flag: 'chess_flag' },
	ElectronicMenu: { returnWater: '1.00%', en_flag: 'electronic_flag' },
	LotteryMenu: { returnWater: null, en_flag: 'lottery_flag' },
	EsportMenu: { returnWater: '0.90%', en_flag: 'esports_flag' },
	DiscountsMenu: { returnWater: null, en_flag: 'discount_flag' },
	PartnerMenu: { returnWater: null, en_flag: 'perate_flag' },
}

const returnWaterDataVvi = {
	SportsMenu: { returnWater: '1.20%', en_flag: 'sports_flag' },
	RealMenu: { returnWater: '1.20 %', en_flag: 'real_flag' },
	ChessMenu: { returnWater: '1.20%', en_flag: 'chess_flag' },
	ElectronicMenu: { returnWater: '1.20%', en_flag: 'electronic_flag' },
	LotteryMenu: { returnWater: null, en_flag: 'lottery_flag' },
	EsportMenu: { returnWater: '1.10%', en_flag: 'esports_flag' },
	DiscountsMenu: { returnWater: null, en_flag: 'discount_flag' },
	PartnerMenu: { returnWater: null, en_flag: 'perate_flag' },
}

const returnWaterDataBw1 = {
	SportsMenu: { returnWater: '0.60%', en_flag: 'sports_flag' },
	RealMenu: { returnWater: '0.80 %', en_flag: 'real_flag' },
	ChessMenu: { returnWater: '1.00%', en_flag: 'chess_flag' },
	ElectronicMenu: { returnWater: '1.00%', en_flag: 'electronic_flag' },
	LotteryMenu: { returnWater: null, en_flag: 'lottery_flag' },
	EsportMenu: { returnWater: '0.60%', en_flag: 'esports_flag' },
	DiscountsMenu: { returnWater: null, en_flag: 'discount_flag' },
	PartnerMenu: { returnWater: null, en_flag: 'perate_flag' },
}

const returnWaterDataPhp = {
    DouJiMenu: { returnWater: null, en_flag: 'douji_flag' },
    FishMenu: { returnWater: null, en_flag: 'fish_flag' },
    ElectronicMenu: { returnWater: '1.20%', en_flag: 'slot_flag' },
    RealMenu: { returnWater: '1.20%', en_flag: 'real_flag' },
    SportsMenu: { returnWater: '1.20%', en_flag: 'sports_flag' },
    BingoMenu: { returnWater: '1.20%', en_flag: 'bingo_flag' },
    ChessMenu: { returnWater: '1.20%', en_flag: 'chess_flag' },
    DiscountsMenu: { returnWater: null, en_flag: 'discount_flag' },
    PartnerMenu: { returnWater: null, en_flag: 'perate_flag' },
}

export const returnWaterData = (() => {
	if (VUE_APP_APP_SIGN === 'mgm') {
		return returnWaterDataMgm
	}

	if (VUE_APP_APP_SIGN === 'lua') {
		return returnWaterDataLua
	}

	if (VUE_APP_APP_SIGN === 'vvi') {
		return returnWaterDataVvi
	}

    if (VUE_APP_APP_SIGN === 'bw1') {
        return returnWaterDataBw1
    }

    if (VUE_APP_APP_SIGN === 'php') {
        return returnWaterDataPhp
    }

	return returnWaterDataDefault
})()
