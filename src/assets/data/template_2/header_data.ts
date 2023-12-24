import { lang } from "@/i18n"

export const navigatorList = [
  { name: lang("首页"), componentName: "HomeMenu", path: "/home", icon: 'home', type: 'home', sort: 1 },
  { name: lang("体育"), componentName: "SportsMenu", path: "/physical", icon: 'sports', type: 'sport', sort: 1 },
  { name: lang("真人"), componentName: "RealMenu", path: "/real", icon: 'person', type: 'real', sort: 1 },
  { name: lang("电子"), componentName: "ElectronicMenu", path: "/electronic", icon: 'electronic', type: 'electronic', sort: 1 },
  { name: lang("棋牌"), componentName: "ChessMenu", path: "/poker", icon: 'chess', type: 'poker', sort: 1 },
  { name: lang("电竞"), componentName: "EsportMenu", path: "/e_sport", icon: 'slot', type: 'esport', sort: 1 },
  { name: lang("彩票"), componentName: "LotteryMenu", path: "/lottery", icon: 'lottery', type: 'lottery', sort: 1 },
  { name: lang("捕鱼"), componentName: "FishMenu", path: "/fish", icon: 'lottery', type: 'fish', sort: 1 },
  { name: lang("斗鸡"), componentName: "CockfightingMenu", path: "/cockfighting", icon: 'lottery', type: 'cockfighting', sort: 1 },
  { name: lang("滚球"), componentName: "RollingBallMenu", path: "/rollingBall", icon: 'rollingBall', type: 'rollingBall', sort: 1 },
  { name: lang("优惠"), componentName: "DiscountsMenu", path: "/discount", icon: 'discount', type: 'discount', sort: 1 },
  { name: lang("合营"), componentName: "PartnerMenu", path: "/partner", icon: 'partner', type: '', sort: 1 },
  { name: lang("历史赞助"), componentName: "SponsorMenu", path: "/sponsor", icon: '', type: '', sort: 1 },
]

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
    path: '/profile/baseInfo',
  },
  {
    icon: 'header_vip',
    on_icon: 'header_vip_hover',
    val: lang('VIP尊享'),
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
    path: '/profile/messageCenter',
  }
]

export const returnWaterData = {
  SportsMenu: { num: '1.2', en_flag: 'sports_flag' },
  RealMenu: { num: '1.2', en_flag: 'real_flag' },
  ChessMenu: { num: '1.2', en_flag: 'chess_flag' },
  ElectronicMenu: { num: '1.2', en_flag: 'electronic_flag' },
  FishMenu: { num: 0, en_flag: 'electronic_flag' },
  LotteryMenu: { num: 0, en_flag: 'lottery_flag' },
  EsportMenu: { num: '1.1', en_flag: 'esports_flag' },
  CockfightingMenu: { num: 0, en_flag: 'esports_flag' },
  DiscountsMenu: { num: 0, en_flag: 'discount_flag' },
  PartnerMenu: { num: 0, en_flag: 'perate_flag' },
  SabongMenu: { num: 0, en_flag: 'perate_flag' },
  RollingBallMenu: { num: 0, en_flag: 'perate_flag' },
}
