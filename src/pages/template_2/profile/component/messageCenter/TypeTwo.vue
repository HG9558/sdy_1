<template>
  <div :class="['info-msg-wrap', site]">
    <div class="clear-div" v-if="unReadCount">
      <div class="count-notice">{{ unReadCount }}{{ $t_c('条未读') }}</div>
      <div class="info_msg_clear_btn" @click="clearBtnClick">{{ $t_c('清除未读') }}</div>
    </div>

    <div
      @click="openDialog(item)"
      :class="{ 'info-msg-inner': true, 'info-msg-inner-gray': item.isRead === 1 }"
      v-for="(item, index) in messageList"
      :key="index">
      <span
        :class="{
          'text-content': true,
          'text-content-text-gray': item.isRead === 1,
        }"
        v-html="item.textContent ? item.textContent.replace(/<.+?>/g, '') : ''"></span>
      <span
        :class="{
          'create-time': true,
          'text-content-text-gray': item.isRead === 1,
        }">
        {{ formatDate(item.createTime as string, 'YYYY-MM-DD HH:mm') }}
      </span>
    </div>

    <!-- 弹窗部分内容 -->
    <self-dialog
      :dialogTitle="$t_c('消息通知')"
      v-model:isShow="showDialog"
      :width="500"
      :hasSelfFooter="true"
      :showCancel="false"
      :showConfirm="false"
      class="self-dialog-body message-dialog">
      <div class="message-dialog-content">
        <div v-if="txtTime" class="unbing-time-div">
          {{ formatDate(txtTime, 'YYYY-MM-DD HH:mm') }}
        </div>
        <div class="unbing-div">{{ txtContent }}</div>
        <el-button class="unbing-btn-div" @click="_delMessage()">{{ $t_c('删除消息') }}</el-button>
      </div>
    </self-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useUserState } from '@/stores';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { formatDate } from 'utils/date';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import useProxy from '@/hook/useCurrentInstance';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';

const site = useSite();
const proxy = useProxy();
const emit = defineEmits(['triggerSelectClick']);
const { messageTip } = useDialog();
const userState = useUserState();

defineProps<{
  unReadCount: number;
  messageList: MsAPI.messageInfoList[];
}>();

const showDialog = ref(false);
const txtTime = ref('');
const txtContent = ref('');
const id = ref(0);

const openDialog = async (item: MsAPI.messageInfoList) => {
  showDialog.value = true;
  txtContent.value = (item.textContent as string).replace(/<.+?>/g, '');
  id.value = item.id as number;
  txtTime.value = item.createTime as string;
  if (item.isRead === 1) return;
  const res = await api.messageCenter.setMessageMbrRead({ id: item.id, setReadType: 0 });
  if (res.code === 0) {
    emit('triggerSelectClick', { type: 2, icon: 'inform', currentType: 'TypeTwo' });
  }
};
const clearBtnClick = async () => {
  proxy.$_dialog.show({
    isShow: true,
    content: lang(`是否将所有未读消息变成已读？`),
    dialogTitle: lang('清除消息'),
    clickCallback: () => {
      _clearUnRead();
    },
    isBtnLoading: true,
  });
};
const _clearUnRead = async () => {
  const firstRes = await api.messageCenter.setMessageMbrRead({ setReadType: 1 });
  if (firstRes.code) return;
  const secondRes = await api.user.getMessageUnread({ msgType: 2 });
  if (secondRes.code) return;
  userState.set_un_read_message_count(secondRes.count);
  emit('triggerSelectClick', {
    type: 2,
    icon: 'inform',
    currentType: 'TypeTwo',
  });
};
const _delMessage = async () => {
  try {
    const res = await api.messageCenter.deleteNotice({ id: id.value });
    if (res.code) return messageTip({ message: lang('删除失败 接口异常'), type: 'error' });
    messageTip({ message: lang('删除成功') });
    emit('triggerSelectClick', {
      type: 2,
      icon: 'inform',
      currentType: 'TypeTwo',
    });
    showDialog.value = false;
  } catch (error) {
    showDialog.value = false;
  }
};
</script>

<style lang="scss" scoped>
.info-msg-wrap {
  background: var(--u_msg_3);
  border-radius: 10px;
  padding: 23px 20px;
  max-height: 652px;
  font-size: 14px;
  .clear-div {
    @include flex();
    .info_msg_clear_btn {
      background: var(--u_msg_7);
      color: var(--u_msg_6);
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 20px;
    }
  }
  .info-msg-inner {
    @include flex();
    margin-bottom: 20px;
    cursor: pointer;
    height: 40px;
    .text-content {
      color: var(--u_msg_5);
      width: 590px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 15px;
      &.text-content-text-gray {
        color: var(--u_msg_4);
      }
    }
    .create-time {
      color: var(--u_msg_5);
      &.text-content-text-gray {
        color: var(--u_msg_4);
      }
    }
  }
}

.message-dialog {
  .el-dialog__body {
    .message-dialog-content {
      padding: 20px 20px 0 !important;
      .unbing-time-div {
        text-align: center;
        color: var(--u_msg_5);
        font-size: 16px;
      }
      .unbing-div {
        margin: 20px 0 30px;
        color: var(--u_msg_9);
        font-size: 16px;
        text-align: left;
      }
      .unbing-btn-div {
        width: 140px;
        height: 50px;
        border: 0;
        font-size: 16px;
        background: var(--u_msg_7);
        color: var(--u_msg_6);
        border-radius: 10px;
        margin: 0 auto;
      }
    }
  }
}

//- 2号模板差异
.info-msg-wrap {
  &.template_2_002 {
    .clear-div {
      color: var(--u_msg_1);
    }
    .info-msg-inner {
      height: 48px;
      background: #202837;
      border-radius: 10px;
      padding: 0 20px;
      line-height: 48px;
      margin-bottom: 4px;
      &.info-msg-inner-gray {
        background: #3d5477;
        span {
          color: #fff;
        }
      }
    }
    .message-dialog {
      .message-dialog-content {
        .unbing-time-div {
          color: #fff;
        }
        .unbing-div {
          color: #b1b7ca;
        }
        .unbing-btn-div {
          border: none !important;
        }
      }
    }
  }
}
</style>
