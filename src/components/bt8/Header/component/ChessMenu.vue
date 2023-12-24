<template>
  <Layout :isShowArrow="renderList.length>4">
    <template>
      <div @click="entryGame(item)" v-for="(item, index) in renderList" :key="index" class="chess-item-outer">
        <div class="chess-item">
          <div :class="`chess-context ${item.img_src}`">
            <div class="chess-title">
              <div class="chess-title-cn">{{item.title}}</div>
              <div class="chess-title-en">{{item.enTxt}}</div>
            </div>
          </div>
          <div class="enter-game">进入游戏</div>
          <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import GameStatausIcon from '../../GameStatusIcon/GameStatausIcon.vue';
import Layout from './Layout.vue'
export default {
  name: "ChessMenu",
  components: {
    GameStatausIcon,
    Layout
  },
  computed: {
    ...mapState({
      renderList: state => state.game.poker
    }),
  },
   methods:{
    ...mapMutations('game', ['set_poker_depotCode']),
    entryGame(item) {
      this.set_poker_depotCode(item.depotCode);
      this.$router.push('/poker/selectList');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/ChessMenu.scss";
</style>
