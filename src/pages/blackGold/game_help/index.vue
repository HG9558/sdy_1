<template>
  <div class="help-box">
    <div class="help-content">
      <div class="tabs">
        <div class="tab-item" v-for="(item, index) in tabsList" :key="index" :class="isActive == index ? 'active' : ''" @click="isActive = index">
          <div class="tab-item-inner">
            <img class="pic icon" :src="require(`./img/icon_${item.icon + (isActive==index?'_active' :'')}.png`)" alt="">
            <span>{{ item.title }}</span>
            <img class="pic arrow" src="./img/arrorw.png" alt>
          </div>
        </div>
      </div>
      <div class="view">
        <div class="title">
          <img src="./img/lin.png" /> {{tabsList[isActive].title}} <img src="./img/lin.png" />
        </div>
        <component :is="tabsList[isActive].componentName"></component>
      </div>
    </div>
  </div>
</template>

<script>
import GameHelp from "./component/GameHelp";
import Responsibility from "./component/Responsibility";
import Privacy from "./component/Privacy";
import Rule from "./component/Rule";

export default {
  name: "GameHelp",
  components: {
    GameHelp,
    Responsibility,
    Privacy,
    Rule,
  },
  data () {
    return {
      isActive: 0,
      tabsList: [
        {
          title: this.$t('游戏帮助'),
          icon: 'help',
          componentName: GameHelp
        },
        {
          title: this.$t('博彩责任'),
          icon: 'zr',
          componentName: Responsibility
        },
        {
          title: this.$t('隐私保护'),
          icon: "ys",
          componentName: Privacy
        },
        {
          title: this.$t('规则与条款'),
          icon: "tk",
          componentName: Rule
        },
      ],
    };
  },
  created () {
    this.isActive = this.$route.query.index || 0;
  },
  watch: {
    $route (to) {
      this.isActive = to.query.index || 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
