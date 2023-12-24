<template>
  <div class="home">
    <Banner :bannerList="bannerList" />
    <!-- 通知 -->
    <Notice :noticeList="noticeList"></Notice>

    <div class="center-container">
      <!-- 直播 + 热门直播选择-->
      <Live />

      <!-- app下载 -->
      <AppDownLoad ref="appDom" />

      <!-- 热门游戏 -->
      <TopGame />

      <!-- 优质服务 -->
      <ServiceQuality />
    </div>
    <!-- 首次进入弹窗 -->
    <first-enter-dialog :noticeList="noticeList" :popUpList="popUpList"></first-enter-dialog>

    <!-- 右侧好友推荐入口 -->
    <friend-recom-dialog></friend-recom-dialog>
    <!-- 红包雨入口 -->
    <RedEnvelopeEntrance v-if="isLogin"></RedEnvelopeEntrance>
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
import FriendRecomDialog from './component/friendRecomDialog'
import RedEnvelopeEntrance from '../discount/component/RedEnvelopeEntrance.vue'
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
    FriendRecomDialog,
    RedEnvelopeEntrance,
    worldcupDialog
  },

  watch: {
    SToken: {
      immediate: true,
      handler () {
        this.SToken && this.init()
      }
    },
    scrollAppDownLoad: {
      immediate: true,
      handler (val) {
        if (!val) return
        this.$nextTick(() => {
          window.scrollTo(0, this.$refs.appDom.$el.offsetTop)
        })
        // window.scrollTo()
      }
    }
  },
  computed: {
    ...mapState({
      
      noticeList: state => state.home.noticeList,
      bannerList: state => state.home.bannerList,
      popUpList: state => state.home.popUpList,
      scrollAppDownLoad: state => state.normal.scrollAppDownLoad,
      isLogin: state => state.user.token
    })
  },
  beforeRouteEnter (to, from, next) {
    const firstCome = to.path === from.path
    sessionStorage.setItem('firstCome', firstCome)
    next()
  },
  methods: {
    ...mapMutations('home', ['set_first_open', 'set_notice_list', 'set_banner_list', 'set_popup_list']),
    ...mapMutations('normal', ['set_scroll_app_downLoad']),
    init () {
      this._getData();
    },
    //- noticeList 和 bannerList  初始化数据请求
    async _getData () {
      try {
        const { status, data } = await this.$http.getIndexadvListData({ terminal: 0, pageNo: 1, pageSize: 100, advType: 1, evebNum: 1, })
        if (status === 200) {
          //       (  showType value = "0：公告(跑马灯),1：广播(弹窗) 2全部")
          this.set_notice_list(data.noticeList.list)
          this.set_popup_list(data.popUpList)
          this.set_banner_list(data.page)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  beforeDestroy () {
    this.set_scroll_app_downLoad(false);
  }
};
</script>

<style lang="scss" scoped>
.home {
  background: #131517;
}

</style>
