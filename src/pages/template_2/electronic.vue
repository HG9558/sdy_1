<template>
  <div :class="['electronic-box', site]">
    <div class="electronic-banner" />
    <div class="electronic-content">
      <router-view :electronic="formatList" @enterGame="_enterGame($event)"></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useGameHook from '@/hook/useGameHook';
import { useImgPath, useSite } from '@/hook/usePath';
import router from '@/router';
// import { useGameState, useGlobalState, useNormalState } from '@/stores';
import { computed, nextTick, onUnmounted, watch } from 'vue';

const site = useSite();
const normalState = useNormalState();
const gameState = useGameState();
const { _enterGame } = useGameHook();
const formatList = computed(() => {
  const tempArr = JSON.parse(JSON.stringify(gameState.electronic));
  return tempArr;
  // return [tempArr.pop(), ...tempArr];
});

const _getData = async () => {
  let tempArr = JSON.parse(JSON.stringify(formatList.value));
  const list = await Promise.all(
    tempArr.map((item: { depotCode: string; id: any }) => {
      // if (item.depotCode === 'FISH') {
      //   return api.game.getFishList({ lableName: '' });
      // }
      return api.game.getEleDataList({ depotId: item.id });
    })
  );

  tempArr.forEach((item: { renderList: never[]; totalCount: any }, index: string | number) => {
    if (list[index as keyof typeof list].code) {
      item.renderList = [];
    } else {
      item.renderList = list[index as keyof typeof list].page.list;
      item.totalCount = list[index as keyof typeof list].page.totalCount;
    }
  });
  // const fishIndex = tempArr.findIndex((item: { depotCode: string }) => item.depotCode === 'FISH');
  // const fishData = fishIndex >= 0 ? tempArr.splice(fishIndex, 1) : [formatList[0]];
  // gameState.set_electronic([...tempArr, ...fishData]);
  gameState.set_electronic(tempArr);
};

watch(
  () => normalState.renderSlotGame,
  _ => {
    if (_) _getData();
  },
  { immediate: true }
);

watch(
  () => router.currentRoute.value,
  (_, pre) => {
    pre.name === 'electronic-selectList' && _getData();
    nextTick(() => {
      window.scrollTo(0, 600);
    });
  }
);

onUnmounted(() => {
  normalState.set_renderSlotGame(false);
});

const globalState = useGlobalState();
const bannerBg = `url(${useImgPath(`electronic/${globalState.language !== 'zh' ? 'banner_on' : 'banner'}.jpg`)})`;
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1930px) {
  .electronic-banner {
    height: 900px !important;
  }
  .electronic-content {
    padding-top: 0px !important;
  }
}
.electronic-box {
  .electronic-banner {
    width: 100%;
    height: 600px;
    background: v-bind(bannerBg) no-repeat;
    background-size: 100% auto;
  }
  .electronic-content {
    height: 100%;
    margin: 0 auto;
    padding-top: 64px;
    background-size: 100% 100%;
    backdrop-filter: blur(20px);
  }
}

//- 003
.electronic-box {
  &.template_2_003 {
    .electronic-content {
      backdrop-filter: blur(0px);
    }
  }
}
</style>
