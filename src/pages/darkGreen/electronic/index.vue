<template>
  <div class="electronic-box">
    <div class="electronic-banner" />
    <SplitLine />
    <div class="electronic-content">
      <router-view :electronic="electronic" @enterGame="_enterGame($event)"></router-view>
    </div>
  </div>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from "vuex";
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
		...mapGetters('global', ['isViLanguage']),
  },
  methods: {
    ...mapMutations('game', ['set_electronic']),
    ...mapMutations('normal', ['set_render_slot_game']),
    //- 获取电子游戏列表入口
    async _getData () {
      let tempArr = JSON.parse(JSON.stringify(this.electronic))
      const list = await Promise.all(tempArr.map(item => {
				if (item.depotCode === 'FISH') {
					return this.$http.getFishList({ lableName: "" })
				}
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
      const fishIndex = tempArr.findIndex(item => item.depotCode === 'FISH')
      if (fishIndex >= 0) {
        const fishData = tempArr.splice(fishIndex, 1)
        tempArr.splice(0, 0, ...fishData)
      }
      this.set_electronic(tempArr)
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
