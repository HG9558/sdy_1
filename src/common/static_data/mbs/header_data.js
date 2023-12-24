export const navigatorList = [
  { name: "首页", componentName: "HomeMenu", path: "/", icon: 'home', },
  { name: "体育", componentName: "SportsMenu", path: "/physical", icon: 'sports', },
  { name: "真人", componentName: "RealMenu", path: "/real", icon: 'person', },
  { name: "棋牌", componentName: "ChessMenu", path: "/poker", icon: 'chess', },
  { name: "电竞", componentName: "EsportMenu", path: "/e_sport", icon: 'slot', },
  { name: "彩票", componentName: "LotteryMenu", path: "/lottery", icon: 'lottery', },
  { name: "电游", componentName: "ElectronicMenu", path: "/electronic", icon: 'electronic', },
  { name: "优惠", componentName: "DiscountsMenu", path: "/discount", icon: 'discount', },
  { name: "合营", componentName: "PartnerMenu", path: "/partner", icon: 'partner', },
  { name: "历史赞助", componentName: "", path: "/sponsor", icon: 'sponsor', },
]



//- 头部内容列表
export const selectList = [
  {
    icon: 'header_payment.png',
    on_icon: 'header_payment_hover.png',
    val: '存款',
    path: '/profile/deposit',
  },
  {
    icon: 'header_transfer.png',
    on_icon: 'header_transfer_hover.png',
    val: '转账',
    path: '/profile/wallet',
  },
  {
    icon: 'header_withdrawal.png',
    on_icon: 'header_withdrawal_hover.png',
    val: '取款',
    path: '/profile/withdrawal',
  },
]
//- 头部内容列表
export const informationList = [
  {
    icon: 'header_profileico',
    on_icon: 'header_profileico_hover',
    val: '个人资料',
    type: 'profile',
    path: '/profile',
  },
  {
    icon: 'header_vip',
    on_icon: 'header_vip_hover',
    val: 'VIP 特权',
    type: 'vip',
    path: '/profile/vip',
  },
  {
    icon: 'header_transction',
    on_icon: 'header_transction_hover',
    val: '交易记录',
    type: 'transaction',
    path: '/profile/transaction',
  },
  {
    icon: 'header_betting',
    on_icon: 'header_betting_hover',
    val: '投注记录',
    type: 'bettingRecord',
    path: '/profile/bettingRecord',
  },
  {
    icon: 'header_news',
    on_icon: 'header_news_hover',
    val: '消息中心',
    type: 'message',
    path: '/profile/message',
  }
]

export const returnWaterData = {
  SportsMenu: { img_src: 'return_water_one', en_flag: 'sports_flag' },
  RealMenu: { img_src: 'return_water_one', en_flag: 'real_flag' },
  ChessMenu: { img_src: 'return_water_three', en_flag: 'chess_flag' },
  ElectronicMenu: { img_src: 'return_water_two', en_flag: 'electronic_flag' },
  LotteryMenu: { img_src: null, en_flag: 'lottery_flag' },
  EsportMenu: { img_src: 'return_water_three', en_flag: 'esports_flag' },
  DiscountsMenu: { img_src: null, en_flag: 'discount_flag' },
  PartnerMenu: { img_src: null, en_flag: 'perate_flag' },
}
