<template>
  <Layout  :length="renderList.length" :num="4">
    <template>
      <div @click="entryGame(item)" v-for="(item, index) in renderList" :key="index" class="lottery-item-outer">
        <div class="lottery-item">
          <div :class="`lottery-context ${item.img_src}`">
            <div class="lottery-title">{{item.title}}</div>
            <img class="item-img" :src="require(`../img/menu/lotteryMenu/${item.img_src}.png`)" alt="">
          </div>
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
  name: "LotteryMenu",
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
      renderList: state => state.game.lottery
    }),
  },
  methods:{
    ...mapMutations('game', ['set_lottery_depotCode']),
    entryGame(item) {
      this.set_lottery_depotCode(item.depotCode);
      this.$router.push('/lottery/selectList');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/LotteryMenu.scss";
</style>
