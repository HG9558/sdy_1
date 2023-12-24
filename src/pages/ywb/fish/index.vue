<template>
  <div class="electronic-box">
    <div class="electronic-banner" />
    <SplitLine />
    <div class="electronic-content">
      <router-view :electronic="catchfish" @enterGame="_enterGame($event)"></router-view>
    </div>
  </div>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from "vuex";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"
import playGameMixin from '../../../common/mixin/playGameMixin';
  import {getGameListByCatIdAndDepotId} from "../../../api/interface/game";
export default {
  name: "fish",
  mixins: [playGameMixin],
  components: {
    SplitLine
  },
  watch: {
    renderCatchfishGame: {
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
      catchfish: state => state.game.catchfish,
      token: state => state.user.token,
      renderCatchfishGame: state => state.normal.renderCatchfishGame,
    }),
  },
  methods: {
    ...mapMutations('game', ['set_catchfish']),
    ...mapMutations('normal', ['set_render_catchfishGame']),
    //- 获取电子游戏列表入口
    async _getData () {
      const tempArr = JSON.parse(JSON.stringify(this.catchfish));
      const list = await Promise.all(tempArr.map(item => {
        return this.$http.getGameListByCatIdAndDepotId({ catId: 8, depotId: item.id })
      }));
      tempArr.forEach((item, index) => {
        if (list[index].data.code) return
        list[index].data.page.list.forEach(game => {
          game.titleTag = item.titleTag
        })
        item.renderList = list[index].data.page.list;
        item.totalCount = list[index].data.page.totalCount
      })
      this.set_catchfish(tempArr)
    },
  },
  beforeDestroy () {
    this.set_render_catchfishGame(false);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
