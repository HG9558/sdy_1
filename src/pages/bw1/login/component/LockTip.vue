<template>
  <div>
    <global-dialog title="提示" :showDialog.sync="showDialog" :isshowCancel="false" cancelText="我知道了" :showConfirm="false" :isNeedModal="false">
      <div class="unbing-time-div">
        您输入密码错误次数过多，账号已锁定15分钟，请稍后再试。您可以点击
        <span class="c-red c-r" @click="onLockJump(1)">忘记密码</span> 来修改密码或者咨询
        <span class="c-red c-r" @click="onLockJump(2)">在线客服</span> 帮您解锁。
      </div>
    </global-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "lockTip.vue",
  props: {
    isShowLocked: Boolean,
  },
  watch: {
    showDialog () {
      this.$emit('update:isShowLocked', false)
    },
    SToken: {
      immediate: true,
      handler (val) {
        val && this._initMenuList();
      }
    },
  },
  data () {
    return {
      showDialog: true
    }
  },
  methods: {
    onLockJump (type) {
      if (type === 1) {
        this.$router.push({ path: "/forgetpsw" });
      } else {
        let customerUrl = this.stationSetting && (this.stationSetting.configCodePc || this.stationSetting.configCodePc1)
        window.open(
          customerUrl
        );
      }
      this.showDialog = false;
      this.$emit('update:isShowLocked', false)
    },
  },
  computed: {
    ...mapState({
      stationSetting: state => state.global.stationSetting
    })
  }
}
</script>

<style scoped lang="scss">
.unbing-time-div {
  color:$c-3B;
}
/deep/.el-dialog__footer{
  >div{
    @include flex();
		.el-button--default {
			margin: 0 auto;
		}
  }
}
</style>
