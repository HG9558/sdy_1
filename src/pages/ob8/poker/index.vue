<template>
  <div class="electronic-box">
    <div class="electronic-banner" />
    <SplitLine />
    <div class="electronic-content">
      <router-view :poker="poker" @enterGame="_enterGame($event)"></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"
import playGameMixin from '../../../common/mixin/playGameMixin';
export default {
  name: "poker",
  mixins: [playGameMixin],
  components: {
    SplitLine
  },
  watch: {
    renderPokerGame: {
      immediate: true,
      handler (status) {
        status && this._getData();
      }
    },
    $route (current,pre) {
      pre.name === 'selectList' && this._getData();
      this.$nextTick(() => {
        window.scrollTo(0, 555)
      })
    }
  },
  computed: {
    ...mapState({
      poker: state => state.game.poker,
      token: state => state.user.token,
      renderPokerGame: state => state.normal.renderPokerGame,
    }),
  },
  methods: {
    ...mapMutations('game', ['set_poker']),
    ...mapMutations('normal', ['set_render_pokerGame']),
    //- 获取棋牌游戏列表入口
    async _getData () {
      const tempArr = JSON.parse(JSON.stringify(this.poker));
      const list = await Promise.all(tempArr.map(item => {
        return this.$http.getGameChessList({ depotId: item.depotId })
      }));
      tempArr.forEach((item, index) => {
        if (list[index].data.code) return
        item.renderList = list[index].data.page.list;
        item.totalCount = list[index].data.page.totalCount
      })
      this.set_poker(tempArr)
    },
  },
  beforeDestroy () {
    this.set_render_pokerGame(false);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
