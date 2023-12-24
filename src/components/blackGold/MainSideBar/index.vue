<template>
  <div class="mini-side-bar">
    <div class="side-bar-item" v-for="(item,index) in renderList" :key="index" @click="clickEvent(item.value)">

      <template v-if="item.value !== 'backtop'">
        <img @click="openSubMenu(item)" class="mini-sb-icon" :src="require(`./img/${item.value}.png`)" />
        <span class="text">{{item.text}}</span>
      </template>

      <el-backtop v-else ref="backTop" :visibility-height="0">
        <img class="mini-sb-icon" :src="require(`./img/${item.value}.png`)" />
        <span class="text">{{item.text}}</span>
      </el-backtop>

      <div v-if="item.value==='download' && showDownLoad" class="mini-sb-box-qr">
        <QrCode :codeSize="96" class="side-bar-code" slot="ios-qrCode" topTitle=''>
          <span>{{$t('扫码下载APP')}}</span>
        </QrCode>
        <div class="line"></div>
        <QrCode :codeSize="96" class="side-bar-code" slot="android-qrCode" topTitle="">
          <span>{{$t('扫码下载APP')}}</span>
        </QrCode>
      </div>

    </div>
<!--    <div v-if="showForum" class="forum-container">-->
<!--      <span class="forum-item" @click="goForum">社区</span>-->
<!--    </div>-->
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import QrCode from '../QrCode/index.vue';

export default {
  name: "MainSideBar",
  components: {
    QrCode,
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        if (val) {
          this._stationSettingWithCache();
          // this._initIsShowForum();
        }
      }
    }
  },
  data () {
    return {
      showDownLoad: false,
      showForum: false,
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.token,
      stationSetting: state => state.global.stationSetting
    }),
    renderList() {
      return [
        {
          value: "help",
          text: this.$t('帮助中心')
        },
        {
          value: "service",
          text: this.$t('在线客服')
        },
        {
          value: "download",
          text: this.$t('下载APP')
        },
        {
          value: "backtop",
          text: this.$t('返回顶部')
        }].filter(v => !!v)
    }
  },
  methods: {
    ...mapActions('global', ['_stationSettingWithCache']),
    clickEvent (value) {
      switch (value) {
        case "help":
          this.$router.push('/help_center')
          break;
        case "service":
          !this.stationSetting ? this.messageTip({
            message: "正在获取客服链接, 请刷新页面后重试",
            customClass: "bog",
          }) : window.open(this.stationSetting.configCodePc, "_blank");
          break;
        default:
          break;
      }
    },
    async _initIsShowForum () {
      const res = await this.$http.getAppSpecifyList();
      if (res.data.code) return
      res.data.data.forEach(item => {
        if (item['key'] === 'postEnabled' && item['value'] == 1) {
          this.renderList.splice(3, 0, { value: "forum", text: '资讯社区' })
        }
      })
      window.scrollTo(0, 1)
    },
    //- 打开二级侧边栏
    openSubMenu (item) {
      if (item.value === 'download') {
        this.showDownLoad = !this.showDownLoad
      } else if (item.value === 'forum') {
        this.showForum = !this.showForum;
      }
    },
    //- 跳转社区
    goForum() {
      this.showForum = false;
      this.$router.push('/forum')
    }
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
