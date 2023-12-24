<template>
  <div class="home">
    <Banner :bannerList="bannerList" />
    <!-- 通知 -->
    <Notice :noticeList="noticeList"></Notice>

    <div class="center-container">
      <!-- 直播 + 热门直播选择-->
      <Live />

      <!-- app下载 -->
      <AppDownLoad />

      <!-- 热门游戏 -->
      <TopGame />

      <!-- 优质服务 -->
      <ServiceQuality />
    </div>
    <!-- 首次进入弹窗 --> 
    <first-enter-dialog :noticeList="noticeList" :popUpList="popUpList"></first-enter-dialog>
        <!-- 世界杯 入口 -->
    <worldcup-dialog></worldcup-dialog>
  </div>
</template>

<script>
import Banner from "./component/Banner/Banner.vue";
import Live from './component/Live/index.vue'
import AppDownLoad from "./component/AppDownLoad/AppDownLoad.vue";
import TopGame from "./component/TopGame/TopGame.vue";
import ServiceQuality from "./component/ServiceQuality/ServiceQuality.vue";
import { mapMutations, mapState } from "vuex";
import Notice from './component/Notice/Notice.vue';
import FirstEnterDialog from './component/FirstEnterDialog/FirstEnterDialog.vue';
import worldcupDialog from './component//worldcupDialog'

export default {
  name: "Home",
  components: {
    Banner,
    Notice,
    Live,
    AppDownLoad,
    TopGame,
    ServiceQuality,
    FirstEnterDialog,
    worldcupDialog
  },

  watch: {
    SToken: {
      immediate: true,
      handler () {
        this.SToken && this.init()
      }
    },
  },
  computed: {
    ...mapState({
      noticeList: state => state.home.noticeList,
      bannerList: state => state.home.bannerList,
      popUpList: state => state.home.popUpList
    })
  },
  beforeRouteEnter (to, from, next) {
    const firstCome = to.path === from.path
    sessionStorage.setItem('firstCome', firstCome)
    next()
  },
  methods: {
    ...mapMutations('home', ['set_first_open', 'set_notice_list', 'set_banner_list', 'set_popup_list']),
    init () {
      this._getData();
    },
    //- noticeList 和 bannerList  初始化数据请求
    async _getData () {
      try {
        const { status, data } = await this.$http.getIndexadvListData({ terminal: 0, pageNo: 1, pageSize: 100, advType: 1, evebNum: 1, })
        if (status === 200) {
          this.set_notice_list(data.noticeList.list)
          this.set_popup_list(data.popUpList)
          this.set_banner_list(data.page)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.center-container {
  width: 1200px;
  margin: 0 auto;
}
</style>
