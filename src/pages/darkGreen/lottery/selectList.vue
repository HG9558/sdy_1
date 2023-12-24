<template>
  <div class="electronic-partList-wrapper">
    <div class="list-wrapper select-list-wrapper">
      <div class="game-type">
        <div class="game-classify">
          <div class="title-box">
            <img class="go-back" @click="$router.push('/lottery')" src="../electronic/img/goback.png" alt="" />
            <img class="logo" :src="require(`./img/logo_${renderData.depotCode}.png`)" :alt="$t('图片加载失败')" />
            <div class="title">
              <div>{{renderData.title}}</div>
              <div class="en-title">{{renderData.enTxt}}</div>
            </div>
          </div>

        </div>
        <div class="game-list select-list" v-if="renderData.renderList">
          <div :key="index" class="game-item-wrap select-list-wrap" v-for="(dataItem, index) in renderData.renderList" @click="$emit('enterGame', dataItem)">
            <img class="game-pic" :src="dataItem.logo" :alt="$t('图片加载失败')" />
            <div class="masker animate__fadeIn animate__animated">
              <div class="game-name">
                <div class="game-title">{{ dataItem.gameName }}</div>
                <div class="game-context">{{$t('丰富的游戏类型，让您尽情享受。')}}</div>
              </div>
              <span class="enter-btn">{{$t('进入游戏')}}</span>
            </div>
						<div v-if="dataItem.isTry == 1 && !token" class="try">
							<span>{{$t('可试玩')}}</span>
						</div>
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
    !this.selectLotteryDepotCode && this.$router.push('/lottery')
  },
  data () {
    return { pageNo: 1 }
  },
  computed: {
    ...mapState({
      selectLotteryDepotCode: state => state.game.selectLotteryDepotCode,
      lottery: state => state.game.lottery,
      token: state => state.user.token,
    }),
    renderData () {
      return this.lottery.filter(item => item.depotCode === this.selectLotteryDepotCode)[0]
    },
  },
  methods: {
    async _handleCurrentChange (page) {
      this.pageNo = page;
      const res = await this.$http.getGameLotteryList({ depotId: this.renderData.depotId, page });
      this.renderData.renderList = res.data.page.list;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./css/partList.scss";
</style>
