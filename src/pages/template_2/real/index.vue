<template>
  <special-layout
    v-if="renderList.length"
    type="real"
    :renderList="renderList"
    v-model:currentSelectIndex="currentSelectIndex"
    @enterGame="_enterGame($event)">
    <template #spacer>
      <img class="sport_icons" />
    </template>
    <img class="real-main-pic" :src="useImgPath(`special/real_${currentSelectIndex + 1}.png`)" alt="" />
  </special-layout>
</template>

<route>
 {meta: {bg: 'bg_2'}}
</route>

<script lang="ts" setup>
import useGameHook from '@/hook/useGameHook';
import { useImgPath } from '@/hook/usePath';
// import { useGameState, useGlobalState } from '@/stores';
import SpecialLayout from 'commonComponent/SpecialLayout/SpecialLayout.vue';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const gameState = useGameState();
const { _enterGame } = useGameHook();
const currentSelectIndex = ref<number>(0);
const router = useRouter();
const globalState = useGlobalState();

watch(
  () => gameState.real,
  _ => {
    if (!_.length) router.replace('/home');
  },
  { immediate: true }
);

const renderList = computed(() => {
  if (!gameState.real.length) return [];
  return JSON.parse(JSON.stringify(gameState.real)).map((item: API.normalGameType) => {
    item.sloginsData = item[`${globalState.language}_slogan` as keyof API.normalGameType];
    item.zh_txt = item[`${globalState.language}_txt` as keyof API.normalGameType];
    return item;
  });
});
</script>
<style lang="scss" scoped>
.real-main-pic {
  width: 590px;
  position: relative;
  top: 65px;
}
</style>
