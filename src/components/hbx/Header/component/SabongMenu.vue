<template> 
  <Layout  :length="renderList.length" :num="3">
    <template>
      <div @click="($emit('enterGame',item))" v-for="(item, index) in renderList" :key="index" class="sport-item-outer">
        <div :class="`sport-item ${item.img_src}`">
          <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
          <div class="game-info"> <i class="el-icon-time"></i> {{item.memo}} </div>
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
  name: "SabongMenu",
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
      renderList: state => state.game.sabong
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../css/SabongMenu.scss";
</style>
