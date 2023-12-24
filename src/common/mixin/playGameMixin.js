
import { mapState, mapMutations, mapActions } from 'vuex'
const { VUE_APP_APP_TEMPLATE, VUE_APP_APP_SIGN } = process.env;
export default {
  methods: {
    ...mapActions('user', ['_getCenterMoney']),
    ...mapMutations('global', ['set_recover_dialog']),
    //- 进入游戏
    async _enterGame ({ availableWh, id, depotName, gameName, showTitle, isTry, titleTag }) {
      switch (true) {
        case availableWh === 2:
          return this.messageTip({ message: this.$t('该场馆正在维护，请先娱乐其他场馆游戏') });
        case !this.token && isTry !== 1:
          return this.$router.push('/login');   //- 没有登录并且游戏没有试玩功能
      }

			let newWindow = null
      // 需要使用单独loading图的站点
      let isSpecialLoadFlag = ['aus', 'bw1', 'ywb'].includes(VUE_APP_APP_SIGN)
			if (isSpecialLoadFlag) {
        newWindow = window.open(`https://download.injiepor.com/jumploading/multiLanguage.html?site=${VUE_APP_APP_SIGN}&lang=${this.language}`);
			} else {
        // 通用链接
        newWindow = window.open('https://download.injiepor.com/jumploading/template_2/index.html');
			}

      try {
        const { data: { code, tryPlayFlag, errMsg, msg } } = await (this.token ? this.$http.getTransitList({ gameId: id }) : this.$http.getTryAddress({ gameId: id }))
        await this.checkError(tryPlayFlag, code, errMsg, msg);
        newWindow.location.href = msg;
        this.token && this._getCenterMoney()
				this._getRecover(titleTag || depotName || gameName || showTitle, isTry, msg);
      } catch (err) {
        newWindow.close()
      }
    },
    //- 进入游戏后检测
    async checkError (tryPlayFlag, code, errMsg, msg) {
      return new Promise((resolve, reject) => {
        switch (true) {
          case code !== 0:
            reject();
            break;
          case !this.token && !tryPlayFlag:
            this.messageTip({ message: errMsg });
            reject();
            break;
          case msg.indexOf('http') === -1:
            this.messageTip({ message: msg || this.$t('该平台暂未开放，请尝试其他游戏') });
            reject();
            break;
          default:
            resolve();
        }
      })
    },
    //- 回收游戏钱包
    _getRecover (content, isTry, msg) {
      content = content === '博冠体育pro' ? '博冠体育' : content
      if (msg.indexOf('http') !== -1 && this.token) {
        this.openConfirmDialog({
					title: this.$t('转账提示'),
					content: this.$tt('transferTips', { msg: content }),
					showCancelButton: false,
          customClass:  VUE_APP_APP_TEMPLATE === 'sdy' ? 'game-enter-dialog bog' : 'bog',
          confirmButtonText: VUE_APP_APP_TEMPLATE === 'sdy' ? this.$t('一键转回') : this.$t('确定'),
          callback: async () => {
            const res = await this.$http.getRecover();
            if (res.data.code) return
            this.set_recover_dialog(false)
            this._getCenterMoney()
          }
        })
      }
    },
  },
  computed: {
    ...mapState('global', ['language']),
    ...mapState({
      token: state => state.user.token,
    }),
  }
}
