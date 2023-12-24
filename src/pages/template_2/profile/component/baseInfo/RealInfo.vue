<template>
  <div :class="['real-info-description', site]">
    <div class="title">
      {{ $t_c('您的基本资料尚未全部完善，请完善你的基本信息，信息提交后将无法修改，请务必如实填写。') }}
    </div>
    <el-form
      :model="form"
      class="real-form"
      label-position="top"
      label-width="115px"
      ref="formRef"
      :rules="registerFormRule(form)">
      <el-form-item :label="$t_c('真实姓名')" :prop="!!exitRealName ? '' : 'realName'">
        <el-input
          :class="['user-name', globalState.language, !exitRealName && 'is-short']"
          :placeholder="$t_c('姓名需与银行卡持卡人姓名一致，否则无法提款')"
          v-model="form.realName"
          :disabled="!!exitRealName"></el-input>
      </el-form-item>
      <el-form-item class="gender-item">
        <div class="gender-label">{{ $t_c('性 别') }}</div>
        <el-select class="gender-box" @change="selectChange" v-model="form.gender" :placeholder="$t_c('请选择性别')">
          <template #prefix>
            <el-icon class="gender_icon">
              <Male v-if="selectOptionIndex === 0" />
              <Female v-else />
            </el-icon>
          </template>
          <el-option v-for="(_, i) in selList" :key="i" :label="_.val" :value="_.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="real-info-date" :label="$t_c('出生日期')">
        <div class="birthday">
          <el-date-picker v-model="form.birthday" :default-value="defaultValue" type="date" :placeholder="$t_c('选择日期')" :clearable="false" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="submit-userinfo-button"
          :disabled="btnDisabled"
          @click="_onSubmitForm"
          :loading="loading"
          >{{ $t_c('提交信息') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useRuleHook from '@/hook/userRuleHook';
// import { useGlobalState, useUserState }
import { handleRealName } from '@/utils/filter';
import type { FormInstance } from 'element-plus';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import useGetUserHook from '@/hook/useGetUserHook';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';

const site = useSite();
const userState = useUserState();
const { _getUserInfo } = useGetUserHook();
const { messageTip } = useDialog();
const { registerFormRule } = useRuleHook();

const currentYear = new Date().getFullYear();
const defaultValue = ref(new Date(currentYear - 18, 0, 1))

const loading = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  realName: '',
  birthday: '',
  gender: '',
});
const selectOptionIndex = ref<number>(0);
const selList = reactive([
  { index: 0, val: lang('男') },
  { index: 1, val: lang('女') },
]);
const btnDisabled = ref(true);
const globalState = useGlobalState();
const exitRealName = computed(() => handleRealName(userState.userInfo.realName));

onMounted(() => {
  exitRealName.value && (form.realName = exitRealName.value);
});

watch(form, async () => {
  const bol = Object.values(form).some(item => !item);
  if (bol) return (btnDisabled.value = true);
  btnDisabled.value = !(await new Promise(resolve => formRef.value?.validate(resolve)));
});

const selectChange = (val: string) => (selectOptionIndex.value = selList.findIndex(_ => _.val === val));

const _onSubmitForm = async () => {
  loading.value = true;
  let realNameRes;
  let birthdayRes;
  let genderRes;
  try {
    if (exitRealName.value) {
      [birthdayRes, genderRes] = await Promise.all([
        api.user.setBirthday({ birthday: form.birthday }),
        api.user.setGender({ gender: form.gender }),
      ]);
    } else {
      [realNameRes, birthdayRes, genderRes] = await Promise.all([
        api.user.modRealName({ realName: form.realName }),
        api.user.setBirthday({ birthday: form.birthday }),
        api.user.setGender({ gender: form.gender }),
      ]);
    }
    loading.value = false;
    if ((!exitRealName.value && realNameRes?.code) || birthdayRes.code || genderRes.code) {
      messageTip({
        message: (!exitRealName.value && realNameRes?.msg) || birthdayRes.msg || genderRes.msg,
      });
      return;
    }

    messageTip({ message: lang('添加成功') });
    _getUserInfo();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.real-info-description {
  .title {
    color: var(--u_d_1);
  }
  .real-form {
    margin-top: 22px;
    &:deep(.el-form-item) {
      .el-form-item__label {
        color: var(--u_d_1);
      }
      .el-form-item__content {
        .el-input__wrapper {
          padding-left: 11px;
          border-radius: 8px;
          box-shadow: 0 0 0 1px var(--u_f_3);
        }
      }
      .gender-label {
        color: var(--u_d_1);
      }
      .user-name {
        height: 42px;
        width: 362px;
        &:deep(.el-input__wrapper) {
          border: 1px solid #adb2c8;
          border-radius: 8px;
        }
        &.ms.is-short {
          width: 672px;
        }
        &.vi.is-short {
          width: 530px;
        }
        &.en.is-short {
          width: 760px;
        }
      }
    }
    .gender-item {
      margin-bottom: 25px;
      &:deep(.el-form-item__content) {
        display: block;
      }
      .gender-box {
        &:deep(.el-input__wrapper) {
          height: 42px;
          // border: 1px solid #adb2c8;
          border-radius: 8px;
        }
      }
    }
    .real-info-date {
      &:deep(.el-input__wrapper) {
        height: 42px;
        // border: 1px solid #adb2c8;
        border-radius: 8px;
      }
    }
    .submit-userinfo-button {
      margin-top: 25px;
      background: var(--u_d_5);
      width: 150px;
      height: 40px;
      border-radius: 10px;
      font-size: 16px;
      &.is-disabled {
        opacity: 0.5;
      }
    }
  }
}
.real-info-description {
  &.template_2_002 {
    .real-form {
      &:deep(.el-form-item) {
        .el-form-item__label,
        .gender-label {
          color: #fff !important;
        }
        .el-form-item__content {
          .el-input__wrapper {
            background-color: var(--u_d_4);
            border: none;
            box-shadow: none;
            .el-input__inner {
              color: #fff;
              &::-webkit-input-placeholder {
                color: #878ea6;
              }
            }
          }
          .submit-userinfo-button {
            border: none;
            color: #fff;
          }
        }
      }
    }
  }
  &.template_2_003 {
    &:deep(.el-form-item) {
      .el-form-item__content {
        .el-input__wrapper {
          box-shadow: none;
          border: 1px solid var(--u_d_3);
        }
        .submit-userinfo-button {
          border: none;
        }
      }
    }
  }
}
</style>
