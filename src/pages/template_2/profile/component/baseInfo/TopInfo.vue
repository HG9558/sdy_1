<template>
  <div :class="['data-box', globalState.language]">
    <div :class="['provider-box', site]">
      <div class="title">
        {{ $t_c('为了确保您的账户安全，请您填写相关安全信息，以备不时之需') }}
      </div>
      <div class="class-box">
        <div class="class-lv">
          {{ $t_c('账户安全等级') }}：
          <span class="text level-text">
            {{ safetyLevel === 4 ? $t_c('强') : safetyLevel === 2 || safetyLevel === 3 ? $t_c('中等') : $t_c('弱') }}
          </span>
        </div>

        <div class="class-lv">
          {{ $t_c('填写基本资料') }}：
          <span class="text"
            >{{ finishBase && userState.userInfo.email && bindBankCard ? $t_c('已完善') : $t_c('未完善') }}
          </span>
        </div>

        <div class="class-lv">
          {{ $t_c('账户密码') }}：
          <span class="text pwd">********</span>
          <span
            class="bind-btn"
            @click="openDialog({ name: 'PasswordSetting', title: $t_c('修改密码'), type: 'password' })"
            >{{ $t_c('修改') }}</span
          >
        </div>
      </div>
      <el-divider></el-divider>
      <div :class="['bind-box', globalState.language]">
        <div class="bind-item">
          <div class="label">{{ $t_c('昵称') }}：</div>
          <div class="center">{{ userState.nickNameInfo.nickName }}</div>
          <div
            class="bind-btn"
            @click="openDialog({ name: 'NickNameSetting', title: $t_c('修改昵称'), type: 'nickName' })">
            {{ $t_c('修改') }}
          </div>
        </div>

        <div class="bind-item" v-if="globalState.isNeedVfySms">
          <div class="label">{{ $t_c('手机号码') }}：</div>
          <div class="center" v-if="userState.userInfo.mobile">
            {{ formatMobile(userState.userInfo.mobile) }}
          </div>
          <template v-else>
            <div class="center">{{ $t_c('未绑定') }}</div>
            <div
              class="bind-btn"
              @click="openDialog({ name: 'MobileSetting', title: $t_c('绑定手机号'), type: 'bindMobile' })">
              {{ $t_c('绑定') }}
            </div>
          </template>
        </div>

        <div class="bind-item" v-if="globalState.isNeedVfyEMail">
          <div class="label">{{ $t_c('电子邮箱') }}：</div>
          <div class="center" v-if="userState.userInfo.email">
            {{ formatEmail(userState.userInfo.email) }}
          </div>
          <template v-else>
            <div class="center">{{ $t_c('未绑定') }}</div>
            <div class="bind-btn" @click="openDialog({ name: 'EmailSetting', title: $t_c('绑定电子邮箱') })">
              {{ $t_c('绑定') }}
            </div>
          </template>
        </div>

        <div class="bind-item" v-if="globalState.isNeedGoogle">
          <div class="label">{{ $t_c('谷歌验证') }}：</div>
          <div class="center" v-if="userState.userInfo.isVerifyGoogle">
            {{ $t_c('已绑定') }}
          </div>
          <template v-else>
            <div class="center">{{ $t_c('未绑定') }}</div>
            <div class="bind-btn" @click="openDialog({ name: 'GoogleSetting', title: $t_c('绑定谷歌验证') })">
              {{ $t_c('绑定') }}
            </div>
          </template>
        </div>

        <div class="bind-item">
          <div class="label">{{ $t_c('支付密码') }}：</div>
          <div class="center">{{ $t_c(userState.userInfo.securePwd ? $t_c('已设置') : $t_c('未设置')) }}</div>
          <div class="bind-btn" @click="openDialog({ name: 'PayPwd', title: $t_c('设置支付密码') })">
            {{ $t_c('设置') }}
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <self-dialog
      :dialogTitle="globalState.isZaloShow && typeClass === 'bindMobile' ? $t_c('绑定zalo验证') : dialogTitle"
      v-model:isShow="showDialog"
      :width="dialogWidth"
      :showCancel="false"
      :showConfirm="false"
      customClass="update_dialog"
      class="self-dialog-body">
      <component :is="currentComponentName.name" v-model:showDialog="showDialog"></component>
    </self-dialog>
  </div>
</template>

<script setup lang="ts">
import NickNameSetting from './NickNameSetting.vue';
import PasswordSetting from './PasswordSetting.vue';
import MobileSetting from './MobileSetting.vue';
import EmailSetting from './EmailSetting.vue';
import GoogleSetting from './GoogleSetting.vue';
import PayPwd from './PayPwd.vue';
import { ref, computed, markRaw, reactive } from 'vue';
// import { useGlobalState, useUserState } from '@/stores';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import { useSite } from '@/hook/usePath';
import { formatMobile, formatEmail } from '@/utils/filter';


const userState = useUserState();
const globalState = useGlobalState();
const site = useSite();
const typeClass = ref('');


const props = withDefaults(
  defineProps<{
    finishBase: boolean;
    bindBankCard: boolean;
  }>(),
  {}
);

const componentMap = {
  NickNameSetting: markRaw(NickNameSetting),
  PasswordSetting: markRaw(PasswordSetting),
  MobileSetting: markRaw(MobileSetting),
  EmailSetting: markRaw(EmailSetting),
  GoogleSetting: markRaw(GoogleSetting),
  PayPwd: markRaw(PayPwd),
};

const showDialog = ref<boolean>(false);
const dialogTitle = ref<string>('');
const currentComponentName = reactive<HeaderType.curType>({
  name: componentMap.NickNameSetting,
});

const openDialog = ({ name, title, type = '' }: { name: string; title: string; text?: string; type?: string }) => {
  typeClass.value = type;
  dialogTitle.value = title;
  showDialog.value = true;
  currentComponentName.name = componentMap[name as keyof typeof componentMap];
};

const dialogWidth = computed(() => {
  return globalState.language === 'zh'
    ? 500
    : typeClass.value === 'bindMobile'
    ? 720
    : typeClass.value === 'nickName'
    ? 630
    : globalState.language === 'ms'
    ? 700
    : 650;
});

const safetyLevel = computed(() => {
  return [props.finishBase, userState.userInfo.mobile, userState.userInfo.email, props.bindBankCard].filter(v => v)
    .length;
});
</script>
<style lang="scss" scoped>
.data-box {
  &:not(.zh, .zh_tw) {
    .bind-btn {
      width: auto !important;
      padding: 0 5px;
      white-space: nowrap;
    }
  }
}
.provider-box {
  font-size: 14px;
  font-weight: 400;
  color: var(--u_d_1);
  .class-box {
    @include flex(flex-start);
    color: var(--u_d_1);
    .class-lv {
      width: 33%;
      margin: 26px 0px 0 0;
      @include flex(flex-start);
      .text {
        color: #6a7391;
        .level-text {
          color: var(--u_d_7);
        }
        &.pwd {
          color: var(--u_d_2);
        }
      }
    }
  }
  .bind-box {
    @include flex(flex-start);
    flex-wrap: wrap;
    .bind-item {
      margin-bottom: 28px;
      width: 33%;
      @include flex(flex-start);
      .label {
        color: var(--u_d_1);
      }
      .center {
        color: var(--u_d_2);
      }
    }
  }
  .bind-btn {
    width: 60px;
    height: 32px;
    line-height: 32px;
    border: 1px solid var(--u_d_2);
    border-radius: 8px;
    text-align: center;
    margin-left: 10px;
    font-size: 12px;
    cursor: pointer;
    color: var(--u_d_2);
    transition: 0.2s linear;
  }
  .el-divider--horizontal {
    border-top: 1.2px solid #404469;
    opacity: 0.1;
  }
}
</style>
