<template>
  <div class="home">
    <Banner :bannerList="bannerList" />
    <!-- 通知 -->
    <Notice :noticeList="noticeList" :redEnvelopeRecordList="redEnvelopeRecordList"></Notice>

    <div class="center-container">
      <!-- <NewYearBanner /> -->
      <!-- 直播 + 热门直播选择-->
      <Live />

      <!-- app下载 -->
      <AppDownLoad ref="appDom" />

      <!-- 热门游戏 -->
      <div class="new-year-hot">
        <!-- <NewYearHot /> -->
        <TopGame />
      </div>

      <!-- 优质服务 -->
      <ServiceQuality />
    </div>
    <!-- 首次进入弹窗 -->
    <first-enter-dialog :noticeList="noticeList" :popUpList="popUpList"></first-enter-dialog>

    <!-- 右侧好友推荐入口 -->
<!--    <friend-recom-dialog></friend-recom-dialog>-->
    <!-- 旧红包雨入口 -->
<!--    <RedEnvelopeEntrance v-if="isLogin"></RedEnvelopeEntrance>-->
    <NewRedEnvelopeEntrance v-if="isLogin && isWpe"></NewRedEnvelopeEntrance>
    <!-- 新红包雨入口 -->
  </div>
</template>

<script>
import Banner from './component/Banner/Banner.vue';
import Live from './component/Live/index.vue';
import AppDownLoad from './component/AppDownLoad/AppDownLoad.vue';
import TopGame from './component/TopGame/TopGame.vue';
import ServiceQuality from './component/ServiceQuality/ServiceQuality.vue';
import { mapMutations, mapState } from 'vuex';
import Notice from './component/Notice/Notice.vue';
import FirstEnterDialog from './component/FirstEnterDialog/FirstEnterDialog.vue';
import FriendRecomDialog from './component/friendRecomDialog';
// import RedEnvelopeEntrance from '../discount/component/RedEnvelopeEntrance.vue';
// import NewYearBanner from 'components/common/NewYear/NewYearBanner.vue';
// import NewYearHot from 'components/common/NewYear/NewYearHot.vue';
import NewRedEnvelopeEntrance from '../newRedEnvelope/entry.vue';

export default {
  name: 'Home',
  components: {
    // NewYearHot,
    // NewYearBanner,
    Banner,
    Notice,
    Live,
    AppDownLoad,
    TopGame,
    ServiceQuality,
    FirstEnterDialog,
    FriendRecomDialog,
    // RedEnvelopeEntrance,
    NewRedEnvelopeEntrance,
  },
  watch: {
    SToken: {
      immediate: true,
      handler() {
        this.SToken && this.init();
      },
    },
    scrollAppDownLoad: {
      immediate: true,
      handler(val) {
        if (!val) return;
        this.$nextTick(() => {
          window.scrollTo(0, this.$refs.appDom.$el.offsetTop);
        });
        // window.scrollTo()
      },
    },
  },
  computed: {
    ...mapState({
      noticeList: state => state.home.noticeList,
      bannerList: state => state.home.bannerList,
      popUpList: state => state.home.popUpList,
      redEnvelopeRecordList: state => state.home.redEnvelopeRecordList,
      scrollAppDownLoad: state => state.normal.scrollAppDownLoad,
      isLogin: state => state.user.token,
    }),
		isWpe () {
			const { VUE_APP_APP_SIGN } = process.env
			return VUE_APP_APP_SIGN === 'wpe'
		},
  },
  beforeRouteEnter(to, from, next) {
    const firstCome = to.path === from.path;
    sessionStorage.setItem('firstCome', firstCome);
    next();
  },
  methods: {
    ...mapMutations('home', ['set_first_open', 'set_notice_list', 'set_banner_list', 'set_popup_list','set_red_envelope_recordList']),
    ...mapMutations('normal', ['set_scroll_app_downLoad']),
    init() {
      this._getData();
      this.isLogin && this.openRedEnvelopeRecord();
    },
    //- noticeList 和 bannerList  初始化数据请求
    async _getData() {
      try {
        const { status, data } = await this.$http.getIndexadvListData({
          terminal: 0,
          pageNo: 1,
          pageSize: 100,
          advType: 1,
          evebNum: 1,
        });
        if (status === 200) {
          //       (  showType value = "0：公告(跑马灯),1：广播(弹窗) 2全部")
          this.set_notice_list(data.noticeList.list);
          this.set_popup_list(data.popUpList);
          this.set_banner_list(data.page);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async openRedEnvelopeRecord() {
      let res = await this.$http.redEnvelopeRecord();
      if (res.data.code) {
        // this.messageTip({ message: res.msg || res.data.msg });
        return;
      }
      const recordRes = res.data.data;
      let newRecordRes = recordRes.newRedEnvelopeRewardDtoList.map(item => {
        item.loginName = item.loginName.substring(0, item.loginName.length - 4);
        item.loginName += '****';
        return item;
      });
      this.set_red_envelope_recordList(newRecordRes.slice(0,2))
    },
  },
  beforeDestroy() {
    this.set_scroll_app_downLoad(false);
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: #131517;
}
</style>
