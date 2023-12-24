<template>
  <Layout  :length="renderList.length" :num="4">
    <template>
      <div @click="($emit('enterGame',item))" v-for="(item, index) in renderList" :key="index" class="real-item-outer">
        <div :class="`real-item ${item.img_src}`">
          <div class="real-context">{{item.title}}</div>
          <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import GameStatausIcon from '../../GameStatusIcon/GameStatausIcon.vue';
import Layout from './Layout.vue'
export default {
  name: "RealMenu",
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
      renderList: state => state.game.real
    }),
  },
  methods: {
    ...mapMutations('game',['set_real_depotCode']),
    // goAllList (item) {
    //   this.set_real_depotCode(item.depotCode)
    //   if(item.depotCode === 'OBLI') {
    //     this.$router.push('/real');
    //   } else {
    //     this.$router.push('/real/selectList');
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/RealMenu.scss";
</style>
