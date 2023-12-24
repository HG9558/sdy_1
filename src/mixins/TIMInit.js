import { mapState } from 'vuex'

export default {
  data () {
    return {
      isTIMLogin: false,
    }
  },
  computed: {
    ...mapState({
      timCreateSuccess: state => state.normal.timCreateSuccess
    }),
  },
  watch: {
    '$route': {
      handler (route) {
        if (route.name === 'Home') {
          if (this.timCreateSuccess) {
            this._TIMLogin();
          }
        } else {
          if (this.isTIMLogin) {
            this.TIMLogout();
          }
        }
      },
      immediate: true
    },
    'userInfo.loginName': {
      handler: async function (val) {
        if (val) {
          await this._TIMLogin()
          this.initListener()
        } else {
          this.TIMLogout()
        }
      },
      immediate: true
    },
    timCreateSuccess: {
      handler (val) {
        if (this.userInfo.loginName) {
          this._TIMLogin()
        }
        this.initListener()
      }
    }
  },
  methods: {
    initListener () {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.$tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate)
      // SDK NOT READY
      this.$tim.on(this.$TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate)
    },
    onReadyStateUpdate ({ name }) {
      const isSDKReady = name === this.$TIM.EVENT.SDK_READY

      // SDK 进入 not ready 状态时触发，此时接入侧将无法使用 SDK 发送消息等功能。
      // 如果想恢复使用，接入侧需调用 login 接口，驱动 SDK 进入 ready 状态
      // 同一账号多端互踢场景下 清除登陆状态并提示
      // if (this.userInfo.loginName && !isSDKReady) {
      //   this.messageTip({
      //     message: '登陆失效，请重新登录'
      //   })
      //   this.$store.commit("user/clear_user_info")
      //   this.$router.push('/login')
      // }
      if (isSDKReady) {
        this.$store.dispatch('global/updateMyProfile')
      }
      this.$store.commit('global/SET_SDKREADY', isSDKReady)
    },
    TIMLogout () {
      if (!this.isTIMLogin) return
      const promise = window.tim.logout()
      promise.then(() => {
        this.isTIMLogin = false
      }).catch((imError) => {
      })
    },
    async _TIMLogin () {
      const res = await this.$http.getUserSig({ userid: process.env.VUE_APP_DEFAULT_SPTVTOKEN + this.userInfo.loginName, expire: 604800 })
      const userSig = res.data.userSig
      await this.$tim.login({ userID: process.env.VUE_APP_DEFAULT_SPTVTOKEN + this.userInfo.loginName, userSig })
      this.isTIMLogin = true
    }
  },
}