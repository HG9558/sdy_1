import ajax from '../../http.js'

export default {
  // 获取小类游戏数据 catId 字段：1 体育 3 真人 6棋牌 9电竞 12 彩票
  getGameList: (params: API.gameParams): Promise<API.CatDepotList> => ajax({ url: '/sys/catDepotList', params, config: { 'ignore_zh_tw': true } }),
  //- 捕鱼分类获取
  getFishClassify: (params: API.gameParams): Promise<API.FishResData> => ajax({ url: '/sys/depotListByCatId', params, config: { 'ignore_zh_tw': true } }),
  //- 获取电子竞技列表
  getElecDepotList: (params = { pageNo: 1, pageSize: 100 }): Promise<API.ElecDepotList> => ajax({ url: '/sys/elecDepotList', params, config: { 'ignore_zh_tw': true } }),

  //- 获取电子类小类游戏 enableTest：支持试玩,0或null不支试玩，1支持，可不传
  getEleDataList: ({ depotId, page = 1, lableName = '' }: API.gameListParams): Promise<API.gameListRes> => ajax({
    url: '/sys/gameList', params: {
      pageNo: page,
      pageSize: 15,
      sortMark: 1,
      depotId,
      lableName
    },
    config: { 'ignore_zh_tw': true }
  }),
  //- 获取捕鱼游戏列表
  getFishList: (params: API.fishParams): Promise<API.GameFishList> => ajax({ url: '/sys/gameFishList', params: { ...params, pageNo: 1, pageSize: 100 }, config: { 'ignore_zh_tw': true } }),

  //- 获取游戏ip地址跳转 gameId=7899
  getTransitList: (params: API.transitListParams): Promise<API.PalyGameType> => ajax({ url: '/sys/transit', params: params }),
  //- 获取试玩游戏地址
  getTryAddress: (params: API.transitListParams): Promise<API.PalyGameType> => ajax({ url: '/sys/tryPlayGame', params }),
  //- 微前端游戏获取
  registerGame: (params: API.transitListParams): Promise<API.PalyGameType> => ajax({ url: '/pay/registerGame', params }),
  //- 微前端游戏资金转入
  freeTransferPlatform: (params: API.transitListParams): Promise<API.PalyGameType> => ajax({ url: '/pay/freeTransferPlatform', params }),

  //- 一键回收平台游戏钱包
  getRecover: (): Promise<API.recoverBalanceType> => ajax({ url: '/pay/recoverBalance', config: { 'ignore_zh_tw': true } }),

  //- 获取游戏平台列表
  getDepotList: (): Promise<API.ElecDepotList> => ajax({ url: '/sys/depotList', config: { 'ignore_zh_tw': true } }),

  //- 获取棋牌列表
  getChessDepotList: () => ajax({ url: '/sys/chessDepotList?pageNo=1&pageSize=100', config: { 'ignore_zh_tw': true } }),
  //- 获取棋牌类小类游戏 enableTest：支持试玩,0或null不支试玩，1支持，可不传
  getGameChessList: ({ depotId, page = 1, lableName = '' }: API.gameListParams): Promise<API.gameListRes> => ajax({
    url: '/sys/gameChessList', params: {
      pageNo: page,
      pageSize: 15,
      sortMark: 1,
      depotId,
      lableName
    },
    config: { 'ignore_zh_tw': true }
  }),
  //- 彩票
  getLotteryDepotList: () => ajax({ url: '/sys/lotteryDepotList?pageNo=1&pageSize=100' }),
  //- 获取彩票类小类游戏 enableTest：支持试玩,0或null不支试玩，1支持，可不传
  getGameLotteryList: ({ depotId, page = 1, lableName = '' }: API.gameListParams): Promise<API.gameListRes> => ajax({
    url: '/sys/gameLotteryList', params: {
      pageNo: page,
      pageSize: 15,
      sortMark: 1,
      depotId,
      lableName
    },
    config: { 'ignore_zh_tw': true }
  }),

  getGameFishList: ({ depotId, page = 1, catId = 8 }: API.fishListParams): Promise<API.gameListRes> => ajax({
    url: '/sys/gameListByCatIdAndDepotId', params: {
      pageNo: page,
      pageSize: 15,
      depotId,
      catId
    },
    config: { 'ignore_zh_tw': true }
  }),

  //- 真人
  // getRealCategoryList: ({ gamelogoid }) => ajax({
  //   url: '/sys/getTrunmanShowCategory', params: {
  //     gamelogoid,
  //     pageNo: 1,
  //     pageSize: 100
  //   }
  // }),
  //- 真人类小游戏
  // getGameRealList: ({ depotId, page = 1, terminal = 1, id }) => ajax({
  //   url: '/sys/getGameByTrunmanShowCategory', params: {
  //     pageNo: page,
  //     pageSize: 15,
  //     // sortMark: 1,
  //     depotId,
  //     terminal,
  //     id
  //   }
  // }),
}
