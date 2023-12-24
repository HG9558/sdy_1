<template>
  <Layout  :length="renderList.length" :num="3">
    <template>
      <div @click="($emit('enterGame',item))" v-for="(item, index) in renderList" :key="index" class="sport-item-outer">
        <div :class="`sport-item ${item.img_src}`">
          <div class="sport-context">
            <div class="sport-title-cn">{{item.title || item.titleTag  }}</div>
            <div class="sport-title-en">{{item.enTxt}}</div>
          </div>
          <div class="enter-game">{{$t('进入游戏')}}</div>
          <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import { mapState } from "vuex";
import GameStatausIcon from '../../GameStatusIcon/GameStatausIcon.vue';
import Layout from './Layout.vue'
export default {
  name: "SportsMenu",
  components: {
    GameStatausIcon,
    Layout
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      renderList: state => state.game.sport
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../css/SportMenu.scss";
</style>
