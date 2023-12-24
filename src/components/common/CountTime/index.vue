<template>
  <el-button :round="round" :class="`bog ${className} ${timer > 0 ? 'verify-button__timing' : ''} verify-button`" width="120" type="success" @click="timer <0 &&$emit('click')" :disabled="isPhoneCode">
    {{codeMsg}}
  </el-button>
</template>

<script>
export default {
  name: "CountTime.vue",
  props: {
    isPhoneCode: Boolean,
    waitTime: {
      type: Number,
      default: 60
    },
    startCount: Boolean,
    className: {
      type: String,
      default: ""
    },
    round: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    startCount (status) {
      // status && this.countDown();
      if (!status) {
        this.timer = -1;
        this.isEnd = true
      } else {
        this.countDown()
      }
    }
  },
  data () {
    return {
      timer: -1,
      isEnd: false,
      timeId: null,
    }
  },
  methods: {
    countDown () {
      if (this.timer > 0) return
      this.isEnd = false;
      this.timer = this.waitTime;
      this.timeId = setInterval(() => {
        --this.timer
        if (this.timer < 0) {
          clearInterval(this.timeId);
          this.isEnd = true;
          this.$emit('update:startCount', false)
        }
      }, 1000);
    },
  },
  computed: {
    codeMsg () {
      return this.isEnd ? this.$t('重新获取') : this.timer < 0 ? this.$t('获取验证码') :  this.$tt('countTime', { msg: this.timer })
    }
  },
  mounted () {
    this.$root.$on('reset-count-time', () => {
      if (this) {
        this.isEnd = false
        this.$emit('update:startCount', false)
        clearInterval(this.timeId)
        this.timer = -1;
      }
    })
  },
  beforeDestroy () {
    this.$emit('update:startCount', false)
    clearInterval(this.timeId)
    this.isEnd = true
    this.timer = -1;
  }
}
</script>

<style scoped lang="scss">
.count-time {
  min-width: 130px;
  min-height: 35px;
  color: $c-81;
  background-color: transparent;
}
.multi-language {
  .count-time {
		font-size: 12px;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>
