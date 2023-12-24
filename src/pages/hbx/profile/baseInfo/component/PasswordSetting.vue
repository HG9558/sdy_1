<template>
  <!-- 修改密码弹窗 -->
  <div class="profile-dialog">
    <el-form :model="pwdForm" label-position="left" :rules="pwdFormRules" class="bog password-form" ref="pwdForm" size="small">
      <el-form-item prop="lastPwd">
        <el-input type="password" placeholder="请输入您的原始密码" :maxlength="18" v-model="pwdForm.lastPwd">
          <span slot="prefix">原密码：</span>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" placeholder="新密码（6-18位数字字母组合）" prop="pwd" :maxlength="18" v-model="pwdForm.pwd">
          <span slot="prefix">新密码：</span>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPwd">
        <el-input type="password" placeholder="再次输入新密码" :maxlength="18" v-model="pwdForm.confirmPwd">
          <span slot="prefix">确认密码：</span>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="self-footer" type="primary" @click="_updatePassword" :loading="loading">确定</el-button>
  </div>
</template>

<script>
export default {
  name: "PasswordSetting",
  data () {
    return {
      loading: false,
      pwdForm: {
        lastPwd: "",
        pwd: "",
        confirmPwd: "",
      },
      pwdFormRules: {
        lastPwd: [
          { min: 6, max: 18, message: "密码不符合要求", trigger: "blur" },
          { validator: this.validateLastPass, trigger: "blur" },
        ],
        pwd: [
          { min: 6, max: 18, message: "密码不符合要求", trigger: "blur" },
          { validator: this.validatePass, trigger: "blur" },
        ],
        confirmPwd: [
          { min: 6, max: 18, message: "密码不符合要求", trigger: "blur" },
          { validator: this.validatePass2, trigger: "blur" },
        ],
      },
    }
  },
  methods: {
    async _updatePassword () {
      this.$refs['pwdForm'].validate(async (valid) => {
        if (!valid) return
        this.loading = true
        try {
          const res = await this.$http.modPwd(this.pwdForm)
          this.loading = false
          if (res.data.code) return
          this.messageTip({ message: '您的信息修改成功', type: 'success' })
          this.$emit('update:showDialog', false);
          this.$refs['pwdForm'].resetFields();
        } catch (error) {
          this.$emit('update:showDialog', false);
        }
      })
    },
    async validateLastPass (rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        const res = await this.$http.verifyPwd({ lastPwd: value });
        console.log(res);
        if (res.data.code) return
        res.data.msg ? callback() : callback(new Error("原密码错误"))
      }
    },
    validatePass (rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.pwdForm.lastPwd === value) {
          callback(new Error("新密码不能与旧密码相同"));
        } else {
          if (this.pwdForm.confirmPwd !== "") {
            this.$refs.pwdForm.validateField("confirmPwd");
          }
          callback();
        }
      }
    },
    validatePass2 (rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.pwdForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.password-form.el-form {
  /deep/ .el-input__inner {
    padding-left: 80px;
  }
  /deep/ .el-form-item__error{
      left: 80px;
  }
}
</style>