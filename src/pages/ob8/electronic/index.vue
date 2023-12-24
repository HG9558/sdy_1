<template>
  <div class="electronic-box">
    <div class="electronic-banner" />
    <SplitLine />
    <div class="electronic-content">
      <router-view :electronic="formatList" @enterGame="_enterGame($event)"></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"
import playGameMixin from '../../../common/mixin/playGameMixin';
export default {
  name: "electronic",
  mixins: [playGameMixin],
  components: {
    SplitLine
  },
  watch: {
    renderSlotGame: {
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
      electronic: state => state.game.electronic,
      token: state => state.user.token,
      renderSlotGame: state => state.normal.renderSlotGame,
    }),
    formatList () {
      const tempArr = JSON.parse(JSON.stringify(this.electronic));
      return [tempArr.pop(), ...tempArr]
    },
  },
  methods: {
    ...mapMutations('game', ['set_electronic']),
    ...mapMutations('normal', ['set_render_slot_game']),
    //- 获取电子游戏列表入口
    async _getData () {
      let tempArr = JSON.parse(JSON.stringify(this.formatList)).filter(item => item.depotCode !== 'FISH');
      const list = await Promise.all(tempArr.map(item => {
        return this.$http.getEleDataList({ depotId: item.id })
      }))
      tempArr.forEach((item, index) => {
        if (list[index].data.code) {
          item.renderList = [];
        } else {
          item.renderList = list[index].data.page.list;
          item.totalCount = list[index].data.page.totalCount
        }

      })
      this.set_electronic([...tempArr, this.formatList[0]])
    },
  },
  beforeDestroy () {
    this.set_render_slot_game(false);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
