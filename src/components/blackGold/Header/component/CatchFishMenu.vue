<template>
  <Layout  :length="renderList.length" :num="5">
    <template>
      <div @click="entryGame(item)" v-for="(item, index) in renderList" :key="index" class="electronic-item-outer">
        <div class="electronic-item">
          <div :class="`electronic-context ${item.img_src}`">
            <div class="electronic-title">
              <div class="electronic-title-cn">{{item.title}}</div>
              <div v-if="!isEnLanguage" class="electronic-title-en">{{item.enTxt}}</div>
            </div>
            <img class="item-img" :src="require(`../img/menu/catchFishMenu/${item.img_src}.png`)" alt="">
          </div>
          <div class="enter-game">{{$t('进入游戏')}}</div>
          <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import {mapState, mapMutations, mapGetters} from "vuex";
import GameStatausIcon from '../../GameStatusIcon/GameStatausIcon.vue';
import Layout from './Layout.vue'
export default {
  components: {
    GameStatausIcon,
    Layout
  },
  computed: {
    ...mapState({
      renderList: state => state.game.catchfish
    }),
    ...mapGetters('global', ['isEnLanguage']),
  },
   methods:{
    ...mapMutations('game', ['set_catchfish_depotCode']),
    entryGame(item) {
      this.set_catchfish_depotCode(item.depotCode);
      this.$router.push('/catchfish/selectList');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/CatchFishMenu.scss";
</style>
