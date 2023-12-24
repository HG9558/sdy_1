<template>
  <Layout :length="gameState.lottery.length" :num="4">
    <div
      @click="entryGame(item.depotCode)"
      v-for="(item, index) in gameState.lottery"
      :key="index"
      :class="['lottery-item-outer', globalState.language]">
      <div class="lottery-item">
        <div class="lottery-context">
          <img
            class="bg-img"
            :src="useImgPath(`base/header_lottery_${item.depotCode.toLowerCase()}.png`)"
            alt=""
            @error="$event => useErrorPath('base/header_lottery_default.png', $event)" />
          <div :class="['desc-txt', globalState.language, globalState.language === 'en' && 'single-txt']">
            <span v-if="globalState.language.startsWith('zh')" class="zh-txt">{{
              item[`${globalState.language}_txt` as keyof API.normalGameType]
            }}</span>
            <span :class="['en-txt', globalState.language]">{{ item.en_txt }}</span>
          </div>
        </div>
        <GameStatusIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatusIcon>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { useErrorPath, useImgPath } from '@/hook/usePath';
// import { useGameState, useGlobalState } from '@/stores';
import GameStatusIcon from '@/components/template_2/GameStatusIcon/GameStatusIcon.vue';
import { useRouter } from 'vue-router';
import Layout from './ScrollLayout.vue';

const gameState = useGameState();
const globalState = useGlobalState();
const router = useRouter();

const entryGame = (_: string) => {
  gameState.set_lottery_depotCode(_);
  router.push('/lottery/selectList');
};
</script>

<style lang="scss" scoped>
.lottery-item-outer {
  font-size: 16px;
  font-weight: 600;
  width: 25%;
  min-width: 25%;
  .lottery-item {
    position: relative;
    height: 235px;
    display: flex;
    justify-content: center;
    .lottery-context {
      width: 148px;
      height: 208px;
      cursor: pointer;
      .bg-img {
        width: 100%;
        height: 100%;
      }
      .desc-txt {
        position: absolute;
        top: 5px;
        left: 105px;
        color: var(--h_7);
        @include flex(flex-start, column);
        align-items: flex-start;
        .en-txt.zh {
          font-size: 12px;
        }
        &.single-txt {
          top: 12px;
          .en-txt {
            font-size: 16px;
          }
        }
        .en-txt {
          white-space: nowrap;
          &.ms,
          &.vi {
            margin-top: 8px;
          }
        }
      }
      .lottery-title {
        position: absolute;
        left: 90px;
        top: 10px;
      }
      .item-img {
        width: 158px;
      }
    }
    .icon-container {
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      width: 54px;
      position: absolute;
    }
  }
}
</style>
