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
        if (!val.length) {
          this.$router.replace("/");
        }
      }
    }
  },
  data() {
    return {
      sloginsData: {
        BBIN2:
          this.$tt('xxxx主打的24小时运营的直播在线视频类游戏，让玩家拥有身临其境的感觉，独创的网络金臂百家乐，更是取代了真人荷官发牌，让玩家耳目一新。除了百家乐，xxxx还提供真钱德州扑克，温州牌九，轮盘，番摊和骰宝等多款热门游戏，保证玩家获取的投注信息公平公正公开实时，让玩家可以随时随地享受游戏的快感。', { name: 'BBIN\'s' }),
        EB:
          this.$t('高清性感真人荷官直播娱乐场，独创真人融合棋牌电游风格。设有百家乐、牛牛、龙虎、炸金花、色碟、番摊等上百真人荷官桌台，专为亚洲人研发设计的投注界面，细致版面、极致操作让您拥有身临其境的体验！'),
        ABET:
          this.$t('投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。'),
        WM:
          this.$t('投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。'),
				EVO:
					this.$t('高清性感真人荷官直播娱乐场，独创真人融合棋牌电游风格。设有百家乐、牛牛、龙虎、炸金花、色碟、番摊等上百真人荷官桌台，专为亚洲人研发设计的投注界面，细致版面、极致操作让您拥有身临其境的体验！'),
				PP:
					this.$t('投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。'),
				BG:
					this.$tt('xx真人平台抢攻高端真人视讯市场，以丰厚的市场资源及独家的研发技术作为强力后盾，更远赴美洲，遴选不同国籍具备超模等级的性感佳丽担任荷官，更不惜赤资重金打造千万等级并且高度还原真实赌场的摄影棚，提供玩家身历其境的游戏体验。',{ name: 'BG' }),
				MG2:
					this.$t('投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。'),
				SEX:
					this.$t('投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。'),
				SA:
					this.$t('投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。'),
				PTL:
					this.$t('投注界面友好，玩法多样不停加入新彩池。玩家投注彩池及路线图均清晰实时显示，进座旁注不同模式。主播聊天无限欢乐，能要求延长下注时间，刺激咪牌，赢钱开心赏小费。'),
				OGLIVE:
					this.$tt('xx真人视讯为亚洲最具潜力的真人视讯品牌，提供百家乐、极速百家乐、共咪百家乐、多彩百家乐、龙虎、骰宝、轮盘、牛牛、炸金花等多样真人视讯游戏。xx真人视讯采用国际标准的真人游戏摄影棚，全场严密监控，流程公正公开，提供最公平的游戏环境。超低延迟高清视频，即时呈现！',{ name: 'OG' }),
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
