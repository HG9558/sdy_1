<template>
  <special-layout
    type="esport"
    :renderList="renderList"
    v-model:currentSelectIndex="currentSelectIndex"
    @enterGame="_enterGame($event)">
    <img
      :class="`esport-main-pic ${renderList[currentSelectIndex].depotCode}`"
      :src="useImgPath(`special/e_sport_${currentSelectIndex + 1}.png`)" />
  </special-layout>
</template>

<route>
 {meta: {bg: 'bg_2'}}
</route>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
// import { useGameState, useGlobalState } from '@/stores';
import SpecialLayout from 'commonComponent/SpecialLayout/SpecialLayout.vue';
import { useRouter } from 'vue-router';
import useGameHook from '@/hook/useGameHook';
import { useImgPath } from '@/hook/usePath';
const { _enterGame } = useGameHook();

const gameState = useGameState();
const router = useRouter();
const currentSelectIndex = ref<number>(0);
const globalState = useGlobalState();

watch(
  () => gameState.esport,
  _ => {
    if (!_.length) router.replace('/home');
  },
  { immediate: true }
);

const renderList = computed(() => {
  if (!gameState.esport.length) return [];
  return JSON.parse(JSON.stringify(gameState.esport)).map((item: API.normalGameType) => {
    item.sloginsData = item[`${globalState.language}_slogan` as keyof API.normalGameType];
    item.zh_txt = item[`${globalState.language}_txt` as keyof API.normalGameType];
    return item;
  });
});
</script>
<style lang="scss" scoped>
.esport-main-pic {
  width: 630px;
  position: relative;
  top: 60px;
}
</style>
