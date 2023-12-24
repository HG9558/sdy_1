<template>
  <div class="code-container">
    <div class="code-top_text" v-if="topTitle">
      <!--      <img v-if="returnWater" :src="require(`./img/${returnWater}.png`)" alt="">-->
      <i class="returnWater-text" v-if="returnWater">{{ returnWater }}</i>
      <span>
        {{ topTitle }}
      </span>
    </div>
    <div :class="`code-main ${currentComponentName ? 'login-code-main' : ''}`">
      <!-- <img @click="$router.push('/login')" v-if="!isLogin" :class="`${currentComponentName ? 'un-login' : 'home-un-login'}`" src="./img/un_login_code.png" alt=""> -->
      <qrcode class="code-img login-code mb15" v-bind="codeData"></qrcode>
    </div>
    <div class="code_bottom_txt" v-if="!hideBottom">
      <!-- <div v-if="!isLogin" class="bottom_un_login" @click="$router.push('/login')">登录查看二维码</div> -->
      <template>
        <slot></slot>
      </template>
    </div>
    <img v-if="showRightEN" :class="`right_en ${enFlag}`" :src="require(`./img/${enFlag}.png`)" alt="" />
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
    unLoginSize: Number,
    showRightEN: Boolean,
    returnWater: String,
    logoSrc: {
      type: String,
			default: siteImgMap.qrCode
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
  data() {
    return {
      baseCodeData: {
        correctLevel: 3,
        logoScale: .26,
        margin: 0
      }
    }
  },
  computed: {
    codeData() {
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
@import './index.scss';
</style>
