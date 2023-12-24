<template>
  <div
    :class="`header_component ${!isShowDropMenu ? 'drop-menu-hidden' : 'drop-menu-show'} ${site} ${
      $route.path.includes('micro_page') && 'micro_page'
    }`">
    <header-navigator @changeCurrentComponentName="changeCurrentComponentName" @changeMenuStatus="changeMenuStatus">
      <div class="header-menu-container" v-if="isShowDropMenu && componentStrName !== 'SponsorMenu'">
        <div :class="['header_menu_body', componentStrName === 'DiscountsMenu' && 'pl-0']">
          <component class="header_menu_main" :is="currentComponentName.name" @enterGame="_enterGame">
            <template #ios-qrCode>
              <QrCode :codeSize="96" class="home-code header-code" topTitle="IOS" :hide-bottom="true">
                <span>{{ $t_c('扫一扫') }}</span>
                <span>{{ $t_c('下载全站APP') }}</span>
              </QrCode>
            </template>
            <template #android-qrCode>
              <QrCode
                :codeSize="96"
                class="home-code header-code"
                slot="android-qrCode"
                :topTitle="'Android'"
                :hide-bottom="true">
                <span>{{ $t_c('扫一扫') }}</span>
                <span>{{ $t_c('下载全站APP') }}</span>
              </QrCode>
            </template>
          </component>
          <QrCode
            class="header-code"
            v-if="componentStrName !== 'HomeMenu'"
            :showRightEN="true"
            :topTitle="!envState.vite_show_return_water ?  '' :returnWaterData[componentStrName as keyof typeof returnWaterData].num ? $t_c('返水最高可达') : ''"
            :returnWater="!envState.vite_show_return_water  ? 0 :  returnWaterData[componentStrName as keyof typeof returnWaterData]?.num "
            :componentStrName="componentStrName"
            :hideBottom="true">
            <div>{{ $t_c('扫一扫') }}</div>
            <div>{{ $t_c('下载全站APP') }}</div>
          </QrCode>
        </div>
      </div>
    </header-navigator>
    <div class="spacer_line" v-if="theme === '004'">
      <div class="line_1"></div>
      <div class="line_2"></div>
      <div class="line_3"></div>
    </div>
  </div>
  <div class="spacer"></div>
</template>

<script setup lang="ts">
import { returnWaterData } from 'static_data/header_data';
import { baseMenuData } from 'static_data/game_data';
import useGameHook from '@/hook/useGameHook';
import HeaderNavigator from './component/HeaderNavigator.vue';
import QrCode from 'commonComponent/QrCode/qr.vue';
import { api } from '@/api';
import { useSite } from '@/hook/usePath';
import HomeMenu from './component/HomeMenu.vue';
import SportsMenu from './component/SportsMenu.vue';
import RealMenu from './component/RealMenu.vue';
import ElectronicMenu from './component/ElectronicMenu.vue';
import FishMenu from './component/FishMenu.vue';
import ChessMenu from './component/ChessMenu.vue';
import EsportMenu from './component/EsportMenu.vue';
import RollingBallMenu from './component/RollingBallMenu.vue';
import CockfightingMenu from './component/CockfightingMenu.vue';
import LotteryMenu from './component/LotteryMenu.vue';
import { setupApp, preloadApp } from 'wujie';

const comoMap = {
  HomeMenu,
  SportsMenu,
  RealMenu,
  ElectronicMenu,
  FishMenu,
  ChessMenu,
  EsportMenu,
  CockfightingMenu,
  LotteryMenu,
  RollingBallMenu,
  DiscountsMenu: defineAsyncComponent(
    () => import(/* webpackChunkName: "DiscountsMenu" */ './component/DiscountsMenu.vue')
  ),
  PartnerMenu: defineAsyncComponent(() => import(/* webpackChunkName: "PartnerMenu" */ './component/PartnerMenu.vue')),
};
const { _enterGame } = useGameHook();
const gameState = useGameState();
const normalState = useNormalState();
const site = useSite();
const envState = useEnvState();
const userState = useUserState();
const len = ref<number>(0);
const currentComponentName = reactive<HeaderType.curType>({
  name: markRaw(comoMap.HomeMenu),
});
const componentStrName = ref<string>('HomeMenu');
const route = useRoute();
const router = useRouter();
const promiseList = reactive<API.CatDepotList[]>([]);
const theme = sessionStorage.getItem('VITE_THEME') || import.meta.env.VITE_THEME;
const isShowDropMenu = ref<boolean>(false); //-todo
// const isShowDropMenu = ref<boolean>(true); //-todo
onMounted(() => {
  initGameList();
  _initMenuList();
});

const changeCurrentComponentName = (_: string) => {
  currentComponentName.name = markRaw(comoMap[_ as keyof typeof comoMap]);
  componentStrName.value = _;
};

const changeMenuStatus = (_: boolean) => {
  isShowDropMenu.value = _; //todo
};

const resourceMenuData = computed(() => {
  if (Object.values(gameState.fetchGameData).some(_ => _.length)) {
    Object.keys(gameState.fetchGameData).forEach(key => {
      baseMenuData[key as keyof GameDataType.IBaseMenuData].list =
        gameState.fetchGameData[key as keyof typeof gameState.fetchGameData];
    });
  }
  return baseMenuData;
});

const initGameList = () => {
  Object.values(resourceMenuData.value)
    .filter(_ => _.saveName && _.saveType)
    .forEach(item => {
      gameState[item.saveType](item.list);
    });
};
const _initMenuList = () => {
  len.value = Object.values(resourceMenuData.value).filter(item => {
    const nList = [1, 3, 6, 9, 49, 58, 12];
    return item.catId && nList.includes(item.catId);
  }).length;
  Object.values(resourceMenuData.value).forEach(async item => {
    if (!item.catId) return;
    switch (item.catId) {
      case 8:
        const res = await api.game.getFishClassify({ catId: item.catId });
        if (res.code) return;
        if (res.tGmDepots.length === 0) return gameState[item['saveType']]([]);
        item.list = filterReturnList(item.list, res.tGmDepots);
        item.list = deduplicateArr(item.list);
        gameState[item.saveType](item.list);
        normalState.set_renderFishGame(true);
        break;
      case 1:
      case 3:
      case 6:
      case 9:
      case 49:
      case 58:
      case 12:
        api.game.getGameList({ catId: item.catId }).then(res => {
          promiseList.push(res);
          if (res.code !== 0) return;
          if (res.catDepots.length === 0) return gameState[item['saveType']]([]);
          item.list = filterReturnList(item.list, res.catDepots);
          item.list = deduplicateArr(item.list);
          gameState[item.saveType as keyof typeof gameState](item.list);
          item['saveType'] === 'set_poker' && normalState.set_renderPokerGame(true);
          item['saveType'] === 'set_lottery' && normalState.set_renderLotteryGame(true);
          item['saveType'] === 'set_real' && normalState.set_renderRealGame(true);
        });
        break;
      case -1:
        // 获取电子游戏列表 及捕鱼数据
        api.game.getElecDepotList().then(eRes => {
          if (eRes.code !== 0) return;
          gameState.set_electronic(
            filterReturnList(item.list, eRes.tGmDepots) as (API.normalGameType & API.GameType)[]
          );
          normalState.set_renderSlotGame(true);
        });
        break;
    }
  });
};

watch(
  () => userState.token,
  (_: string) => {
    if (!normalState.microGameUrlList.length) {
      bindMicroConfig(gameState.microSourceDataList, () => {
        if (_) {
          const d = normalState.microGameUrlList.find(item => item.firstPageShow);
          if (d) router.replace(`/micro_page/${d.depotCode}`);
        }
      });
    }
  }
);

watch(promiseList, list => {
  if (list.length == len.value) {
    bindMicroConfig(gameState.microSourceDataList);
  }
});

const bindMicroConfig = (l: (API.normalGameType | GameDataType.List)[], cb?: Function) => {
  if (!(l[0] as API.normalGameType)?.catId) return;
  const bindList = l.filter(_ => (_ as API.normalGameType).isMicroGame);
  if (!bindList.length) return;

  const pList = bindList.map(async _ => {
    if ((_ as API.normalGameType).availableWh === 2 || (!userState.token && (_ as API.normalGameType).isTry !== 1))
      return;
    const res = await (userState.token
      ? api.game.registerGame({ gameId: (_ as API.normalGameType).id })
      : api.game.getTryAddress({ gameId: (_ as API.normalGameType).id }));

    if (!res.msg.startsWith('http')) {
      (_ as API.normalGameType).isMicroGame = false;
      return;
    }

    if (_.depotCode === 'FBSP') {
      const newUrl = ' https://ans.grs1l.com';
      res.msg = res.msg.replace(/^https?:\/\/[^/?#]+/, newUrl);
    }

    setupApp({
      name: _.depotCode,
      url: res.msg,
    });
    preloadApp({
      name: _.depotCode,
      url: res.msg,
      alive: true,
      exec: true,
    });

    const uniqueData = normalState.microGameUrlList.reduce(
      (result, current) => {
        const existingItem = result.find(item => item.depotCode === current.depotCode);
        if (!existingItem) {
          result.push(current);
        }
        return result;
      },
      [
        { depotCode: _.depotCode, url: res.msg, firstPageShow: (_ as API.normalGameType).firstPageShow },
      ] as StoreType.microDataType[]
    );
    normalState.set_micro_game_list(uniqueData);
    return res;
  });

  if (route.path.startsWith('/micro_page')) {
    const d = l.find(_ => _.depotCode === route.params.id);
    if (
      !d ||
      (d as API.normalGameType).availableWh === 2 ||
      (!userState.token && (d as API.normalGameType).isTry !== 1)
    )
      return router.replace('/home');
  }
  Promise.all(pList).then(() => {
    cb && cb();
  });
};

//- 过滤返回值
const filterReturnList = (
  staticList: GameDataType.List[],
  serviceList: (API.CatDepot | API.TGmDepot | API.FishRes)[]
) => {
  let tempArr = [...staticList, ...serviceList];
  tempArr = filterRepeat(tempArr);
  const obj: { [key: string]: any } = {};
  return tempArr.reduce((prev: GameDataType.List[], next) => {
    if (obj[next['depotCode']]) {
      prev.push({ ...obj[next['depotCode']], ...next });
    } else {
      obj[next['depotCode']] = next;
    }
    return prev;
  }, []);
};

const filterRepeat = (arr: any[]) => {
  const map = new Map();
  arr.forEach((item, index) => {
    if (!item.depotId) {
      map.set(-index, item);
    } else if (!map.has(item.depotId)) {
      map.set(item.depotId, item);
    }
  });
  return [...map.values()];
};

const deduplicateArr = (arr: GameDataType.List[]) => {
  let obj: { [key: string]: boolean } = {};
  const a = arr.reduce((prev: GameDataType.List[], cur) => {
    obj[cur.depotCode] ? '' : (obj[cur.depotCode] = true) && prev.push(cur);
    return prev;
  }, []);
  return a;
};
</script>

<style lang="scss" scoped>
.spacer {
  height: 100px;
}
.header_component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: var(--h_2);
  box-shadow: var(--h_3);
  &.micro_page {
    z-index: 10000;
  }
  .header-menu-container {
    height: 250px;
    overflow: hidden;
    width: 100%;
    position: fixed;
    background: var(--h_4);
    left: 0;
    top: 99px;
    z-index: 1000;
    @include flex();
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: var(--h_4);
      backdrop-filter: blur(20px);
    }
    .header_menu_body {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      @include flex();
      padding: 0 16px 0 40px;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }
    .header_menu_main {
      position: relative;
      padding: 0 20px;
      box-sizing: border-box;
      max-width: calc(100% - 140px);
      flex-grow: 1;
    }
    .home-code {
      margin: 0 22px 0 50px;
      &:deep(.code-top_text) {
        font-weight: bold;
      }
    }
  }
}
</style>
