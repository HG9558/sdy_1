/*
  * strVal 为字符串类型
  * objVal  为对象类型,
  * bolVal  布尔值
  * arrVal   数组
 */
import { mergeGameList } from '../../utils/mergeGameList';


export default {
  // 电竞数据
  set_esport: (state, val) => {
    state.esport = val
  },
  // 体育
  set_sport: (state, val) => {
    state.sport = val
  },
  // 斗鸡
  set_sabong: (state, val) => {
    state.sabong = val
  },
  // 真人
  set_real: (state, arr) => {
    state.real = mergeGameList(state.real, arr)
  },
  // 棋牌
  set_poker: (state, arr) => {
    state.poker = mergeGameList(state.poker, arr);
  },
  // 电子
  set_electronic: (state, arr) => {
    state.electronic = mergeGameList(state.electronic, arr);
  },
  // 捕鱼
  set_catchfish: (state, arr) => {
    state.catchfish = mergeGameList(state.catchfish, arr);
  },
  // 斗鸡
  set_douji: (state, arr) => {
    state.douji = mergeGameList(state.douji, arr);
  },
  // 宾果
  set_bingo: (state, arr) => {
    state.bingo = mergeGameList(state.bingo, arr);
  },
  // 彩票
  set_lottery: (state, arr) => {
    state.lottery = mergeGameList(state.lottery, arr);
  },
  //- 捕鱼选择类型
  set_catchfish_depotCode: (state, str) => {
    state.selectCatchfishDepotCode = str
  },
  //- 宾果选择类型
  set_bingo_depotCode: (state, str) => {
    state.selectBingoDepotCode = str
  },
  //- 电游选择类型
  set_electronic_depotCode: (state, str) => {
    state.selectElectronicDepotCode = str
  },
//- 棋牌选择择类型
  set_poker_depotCode: (state, str) => {
    state.selectPokerDepotCode = str
  },
//- 彩票选择择类型
  set_lottery_depotCode: (state, str) => {
    state.selectLotteryDepotCode = str
  },
  //- 真热选择择类型
  set_real_depotCode: (state, str) => {
    state.selectRealDepotCode = str
  },
  //- 设置世界杯 当前资讯信息
  set_worldcupNews(state, obj) {
    state.worldcupNews = obj
  },
}
