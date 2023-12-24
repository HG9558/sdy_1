<template>
  <special-layout
    v-if="renderList.length"
    type="real"
    :renderList="renderList"
    :currentSelectIndex.sync="currentSelectIndex"
    @enterGame="_enterGame($event)"
  >
    <img class="sport_icons" slot="spacer" />
    <!-- src="./img/sport_icons.png" alt=""-->
    <img
      class="real-main-pic"
      :src="
        require(`./img/${renderList[
          currentSelectIndex
        ].depotCode.toLowerCase()}.png`)
      "
      alt=""
    />
  </special-layout>
</template>

<script>
import SpecialLayout from "commonComponent/SpecialLayout/SpecialLayout.vue";
import { mapState } from "vuex";
import playGameMixin from "../../../common/mixin/playGameMixin";
export default {
  name: "real",
  mixins: [playGameMixin],
  components: {
    SpecialLayout
  },
  watch: {
    real: {
      immediate: true,
      handler(val) {
        console.log("val---", JSON.stringify(val));
        if (!val.length) {
          this.$router.replace("/");
        }
      }
    }
  },
  data() {
    return {
      sloginsData: {
        OBLI: "全新的真人游戏平台，带来最公平最公开最全面的游戏体验。",
        BG: "全新摄影棚、全新视觉、全新体验、拥有传统百家乐、共咪百家乐多彩百家乐、轮盘、龙虎、牛牛、炸金花等，亚洲顶级游戏平台之一。",
        BBIN2: "倾力于技术及系统研发，并提供整合平台服务.让玩家拥有身临其境的感觉，漂亮荷官在线发牌，让您拥有一个轻松的氛围。",
        AGIN: "一流质量、一级信誉，客户第一、玩法丰富.拥有卡卡湾厅、国际厅、旗舰厅、竞咪厅、VIP桌、各种游戏足不出户，即可享受顶级娱乐体验。",
        WM: "最极致的互动体验，最性感最完美的真人在线发牌，为您代理最舒心最惬意的完美体验。"
      },
      currentSelectIndex: 0
    };
  },
  computed: {
    ...mapState({
      real: state => state.game.real,
    }),
    renderList() {
      if (!this.real.length) {
        return [];
      }
      return JSON.parse(JSON.stringify(this.real)).map(item => {
        item.sloginsData = this.sloginsData[item.depotCode];
        return item;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.real-main-pic {
  width: 590px;
  position: relative;
  top: 65px;
}
</style>
