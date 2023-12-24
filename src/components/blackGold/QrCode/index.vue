<template>
  <div class="code-container">
    <div class="code-top_text" v-if="topTitle">
<!--      <img v-if="returnWater" :src="require(`./img/${returnWater}.png`)" alt="">-->
      <i class="returnWater-text" v-if="returnWater">{{ returnWater }}</i>
      <span>
        {{topTitle}}
      </span>
    </div>
    <div :class="['code-main', {'login-code-main':currentComponentName,'already-login':true}]">
      <!-- <img @click="$router.push('/login')" v-if="!isLogin" :class="`${currentComponentName ? `${currentComponentName} un-login` : 'home-un-login'}`" :src="unLoginImgSrc" alt=""> -->
      <qrcode  class="code-img login-code" v-bind="codeData"></qrcode>
    </div>
    <div class="code_bottom_txt" v-if="!hideBottom">
      <!-- <div v-if="!isLogin" class="bottom_un_login" @click="$router.push('/login')">登录查看二维码</div> -->
      <template>
        <slot></slot>
      </template>
    </div>
    <img v-if="showRightEN" :class="`right_en ${enFlag}`" :src="require(`./img/${enFlag}.png`)" alt="">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import qrcode from 'vue-qr'
import siteImgMap from '@/configs/siteImgMap'

export default {
  name: "QrCode",
  components: {
    qrcode
  },
  props: {
    topTitle: String,
    bottomTitle: String,
    codeSize: Number,
    showRightEN: Boolean,
    returnWater: String,
    logoSrc: {
      type: String,
      default: siteImgMap.qrCode
    },
    unLoginImgSrc: {
      type: String,
      default: require('./img/un_login_code.png')
    },
    codeUrl: {
      type: String,
      default: `https://${window.location.host}/#/app-download`
    },
    currentComponentName: String,
    enFlag: String,
    hideBottom: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      baseCodeData: {
        correctLevel: 3,
        logoScale: .26,
        margin: 8
      }
    }
  },
  computed: {
    codeData () {
      return {
        ...this.baseCodeData,
        size: this.codeSize,
        text: this.codeUrl,
        logoSrc: this.logoSrc
      }
    },
    ...mapState({ isLogin: state => state.user.token })
  }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
