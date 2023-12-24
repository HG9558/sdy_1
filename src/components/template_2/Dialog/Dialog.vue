<template>
  <el-dialog
    v-model="isSHowDialog"
    :width="width"
    center
    :show-close="false"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :align-center="alignCenter"
    :class="[customClass, site]"
    :destroy-on-close="false"
    @close="closeDialogEvent"
    ref="dialogRef"
    :append-to-body="appendToBody">
    <template #header="{}">
      <div class="dialog_header">
        <div class="title">{{ dialogTitle }}</div>
        <div class="close-icon" @click="closeDialog('closeIcon')">&times;</div>
      </div>
    </template>
    <slot></slot>
    <template #footer v-if="showCancel || showConfirm">
      <div v-if="showCancel" :class="['btn cancel-btn', globalState.language]" @click="closeDialog()">
        {{ cancelTxt }}
      </div>
      <el-button class="btn confirm-btn" v-if="showConfirm" @click="confirmClick" :loading="isLoading">{{
        confirmTxt
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';

const dialogRef = ref();
const props = withDefaults(
  defineProps<{
    isShow?: boolean;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    alignCenter?: boolean;
    width?: number;
    customClass?: string;
    dialogTitle?: string;
    cancelTxt?: string;
    showCancel?: boolean;
    showConfirm?: boolean;
    confirmTxt?: string;
    isAttributeUse?: boolean;
    isBtnLoading?: boolean;
    appendToBody?: boolean;
    clickCallback?: <T>(val?: T) => void;
    cancelCallback?: () => void;
  }>(),
  {
    closeOnClickModal: false,
    closeOnPressEscape: false,
    alignCenter: true,
    width: 500,
    customClass: import.meta.env.VITE_TEMPLATE + import.meta.env.VITE_THEME,
    dialogTitle: lang('消息公告'),
    showCancel: true,
    showConfirm: true,
    cancelTxt: lang('取消'),
    confirmTxt: lang('确定'),
    isAttributeUse: false,
    isBtnLoading: false,
    appendToBody: false,
  }
);

const emits = defineEmits(['update:isShow', 'confirmCallback', 'close']);
const isLoading = ref<boolean>(false);
const site = useSite();
const globalState = useGlobalState();

const closeDialog = (type?: string) => {
  if (props.isAttributeUse) {
    if (props.cancelCallback && !type) {
      props.cancelCallback();
    }
    dialogRef.value.visible = false;
  } else {
    emits('update:isShow', false);
  }
};

const closeDialogEvent = () => {
  if (props.isAttributeUse) {
    dialogRef.value.visible = false;
  } else {
    emits('update:isShow', false);
  }
  emits('close')
};

const confirmClick = async () => {
  if (props.isAttributeUse) {
    if (props.clickCallback && props.isBtnLoading) {
      isLoading.value = true;
      await props.clickCallback();
      isLoading.value = false;
    } else {
      props.clickCallback && props.clickCallback();
    }
    if (!props.cancelCallback) closeDialog();
  } else {
    emits('confirmCallback');
  }
};

const isSHowDialog = computed({
  get() {
    return props.isShow;
  },
  set() {},
});

const show = () => {
  dialogRef.value.visible = true;
};

defineExpose({
  show,
});
</script>

<style lang="scss">
.el-dialog {
  border-radius: 10px;
  overflow: hidden;
  border: none;
  .el-dialog__header {
    padding: 0;
    margin: 0;
    border-radius: 10px 10px 0px 0px;
    .dialog_header {
      position: relative;
      @include flex(center);
      height: 50px;
      border-radius: 10px 10px 0px 0px;
      .title {
        font-weight: 500;
        font-size: 20px;
      }
      .close-icon {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
  .el-dialog__footer {
    @include flex(center);
    .btn {
      width: 140px;
      min-width: 140px;
      height: 50px;
      border-radius: 10px;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
      @include flex(center);
      &.cancel-btn {
        margin-right: 80px;
      }
      &:not(.zh, .zh_tw) {
        width: auto;
        padding: 10px;
        flex-shrink: 0;
      }
    }
  }
}
.el-dialog__body {
  text-align: center !important;
  font-size: 16px;
  background: var(--dialog_8) !important;
  color: var(--dialog_7);
}
.el-dialog {
  .dialog_header {
    background: var(--dialog_1);
    color: var(--dialog_2);
  }
  .el-dialog__footer {
    .cancel-btn {
      border: 1px solid var(--dialog_3);
      color: var(--dialog_4);
    }
    .confirm-btn {
      background: var(--dialog_5);
      color: var(--dialog_6);
    }
  }
}
.self-dialog-body {
  .el-dialog__body {
    .el-form-item__content {
      .el-input__inner {
        height: 40px;
        border-radius: 8px;
      }
    }
  }
}
.transform-dialog {
  .el-dialog__body {
    padding-bottom: 60px;
  }
}
.home_notice_dialog {
  .el-dialog__body {
    padding: 0;
    img {
      width: 100%;
    }
  }
}
</style>
