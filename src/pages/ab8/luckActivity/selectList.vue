<template>
  <div class="electronic-partList-wrapper">
    <div class="list-wrapper select-list-wrapper">
      <div class="game-type">
        <div class="game-classify">
          <div class="title-box">
            <img class="go-back" @click="$router.push('/poker')" src="../electronic/img/goback.png" alt="" />
            <img class="logo" :src="require(`./img/logo_${renderData.depotCode}.png`)" alt="图片加载失败" />
            <div class="title">
              <div>{{renderData.title}}</div>
              <div class="en-title">{{renderData.enTxt}}</div>
            </div>
          </div>

        </div>
        <div class="game-list select-list" v-if="renderData.renderList">
          <div :key="index" class="game-item-wrap select-list-wrap" v-for="(dataItem, index) in renderData.renderList" @click="$emit('enterGame', dataItem)">
            <img class="game-pic" :src="dataItem.logo" alt="图片加载失败" />
            <div class="masker animate__fadeIn animate__animated">
              <div class="game-name">
                <div class="game-title">{{ dataItem.gameName }}</div>
                <div class="game-context">丰富的游戏类型，让您尽情享受。</div>
              </div>
              <span class="enter-btn">进入游戏</span>
            </div>
            <img v-if="dataItem.isTry == 1 && !token" class="try" src="../electronic/img/entry_try.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="renderData.totalCount > 15" class="electronic-pages">
      <el-pagination @current-change="_handleCurrentChange" :page-size="15" :current-page.sync="pageNo" layout=" prev, pager, next" :total="renderData.totalCount">
      </el-pagination>
    </div>
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
    !this.selectPokerDepotCode && this.$router.push('/poker')
  },
  data () {
    return { pageNo: 1 }
  },
  computed: {
    ...mapState({
      selectPokerDepotCode: state => state.game.selectPokerDepotCode,
      poker: state => state.game.poker,
      token: state => state.user.token,
    }),
    renderData () {
      return this.poker.filter(item => item.depotCode === this.selectPokerDepotCode)[0]
    },
  },
  methods: {
    async _handleCurrentChange (page) {
      this.pageNo = page;
      const res = await this.$http.getGameChessList({ depotId: this.renderData.depotId, page });
      this.renderData.renderList = res.data.page.list;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./css/partList.scss";
</style>