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
            <img class="item-img" :src="require(`../img/menu/fishMenu/${item.img_src}.png`)" alt="">
          </div>

          <div class="enter-game">{{$t('进入游戏')}}</div>
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
  name: "FishMenu",
  components: {
    GameStatausIcon,
    Layout
  },
  computed: {
    ...mapState({
      renderList: state => state.game.catchfish
    }),
  },
  methods: {
    ...mapMutations('game', ['set_catchfish_depotCode']),
    goElectronicPage (item) {
      this.set_catchfish_depotCode(item.depotCode)
      this.$router.push('/fish/selectList');
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../css/FishMenu.scss";
</style>
