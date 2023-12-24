<template>
  <div class="app-down-load">
    <common-title titleTxt="APP下载" subTxt="独家原生APP支持全部移动端" enTxt="App Download"></common-title>
    <div class="download-main">
      <div class="main-container">
        <div class="main-title">
          <div class="time">
            <div>GMT+8 {{ nowTime }}</div>
            <img @click="goService" class="customer" src="../../img/customer.png" />
          </div>
        </div>
        <div class="content">
          <div class="left">
            <img class="phone-1" src="../../img/first_phone.png" alt="" />
          </div>
          <div class="right">
            <div class="one">MGM全站APP</div>
            <div class="two">MGM SPORTS</div>
            <div class="three">
              全球首家一体化娱乐原生APP,尽显流畅,完美操作。<br />海量体育,电竞
              顶尖赛事,真人娱乐,彩票投注及电子游艺等,最新最全娱乐尽在掌中体验!<br />扫码下载,即刻拥有!
            </div>
            <qr-code :class="`sm-code-container ${isLogin && 'login-code-container'}`" topTitle="扫码下载"></qr-code>
            <div class="url-container">
              <div class="operate-tip">直接访问，无需下载，手机输入网址即可</div>
              <div class="www">
                <div class="inter"></div>
                <div class="href-list">
                  <a v-for="(item, index) in domainArray" :key="index" :href="item.href">{{item.text}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
import QrCode from 'commonComponent/QrCode/index.vue'
import CommonTitle from '../commonTitle/commonTitle.vue'

export default {
  name: "AppDownLoad",
  components: {
    QrCode,
    CommonTitle
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.token,
      serUrl: state => state.user.serUrl,
      stationSetting: state => state.global.stationSetting,
    }),
    domainArray () {
      if (!this.stationSetting?.showWebSite) return []
      let arr = this.stationSetting.showWebSite?.split(",");
      return arr.map((item) => {
        return { text: item.trim(), href: !item.includes("http") && (item = `https://${item.trim()}`) }
      });
    }
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
      window.open(this.serUrl)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="scss" >
@import "./AppDownLoad.scss";
</style>
