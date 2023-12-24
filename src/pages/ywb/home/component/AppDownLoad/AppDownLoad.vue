<template>
  <div class="app-down-load">
    <div class="title">
      <div class="text-box">
        <span class="time">GMT+8 {{ nowTime }}</span>
        <div>
          <img @click="goService" class="customer" src="../../img/customer.png" />
          <span>{{$t('在线客服')}}</span>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <div class="download-main">
      <div class="main-container">
        <div class="content">
          <div class="top">
            <div class="left">
              <div class="one"><span>{{appText}}</span> SPORTS</div>
              <!-- <div class="two">
                体育/娱乐全站式APP下载
              </div> -->
              <div class="three">
                {{$t('全球首家一体化娱乐原生APP,尽显流畅,完美操作。')}}
                {{$t('海量体育,电竞 顶尖赛事,真人娱乐,彩票投注及电子游艺等,最新最全娱乐尽在掌中体验!')}}
                {{$t('扫码下载,即刻拥有!')}}
              </div>
              <qr-code :class="`sm-code-container ${isLogin && 'login-code-container'}`" :bottomText="$t('扫码下载APP')"></qr-code>
            </div>
            <div class="right">
              <img class="phone-1" :src="siteImgMap.downloadPhone" alt="" />
            </div>
          </div>

          <div class="url-container">
            <div class="link-url-container">
              <div class="operate-tips">
                <template v-if="isGoa">Kick off the betting action by registering with Goal Sports and making use of our simple and convenient betting platform.</template>
                <template v-else>{{$t('手机亦可直接访问，无需下载，手机输入网址即可')}}</template>
              </div>
              <div v-if="domainArray && domainArray.length" class="href-list">
                <a v-for="(item, index) in domainArray" :key="index" :href="item.href">{{ item.text }} {{(index !== domainArray.length-1) ? '/' :''}}</a>
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
import siteImgMap from '@/configs/siteImgMap'

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
    isGoa () {
      const { VUE_APP_APP_SIGN } = process.env
      return VUE_APP_APP_SIGN === 'goa'
    },
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
			siteImgMap,
			appText: process.env.VUE_APP_APP_TEXT,
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
