<template>
  <Layout :length="gameState.poker.length" :num="4">
    <div
      @click="entryGame(item.depotCode)"
      v-for="(item, index) in gameState.poker"
      :key="index"
      class="chess-item-outer">
      <div class="chess-item">
        <div :class="['chess-context', globalState.language]">
          <img
            class="bg-img"
            :src="useImgPath(`base/header_chess_${item.depotCode.toLowerCase()}.png`)"
            alt=""
            @error="$event => useErrorPath('base/header_chess_default.png', $event)" />
          <div :class="['desc-txt', globalState.language === 'en' && 'single-txt']">
            <span v-if="globalState.language.includes('zh')" class="zh-txt">{{
              item[`${globalState.language}_txt` as keyof API.normalGameType]
            }}</span>
            <span :class="['en-txt', globalState.language]">{{ item.en_txt }}</span>
          </div>
          <div :class="['enter-game', globalState.language]">{{ $t_c('进入游戏') }}</div>
        </div>
        <GameStatusIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatusIcon>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import GameStatusIcon from '@/components/template_2/GameStatusIcon/GameStatusIcon.vue';
import Layout from './ScrollLayout.vue';
// import { useGameState, useGlobalState } from '@/stores';
import { useRouter } from 'vue-router';
import { useImgPath, useErrorPath } from '@/hook/usePath';

const router = useRouter();
const gameState = useGameState();
const globalState = useGlobalState();
const entryGame = (depotCode: string) => {
  gameState.set_poker_depotCode(depotCode);
  router.push('/poker/selectList');
};
</script>

<style lang="scss" scoped>
.chess-item-outer {
  font-size: 16px;
  font-weight: 600;
  width: 25%;
  min-width: 25%;
  .chess-item {
    position: relative;
    height: 229px;
    top: -5px;
    cursor: pointer;
    @include flex(center, column);
    .icon-container {
      position: relative;
      right: 0px;
      bottom: -10px;
    }
    .chess-context {
      position: relative;
      width: 140px;
      height: 195px;
      .bg-img {
        // width: 100%;
        height: 100%;
      }
      .desc-txt {
        position: absolute;
        top: 5px;
        left: 55px;
        color: var(--h_7);
        @include flex(flex-start, column);
        align-items: flex-start;
        .en-txt.zh {
          font-size: 12px;
        }
        &.single-txt {
          top: 10px;
          .en-txt {
            font-size: 16px;
          }
        }
        .en-txt {
          &.ms,
          &.vi {
            margin-top: 10px;
          }
        }
      }
      .enter-game {
        position: absolute;
        bottom: 10px;
        left: 40px;
        font-size: 14px;
        font-weight: 500;
        color: var(--h_8);
        line-height: 100%;
        &:not(.zh, .zh_tw) {
          font-size: 12px;
          left: 34px;
          bottom: 11px;
        }
      }
    }
  }
}
</style>
