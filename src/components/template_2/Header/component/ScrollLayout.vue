<template>
  <div>
    <i v-if="isShowArrow" class="layout_left_arrow layout_arrow" @click="prev"></i>
    <div class="layout_menu_wrapper">
      <div
        :class="['layout_scroll_container', { 'flex-start': isShowArrow }]"
        :style="{ transform: `translateX(${-translateWidth}%)` }">
        <slot></slot>
      </div>
    </div>
    <i v-if="isShowArrow" class="right-arrow layout_arrow" @click="next"></i>
  </div>
</template>

<script setup lang="ts">
import { useImgPath } from '@/hook/usePath';
import { computed, ref, type ComputedRef } from 'vue';

const props = withDefaults(
  defineProps<{
    length: number;
    num: number;
  }>(),
  {
    length: 0,
    num: 0,
  }
);

let translateWidth = ref<number>(0);

const isShowArrow: ComputedRef<boolean> = computed(() => props.length > props.num);

const prev = () => {
  if (translateWidth.value / 100 > 0) translateWidth.value -= 100;
};

const next = () => {
  let pageSize = Math.ceil(props.length / props.num);
  if (translateWidth.value / 100 < pageSize - 1) {
    translateWidth.value += 100;
  }
};

const leftArrow = `url(${useImgPath('base/header_menu_left_arrow.png')})`;
const rightArrow = `url(${useImgPath('base/header_menu_right_arrow.png')})`;
</script>

<style lang="scss" scoped>
.layout_arrow {
  flex-shrink: 0;
  width: 20px;
  height: 30px;
  cursor: pointer;
  transition: 0.3s;
  top: 50%;
  transform: translateY(-50%);
  background-size: 100% 100%;
  position: absolute;
  background-image: v-bind(leftArrow);
  left: -40px;
  &.right-arrow {
    left: auto;
    right: 0px;
    background-image: v-bind(rightArrow);
  }
}
.layout_menu_wrapper {
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  &.p-50 {
    padding: 0 50px;
  }
  .layout_scroll_container {
    transition: 0.3s;
    height: 100%;
    @include flex(center);
    &.flex-start {
      justify-content: flex-start;
    }
    &.ml_25 {
      margin-left: -25%;
    }
  }
}
</style>
