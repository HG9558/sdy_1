<template>
  <special-layout
    v-if="renderList.length"
    type="sport"
    :renderList="renderList"
    v-model:currentSelectIndex="currentSelectIndex"
    @enterGame="_enterGame($event)">
    <template #spacer>
      <img class="sport_icons" :src="useImgPath('special/sport_icons.png')" alt="" />
    </template>

    <img class="sport-main-pic" :src="useImgPath(`special/sport_${currentSelectIndex}.png`)" alt="" />
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
import { computed, ref } from 'vue';

const gameState = useGameState();
const globalState = useGlobalState();
const { _enterGame } = useGameHook();
const currentSelectIndex = ref<number>(0);
const router = useRouter();

watch(
  () => gameState.sport,
  _ => {
    if (!_.length) {
      router.replace('/home');
    }
  },
  { immediate: true }
);

const renderList = computed(() => {
  if (!gameState.sport.length) return [];
  return JSON.parse(JSON.stringify(gameState.sport)).map((item: API.normalGameType) => {
    item.sloginsData = item[`${globalState.language}_slogan` as keyof API.normalGameType];
    item.zh_txt = item[`${globalState.language}_txt` as keyof API.normalGameType];
    if (globalState.language !== 'zh') item.zh_txt = item.zh_txt.split(' ')[0] + ' Sports';
    return item;
  });
});
</script>
<style lang="scss" scoped>
.sport-main-pic {
  width: 590px;
  position: relative;
  top: 65px;
}

.sport_icons {
  width: 498px;
  height: 40px;
}
</style>
