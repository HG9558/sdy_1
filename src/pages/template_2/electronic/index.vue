<template>
  <div :class="['electronic-partList-wrapper', site]">
    <div class="list-wrapper" v-for="gameItem in electronic" :key="gameItem.depotCode">
      <div class="game-type" v-if="gameItem.renderList && gameItem.renderList.length">
        <div class="game-classify">
          <div class="title-box">
            <img
              class="logo"
              :src="useImgPath(`electronic/logo_${gameItem.depotCode}.png`)"
              @error="($event:Event)=> useErrorPath('electronic/logo_default.png',$event)" />
            <div class="title">
              <div>{{ gameItem[`${globalState.language}_txt`] }}</div>
              <div class="en-title" v-if="globalState.language === 'zh'">{{ gameItem.en_txt }}</div>
            </div>
          </div>
          <div @click="goAllList(gameItem.depotCode)" class="go-btn">
            <div class="more-left">
              <span>{{ $t_c('查看更多') }}</span>
              <img class="more-arrows" :src="useImgPath('electronic/more_arrows.png')" alt="" />
            </div>
            <img class="more-button" :src="useImgPath('electronic/more_button.png')" alt="" />
          </div>
        </div>
        <div class="game-list" v-if="gameItem.renderList">
          <div
            :key="index"
            class="game-item-wrap"
            v-for="(dataItem, index) in gameItem.renderList.slice(0, 5)"
            @click="$emit('enterGame', { ...dataItem, availableWh: gameItem.availableWh })">
            <img class="game-pic" :src="dataItem.logo" alt="图片加载失败" />
            <div class="masker animate__fadeIn animate__animated">
              <div class="game-name">
                <div class="game-title">{{ dataItem.gameName }}</div>
                <div :class="['game-context', globalState.language]">
                  {{ $t_c('丰富的游戏类型，让您尽情享受。') }}
                </div>
              </div>
              <span :class="['enter-btn', globalState.language]">
                <span>{{ $t_c('进入游戏') }}</span>
              </span>
            </div>
            <div class="try" v-if="dataItem.isTry == 1 && !userState.token">
              <span>{{ $t_c('可试玩') }}</span>
              <img class="try_img" :src="useImgPath('electronic/entry_try.png')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useErrorPath, useImgPath, useSite } from '@/hook/usePath';
// import { useGameState, useGlobalState, useUserState } from '@/stores';
import { useRouter } from 'vue-router';

const site = useSite();
defineProps<{
  electronic: API.normalGameType & API.GameType[];
}>();

const userState = useUserState();
const gameState = useGameState();
const globalState = useGlobalState();
const router = useRouter();

const goAllList = (depotCode: string) => {
  gameState.set_electronic_depotCode(depotCode);
  router.push('/electronic/selectList');
};

const enterbtnBg = `url(${useImgPath('electronic/entry_btn.png')})`;
const enterbtnHoverBg = `url(${useImgPath('electronic/entry_btn_active.png')})`;
</script>

<style lang="scss" scoped>
@import './css/index.scss';
.enter-btn {
  background: v-bind(enterbtnBg);
  &:hover {
    background: v-bind(enterbtnHoverBg);
  }
}
</style>
