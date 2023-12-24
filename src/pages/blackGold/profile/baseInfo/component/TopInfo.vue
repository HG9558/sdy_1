<template>
  <div class="data-box">
    <div class="provider-box">
      <div class="title">
        {{$t('为了确保您的账户安全，请您填写相关安全信息，以备不时之需')}}
      </div>
      <div class="class-box">
        <div class="class-lv">
          {{$t('账户安全等级：')}}
          <span class="text">
            {{safetyLevel === 4 ? $t('强') : (safetyLevel === 2 || safetyLevel === 3) ? $t('中等') : $t('弱')}}
          </span>
        </div>

        <div class="class-lv">
          {{$t('填写基本资料：')}}
          <span class="text">{{finishBase && userInfo.email && bindBankCard ? $t('已完善') : $t('未完善')}} </span>
        </div>

        <div class="class-lv">
          {{$t('账户密码：')}}
          <span class="text pwd">********</span>
          <span class="bind-btn" @click="openDialog({componentName:'PasswordSetting',dialogTitle: $t('修改密码')})">{{$t('修改')}}</span>
        </div>
      </div>
      <el-divider></el-divider>

      <div class="bind-box">
        <div class="bind-item">
          <div class="label">{{$t('昵称：')}}</div>
          <div class="center">{{ nickNameInfo.nickName }}</div>
          <div class="bind-btn" @click="openDialog({componentName:'NickNameSetting',dialogTitle: $t('修改昵称') })">
            {{$t('修改')}}
          </div>
        </div>

        <div v-if="isNeedVfySms" class="bind-item" :style="{ marginLeft: '140px', marginRight: 'auto' }">
          <div class="label">{{$t('手机号码：')}}</div>
          <div class="center" v-if="userInfo.mobile">
            {{ userInfo.mobile | regMobile }}
          </div>
          <template v-else>
            <div class="center">{{$t('未绑定')}}</div>
            <div class="bind-btn" @click="openDialog({componentName:'MobileSetting',dialogTitle: $t('绑定手机号')})">
              {{$t('绑定')}}
            </div>
          </template>
        </div>

        <div v-else-if="isNeedVfyEMail" class="bind-item" :style="{ marginLeft: '140px', marginRight: 'auto' }">
          <div class="label">{{$t('电子邮箱：')}}</div>
          <div class="center" v-if="userInfo.email">
            {{ userInfo.email | regEmail }}
          </div>
          <template v-else>
            <div class="center">{{$t('未绑定')}}</div>
            <div class="bind-btn" @click="openDialog({componentName:'EmailSetting',dialogTitle: $t('绑定电子邮箱')})">
              {{$t('绑定')}}
            </div>
          </template>
        </div>
      </div>

    </div>

    <!-- 弹窗 -->
    <global-dialog width="580px" :showDialog.sync="showDialog" :title="dialogTitle" :hasSelfFooter="true">
      <component :is="componentName" :showDialog.sync="showDialog"></component>
    </global-dialog>
  </div>
</template>

<script>
import NickNameSetting from "./NickNameSetting.vue"
import PasswordSetting from "./PasswordSetting.vue"
import MobileSetting from "./MobileSetting.vue"
import EmailSetting from "./EmailSetting"
import { mapState } from 'vuex'
export default {
  name: "TopInfo",
  components: {
    NickNameSetting,
    PasswordSetting,
    MobileSetting,
    EmailSetting
  },
  props: {
    finishBase: Boolean,
    bindBankCard: Boolean
  },
  data () {
    return {
      showDialog: false,
      confirmText: '',
      componentName: "",
      dialogTitle: "",
      isBtnClick: false,
    }
  },
  methods: {
    openDialog ({ componentName, dialogTitle, confirmText }) {
      this.dialogTitle = dialogTitle;
      this.confirmText = confirmText;
      this.componentName = componentName
      this.showDialog = true
    },
  },
  computed: {
    ...mapState('global', ['isNeedVfySms', 'isNeedVfyEMail']),
    ...mapState({
      nickNameInfo: state => state.user.nickNameInfo,
    }),
    safetyLevel () {
      return [
        this.finishBase,
        this.userInfo.mobile,
        this.userInfo.email,
        this.bindBankCard,
      ].filter(v => v).length;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/TopInfo.scss";
</style>
