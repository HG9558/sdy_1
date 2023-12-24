import { defineStore } from 'pinia'
import { StoreName } from './store-name'
import axios from 'axios';
import { deleteTime } from '@/utils';
import { homeTitleList } from 'static_data/game_data_template';
// import { useEnvState } from '@/stores';

export const useGameState = defineStore(StoreName.GAMESTATE, {
  state: (): StoreType.GameStateType => {
    return {
      esport: [] as API.normalGameType[],  //- 电竞
      cockfighting: [] as API.normalGameType[],  //- 斗鸡
      sport: [] as API.normalGameType[],  //-体育
      topSport: [] as API.normalGameType[],
      sabong: [] as API.normalGameType[], //- 斗鸡
      real: [] as API.normalGameType[],   //- 真人
      poker: [] as API.normalGameType[],   //-  棋牌
      lottery: [] as API.normalGameType[],   //- 彩票
      electronic: [] as (API.normalGameType & API.GameType)[],  //- 电子
      fish: [] as API.normalGameType[],
      catchfish: [] as API.normalGameType[],   //- 捕鱼
      rollingBall: [] as API.normalGameType[],   //- 滚球
      selectElectronicDepotCode: "",//- 电游
      selectPokerDepotCode: "",//- 棋牌
      selectLotteryDepotCode: "", //- 彩票当前选择类型
      selectFishDepotCode: "",
      fetchGameDataTemp: { sport: [], e_sport: [], cockfighting: [], real: [], lottery: [], chess: [], electronic: [], fish: [], rollingBall: [] },
      fetchHomeTitleList: null,
    }
  },
  getters: {
    fetchGameData: state => {
      return {
        sportsMenu: state.fetchGameDataTemp.sport,
        chessMenu: state.fetchGameDataTemp.chess,
        eSportMenu: state.fetchGameDataTemp.e_sport,
        cockfightingMenu: state.fetchGameDataTemp.cockfighting,
        realMenu: state.fetchGameDataTemp.real,
        lotteryMenu: state.fetchGameDataTemp.lottery,
        slotMenu: state.fetchGameDataTemp.electronic,
        fishMenu: state.fetchGameDataTemp.fish,
        rollingBallMenu: state.fetchGameDataTemp.rollingBall,
      }
    },
    recommendSport: state => {
      return (state.fetchHomeTitleList ?? homeTitleList).sort((a, b) => {
        if (a.depotCode === 'FBOB' && b.depotCode !== 'FBOB') {
          return 1;
        } else if (b.depotCode === 'FBOB' && a.depotCode !== 'FBOB') {
          return -1;
        } else {
          return 0;
        }
      });
    },
    microSourceDataList(state) {
      return [...state.esport, ...state.sport, ...state.real, ...state.rollingBall]
    }
  },
  actions: {
    // 电竞数据
    set_esport(_: API.normalGameType[]) {
      this.esport = _;
    },
    // 滚球数据
    set_rolling(_: API.normalGameType[]) {
      this.rollingBall = _;
    },
    // 斗鸡数据
    set_cockfighting(_: API.normalGameType[]) {
      this.cockfighting = _;
    },
    // 体育
    set_sport(_: API.normalGameType[]) {
      this.sport = _;
    },
    set_top_sport(_: API.normalGameType[]) {
      this.topSport = _;
    },
    set_fish(_: API.normalGameType[]) {
      this.fish = _;
    },
    // 斗鸡
    set_sabong(val: API.normalGameType[]) {
      this.sabong = val
    },
    // 真人
    set_real(_: API.normalGameType[]) {
      this.real = _;
    },
    // 棋牌
    set_poker(_: API.normalGameType[]) {
      this.poker = _;
    },
    // 电子
    set_electronic(_: (API.normalGameType & API.GameType)[]) {
      this.electronic = _;
    },
    // 捕鱼
    set_catchfish(val: API.normalGameType[]) {
      this.catchfish = val
    },
    // 彩票
    set_lottery(arr: API.normalGameType[]) {
      this.lottery = arr;
    },
    //- 电游选择类型
    set_electronic_depotCode(_: string) {
      this.selectElectronicDepotCode = _;
    },
    //- 棋牌选择择类型
    set_poker_depotCode(_: string) {
      this.selectPokerDepotCode = _;
    },
    //- 彩票选择择类型
    set_lottery_depotCode(_: string) {
      this.selectLotteryDepotCode = _;
    },
    //- 捕鱼选择指定分类
    set_fish_depotCode(_: string) {
      this.selectFishDepotCode = _;
    },
    async set_fetch_game_list(sitecode: string) {
      const homeTempList: any[] = [];
      const res = await axios.get(`https://strapi-web.wsdy.net/api/www-game-lists?filters[gameSite]=${sitecode}&populate=*`);
      let data = res.data.data[0].attributes;
      data = deleteTime(data);
      // data.micro_game_list?.length && (data.micro_game_list = data.micro_game_list.map((_: any) => _.depotCode))
      Object.keys(data).forEach(key => {
        if (this.fetchGameDataTemp[key as keyof typeof this.fetchGameDataTemp]) {
          let o = data[key].data.map((_: { attributes: any; }) => _.attributes);
          //- 添加是否包含微游戏
          data.micro_game_list && o.map((item: any) => {
            const target = data.micro_game_list.find((_: any) => {
              return _.depotCode === item.depotCode
            })
            if (target) {
              item.isMicroGame = true;
              item.firstPageShow = target.firstPageShow
            }
            return item;
          })
          this.fetchGameDataTemp[key as keyof typeof this.fetchGameDataTemp] = o;
        } else if (key === 'home_game') {
          homeTempList.push(...data[key].data.map((_: { attributes: any; }) => _.attributes));
        }
      });
      const envState = useEnvState();
      envState.updateEnvState(data.game_sort_map, 'vite_game_sort_map');
      envState.updateEnvState(data.home_hot_game_list, 'vite_home_hot_game_list');
      envState.updateEnvState(data.micro_game_list, 'vite_micro_game_list');
      if (!this.fetchHomeTitleList) this.fetchHomeTitleList = [];
      (this.fetchHomeTitleList as GameDataType.HomeTitle[]).length = 0;
      (this.fetchHomeTitleList as GameDataType.HomeTitle[]).push(...homeTempList)
    },
  },
  persist: {
    enabled: true
  }
})
