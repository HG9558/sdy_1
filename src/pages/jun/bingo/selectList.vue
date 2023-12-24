<template>
  <div class="electronic-partList-wrapper">
    <div class="list-wrapper select-list-wrapper">
      <div class="game-type">
        <div class="game-classify">
          <div class="title-box">
            <img class="go-back" @click="$router.push('/bingo')" src="../bingo/img/goback.png" alt="" />
            <img class="logo" :src="require(`./img/logo_${renderData.depotCode}.png`)" :alt="$t('图片加载失败')" />
            <div class="title">
              <div>{{renderData.title}}</div>
              <div class="en-title">{{renderData.enTxt}}</div>
            </div>
          </div>
          <div class="select-input">
            <input type="text" :placeholder="$t('请输入游戏名称')" ref="input" >
            <img src="./img/search.png" alt="" @click="inputSelect">
          </div>
        </div>
        <div class="game-list select-list" v-if="renderData.renderList.length">
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
        <div class="game-list-no-data" v-else>
          <img src="./img/no_data.png" alt="">
          <div class="gameText">{{$t('无搜索结果')}}</div>
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
  created () {
    !this.selectElectronicDepotCode && this.$router.push('/bingo')
  },
  data () {
    return { pageNo: 1 }
  },
  computed: {
    ...mapState({
      selectElectronicDepotCode: state => state.game.selectBingoDepotCode,
      electronic: state => state.game.bingo,
      token: state => state.user.token,
    }),
    renderData () {
      return this.electronic.filter(item => item.depotCode === this.selectElectronicDepotCode)[0]
    },
  },
  methods: {
     _handleCurrentChange (page) {
      this.pageNo = page;
      const params = { depotId: this.renderData.id, page }
      this.getGameList(params)
    },
    inputSelect () {
      this.pageNo = 1
      const params = {
        depotId: this.renderData.id,
        lableName: this.$refs.input.value
      }
      this.getGameList(params)
    },
    async getGameList (params) {
			const res = await this.$http.getBinGoDataList(params);
			const { list, totalCount } = res.data.page
			this.renderData.renderList = list
			this.renderData.totalCount =  totalCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/partList.scss";
</style>
