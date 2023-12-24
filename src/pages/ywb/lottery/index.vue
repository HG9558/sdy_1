<template>
  <div class="electronic-box">
    <div class="electronic-banner" />
    <!-- <SplitLine /> -->
    <div class="electronic-content">
      <router-view :lottery="lottery" @enterGame="_enterGame($event)"></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"
import playGameMixin from '../../../common/mixin/playGameMixin';
export default {
  name: "lottery",
  mixins: [playGameMixin],
  components: {
    SplitLine
  },
  watch: {
    renderLotteryGame: {
      immediate: true,
      handler (status) {
        status && this._getData();
      }
    },
    $route (current, pre) {
      pre.name === 'selectList' && this._getData();
      this.$nextTick(() => {
        window.scrollTo(0, 555);
      })
    }
  },
  computed: {
    ...mapState({
      lottery: state => state.game.lottery,
      token: state => state.user.token,
      renderLotteryGame: state => state.normal.renderLotteryGame,
    }),
  },
  methods: {
    ...mapMutations('game', ['set_lottery']),
    ...mapMutations('normal', ['set_render_lotteryGame']),
    //- 获取彩票游戏列表入口
    async _getData () {
      const tempArr = JSON.parse(JSON.stringify(this.lottery));
      const list = await Promise.all(tempArr.map(item => {
        return this.$http.getGameLotteryList({ depotId: item.depotId })
      }))

      tempArr.forEach((item, index) => {
        if (list[index].data.code) {
          item.renderList = [];
        } else {
          item.renderList = list[index].data.page.list;
          item.totalCount = list[index].data.page.totalCount
        }

      })
      this.set_lottery(tempArr)
    },
  },
  beforeDestroy () {
    this.set_render_lotteryGame(false);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
