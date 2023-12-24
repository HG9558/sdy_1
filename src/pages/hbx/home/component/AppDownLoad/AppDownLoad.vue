<template>
  <div class="app-down-load">
    <div class="download-main">
      <div class="main-container">
        <div class="main-title">
          <div>GMT+8 {{ nowTime }}</div>
          <div class="service-container" @click="goService">
            <img class="servicer-logo" src="../../img/servicer.png" />
            <span class="servicer-text">在线客服</span>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="branch-title">
              <!-- <span class="branch">HB</span> -->
              <span>浩博体育</span>
            </div>
            <div class="slogan">全球首家一体化娱乐原生APP，尽显流畅，完美操作。海量体育，电竞顶尖赛事，真人娱乐，彩票投注及电子游艺等，最新最全娱乐项目尽在掌中体验扫码下载，即刻拥有！</div>
            <div class="qr-code-container">
              <div class="qr-code-title">体育/娱乐全站式APP下载</div>
              <qr-code :class="`sm-code-container ${isLogin && 'login-code-container'}`" currentComponentName="home" topTitle=""></qr-code>
            </div>

          </div>
          <div class="right">
            <img class="download-app-demo" src="../../img/download-app-demo1.png" alt="" />
          </div>
        </div>
        <div class="link-url-container">
          <div class="operate-tip">
            手机亦可直接访问，无需下载，手机输入网址即可
          </div>
          <div class="href-list">
            <a v-for="(item, index) in domainArray" :key="index" :href="item.href">{{ item.text }} {{(index !== domainArray.length-1) ? '/' :''}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import QrCode from "commonComponent/QrCode/index.vue";
import CommonTitle from "../commonTitle/commonTitle.vue";

export default {
  name: "AppDownLoad",
  components: {
    QrCode,
    CommonTitle,
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.user.token,
      serUrl: (state) => state.user.serUrl,
      stationSetting: (state) => state.global.stationSetting,
    }),
    domainArray () {
      if (!this.stationSetting?.showWebSite) return [];
      let arr = this.stationSetting.showWebSite?.split(",");
      return arr.map((item) => {
        return {
          text: item.trim(),
          href: !item.includes("http") && (item = `https://${item.trim()}`),
        };
      });
    },
  },
  data () {
    return {
      nowTime: "",
      timer: null,
    };
  },
  mounted () {
    this.timer = setInterval(this.timeFormate, 1000);
  },
  methods: {
    //显示当前时间（年月日时分秒）
    timeFormate () {
      let year = new Date().getFullYear();
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let date =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let hh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let mm =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.nowTime =
        date + "/" + month + "/" + year + " " + hh + ":" + mm + ":" + ss;
    },
    goService () {
      window.open(this.serUrl);
    },
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="scss">
@import "./AppDownLoad.scss";
</style>
