<template>
  <div class="help-center-box">
    <div class="help-center-content">
      <div class="tabs">
        <div class="tab-item" v-for="(item, index) in tabsList" :key="index" :class="isActive == index ? 'active' : ''" @click="choseItem(index)">
          <div class="tab-item-inner">
            <img class="pic icon" :src="require(`../game_help/img/icon_help${isActive == index?'_active':''}.png`)" alt="">
            <span class="help-category-name">{{ item.helpCategoryName }}</span>
            <img class="pic arrow" :src="require(`../game_help/img/right_arrows${isActive == index?'_active':''}.png`)" alt="">
          
          </div>
        </div>
      </div>
      <div class="help-center-view">
        <div>
          <div class="title">{{ actItem.helpCategoryName }}</div>
          <div>
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-submenu v-for="(item, i) in categoryDetail" :key="i" :index="`${item.id}`">
                <template slot="title">
                  <span>{{ i + 1 }}、{{ item.titleName }}</span>
                </template>
                <el-submenu v-for="(_item, _i) in item.oprHelpContentList" :key="_i" :index="`${item.id}-${_item.id}`">
                  <template slot="title"><span class="item-title">({{ _i + 1 }})、{{ _item.contentTitle }}</span></template>
                  <el-menu-item :index="`${item.id}-${_item.id}`">
                    <div class="help-item-content"  v-html="_item.helpContent"></div>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </div>
        </div>
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
      this.categoryDetail = res.data.categoryDetail
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>