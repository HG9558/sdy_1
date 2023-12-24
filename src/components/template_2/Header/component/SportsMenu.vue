<template>
  <Layout :length="gameState.sport.length" :num="3">
    <div @click="enterGame(item)" v-for="(item, index) in gameState.sport" :key="index" class="sport-menu-item-outer">
      <div class="sport-menu-item">
        <img
          class="sport-menu_bg-img"
          :src="useImgPath(`base/header_sports_${item.depotCode.toLowerCase()}.png`)"
          alt=""
          @error="$event => useErrorPath('base/header_sports_default.png', $event)" />
        <div :class="['sport-item_desc_txt', !globalState.language.includes('zh') && 't-100']">
          <span v-if="globalState.language.includes('zh')" class="zh">{{
            item[`${globalState.language}_txt` as keyof API.normalGameType]
          }}</span>
          <span :class="['en', globalState.language]">{{ item.en_txt }}</span>
        </div>
        <div :class="['sport-menu_enter-btn', globalState.language, item.depotCode.toLowerCase()]">
          {{ $t_c('进入游戏') }}
        </div>
        <GameStatusIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatusIcon>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import GameStatusIcon from '@/components/template_2/GameStatusIcon/GameStatusIcon.vue';
// import { useGameState, useGlobalState } from '@/stores';
import Layout from './ScrollLayout.vue';
import { useErrorPath, useImgPath } from '@/hook/usePath';

const gameState = useGameState();
const globalState = useGlobalState();
const emit = defineEmits(['enterGame']);
const enterGame = (_: API.normalGameType) => emit('enterGame', _);
</script>

<style lang="scss" scoped>
.sport-menu-item-outer {
  flex-shrink: 0;
  width: 33%;
  @include flex(center);
}
.sport-menu-item {
  position: relative;
  width: 247px;
  height: 230px;
  cursor: pointer;
  background-size: auto 100%;
  background-repeat: no-repeat;
  &:last-child {
    margin-right: 0;
  }
  .sport-menu_bg-img {
    width: 100%;
    height: 100%;
  }
  .sport-item_desc_txt {
    @include flex(flex-start, column);
    position: absolute;
    left: 20px;
    top: 90px;
    color: var(--h_8);
    font-weight: 500;
    font-size: 14px;
    align-items: flex-start;
    .en.zh {
      font-size: 12px;
    }
  }
  .sport-menu_enter-btn {
    position: absolute;
    bottom: 69px;
    font-weight: 500;
    font-size: 14px;
    left: 31px;
    color: var(--h_8);
    &:not(.zh, .zh_tw) {
      font-size: 12px;
      left: 26px;
      bottom: 71px;
    }
  }
}
.icon-container {
  left: 60px;
  bottom: 0px;
  position: absolute;
}
.sport-context {
  position: absolute;
  top: 70px;
  left: 25px;
  .sport-title-en {
    font-size: 12px;
  }
}
</style>
