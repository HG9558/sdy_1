<template>
  <Layout  :length="renderList.length" :num="3">
    <template>
      <div @click="($emit('enterGame',item))" v-for="(item, index) in renderList" :key="index" class="esport-container">
        <div :class="`electronic-item ${item.img_src}`">
          <div class="electronic-context">
            <div class="electronic-title">
              <div class="electronic-title-cn">{{item.title}}</div>
              <div v-if="!isEnLanguage" class="electronic-title-en">{{item.enTxt}}</div>
            </div>
            <div class="enter-game">{{$t('进入游戏')}}</div>
          </div>
          <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import {mapGetters, mapState} from "vuex";
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
    ...mapGetters('global', ['isEnLanguage']),
  }
};
</script>

<style lang="scss" scoped>
@import "../css/EsportMenu.scss";
</style>
