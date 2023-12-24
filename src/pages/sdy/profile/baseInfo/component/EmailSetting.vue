<template>
  <div>
    <div class="warning-text  mobile-tip">
      为了您的隐私安全，信息在提交后将无法修改。
      请务必如实填写，以保护您的账号安全。
    </div>
    <div class="profile-dialog">
      <el-form :model="emailForm" class="email-form bog" ref="emailForm" size="small">
        <el-form-item :rules="emialRule" prop="email">
          <el-input placeholder="请输入您的电子邮箱" v-model="emailForm.email">
            <span slot="prefix">电子邮箱：</span>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button class="self-footer" type="primary" @click="_bingEmail" :loading="loading">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailSetting",
  data () {
    return {
      loading: false,
      emailForm: {
        email: "",
      },
      emialRule: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change'],
        },
      ]
    }
  },
  methods: {
    async _bingEmail () {
      this.loading = true
      const res = await this.$http.setAccMail(this.emailForm)
      this.loading = false
      if (res.data.code) return
      this.messageTip({ message: '您的信息修改成功', type: 'success' })
      this._getUserInfo();
      this.$emit('update:showDialog', false);
      this.$refs['nickNameForm'].resetFields();
    }
  },
}
</script>

<style lang="scss" scoped>
.mobile-tip {
  font-size: 16px;
  margin-bottom: 20px;
}
.email-form.el-form {
  /deep/ .el-input__inner {
    padding-left: 80px;
  }
  /deep/ .el-form-item__error{
    left: 80px;
  }
}
</style>