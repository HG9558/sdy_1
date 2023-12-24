<template>
  <div class="mini-side-bar">
    <div class="side-bar-item-box">
      <div class="side-bar-item" v-for="(item,index) in renderList" :key="index" @click="clickEvent(item.value)">

        <el-backtop v-if="index===3" ref="backTop" :visibility-height="0">
          <img class="mini-sb-icon" :src="require(`./img/${item.value}${currentIndex===index?'_hover':''}.png`)" @mouseenter="currentIndex=index" @mouseleave="currentIndex=-1" />
          <span class="text">{{item.text}}</span>
        </el-backtop>

        <template v-else>
          <img @click="item.value==='download' &&(showDownLoad=!showDownLoad)" class="mini-sb-icon" :src="require(`./img/${item.value}${currentIndex===index?'_hover':''}.png`)" @mouseenter="currentIndex=index" @mouseleave="currentIndex=-1" />
          <span class="text">{{item.text}}</span>

          <div v-if="item.value==='download' && showDownLoad" class="mini-sb-box-qr">
            <QrCode :codeSize="96" class="side-bar-code" slot="ios-qrCode" topTitle="IOS">
              <span>{{$t('扫码下载')}}APP</span>
            </QrCode>
            <div class="line"></div>
            <QrCode :codeSize="96" class="side-bar-code" slot="android-qrCode" topTitle="Android">
              <span>{{$t('扫码下载')}}APP</span>
            </QrCode>
          </div>
        </template>
      </div>
    </div>

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
  created () {
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 300)
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this._stationSettingWithCache();
      }
    }
  },
  data () {
    return {
      currentIndex: -1,
      renderList: [
        {
          value: "download",
          text: this.$t('下载APP')
        },
        {
          value: "help",
          text: this.$t('帮助中心')
        }, {
          value: "service",
          text: this.$t('在线客服')
        }, {
          value: "backtop",
          text: this.$t('返回顶部')
        }],
      showDownLoad: false,
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.token,
      stationSetting: state => state.global.stationSetting
    })
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
            message: this.$t('正在获取客服链接, 请刷新页面后重试'),
            customClass: "bog",
          }) : window.open(this.stationSetting.configCodePc, "_blank");
          break;
        default:
          break;
      }
    }
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
