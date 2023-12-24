<template>
  <div class="electronic-partList-wrapper">
    <div class="list-wrapper select-list-wrapper">
      <div class="game-type">
        <div class="game-classify">
          <div class="title-box">
            <img class="go-back" @click="$router.push('/real')" src="../electronic/img/goback.png" alt="" />
            <img class="logo" :src="require(`./img/logo_${renderData.depotCode.toLowerCase()}.png`)" alt="图片加载失败" />
            <div class="title">
              <div>{{renderData.title}}</div>
              <div class="en-title">{{renderData.enTxt}}</div>
            </div>
          </div>
        </div>
        <div class="game-category-list" v-if="categoryList.length > 0">
          <el-radio-group v-model="activeCat" @change="changeCategory">
            <el-radio-button class="item" v-for="item in categoryList" :key="item.id" :label="item"> {{item.name}} </el-radio-button>
          </el-radio-group>
        </div>
        <div class="game-list select-list" v-if="renderList">
          <div :key="index" class="game-item-wrap select-list-wrap" v-for="(dataItem, index) in renderList" @click="$emit('enterGame', dataItem)">
            <img class="game-pic" :src="dataItem.logo" alt="图片加载失败" />
            <div class="masker animate__fadeIn animate__animated">
              <div class="game-name">
                <div class="game-title">{{ dataItem.gameName }}</div>
                <!-- <div class="game-context">丰富的游戏类型，让您尽情享受。</div> -->
                <div class="game-context"  v-if="dataItem.tableCode"> 桌号：{{dataItem.tableCode || '无'}} </div>
              </div>
              <span class="enter-btn">进入游戏</span>
            </div> 
          </div>
        </div>
      </div>
    </div>
    <div v-if="totalCount > 15" class="electronic-pages">
      <el-pagination @current-change="_handleCurrentChange" :page-size="15" :current-page.sync="pageNo" layout=" prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>

    <Loading :showLoading="showLoading" styleName="real-loading" />

  </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'selectList',
  props: {
    formatList: Array
  },
  created () {
    !this.selectRealDepotCode && this.$router.push('/real');
    this._getCategoryList();
  },
  data () {
    return { 
      pageNo: 1,
      activeCat: null,
      categoryList: [],
      totalCount: null,
      renderList: [],
      showLoading: false
    }
  },
  computed: {
    ...mapState({
      selectRealDepotCode: state => state.game.selectRealDepotCode,
      real: state => state.game.real,
      token: state => state.user.token,
    }),
    renderData () {
      return this.real.filter(item => item.depotCode === this.selectRealDepotCode)[0]
    },
  },
  watch: {
    selectRealDepotCode:function(){
      this._getCategoryList();
    }
  },  
  methods: {
    async _handleCurrentChange (page, id = this.activeCat.id) {
      this.pageNo = page;
      const res = await this.$http.getGameRealList({ depotId: this.renderData.depotId, page, id });
      this.renderList = res.data.games.list;
      this.totalCount = res.data.games.totalCount;
      this.showLoading = false;
    },
    async _getCategoryList() {
      this.showLoading = true;
      const res = await this.$http.getRealCategoryList({gamelogoid: this.renderData.depotId});
      this.categoryList = res.data.category;
      this.activeCat = res.data.category[0];
      this.changeCategory();
    },
    changeCategory(){
      this.pageNo = 1;
      this._handleCurrentChange(this.pageNo, this.activeCat.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/partList.scss";
</style>