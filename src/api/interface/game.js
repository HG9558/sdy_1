import ajax from '../http.js'

//- 获取游戏列表
// 获取小类游戏数据 catId 字段：1 体育 3 真人 6棋牌 9电竞 12 彩票
export const getGameList = params => ajax({ url: '/sys/catDepotList', params })

//- 获取电子竞技列表
export const getElecDepotList = (params = { pageNo: 1, pageSize: 100 }) => ajax({ url: '/sys/elecDepotList', params })

//- 获取电子类小类游戏 enableTest：支持试玩,0或null不支试玩，1支持，可不传
export const getEleDataList = ({ depotId, page = 1, lableName = '' }) => ajax({
  url: '/sys/gameList', params: {
    pageNo: page,
    pageSize: 15,
    sortMark: 1,
    depotId,
    lableName
  }
})

//- 获取bingo类小类游戏 enableTest：支持试玩,0或null不支试玩，1支持，可不传
export const getBinGoDataList = ({ depotId, page = 1, lableName = '' }) => ajax({
  url: '/sys/gameList', params: {
    pageNo: page,
    pageSize: 15,
    sortMark: 1,
    id: 57,
    depotId,
    lableName
  }
})

//- 获取捕鱼列表
export const getDepotListByCatId = (params = { pageNo: 1, pageSize: 100 }) => ajax({ url: '/sys/depotListByCatId', params })

//- 获取捕鱼小类游戏
export const getGameListByCatIdAndDepotId = ({ catId, depotId, page = 1, lableName = '' }) => ajax({
  url: '/sys/gameListByCatIdAndDepotId', params: {
    pageNo: page,
    pageSize: 15,
    sortMark: 1,
    catId,
    depotId,
    lableName
  }
})

//- 获取捕鱼游戏列表
export const getFishList = params => ajax({ url: '/sys/gameFishList', params: { ...params, pageNo: 1, pageSize: 100 } })

//- 获取游戏ip地址跳转 gameId=7899
export const getTransitList = params => ajax({ url: '/sys/transit', params })

//- 获取试玩游戏地址
export const getTryAddress = params => ajax({ url: '/sys/tryPlayGame', params })

//- 一键回收平台游戏钱包
export const getRecover = () => ajax({ url: '/pay/recoverBalance' })

//- 获取游戏平台列表
export const getDepotList = (params) => ajax({ url: '/sys/depotList', params })

//- 获取棋牌列表
export const getChessDepotList = () => ajax({ url: '/sys/chessDepotList?pageNo=1&pageSize=100' })

//- 获取棋牌类小类游戏 enableTest：支持试玩,0或null不支试玩，1支持，可不传
export const getGameChessList = ({ depotId, page = 1, lableName = '' }) => ajax({
  url: '/sys/gameChessList', params: {
    pageNo: page,
    pageSize: 15,
    sortMark: 1,
    depotId,
    lableName
  }
})

//- 彩票
export const getLotteryDepotList = () => ajax({ url: '/sys/lotteryDepotList?pageNo=1&pageSize=100' })

//- 获取彩票类小类游戏 enableTest：支持试玩,0或null不支试玩，1支持，可不传
export const getGameLotteryList = ({ depotId, page = 1, lableName = '' }) => ajax({
  url: '/sys/gameLotteryList', params: {
    pageNo: page,
    pageSize: 15,
    sortMark: 1,
    depotId,
    lableName
  }
})

//- 真人
export const getRealCategoryList = ({gamelogoid}) => ajax({
  url: '/sys/getTrunmanShowCategory', params: {
    gamelogoid,
    pageNo: 1,
    pageSize: 100
  } })

//- 真人类小游戏
export const getGameRealList = ({ depotId, page = 1, terminal = 1, id }) => ajax({
  url: '/sys/getGameByTrunmanShowCategory', params: {
    pageNo: page,
    pageSize: 15,
    // sortMark: 1,
    depotId,
    terminal,
    id
  }
})
