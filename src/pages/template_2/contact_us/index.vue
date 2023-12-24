<template>
  <div :class="['contact-us-box', site]">
    <div class="contact-us-content">
      <div class="contact-us-content-inner">
        <div class="contact-us-content-inner_title">{{ $t_c('联系我们') }}</div>
        <div class="contact-us-content-inner_title_two">CONTACT US</div>
        <div class="contact-us-content-inner_box">
          <div :key="index" class="contact-item" v-for="(item, index) in renderCopyList">
            <div class="top-container">
              <div class="contact_us_img_container">
                <img class="contact-item_logo" :src="item.url" alt="logo" />
              </div>
              <div class="contact-item_logo_title">{{ item.title }}</div>
            </div>
            <div class="copy-btn" v-for="(childItem, index) in item.text" :key="childItem + ` ${index}`">
              <span class="copy-btn-text">{{ childItem }}</span>
              <span class="copy-click" @click="copy(childItem)">{{ $t_c('复制') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-us-input-box">
        <el-form :model="form" :rules="validateRule" ref="formRef">
          <el-form-item prop="name">
            <el-input class="user-input" v-model="form.name" :maxlength="20" :placeholder="$t_c('名字:')"></el-input>
          </el-form-item>
          <el-form-item prop="number">
            <el-input
              class="user-input"
              v-model="form.number"
              :maxlength="11"
              :placeholder="$t_c('联络号码:')"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input class="user-input" v-model="form.email" :placeholder="$t_c('邮件地址:')"></el-input>
          </el-form-item>
          <el-form-item prop="description">
            <el-input
              ref="description"
              :maxlength="200"
              class="resize-none"
              type="textarea"
              v-model="form.description"
              :placeholder="$t_c('说明:')"></el-input>
          </el-form-item>
          <el-form-item class="btn-class">
            <el-button class="btn-pubilc" @click="dataFormSubmitHandle(formRef)">{{ $t_c('提交') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      :loading="loading"
      :show-close="false"
      v-model="copied"
      center
      top="400px"
      width="182px"
      :lock-scroll="false"
      class="contact_us">
      <div class="copy-container">
        <span class="copy_text">{{ $t_c('复制成功') }}</span>
        <img class="dialog-result" :src="useImgPath('partner/copy_sucess.png')" width="182px" />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useCheckForm from '@/hook/useCheckForm';
import checkData from '@/hook/userRuleHook';
// import { useGlobalState } from '@/stores';
import { useClipboard } from '@vueuse/core';
import type { FormInstance, FormRules } from 'element-plus';
import { computed, reactive, ref } from 'vue';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';

const site = useSite();
const formRef = ref<FormInstance>();
const { copy, copied } = useClipboard();
const globalState = useGlobalState();
const { messageTip } = useDialog();
const { getEail } = useCheckForm();
const loading = ref<boolean>(false);
const { validatePhone } = checkData();

const form = reactive({ name: '', email: '', number: '', description: '' });

const copyList = computed(() => {
  const tempList = [
    { name: 'configSkype', url: '', text: [] as string[], title: '' },
    { name: 'configTelegram', url: '', text: [] as string[], title: '' },
    { name: 'configFlygram', url: '', text: [] as string[], title: '' },
  ];
  return tempList.filter(item => globalState.stationSetting[item.name]);
});

const filterNull = (arr: string[]) => {
  return arr.filter(val => val && val.trim());
};

const renderCopyList = computed(() => {
  return copyList.value.map(item => {
    if (globalState.stationSetting) {
      switch (item.name) {
        case 'configSkype':
          item.text = filterNull(globalState.stationSetting.configSkype.split(','));
          item.url = globalState.stationSetting.pcIconSkype;
          item.title = globalState.stationSetting.titleSkype;
          break;
        case 'configTelegram':
          item.text = filterNull(globalState.stationSetting.configTelegram.split(','));
          item.url = globalState.stationSetting.pcIconTelegram;
          item.title = globalState.stationSetting.titleTelegram;
          break;
        case 'configFlygram':
          item.text = filterNull(globalState.stationSetting.configFlygram.split(','));
          item.url = globalState.stationSetting.pcIconFlygram;
          item.title = globalState.stationSetting.titleFlygram;
          break;
      }
    }
    return item;
  });
});

const validateRule = reactive<FormRules>({
  name: [{ required: true, message: lang('名字不能为空'), trigger: 'blur' }],
  description: [{ required: true, message: lang('说明不能为空'), trigger: 'blur' }],
  number: [{ validator: validatePhone, trigger: 'blur' }],
  email: [
    {
      validator: (_rule, value, callback) => {
        if (!value) {
          callback(new Error(lang('邮件地址不能为空')));
        } else if (!getEail(value)) {
          callback(new Error(lang('请输入正确的邮箱')));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
});

const dataFormSubmitHandle = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (!valid) return false;
    loading.value = true;
    const formData = new FormData();
    formData.append('type', '8');
    formData.append(
      'textContent',
      `【名字】${form.name}【联络号码】${form.number}【邮件地址】${form.email}【说明】${form.description}`
    );
    const res = await api.contactUs.getMessageSend(formData);
    loading.value = false;
    if (res.code === 0) {
      messageTip({
        message: lang('提交成功'),
      });
    }
    formEl.resetFields();
  });
};
const contactItemBg = `url(${useImgPath('partner/item_icon.png')})`;
</script>

<style lang="scss" scoped>
@import '../../../assets/style/fonts/font.scss';
.contact-us-box {
  .contact-us-content {
    width: 1280px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    padding: 100px 0px 80px;
    @include flex();
    .contact-us-content-inner_title {
      font-size: 100px;
      font-weight: 800;
      color: var(--cu_1);
      font-family: hy;
    }
    .contact-us-content-inner_title_two {
      font-size: 52px;
      font-weight: 600;
      color: var(--cu_2);
      margin-bottom: 78px;
    }
    .contact-us-content-inner_box {
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      font-weight: 400;
      .contact-item {
        border-radius: 15px;
        margin-right: 28px;
        background: var(--cu_3);
        border: 1px solid var(--cu_4);
        @include flex(none, column);
        padding: 7px;
        .top-container {
          background-image: v-bind(contactItemBg);
          width: 148px;
          height: 125px;
          background-size: cover;
          @include flex(center, column);
          margin-bottom: 10px;
        }
        .contact_us_img_container {
          width: 62px;
          height: 62px;
          margin: 4px;
          background: var(--cu_5);
          border-radius: 50%;
          @include flex(center);
        }
        .contact-item_logo {
          width: 44px;
          border-radius: 50%;
        }
        .contact-item_logo_title {
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: var(--cu_5);
        }
        .contact-item_logo_des {
          width: 140px;
          height: 16px;
          word-wrap: break-word;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
        }
        .copy-btn {
          background-size: cover;
          width: 140px;
          line-height: 18px;
          text-align: left;
          box-sizing: border-box;
          position: relative;
          .copy-btn-text {
            color: var(--cu_1);
            float: left;
            width: 110px;
            word-break: break-all;
            font-weight: 500;
          }
          .copy-click {
            color: var(--cu_7);
            cursor: pointer;
            font-weight: 500;
            float: right;
            flex-shrink: 0;
          }
        }
      }
    }
  }
  .contact-us-input-box {
    width: 600px;
    background: var(--cu_8);
    padding: 20px 20px 34px;
    box-sizing: border-box;
    border-radius: 16px;
    .el-form {
      &:deep(.el-input__inner) {
        position: relative;
        height: 62px;
        border-radius: 8px;
        color: var(--cu_2);
        padding-left: 20px;
        box-shadow: var(--cu_9);
        border: 0.5px solid var(--cu_10);
        background-color: var(--cu_11);
      }
      &:deep(.el-input__wrapper) {
        box-shadow: none;
        padding: 0;
        margin-bottom: 10px;
        border: none;
      }
      &:deep(.el-textarea__inner) {
        resize: none;
        font-size: 14px;
        color: var(--cu_2);
        height: 142px !important;
        background-color: var(--cu_11);
        box-shadow: none;
        font-family: inherit;
        border: 0.5px solid var(--cu_10);
        box-sizing: border-box;
        border-radius: 6px;
        box-shadow: var(--cu_9);
      }
      &:deep(.el-form-item__content) {
        @include flex(flex-end);
      }
      .btn-pubilc {
        width: 150px;
        height: 50px;
        font-size: 18px;
        font-weight: 500;
        color: var(--cu_5);
        display: block;
        border: 0;
        background: var(--cu_6);
        border-radius: 8px;
      }
    }
  }
}
//002
.contact-us-box.template_2_002 {
  .contact-us-content-inner_title {
    @include text_clip(linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%));
  }
  .contact_us_img_container {
    background: linear-gradient(#fe8e00, #e8c96f);
    .contact-item_logo {
      background-color: #fff;
      padding: 5px;
    }
  }
  .copy-btn-text {
    font-weight: 500;
  }
  .copy-click {
    @include text_clip(linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%));
  }
  :deep(.el-input .el-input__wrapper) {
    background-color: transparent !important;
    border: none !important;
  }
}
//003
.contact-us-box.template_2_003 {
  .contact-us-input-box {
    background: rgba(246, 248, 254, 0.4);
    border: 5px solid #ffffff;
    box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
    backdrop-filter: blur(7px);
    border-radius: 10px;
  }
}
</style>

<style lang="scss">
.contact_us.el-dialog {
  background: transparent;
  border: none;
  box-shadow: none;

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 0 !important;
    background-color: transparent !important;
    .copy-container {
      position: relative;
      .copy_text {
        font-weight: 500;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        color: var(--p_15);
        width: 100%;
      }
    }
    .dialog-result {
      width: 180px;
      height: 120px;
      font-size: 0;
    }
  }
}
</style>
