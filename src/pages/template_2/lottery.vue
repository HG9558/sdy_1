<template>
  <div :class="['electronic-box', site]">
    <div class="poker-banner" />
    <div class="electronic-content">
      <router-view @enterGame="_enterGame($event)"></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useGameHook from '@/hook/useGameHook';
import { useImgPath, useSite } from '@/hook/usePath';
import router from '@/router';
// import { useGameState, useGlobalState, useNormalState } from '@/stores';
import { nextTick, onUnmounted, watch } from 'vue';

const normalState = useNormalState();
const gameState = useGameState();
const { _enterGame } = useGameHook();
const site = useSite();

const _getData = async () => {
  const tempArr = JSON.parse(JSON.stringify(gameState.lottery));
  const list = await Promise.all(
    tempArr.map((item: { depotId: number }) => {
      return api.game.getGameLotteryList({ depotId: item.depotId });
    })
  );

  tempArr.forEach((item: API.normalGameType, index: number) => {
    if (list[index].code) return;
    item.renderList = list[index].page.list;
    item.totalCount = list[index].page.totalCount;
  });
  gameState.set_lottery(tempArr);
};

watch(
  () => normalState.renderLotteryGame,
  _ => _ && _getData(),
  { immediate: true }
);

watch(
  () => router.currentRoute.value,
  (_, pre) => {
    pre.name === 'lottery-selectList' && _getData();
    nextTick(() => {
      window.scrollTo(0, 600);
    });
  }
);

onUnmounted(() => normalState.set_renderLotteryGame(false));

const globalState = useGlobalState();
const bannerBg = `url(${useImgPath(`lottery/${globalState.language !== 'zh' ? 'banner_on' : 'banner'}.jpg`)})`;
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1930px) {
  .electronic-banner {
    height: 900px !important;
    .electronic-content {
      padding-top: 0px !important;
    }
  }
}
.electronic-box {
  width: 100%;

  .poker-banner {
    width: 100%;
    height: 600px;
    background: v-bind(bannerBg) no-repeat center;
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
