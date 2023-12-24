<template>
  <div class="main-container" :class="['language-' + language, 'app-sign-' + appSign, { 'multi-language': !isZhLanguage }]">
    <Header v-show="!this.$route.meta.signInPage"/>
    <router-view/>
    <main-side-bar></main-side-bar>
    <Footer v-show="!this.$route.meta.signInPage"/>
    <iframe style="display: none" ref="iframe" :src="frameUrl"/>
  </div>
</template>

<script>
  import Header from "commonComponent/Header";
  import Footer from "commonComponent/Footer";
  import {mapGetters, mapMutations, mapActions, mapState} from "vuex";
  import MainSideBar from 'commonComponent/MainSideBar';
  // import TIMInit from './mixins/TIMInit.js';
  import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

  const { VUE_APP_APP_CODE } = process.env

  export default {
    components: {Header, Footer, MainSideBar},
    // mixins: [TIMInit],
    created() {
      const { href } = window.location
      if (['dcs', 'pre'].includes(VUE_APP_APP_CODE) || href.includes('au77rc.com')) {
        this.addMeta('robots', 'noindex')
      }
      this._initData();
      this.set_req_queue([]);
      const cnzzurl = ({
        bog: 'https://s9.cnzz.com/z_stat.php?id=1280584500&web_id=1280584500',
        bt8: 'https://s9.cnzz.com/z_stat.php?id=1280658461&web_id=1280658461',
      })[process.env.VUE_APP_APP_TEMPLATE]
      if (cnzzurl) {
        window._czc = window._czc || []
        const scr = document.createElement('script')
        scr.src = cnzzurl // cnzz 统计链接
        document.body.appendChild(scr)
      }

    },
    watch: {
      $route(currentRoute) {
        const liveChatDiv = document.getElementById("chat-widget-container");
        if (currentRoute.path === "/login" && liveChatDiv) {
          liveChatDiv.style.display = "none";
        }
        if (currentRoute.path !== "/login" && liveChatDiv) {
          liveChatDiv.style.display = "block";
        }
      },
    },
    computed: {
      ...mapGetters('global', ['isZhLanguage']),
      ...mapState('global', ['language', 'equipmentId']),
      ...mapState('normal', ['SToken']),
      appSign() {
        const { VUE_APP_APP_SIGN } = process.env
        return VUE_APP_APP_SIGN
      },
    },
    data() {
      return {
        iframeWin: "",
        frameUrl: "https://download.injiepor.com/dr/index.html",
        routeName: this.$route.name,
      };
    },
    mounted() {
      this.iframeWin = this.$refs.iframe.contentWindow;
      // window.addEventListener("message", this.getIframeKey);
      window.addEventListener("click", this.motomoClick);
      if (!this.isZhLanguage) {
        document.body.classList.add('multi-language-body')
      }
      if (!this.equipmentId) {
        this.getUuid()
      }
    },
    beforeDestroy() {
      // window.removeEventListener("message", this.getIframeKey);
      Window.removeEventListener('click', this.motomoClick)
    },
    methods: {
      ...mapMutations('global', [
        'set_equipment',
        'set_req_queue',
      ]),
      ...mapMutations('user', ['set_server_data']),
      ...mapMutations('normal', [
        "set_site_token",
      ]),
      ...mapActions('global', ['getMobileAreaCodes', 'getIsNeedVfySecurity']),
      addMeta(name, content) {
        const meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        document.getElementsByTagName('head')[0].appendChild(meta)
      },
      async _initData() {
        if (!this.SToken) {
          const tokenResponse = await this.$http.getSiteCode({url: process.env.VUE_APP_DEFAULT_DOMAIN});
          if (tokenResponse.data.SToken) {
            this.set_site_token(tokenResponse.data.SToken);
          }
        }

        this.getMobileAreaCodes()
        this.getIsNeedVfySecurity()

        const charResponse = await this.$http.getServicerUrl({terminal: 0});
        if (charResponse.data.code) return;
        this.set_server_data(charResponse.data.data);
      },
      motomoClick() {
      },
      sendMessage() {
        const {frameUrl} = this;
        this.iframeWin.postMessage(JSON.stringify({type: "GET", key: "onlyKey"}), frameUrl);
      },
      getIframeKey({data}) {
        if (data === "success") {
          this.sendMessage()
        } else {
          data && typeof data === "string" && (this.set_equipment(data));
        }
      },
      getUuid() {
        const fpPromise = FingerprintJS.load({ token: '0GVHq06imZGPYjlCEbiE' })
        this.getVisitorId(fpPromise)
      },
      async getVisitorId(fpPromise) {
        const fp = await fpPromise
        const result = await fp.get()
        // eslint-disable-next-line
        console.log('getVisitorId-result===', result)
        if (result && result.visitorId) {
          this.set_equipment(result.visitorId)
        } else {
          this.set_equipment(new Date().getTime())
        }
      },
    },
  };
</script>
