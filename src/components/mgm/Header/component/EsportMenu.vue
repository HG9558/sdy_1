<template>
  <div class="esport-container">
    <div @click="($emit('enterGame',item))" v-for="(item, index) in renderList" :key="index" :class="`electronic-item ${item.img_src}`">
      <div class="electronic-context">
        <div class="electronic-title">
          <div class="electronic-title-cn">{{item.titleTag || item.title}}</div>
          <div class="electronic-title-en">{{item.enTxt}}</div>
        </div>
        <div class="enter-game">进入游戏</div>
      </div>
      <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GameStatausIcon from '../../GameStatusIcon/GameStatausIcon.vue';
import Layout from './Layout.vue'
export default {
  name: "EsportMenu",
  components: {
    GameStatausIcon,
    Layout
  },
  computed: {
    ...mapState({
      renderList: state => state.game.esport
    }),
  }
};
</script>

<style lang="scss" scoped>
@import "../css/EsportMenu.scss";
</style>
