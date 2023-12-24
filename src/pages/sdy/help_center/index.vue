<template>
  <div class="help-center-box">
    <div class="help-center-content" :style="{ height }">
      <div class="tabs">
        <ll-scrollbar class="scrollbar">
          <div class="tab-item" v-for="(item, index) in tabsList" :key="index" :class="isActive == index ? 'active' : ''" @click="choseItem(index)">
            <div class="tab-item-inner">
              <img class="pic icon" :src="require(`../game_help/img/icon_help${isActive == index?'_active':''}.png`)" alt="">
              <span class="help-category-name">{{ item.helpCategoryName }}</span>
            </div>
          </div>
        </ll-scrollbar>
      </div>
      <div class="help-center-view">
        <div class="title"><img src="./img/lin.png"> {{ actItem.helpCategoryName }} <img src="./img/lin.png"></div>
        <div class="hitem">
          <div class="citem" v-for="(_, i) in categoryDetail" @click="top(i, _.titleName)" :key="i">{{_.titleName}}</div>
        </div>
        <ll-scrollbar class="ctt">
          <div class="sub" v-for="(_, i) in categoryDetail" :key="i">
            <h3><i>·</i>{{ _.titleName }}</h3>
            <div class="ssub" v-for="(_i, ii) in _.oprHelpContentList" :key="ii">
              <h4>{{ ii + 1 }}、{{ _i.contentTitle }}</h4>
              <p v-html="_i.helpContent"></p>
            </div>
          </div>
        </ll-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpCenter",
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.getTabs()
      }
    },
  },
  data () {
    return {
      height: window.innerHeight - 138 + 'px',
      isActive: 0,
      tabsList: [],
      categoryDetail: []
    }
  },
  computed: {
    actItem () {
      return this.tabsList[this.isActive] || {}
    }
  },
  methods: {
    top(i, title) { 
      if(title === 'USDT购买教程' || title === 'USDT存款教程' || title === 'USDT充值教程'){
        this.$router.push('/usdtTeach')
        return
      }
      const top = [...document.querySelectorAll('.ctt .sub')].reduce((a,c,ii) => a + (ii < i ? c.offsetHeight : 0) , 0)
      document.querySelector('.ctt .ll-scrollbar__view').scrollTop = top
    },
    choseItem (i) {
      this.isActive = i
      this.getTabContent()
    },
    async getTabs () {
      const res = await this.$http.getHelpCategoryList()
      if (res.data.code) return;
      this.tabsList = res.data.categoryList
      this.getTabContent()
    },
    async getTabContent () {
      const res = await this.$http.findTitleAndContent({ id: this.actItem.id });
      if (res.data.code) return;
      this.categoryDetail = res.data.categoryDetail || []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>