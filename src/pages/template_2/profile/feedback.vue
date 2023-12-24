<template>
  <div :class="['feedback-wrap', site, globalState.language]">
    <div :class="['feedback-type']">{{ $t_c('问题类型') }}</div>
    <el-form class="feedback-form" ref="formRef" :model="form">
      <el-form-item prop="selectValue">
        <el-select v-model="selectValue" :placeholder="$t_c('请选择问题类型')">
          <el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="feedback-description">
      {{ $t_c('问题描述') }}
    </div>
    <el-form class="feedback-form" ref="formRef" :model="form">
      <el-form-item prop="desc">
        <el-input
          ref="descRef"
          minlength="20"
          maxlength="200"
          type="textarea"
          v-model="form.desc"
          :placeholder="$t_c('请输入内容介于20-200字的问题描述')"></el-input>
      </el-form-item>
      <span class="count-div">{{ count }} / 200</span>
    </el-form>
    <div class="feedback-description feedback-pic">
      {{ $t_c('问题截图') }}
    </div>
    <div class="upload-img">
      <div class="upload-inner">
        <el-upload
          :on-remove="clearImgData"
          ref="uploadRef"
          class="upload-demo"
          drag
          :limit="1"
          action=""
          :show-file-list="true"
          :auto-upload="false"
          :on-change="changeHandle"
          list-type="picture"
          accept=".jpg,.png,.jpeg">
          <div class="upload-container" v-if="!imgData.uid">
            <img class="upload-icon" :src="useImgPath('profile/feedback_upload.png')" alt="" />
            <div class="el-upload__text">
              {{ $t_c('请将文件拖到此处，或') }}<em>{{ $t_c('点击上传') }}</em>
            </div>
            <div>{{ $t_c('（文件格式为PNG或JPG，且大小不超过15MB，目前支持上传一张）') }}</div>
          </div>
        </el-upload>
      </div>
    </div>
    <el-button
      :loading="loading"
      @click="btnClick()"
      :class="[
        'btnCommit',
        selectValue && ((form.desc && form.desc.length && form.desc.length >= 20) || !!imgData) && 'btnCommit-on',
        globalState.language,
      ]"
      >{{ $t_c('提交反馈') }}</el-button
    >
    <div :class="['mask-div', globalState.language]" v-show="isMask">
      <div class="smile-div">
        <img :src="useImgPath('profile/feedback_success.png')" alt="smile" width="18px" />
      </div>
      <div class="title">{{ maskSuccessWrap[0] }}</div>
      <div :class="['smile-div_child', globalState.language]">{{ maskSuccessWrap[1] }}</div>
    </div>
    <div :class="['mask-div', globalState.language]" v-show="isMaskError">
      <div class="smile-div">
        <img :src="useImgPath('profile/feedback_error.png')" alt="smile" />
      </div>
      <div class="mask-div_child">{{ maskErrorWrap[0] }}</div>
      <div class="mask-div_child">{{ maskErrorWrap[1] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api';
import { handleBeforeUpload } from '@/hook/useAuth';
import useDialog from '@/hook/useDialog';
import type { FormInstance } from 'element-plus';
import { nextTick, reactive, ref, watch } from 'vue';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';

export interface Raw extends Blob {
  uid: number;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface imgDataType {
  status: string;
  name: string;
  size: number;
  percentage: number;
  uid: number;
  raw: Raw;
  url: string;
}

const site = useSite();
const { messageTip } = useDialog();
const globalState = useGlobalState();
const selectValue = ref('');
const region = [
  {
    value: 9,
    label: lang('存款问题'),
  },
  {
    value: 1,
    label: lang('提款问题'),
  },
  {
    value: 2,
    label: lang('游戏问题'),
  },
  {
    value: 3,
    label: lang('优惠问题'),
  },
  {
    value: 4,
    label: lang('修改资料'),
  },
  {
    value: 5,
    label: lang('流水问题'),
  },
  {
    value: 6,
    label: lang('程序错误'),
  },
  {
    value: 7,
    label: lang('产品建议'),
  },
  {
    value: 8,
    label: lang('其他'),
  },
];
const form = reactive({
  desc: '',
});
const imgData = reactive({}) as imgDataType;
const loading = ref(false);
const count = ref(0);
const isMask = ref(false);
const maskSuccessWrap = reactive([lang('提交成功'), lang('感谢您的反馈，已通知工作人员火速处理。')]);
const maskErrorWrap = reactive([lang('提交失败'), lang('请您重新填写')]);
const isMaskError = ref(false);
const formRef = ref<FormInstance>();
const descRef = ref();
const uploadRef = ref();

watch(
  form,
  () => {
    nextTick(() => {
      count.value = form.desc.split('').length;
    });
  },
  {
    immediate: true,
  }
);

const changeHandle = (file: imgDataType) => {
  const textContent = handleBeforeUpload(file);
  if (textContent !== true) {
    messageTip({ message: textContent });
    return;
  }
  Object.assign(imgData, file);
  let formData = new FormData();
  formData.append('uploadFile', imgData.raw);
};

const clearImgData = () => {
  Object.keys(imgData).map(key => delete imgData[key as keyof typeof imgData]);
};

const btnClick = () => {
  if (selectValue.value === '') {
    return messageTip({ message: lang('请描述问题类型') });
  }
  if (form.desc === '' && !imgData.uid) {
    return messageTip({ message: lang('描述内容或者图片上传二选一') });
  }
  if (form.desc.length < 20 || form.desc.length > 200) {
    return messageTip({ message: lang('描述内容字数在20-200之间') });
  }

  let formData = new FormData();
  formData.append('uploadMessageFile', imgData.raw);
  formData.append('type', selectValue.value);
  formData.append('textContent', form.desc);
  loading.value = true;

  api.contactUs
    .getMessageSend(formData)
    .then(res => {
      if (res.code === 0) {
        isMask.value = true;
        clearImgData();
        setTimeout(() => {
          isMask.value = false;
        }, 1500);
      } else {
        isMaskError.value = true;
        clearImgData();
        setTimeout(() => {
          isMaskError.value = false;
        }, 1500);
      }
      uploadRef.value.clearFiles();
      selectValue.value = '';
      form.desc = '';
      loading.value = false;
    })
    .catch(() => {
      uploadRef.value.clearFiles();
      selectValue.value = '';
      form.desc = '';
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.feedback-wrap {
  background: var(--u_f_2);
  margin: 10px 20px;
  border-radius: 10px;
  position: relative;
  padding: 10px 20px 20px !important;
  &:not(.zh, .zh_tw) {
    &:deep(.el-select) {
      width: 240px;
    }
  }
  .feedback-type {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: var(--u_f_1);
    margin: 20px 0 8px;
  }
  .feedback-description {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: var(--u_f_1);
    margin: 20px 0 8px;
    > span {
      font-size: 14px;
      color: #a09699;
    }
    &.feedback-pic {
      margin-bottom: 0px;
    }
  }
  .feedback-form {
    position: relative;
    &:deep(.el-form-item__content) {
      .el-select {
        .el-input__wrapper {
          padding-left: 11px;
          border-radius: 8px;
          box-shadow: 0 0 0 1px var(--u_f_3);
        }
      }
      .el-textarea__inner {
        width: 100%;
        height: 200px;
        border: 1px solid var(--u_f_3);
        border-radius: 8px;
        resize: none;
        box-shadow: none;
      }
    }
    .count-div {
      position: absolute;
      right: 15px;
      bottom: 15px;
      color: var(--u_f_3);
    }
  }
  .upload-img {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 4px;
    @include flex(center);
    position: relative;
    .upload-inner {
      width: 100%;
      .upload-demo {
        position: relative;
        &:deep(.el-upload) {
          position: relative;
          .el-upload-dragger {
            margin-top: 8px;
            width: 100%;
            height: 200px;
            border: 1px solid var(--u_f_3) !important;
            border-radius: 8px;
            background-color: var(--u_f_6);
            position: relative;
            z-index: 1;
            .upload-container {
              color: var(--u_f_3);
            }
            .upload-icon {
              width: 60px;
            }
            .el-upload__text {
              margin: 12px 0 10px;
              color: var(--u_f_3);
              em {
                font-weight: normal;
                color: var(--u_f_4);
                margin-left: 5px;
              }
            }
          }
        }
        &:deep(.el-upload-list) {
          position: absolute;
          top: 0px;
          left: 10px;
          width: 100%;
          height: 100%;
          .el-upload-list__item {
            background-color: transparent;
            border: 1px solid transparent;
            height: 91%;
            position: relative;
            margin-top: 0px;
            z-index: 20;
            .el-upload-list__item-thumbnail {
              width: 300px;
              height: 170px;
              border: 1px solid var(--u_f_4);
              flex-shrink: 0;
            }
            .el-upload-list__item-info {
              .el-upload-list__item-name {
                margin-left: 22px;
                color: var(--u_f_3);
                overflow: inherit;
                text-overflow: inherit;
                white-space: inherit;
              }
            }
            .el-icon--close {
              position: absolute;
              left: 320px;
              font-size: 18px;
              font-weight: 600;
              color: var(--u_f_3);
              top: 13px;
            }
          }
        }
      }
    }
  }
  .btnCommit {
    width: 150px;
    height: 40px;
    font-size: 12px;
    color: var(--u_f_6);
    background: var(--u_f_5);
    border-radius: 10px;
    border: 0;
    margin: 20px 0 7px;
    font-weight: 600;
    opacity: 0.5;
    @include flex(center);
    &:not(.zh, .zh_tw) {
      width: auto;
    }
  }
  .btnCommit.btnCommit-on {
    background: var(--u_f_5);
    color: var(--u_f_6);
    opacity: 1;
  }
  .mask-div {
    width: 340px;
    height: 106px;
    background: var(--u_f_6);
    box-shadow: 0px 4px 20px rgba(207, 212, 225, 0.89);
    border-radius: 10px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2;
    @include flex(flex-start, column);
    transform: translate(-50%, -50%);
    &:not(.zh, .zh_tw) {
      height: auto;
    }
    .smile-div {
      margin: 14px 0 10px;
      img {
        width: 18px;
      }
    }
    .title {
      margin-bottom: 14px;
    }
    div {
      color: var(--u_f_1);
      font-size: 14px;
      &:nth-child(3) {
        color: var(--u_f_3);
        &:not(.zh, .zh_tw) {
          margin: 0 20px 10px;
          text-align: center;
        }
      }
    }
  }
}

.el-loading-spinner {
  margin-top: -15px;
  .circular {
    width: 25px;
    height: 25px;
  }
}

//- 2号模板差异
.feedback-wrap {
  &.template_2_002 {
    padding: 20px !important;
    margin-top: 20px;
    .feedback-type {
      margin-top: 0px;
    }
    .feedback-form {
      &:deep(.el-form-item) {
        .el-input__wrapper {
          background: #161e2b;
          border: 1px solid transparent;
          height: 42px;
          width: 300px;
          box-shadow: none;
          .el-input__inner {
            color: var(--u_f_1);
            &::-webkit-input-placeholder {
              color: #878ea6;
            }
          }
        }
        .el-textarea {
          .el-textarea__inner {
            background: #161e2b;
            border: 1px solid transparent;
            color: var(--u_f_1);
            &::-webkit-input-placeholder {
              color: #878ea6;
            }
          }
        }
      }
    }
    .upload-img {
      &:deep(.upload-inner) {
        .upload-demo {
          .el-upload {
            .el-upload-dragger {
              border: 1px solid transparent !important;
              background: #161e2b;
            }
          }
        }
      }
    }
    .btnCommit {
      color: var(--u_f_1);
    }
    .mask-div {
      background: linear-gradient(180deg, #202837 0%, #441844 100%);
      box-shadow: none;
      border: 1px solid #ff00f3;
    }
  }
  &.template_2_003 {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    margin-top: 20px !important;
    .feedback-type {
      margin-top: 0px !important;
    }
  }
}
</style>
