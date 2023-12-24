<template>
  <Layout  :length="renderList.length" :num="5">
    <template>
      <div @click="goElectronicPage(item)" v-for="(item, index) in renderList" :key="index" class="electronic-item-outer">
        <div class="electronic-item">
          <div :class="`electronic-context ${item.img_src}`">
            <div class="electronic-title">
              <div class="electronic-title-cn">{{item.title}}</div>
              <div class="electronic-title-en">{{item.enTxt}}</div>
            </div>
            <img class="item-img" :src="require(`../img/menu/slotMenu/${item.img_src}.png`)" alt="">
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
  name: "ElectronicMenu",
  components: {
    GameStatausIcon,
    Layout
  },
  computed: {
    ...mapState({
      renderList: state => state.game.electronic
    }),
  },
  methods: {
    ...mapMutations('game', ['set_electronic_depotCode']),
    goElectronicPage (item) {
      this.set_electronic_depotCode(item.depotCode)
      this.$router.push('/electronic/selectList');
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../css/ElectronicMenu.scss";
</style>