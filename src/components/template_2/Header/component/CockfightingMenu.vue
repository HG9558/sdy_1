<template>
  <div :class="['cockfighting_component_container', site]">
    <div
      @click="$emit('enterGame', item)"
      v-for="(item, index) in gameState.cockfighting"
      :key="index"
      class="cockfighting-item">
      <div class="cockfighting-content">
        <img class="bg-img" :src="useImgPath(`base/header_cockfighting_${item.depotCode.toLowerCase()}.png`)" alt="" />
        <div class="desc-txt">
          <span class="zh-txt" v-if="globalState.language.includes('zh')">{{
            item[`${globalState.language}_txt` as keyof API.normalGameType]
          }}</span>
          <span v-if="globalState.language.includes('zh')" :class="['en-txt', globalState.language]">{{ item.en_txt }}</span>
          <p v-if="!globalState.language.includes('zh')" :class="['en-txt', globalState.language]">{{ item.en_txt.split(' ')[0] }}</p>
          <p v-if="!globalState.language.includes('zh')" :class="['en-txt', globalState.language]">{{ item.en_txt.split(' ')[1] }}</p>
        </div>
        <div :class="['enter-game', globalState.language]">
          {{ $t_c('进入游戏') }}
        </div>
      </div>
      <GameStatusIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatusIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GameStatusIcon from '@/components/template_2/GameStatusIcon/GameStatusIcon.vue';
// import { useGameState, useGlobalState } from '@/stores';
import { useImgPath, useSite } from '@/hook/usePath';

const site = useSite();
const gameState = useGameState();
const globalState = useGlobalState();
</script>

<style lang="scss" scoped>
.cockfighting_component_container {
  height: 100%;
  @include flex(center);
  .cockfighting-item {
    margin-right: 100px;
    position: relative;
    width: 260px;
    height: 236px;
    background-size: 100% 100%;
    cursor: pointer;
    .bg-img {
      width: 100%;
      height: 100%;
    }
    .enter-game {
      position: absolute;
      top: 15px!important;
      right: 23px;
      font-size: 14px;
      font-weight: 500;
      color: var(--h_10);
      &:not(.zh, .zh_tw) {
        font-size: 12px;
        right: 18px;
        top: 14px;
        bottom: 11px;
      }
    }
    .desc-txt {
      position: absolute;
      top: 10px;
      left: 65px;
      font-weight: bold;
      font-size: 16px;
      color: var(--h_7);
      @include flex(flex-start, column);
      align-items: flex-start;
      .en {
        font-size: 14px;
      }
      .en-txt.zh {
        font-size: 12px;
      }
      .en-txt {
        &:not(.zh) {
          width: 90px;
          text-align: center;
        }
      }
    }
    .icon-container {
      right: -50px;
      bottom: 25px;
      position: absolute;
    }
  }
  .cockfighting-content {
    @include flex(center);
    position: relative;
    top: 5px;
    left: 27px;
    .cockfighting-title {
      font-size: 16px;
      font-weight: 600;
      .cockfighting-title-en {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}
</style>
