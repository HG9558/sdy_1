<template>
  <div class="discounts-container">
    <div class="discount-item" v-for="(item, index) in baseMenuData.discountMenu.list" :key="index">
      <div class="discounts-img" @click="goDiscountPage(item)">
        <img class="bg-img" :src="useImgPath(`base/header_discount_${item.depotCode.toLowerCase()}.png`)" alt="" />
      </div>
      <div v-html="item.zh_txt" :class="['enter-game', globalState.language]"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath } from '@/hook/usePath';
// import { useNormalState, useGlobalState } from '@/stores';
import { baseMenuData } from 'static_data/game_data';
import { useRouter } from 'vue-router';

const globalState = useGlobalState();
const normalState = useNormalState();
const router = useRouter();

const goDiscountPage = (item: GameDataType.List) => {
  router.push({ name: 'discount' });
  normalState.set_discount_type(item.zh_txt);
  normalState.set_scroll_top(628);
};
</script>

<style lang="scss" scoped>
.discounts-container {
  @include flex(flex-start);
  max-width: 100% !important;
  height: 150px;

  .discount-item {
    width: 144px;
    margin-right: 35px;
    cursor: pointer;
    position: relative;

    .discounts-img {
      width: 145px;
      height: 88px;
      position: relative;

      .bg-img {
        width: 100%;
        height: 100%;
      }
    }

    .enter-game {
      position: absolute;
      left: 15px;
      top: 20px;
      font-weight: 600;
      font-size: 16px;
      color: var(--h_9);
      max-width: 95px;
      white-space: pre-wrap;

      &:not(.zh, .zh_tw) {
        font-size: 14px;
        line-height: 1.2;
        transform: translateX(-5px);
      }
    }
  }
}
</style>
