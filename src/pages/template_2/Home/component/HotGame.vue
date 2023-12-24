<template>
  <div :class="['hot-game-container', site]">
    <CommonTitle
      :title-txt="$t_c('热门推荐')"
      :subTxt="$t_c('众多体育赛事，带给您丰富的游戏体验')"
      img-src="hot_title" />
    <div class="hot_game_main">
      <div :class="['sport_container', globalState.language]">
        <div class="txt_top">
          <div>{{ sportData[`${globalState.language}_txt`] }}</div>
          <template v-if="Object.keys(sportData).length > 1">
            <div @click="goPlayBtnClick(sportData)" class="game_btn">
              {{ $t_c('进入游戏') }}
            </div>
          </template>
          <template v-else>
            <div class="game_btn">
              {{ $t_c('敬请期待') }}
            </div>
          </template>
        </div>
        <div class="txt_slogan">
          {{ sportData[`${globalState.language}_slogan`] }}
        </div>
        <div v-if="sportData.isTry === 1 && sportData.availableWh === 1 && !userState.token" class="status-tag try">
          <img :src="useCommonImgPath(`icon-try.png`)" alt="" />
          <span>{{ $t_c('可试玩') }}</span>
        </div>
        <div v-if="sportData.availableWh === 2" class="status-tag maintain">
          <img :src="useCommonImgPath(`icon-maintain.png`)" alt="" />
          <span>{{ $t_c('维护中') }}</span>
        </div>
      </div>
      <div class="small_container">
        <div
          :class="['small_item', globalState.language]"
          v-for="(_, index) in renderList"
          :key="index"
          :style="{
            'background-image': `url(${useImgPath(`home/Popular_game/${_.icon}.png`)})`,
          }"
          @click="goPlayBtnClick(_.data)">
          <div class="small_item_btn" v-if="index === 0 && theme === '005' && _.data.zh_txt">
            {{ $t_c('进入游戏') }}
          </div>
          <div class="txt ellipsis">
            {{
              _.data?.depotName ?? _.data[`${globalState.language}_txt` as keyof API.normalGameType] ?? $t_c('敬请期待')
            }}
          </div>
          <div v-if="_.data.isTry === 1 && _.data.availableWh === 1 && !userState.token" class="status-tag try">
            <img :src="useCommonImgPath(`icon-try.png`)" alt="" />
            <span>{{ $t_c('可试玩') }}</span>
          </div>
          <div v-if="_.data.availableWh === 2" class="status-tag maintain">
            <img :src="useCommonImgPath(`icon-maintain.png`)" alt="" />
            <span>{{ $t_c('维护中') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImgPath, useCommonImgPath, useSite } from '@/hook/usePath';
// import { useEnvState, useGameState, useGlobalState } from '@/stores';
import CommonTitle from './CommonTitle.vue';
import useGameHook from '@/hook/useGameHook';
import { useRouter } from 'vue-router';

const site = useSite();
const gameState = useGameState();
const globalState = useGlobalState();
const userState = useUserState();
const { _enterGame } = useGameHook();
const router = useRouter();
const envState = useEnvState();
const sportData = (gameState[envState.vite_home_hot_game_list[0].classify].find(
  (_: any) => _.depotCode === envState.vite_home_hot_game_list[0].code
) as API.normalGameType) ?? { depotCode: 'FBSP' };
const esportData = (gameState[envState.vite_home_hot_game_list[1].classify].find(
  (_: any) => _.depotCode === envState.vite_home_hot_game_list[1].code
) as API.normalGameType) ?? { depotCode: 'TF' };
const chessData = (gameState[envState.vite_home_hot_game_list[2].classify].find(
  (_: any) => _.depotCode === envState.vite_home_hot_game_list[2].code
) as API.normalGameType) ?? { depotCode: 'KY' };
const realData = (gameState[envState.vite_home_hot_game_list[3].classify].find(
  (_: any) => _.depotCode === envState.vite_home_hot_game_list[3].code
) as API.normalGameType) ?? {
  depotCode: 'AGIN',
};
const theme = sessionStorage.getItem('VITE_THEME') || import.meta.env.VITE_THEME;
const renderList = [
  { icon: `04_${esportData.type}_banner`, data: esportData },
  { icon: `05_${chessData.type}_banner`, data: chessData },
  { icon: `06_${realData.type}_banner`, data: realData },
];

const goPlayBtnClick = (item: API.normalGameType) => {
  if (Object.keys(item).length === 1) return;
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
const sportBg = `url(${useImgPath(`home/Popular_game/03_${sportData.type}_banner.png`)})`;
</script>

<style lang="scss" scoped>
.hot-game-container {
  margin: 30px 0px 50px;

  .hot_game_main {
    margin-top: 50px;
    @include flex();
    align-items: flex-start;

    .sport_container {
      position: relative;
      background-image: v-bind(sportBg);
      width: 738px;
      height: 463px;
      flex-shrink: 0;
      background-size: 100% 100%;
      @include flex(flex-end, column);
      padding: 0 24px 18px;

      &.en {
        .game_btn {
          font-size: 16px !important;
        }
        .txt_slogan {
          font-size: 14px;
        }
      }
      &.ms {
        .game_btn {
          font-size: 16px !important;
          width: auto !important;
          padding: 0 10px;
        }
        .txt_slogan {
          font-size: 14px;
          margin-bottom: -10px;
        }
        .txt_top {
          margin-top: 20px;
          margin-bottom: 0px;
        }
      }
      &.vi {
        .game_btn {
          font-size: 16px !important;
          width: auto !important;
          padding: 0 10px;
        }

        .txt_top {
          margin: 5px 0;
        }
        .txt_slogan {
          font-size: 14px;
          margin-bottom: 0px;
        }
      }

      .txt_top {
        width: 100%;
        @include flex();
        font-size: 22px;
        color: var(--home_34);
        font-weight: 500;
        margin-bottom: 15px;

        .game_btn {
          @include flex(center);
          background: var(--home_35);
          box-shadow: var(--home_36);
          border-radius: 100px;
          width: 112px;
          height: 37px;
          font-size: 18px;
          color: var(--home_37);
          cursor: pointer;
        }
      }

      .txt_slogan {
        font-size: 18px;
        color: var(--home_34);
      }
    }

    .small_container {
      flex-grow: 1;
      position: relative;
      @include flex(space-between, row, wrap);
      height: 463px;

      .small_item {
        position: absolute;
        font-size: 22px;
        color: var(--home_34);
        font-weight: 500;
        cursor: pointer;

        .txt.ellipsis {
          max-width: 160px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        &.vi:nth-child(2),
        &.vi:nth-child(3) {
          .txt {
            font-size: 18px;
            &.ellipsis {
              max-width: 160px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }

        .txt {
          position: absolute;
        }

        &:nth-child(1) {
          position: absolute;
          width: 562px;
          height: 315px;
          background-size: 100% 100%;
          top: -23px;
          left: 12px;

          .txt {
            left: 60px;
            bottom: 90px;
          }
        }

        &:nth-child(2) {
          width: 280px;
          height: 284px;
          background-size: 100% 100%;
          bottom: -63px;
          left: 20px;

          .txt {
            left: 50px;
            bottom: 80px;
          }
        }

        &:nth-child(3) {
          width: 280px;
          height: 264px;
          background-size: 100% 100%;
          right: -24px;
          bottom: -53px;

          .txt {
            left: 50px;
            bottom: 68px;
          }
        }
      }
    }

    .status-tag {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 35px;
      font-size: 14px;
      color: #ffffff;
      background: linear-gradient(47.51deg, #f56d44 11.25%, #ffcb58 101.65%);
      border-radius: 3px 10px 3px 20px;
      &.maintain {
        background: linear-gradient(111.25deg, #f0f0f0 7.33%, #949292 34%);
      }
      img {
        margin-right: 5px;
        width: 18px;
      }
    }
  }
}

//002
.template_2_002 {
  .txt_slogan {
    color: #878ea6 !important;
    margin-bottom: 20px !important;
    line-height: 1.1;
  }
  .small_item {
    &:nth-child(1) {
      width: 522px !important;
      height: 228px !important;
      top: 0 !important;
    }
    width: 251px !important;
    height: 214px !important;
    bottom: 0 !important;
    .txt {
      bottom: 30px !important;
      left: 30px !important;
    }
    &:nth-child(3) {
      right: 10px !important;
    }
  }
  .game_btn {
    margin-right: 10px;
  }
}
</style>
