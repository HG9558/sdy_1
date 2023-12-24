<template>
  <div>
    <div :class="['warning-text mobile-tip', site]">
      {{ $t_c('为了您的隐私安全，信息在提交后将无法修改。 请务必如实填写，以保护您的账号安全。') }}
    </div>
    <div class="profile-dialog">
      <el-form
        :model="mobileForm"
        class="profile-dialog-form"
        ref="mobileFormRef"
        size="small"
        :rules="mobileLoginRule">
        <el-form-item :rules="mobileLoginRule.mobile" prop="mobile" class="mobile-input">
          <MobileAreaCodesSelect :closeSelect="closeSelect" v-model="mobileAreaCode" @select="mobileAreaCodeSelect" />
          <el-input
            class="mobile-phone"
            clearable
            :maxlength="mobileLoginRule.mobile[0].maxlength"
            :placeholder="globalState.isZaloShow ? $t_c('请输入zalo号') : $t_c('请输入手机号码')"
            v-model="mobileForm.mobile"></el-input>
        </el-form-item>

        <el-form-item prop="mobileCaptchareg" :class="['mobile-code-input', globalState.language]">
          <el-input
            class="smcode-input"
            clearable
            v-model="mobileForm.code"
            :maxlength="6"
            :placeholder="globalState.isZaloShow ? $t_c('请输入zalo验证码') : $t_c('请输入短信验证码')">
            <template #prepend>{{ $t_c('验证码：') }}</template>
          </el-input>
          <count-time
            class="profile-smcode"
            :waitTime="60"
            v-model:startCount="startCount"
            @click="useVerify"
            :isPhoneCode="isDisabeld"></count-time>
        </el-form-item>
        <div style="text-align: left;position: relative; top: -30px; color: #f56c6c; font-size: 12px" v-show="globalState.isZaloShow">
          {{ $t_c('需在手机安装zalo并手机号注册账户才能接收验证码') }}
        </div>
      </el-form>
      <el-button class="self-footer profile-button" type="primary" @click="_bingMobile" :loading="loading">{{
        $t_c('确定')
      }}</el-button>
    </div>
    <Verify @success="mbSuccess" mode="pop" captchaType="blockPuzzle" ref="mbVerify" />
  </div>
</template>

<script setup lang="ts">
import CountTime from 'commonComponent/CountTime/index.vue';
import MobileAreaCodesSelect from 'commonComponent/MobileAreaCodesSelect/index.vue';
import Verify from 'commonComponent/Verify/index.vue';
import useRuleHook from '@/hook/userRuleHook';
import type { FormInstance } from 'element-plus';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import useGetUserHook from '@/hook/useGetUserHook';
import { lang } from '@/i18n';
// import { useGlobalState, useNormalState } from '@/stores';
import { useSite } from '@/hook/usePath';

const { mobileLoginRule } = useRuleHook();
const { messageTip } = useDialog();
const { _getUserInfo } = useGetUserHook();
const emits = defineEmits(['update:showDialog', 'changeTitle']);
const loading = ref(false);
const startCount = ref(false);
const isDisabeld = ref(true);
const mobileFormRef = ref<FormInstance>();
const mbVerify = ref();
const globalState = useGlobalState();
const site = useSite();
const normalState = useNormalState();
const closeSelect = ref(false);

const mobileForm = reactive({
  mobile: '',
  code: '',
  captchareg: '',
});
const mobileAreaCode = ref('');

const props = defineProps<{
  showDialog: boolean;
}>();

watch(mobileForm, () => {
  mobileFormRef.value?.validateField('mobile', err => {
    isDisabeld.value = !Boolean(err);
  });
});

watch(
  () => mobileAreaCode.value,
  (_: string) => {
    normalState.setMobileAreaCode(_);
  }
);

watch(
  () => props.showDialog,
  (v: boolean) => {
    closeSelect.value = !v;
  }
);

const mobileAreaCodeSelect = (code: string) => {
  mobileForm.mobile = '';
  mobileAreaCode.value = code;
};

const _bingMobile = () => {
  mobileFormRef.value?.validate(async valid => {
    if (!valid) return;
    const data = {
      mobile: mobileForm.mobile,
      code: mobileForm.code,
      mobileAreaCode: mobileAreaCode.value || normalState.mobileAreaCode,
    };
    const res = await api.user.vfyMobCode(data);
    if (res.code) {
      messageTip({
        message: res.msg || lang('校验验证码失败'),
      });
      return;
    }
    emits('update:showDialog', false);

    messageTip({ message: lang('手机绑定成功'), type: 'success' });
    //- 重新获取用户信息
    _getUserInfo();
  });
};

const useVerify = () => {
  mbVerify.value.show();
};

const mbSuccess = (params: { captchaVerification: string }) => {
  mobileForm.captchareg = params.captchaVerification;
  _getPhoneMesCode();
};

const _getPhoneMesCode = async () => {
  const res = await api.user.sendMobCode({
    mobile: mobileForm.mobile,
    captchaVerification: mobileForm.captchareg,
    mobileAreaCode: mobileAreaCode.value || normalState.mobileAreaCode,
  });

  if (res.code === 0) {
    startCount.value = true;
    messageTip({ message: lang('发送成功，请查看手机'), type: 'success' });
  } else {
    messageTip({ message: lang('发送失败') });
  }
};

provide('success', mbSuccess);
</script>

<style lang="scss" scoped>
.mobile-tip {
  padding: 30px 30px 0px;
}

.mobile-input {
  position: relative;
  &:deep(.el-form-item__content) {
    flex-wrap: nowrap;
    .el-tooltip__trigger {
      height: 44px;
      line-height: 44px;
      background: var(--u_d_2);
      color: var(--u_d_4);
      width: 70px;
      text-align: center;
      opacity: 0.8;
      @include flex(center);
      top: 0px;
      cursor: pointer;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    .el-input__wrapper {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      .el-input__inner {
        padding-left: 10px;
      }
    }
  }
}

.mobile-code-input {
  &:deep(.el-form-item__content) {
    flex-wrap: nowrap;
    .smcode-input {
      width: 280px;
    }
    .el-input__wrapper {
      width: 220px !important;
      margin-right: 40px;
      .el-input__inner {
        width: 284px;
      }
    }
    .profile-smcode {
      margin-left: 29px;
      height: 44px;
      font-size: 14px;
    }
  }
  &:not(.zh, .zh_tw) {
    .smcode-input {
      width: auto;
    }
    &:deep(.el-form-item__content) {
      .el-input__wrapper {
        width: 250px !important;
        .el-input__inner {
          width: 384px;
        }
      }
    }
  }
}

.template_2_003.mobile-tip {
  background: rgba(246, 248, 254, 0.8) !important;
  border: 5px solid #ffffff;
  border-bottom: none;
  border-top: none;
}
</style>
