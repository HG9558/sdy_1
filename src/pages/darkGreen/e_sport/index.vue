<template>
  <special-layout type="esport" :renderList="renderList" :currentSelectIndex.sync="currentSelectIndex" @enterGame="_enterGame($event)">
    <img :class="`esport-main-pic ${renderList[currentSelectIndex].depotCode}`" :src="require(`./img/${renderList[currentSelectIndex].depotCode.toLowerCase()}.png`)" alt="">
  </special-layout>
</template>

<script>
import SpecialLayout from "commonComponent/SpecialLayout/SpecialLayout.vue";
import { mapState } from "vuex";
import playGameMixin from '../../../common/mixin/playGameMixin';
export default {
  name: "esport",
  mixins: [playGameMixin],
  components: {
    SpecialLayout,
  },
  watch: {
    esport: {
      immediate: true,
      handler (val) {
        if (!val.length) {
          this.$router.replace('/');
        }
      }
    }
  },
  data () {
    return {
      sloginsData: {
				XAVN: this.$t('全球顶尖赛事全覆盖，提供专业的赔率数据，结算赛果数据。日均提供100+电竞赛事，50+电竞新玩法，10+电竞滚球盘数，业内最佳盘口。'),
        TF: this.$t('全球顶尖赛事全覆盖，提供专业的赔率数据，结算赛果数据。日均提供100+电竞赛事，50+电竞新玩法，10+电竞滚球盘数，业内最佳盘口。'),
        IM: this.$t('IM电子竞技是由一群资深专业的电子竞技玩家研发的电竞竞猜平台。不但有顶尖的技术支持，还拥有令人惊叹的视觉界面及高效的用户体验。所以IM电竞竞猜平台能让您轻松上手，一目了然，轻松投注。'),
        XA: this.$t('小艾电竞是由一群资深专业的电子竞技玩家研发的电竞竞猜平台。不但有顶尖的技术支持，还拥有令人惊叹的视觉界面及高效的用户体验。所以小艾电竞竞猜平台能让您轻松上手，一目了然，轻松投注。'),
				OBES: this.$t('全球顶尖赛事全覆盖，提供专业的赔率数据，结算赛果数据。日均提供100+电竞赛事，50+电竞新玩法，10+电竞滚球盘数，业内最佳盘口。'),
			},
      currentSelectIndex: 0,
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      esport: state => state.game.esport,
    }),
    renderList () {
      if (!this.esport.length) {
        return [];
      }
      return JSON.parse(JSON.stringify(this.esport)).map(item => {
        item.sloginsData = this.sloginsData[item.depotCode];
        return item
      })
    }
  },
};

</script>
<style lang="scss" scoped>
.esport-main-pic {
  width: 630px;
  position: relative;
  top: 60px;
  &.TF{
    width:777px;
    left: -50px;
  }
  &.IM{
    left: 50px;
  }
}
</style>
