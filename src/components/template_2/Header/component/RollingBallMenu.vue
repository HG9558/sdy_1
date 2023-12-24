<template>
  <Layout :length="gameState.fish.length" :num="4">
    <div
      @click="$emit('enterGame', item)"
      v-for="(item, index) in gameState.rollingBall"
      :key="index"
      :class="['fish_component_item_outer', site]">
      <div class="fish-item">
        <div class="fish-context">
          <img class="bg-img" :src="useImgPath(`base/header_rollingBall_${item.depotCode.toLowerCase()}.png`)" />
          <div :class="['desc-txt', globalState.language === 'en' && 'single-txt']">
            <span v-if="globalState.language.includes('zh')" class="zh-txt">{{
              item[`${globalState.language}_txt` as keyof API.normalGameType]
            }}</span>
            <span :class="['en-txt', globalState.language]">{{ item.en_txt }}</span>
          </div>
          <div :class="['enter-game', globalState.language]">
            {{ $t_c('进入游戏') }}
          </div>
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
import { useImgPath, useSite } from '@/hook/usePath';

const site = useSite();
const gameState = useGameState();
const globalState = useGlobalState();
</script>

<style lang="scss" scoped>
.fish_component_item_outer {
  font-size: 16px;
  font-weight: 600;
  width: 25%;
  min-width: 25%;
  padding-top: 16px;
  box-sizing: border-box;
  @include flex(center);
  .fish-item {
    position: relative;
    height: 229px;
    cursor: pointer;
    @include flex(flex-start, column);
    .icon-container {
      position: relative;
      right: 0px;
      bottom: 7px;
    }
    .fish-context {
      position: relative;
      width: 150px;
      height: 195px;

      .bg-img {
        width: 116px;
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
        bottom: 5px;
        left: 40px;
        font-size: 14px;
        font-weight: 500;
        color: var(--h_10);
        &:not(.zh, .zh_tw) {
          font-size: 12px;
          left: 34px;
          bottom: 11px;
        }
      }
      .item-img {
        width: 128px;
        height: 218px;
      }
    }
  }
}
</style>
