<template>
  <special-layout v-if="renderList.length" type="sport" :renderList="renderList" :currentSelectIndex.sync="currentSelectIndex" @enterGame="_enterGame($event)">
    <img class="sport_icons" slot="spacer" src="./img/sport_icons.png" alt="">
    <img class="sport-main-pic" :src="require(`./img/${renderList[currentSelectIndex].depotCode.toLowerCase()}.png`)" alt="">
  </special-layout>
</template>

<script>
import SpecialLayout from '../../../components/bog/SpecialLayout/SpecialLayout.vue';
import { mapState } from "vuex";
import playGameMixin from '../../../common/mixin/playGameMixin';
export default {
  name: "physical",
  mixins: [playGameMixin],
  components: {
    SpecialLayout,
  },
  watch: {
    sport: {
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
        IM2: "IM体育顾客至上，为您提供全面性、全球化的市场分析，提供多元且便利的游戏玩法，满足玩家需求，为您带来前所未有的体验",
        PLSP: "保利体育应用大数据为玩家提供最准确的盘口，满足玩家的投注需求，让玩家享有更多的游戏选择。",
        OBSP: "提供超过400个不同联赛的足球赛事，赔率最高可比同业高出约20%。针对五大联赛开出的让球盘超195水位，让您享受到高水位投注。",
        SBA: "老牌体育平台,操作界面容易上手,可依据喜欢编排赛事,提供5种赔率模式,英国、香港、印度、马来西亚、美国等。",
        M8: "体育赛事全覆盖，一场比赛百种玩法，操作简单，满足新老用户，为每一位用户奉献全方位的极致体验和高端的游戏享受。",
        XJ: "提供超过400个不同联赛的足球赛事，赔率最高可比同业高出约20%。针对五大联赛开出的让球盘超195水位，让您享受到高水位投注。",
        FBSP: "奇幻赛事、特别投注 ，各种趣味玩法，最全赛事覆盖助你花式 收米赢到人生巅峰",
      },
      currentSelectIndex: 0,
    }
  },
  computed: {
    ...mapState({
      sport: state => state.game.sport,
    }),
    renderList () {
      if (!this.sport.length) {
        return [];
      }
      return JSON.parse(JSON.stringify(this.sport)).map(item => {
        item.sloginsData = this.sloginsData[item.depotCode];
        return item
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.sport-main-pic {
  width: 590px;
  position: relative;
  top: 65px;
}
</style>
