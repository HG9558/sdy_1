<template>
  <div class="money-dialog">
    <el-form :model="moneyData" class="bog" ref="moneyData" size="small" :rules="moneyRule">
      <el-form-item prop="money">
        <div>转账金额:</div>
        <el-input class="money-input" placeholder="请输入金额" v-model="moneyData.money">
        </el-input>
        <span class="max-money" @click="setMaxMoney">最大金额</span>
      </el-form-item>
    </el-form>
    <el-button class="self-footer" type="primary" @click="sumbit" :loading="loading">立即转账</el-button>
  </div>
</template>

<script>
export default {
  props: ['dialogData'],
  data () {
    return {
      loading: false,
      moneyData: {
        money: '',
      },
    }
  },
  computed : {
    moneyRule () {
      return {
        money:  [
          { validator: this.validateMoney, trigger: "change", text: this.dialogData.checkText, curMoney: this.dialogData.dialogContent},
        ]
      }
    },
  },
  methods: {
    setMaxMoney () {
      const { dialogContent } = this.dialogData
      this.$set(this.moneyData, 'money', dialogContent)
    },
    async sumbit () {
      this.$refs['moneyData'].validate(async (valid) => {
        if (!valid) return
        this.loading = true
        const { type, depotId } = this.dialogData
        const params = {
          depotId,
          amount: Number(this.moneyData.money)
        }
        if (type === 'in') {
          await this.$http.transferInPlatform(params)
        } else {
          await this.$http.transferOutPlatform(params)
        }
        this.$emit('dialog-event');
        this.$refs['moneyData'].resetFields();
      })
    },
    //- 金额校验
    validateMoney: (rule, value, callback) => {
      const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
      if (!value) {
        callback(new Error("请输入金额"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入最多两位小数的数值"));
      } else if (value > rule.curMoney) {
        callback(new Error(rule.text));
      } else {
        callback();
      }
    }
  },
  watch: {
    dialogData: {
      handler (n) {
        this.loading = n.loading
      }
    }
  },
  beforeDestroy () {
    this.$refs['moneyData'].resetFields();
  }
}
</script>
<style scoped lang="scss">
@import "../css/dialog.scss";
</style>