
import { mapState, mapMutations, mapActions } from 'vuex'
import { handleRealName } from '../common/js/filter'

export default {
  computed: {
    ...mapState({
      centerBalanceMoney: state => state.user.centerBalanceMoney, //- 中心钱包余额
      userInfo: state => state.user.userInfo,
      SToken: state => state.normal.SToken
    })
  },
  methods: {
    ...mapActions('user', ['_getCenterMoney', '_getBankCardList', '_getCryptoList', '_getAlipayList', '_getElecList']),
    ...mapMutations('user', ['set_nickname_info', 'set_user_info']),
    //- 获取用户基本信息
    async _getNickNameInfo () {
      const res = await this.$http.getNickNameInfo();
      this.set_nickname_info(res.data.data);
    },
    //- 获取用户基本信息2
    async _getUserInfo () {
      const res = await this.$http.getUserInfo();
      this.set_user_info(res.data.userInfo);
    },
    //- 提示弹窗
    messageTip ({ message, duration = 1500, type = 'info', onClose }) {
      this.$message({
        customClass: process.env.VUE_APP_APP_TEMPLATE,
        message,
        duration,
        type,
        onClose () { onClose && onClose() }
      })
    },
    //- 确认弹窗
    openConfirmDialog ({
      content = null,
      title = this.$t('温馨提示'),
      type = null,
      showCancelButton = true,
      showConfirmButton = true,
      confirmButtonText = this.$t('确定'),
      cancelButtonText = this.$t('取消'),
      center = true,
      callback,
      closeOnClickModal = true,
      cancelFn,
      beforeClose = null,
      customClass= 'bog',
    }) {

      content = Array.isArray(content) ? content.map(item => this.$createElement('p', null, item)) : content;

      this.$confirm(Array.isArray(content) ? this.$createElement('div', null, content) : content, title, {
        dangerouslyUseHTMLString: true,
        confirmButtonText,
        cancelButtonText,
        customClass,
        type,
        showCancelButton,
        showConfirmButton,
        closeOnClickModal,
        center,
        beforeClose
      }).then(() => callback && callback()).catch(() => cancelFn && cancelFn())
    },
    // 更改真实姓名样式
    handReamName(str) {
      return handleRealName(str)
    },
  }
}
