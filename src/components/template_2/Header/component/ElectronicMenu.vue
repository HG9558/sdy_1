<template>
  <Layout :length="gameState.electronic.length" :num="4">
    <div
      @click="goElectronicPage(item.depotCode)"
      v-for="(item, index) in gameState.electronic"
      :key="index"
      :class="['electronic-item-outer', site]">
      <div class="electronic-item">
        <div class="electronic-context">
          <img
            class="bg-img"
            :src="useImgPath(`base/header_slot_${item.depotCode.toLowerCase()}.png`)"
            @error="$event => useErrorPath('base/header_slot_default.png', $event)" />
          <div :class="['desc-txt', globalState.language === 'en' && 'single-txt']">
            <span v-if="globalState.language.includes('zh')" class="zh-txt">{{
              item[`${globalState.language}_txt`]
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
import { useRouter } from 'vue-router';
import { useErrorPath, useImgPath, useSite } from '@/hook/usePath';

const site = useSite();
const router = useRouter();
const gameState = useGameState();
const globalState = useGlobalState();

const goElectronicPage = (item: string) => {
  gameState.set_electronic_depotCode(item);
  router.push('/electronic/selectList');
};
</script>

<style lang="scss" scoped>
.electronic-item-outer {
  font-size: 16px;
  font-weight: 600;
  width: 25%;
  min-width: 25%;
  padding-top: 16px;
  box-sizing: border-box;
  @include flex(center);
  .electronic-item {
    position: relative;
    height: 229px;
    width: 100%;
    cursor: pointer;
    @include flex(flex-start, column);
    .icon-container {
      position: relative;
      left: -50px;
      bottom: 7px;
    }
    .electronic-context {
      position: relative;
      width: 100%;
      height: 195px;

      .bg-img {
        width: 114px;
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
          // font-size: 12px;
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
