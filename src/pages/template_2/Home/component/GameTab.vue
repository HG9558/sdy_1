<template>
  <div :class="['game-tab-container', site, globalState.language]">
    <el-tabs v-model="activeName" class="home-tabs" @tab-click="handleClick">
      <el-tab-pane :name="_.name" v-for="(_, index) in gameListMap" :key="index">
        <template #label>
          <div :class="['list-item', globalState.language]">
            <img :src="useImgPath(`home/other/${_.icon}${activeIndex === index ? '_on.gif' : '.png'}`)" />
            <span>{{ _.title }}</span>
          </div>
        </template>
        <div class="plat_box">
          <template v-if="_.list.length">
            <div
              :class="['plat_box_item', _.list.length > 6 && 'item_more']"
              v-for="(item, i) in _.list"
              :key="i"
              @click="goTargetGame(item as any)">
              <img :src="useImgPath(`home/All_game_card/${_.name}/${_.name}_card_${i + 1}.png`)" alt="" />
              <span :class="['game_name', globalState.language, _.name]">{{
                (item as any)[`${globalState.language}_txt` as keyof API.normalGameType]
              }}</span>
              <div :class="['game_icon_container']">
                <div
                  :class="['try_icon']"
                  v-if="(item as any).isTry === 1 && (item as any).availableWh === 1 && !userState.token">
                  <span :class="['icon_text']">{{ $t_c('可试玩') }}</span>
                </div>
                <div :class="['wh_icon']" v-if="(item as any).availableWh === 2">
                  <span class="icon_text">{{ $t_c('维护中') }}</span>
                </div>
              </div>
            </div>
          </template>
          <empty v-else></empty>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
// import { useEnvState, useGameState, useGlobalState, useUserState } from '@/stores';
import { lang } from '@/i18n';
import { useImgPath, useSite } from '@/hook/usePath';
import { useRouter } from 'vue-router';
import useGameHook from '@/hook/useGameHook';
import empty from 'commonComponent/empty/empty.vue';

const site = useSite();
const gameState = useGameState();
const activeName = ref('sport');
const router = useRouter();
const { _enterGame } = useGameHook();
const userState = useUserState();
const envState = useEnvState();
const globalState = useGlobalState();
const activeIndex = ref<number>(0);
const formatTile = (list: API.normalGameType[], type: string) => {
  if (globalState.language === 'zh' || globalState.language === 'vi') return list;
  return JSON.parse(JSON.stringify(list)).map((_: API.normalGameType) => {
    const tempArr = _[`${globalState.language}_txt` as keyof API.normalGameType].split(' ');
    _.depotName = `${tempArr[0]} ${type}`;
    return _;
  });
};

const gameListMap = computed(() => {
  return [
    {
      name: 'sport',
      title: lang('体育游戏'),
      icon: 'tab_sport',
      list: formatTile(gameState.sport, 'Sports'),
      sort: envState.vite_game_sort_map.sport.sort,
    },
    {
      name: 'real',
      title: lang('真人游戏'),
      icon: 'tab_real',
      list: gameState.real,
      sort: envState.vite_game_sort_map.real.sort,
    },
    {
      name: 'electronic',
      title: lang('电子游戏'),
      icon: 'tab_electronic',
      list: gameState.electronic,
      sort: envState.vite_game_sort_map.electronic.sort,
    },
    {
      name: 'poker',
      title: lang('真人棋牌'),
      icon: 'tab_chess',
      list: formatTile(gameState.poker, 'Poker'),
      sort: envState.vite_game_sort_map.poker.sort,
    },
    {
      name: 'esport',
      title: lang('电竞游戏'),
      icon: 'tab_slot',
      list: gameState.esport,
      sort: envState.vite_game_sort_map.esport.sort,
    },
    {
      name: 'lottery',
      title: lang('彩票游戏'),
      icon: 'tab_lootery',
      list: gameState.lottery,
      sort: envState.vite_game_sort_map.lottery.sort,
    },
    {
      name: 'fish',
      title: lang('捕鱼游戏'),
      icon: 'tab_fish',
      list: gameState.fish,
      sort: envState.vite_game_sort_map.fish.sort,
    },
    {
      name: 'cockfighting',
      title: lang('斗鸡'),
      icon: 'tab_cockfighting',
      list: gameState.cockfighting,
      sort: envState.vite_game_sort_map.cockfighting?.sort || 0,
    },
    {
      name: 'rollingBall',
      title: lang('滚球'),
      icon: 'tab_rollingBall',
      list: gameState.rollingBall,
      sort: envState.vite_game_sort_map.rollingBall?.sort || 0,
    },
  ]
    .sort((a, b) => a.sort - b.sort)
    .filter(item => item.list.length);
});

watch(
  () => gameListMap.value,
  _ => {
    activeName.value = _[0].name;
  },
  {
    immediate: true,
  }
);

const handleClick = (tab: TabsPaneContext) => {
  activeIndex.value = +(tab.index as string) as number;
};

const goTargetGame = (item: API.normalGameType | (API.normalGameType & API.GameType)) => {
  switch (item.type) {
    case 'electronic':
      gameState.set_electronic_depotCode(item.depotCode);
      router.push('/electronic/selectList');
      break;
    case 'chess':
      gameState.set_poker_depotCode(item.depotCode);
      router.push('/poker/selectList');
      break;
    case 'lottery':
      gameState.set_lottery_depotCode(item.depotCode);
      router.push('/lottery/selectList');
      break;
    case 'fish':
      gameState.set_fish_depotCode(item.depotCode);
      router.push('/fish/selectList');
      break;
    default:
      _enterGame(item);
      break;
  }
};
</script>

<style lang="scss" scoped>
.game-tab-container {
  margin-top: 63px;
  &:deep(.home-tabs) {
    .el-tabs__header {
      .el-tabs__nav-wrap {
        .el-tabs__nav {
          @include flex();
          height: 50px;
          width: 100%;
          .el-tabs__item.is-active {
            .list-item span {
              color: var(--home_30);
            }
          }
          .list-item {
            @include flex();
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
            span {
              color: var(--home_31);
              font-size: 20px;
            }
            &.ms {
              span {
                font-size: 18px;
              }
            }
            &.vi {
              span {
                font-size: 14px;
              }
            }
          }
        }
        .el-tabs__active-bar {
          height: 4px;
          border-radius: 10px 10px 0px 0px;
        }
      }
    }
    .plat_box {
      @include flex(flex-start, row, wrap);
      .plat_box_item {
        max-width: 196px;
        margin-bottom: 20px;
        height: 248px;
        position: relative;
        cursor: pointer;
        &:nth-child(6n) {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: 100%;
        }

        .game_name {
          position: absolute;
          bottom: 35px;
          width: 100%;
          padding-right: 10px;
          text-align: center;
          left: 0;
          font-weight: 500;
          font-size: 18px;
          color: var(--home_30);

          &:not(.zh, .zh_tw) {
            font-size: 14px;
          }
        }
        .game_icon_container {
          position: absolute;
          top: 6px;
          right: 17px;
          .wh_icon {
            height: 26px;
            font-size: 12px;
            @include flex(center);
            border-radius: 0 0px 15px 0;
            padding: 0 5px;
            min-width: 50px;
            .icon_text {
              color: var(--home_47);
              position: relative;
              z-index: 1;
            }
            &:after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background: var(--home_50);
              mix-blend-mode: normal;
              border-radius: 10px 0 10px 0;
              transform: matrix(-1, 0, 0, 1, 0, 0);
            }
          }
          .try_icon {
            height: 26px;
            border-radius: 0 0px 15px 0;
            font-size: 12px;
            @include flex(center);
            padding: 0 5px;
            position: relative;
            min-width: 50px;
            .icon_text {
              color: var(--home_47);
              max-width: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              position: relative;
              z-index: 1;
            }
            &:after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background: var(--home_51);
              mix-blend-mode: normal;
              border-radius: 10px 0 10px 0;
              transform: matrix(-1, 0, 0, 1, 0, 0);
            }
          }
        }
      }
    }
  }
}

/* 2号皮肤样式 */
.game-tab-container {
  &.template_2_002 {
    .plat_box_item {
      margin-right: 20px;
      .game_name {
        height: 60px !important;
        bottom: 0 !important;
        padding: 0 !important;
        background: #273546;
        opacity: 0.75;
        backdrop-filter: blur(20px);
        border-radius: 0px 0px 10px 10px;
        @include flex(center);
        color: #fff !important;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &:deep(.home-tabs) {
      .el-tabs__active-bar {
        background: #ff00f3 !important;
      }
      .el-tabs__nav-wrap::after {
        background-color: #263b7a;
      }
    }
    .game_icon_container {
      top: 0px !important;
      right: 0px !important;
    }
  }
}
//003
.game-tab-container {
  &.template_2_003 {
    &:deep(.home-tabs) {
      .el-tabs__active-bar {
        background: linear-gradient(135deg, #ffb762 0%, #fd8803 100%);
      }
      .el-tabs__nav-wrap::after {
        background-color: #e2e4f2;
      }
      .el-tabs__item {
        font-weight: normal;
      }
    }
    .plat_box_item {
      margin-left: 17px;
      background-color: #fff;
      border-radius: 10px;
      .game_name {
        color: #fff !important;
        height: 60px;
        padding-right: 0 !important;
        bottom: 0 !important;
        border-radius: 0 0 10px 10px;
        @include flex(center);
        backdrop-filter: blur(10px);
        opacity: 0.7;
        &.sport {
          background: rgba(132, 20, 185, 0.45);
        }
        &.real,
        &.poker {
          background: rgba(185, 109, 20, 0.45);
        }
        &.electronic {
          background: rgba(94, 142, 186, 0.45);
        }
        &.esport {
          background: rgba(20, 76, 185, 0.45);
        }
        &.lottery {
          background: rgba(137, 158, 3, 0.45);
        }
        &.fish {
          background: rgba(94, 142, 186, 0.45);
        }
      }
    }
    .game_icon_container {
      top: 0px !important;
      right: 0px !important;
    }
  }
}
</style>
