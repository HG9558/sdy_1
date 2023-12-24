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
  name: "physical",
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
        AGIN:
          "以高规格打造的AG真人配备最先进的设备以及富丽堂皇的装潢，为玩家打造 绝佳真人视讯游戏体验。游戏选择多样化，包括备受欢迎的百家乐丶骰宝丶轮盘等加上全天侯监控管理，为玩家提供稳定而流畅的游戏服务",
        BBIN2:
          "BBIN主打的24小时运营的直播在线视频类游戏，让玩家拥有身临其境的感觉，独创的网络金臂百家乐，更是取代了真人荷官发牌，让玩家耳目一新。除了百家乐，BBIN还提供真钱德州扑克，温州牌九，轮盘，番摊和骰宝等多款热门游戏，保证玩家获取的投注信息公平公正公开实时，让玩家可以随时随地享受游戏的快感。",
        OBLI:
          "投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。",
        BG:
          "BG真人视讯为亚洲最具潜力的真人视讯品牌，提供百家乐、极速百家乐、共咪百家乐、多彩百家乐、龙虎、骰宝、轮盘、牛牛、炸金花等多样真人视讯游戏。BG真人视讯采用国际标准的真人游戏摄影棚，全场严密监控，流程公正公开，提供最公平的游戏环境。超低延迟高清视频，即时呈现！",
        WM:
          "高清性感真人荷官直播娱乐场，独创真人融合棋牌电游风格。设有百家乐、牛牛、龙虎、炸金花、色碟、番摊等上百真人荷官桌台，专为亚洲人研发设计的投注界面，细致版面、极致操作让您拥有身临其境的体验！"
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
