<template>
  <div :class="['info-msg-wrap',site]">
    <div @click="openDialog(item)" class="info-msg-inner" v-for="(item, index) in renderList" :key="index">
      <span class="text-content" v-text="(item.noticeContent as string).replace(/<.+?>/g, '')"></span>
      <span class="create-time">
        {{ formatDate((item.startTime as string), 'YYYY-MM-DD HH:mm') }}
      </span>
    </div>

    <self-dialog :dialogTitle="$t_c('公告')" v-model:isShow="isShowDialog" :width="500" :showCancel="false"
      :showConfirm="false" class="self-dialog-body message-dialog">
      <div class="message-dialog-content">
        <div class="unbing-div-center">
          {{ titleWord }}
        </div>
        <div class="unbing-div-content" v-html="txtContent">
        </div>
        <el-button class="unbing-btn-div" @click="(isShowDialog = false)">{{ $t_c('我知道了') }}</el-button>
      </div>
    </self-dialog>
  </div>

</template>
<script setup lang="ts">

import { computed, ref } from 'vue';
import { formatDate } from 'utils/date';
import selfDialog from 'commonComponent/Dialog/Dialog.vue'
import { useSite } from '@/hook/usePath';
const site = useSite()
const props = withDefaults(defineProps<{
  messageList: MsAPI.messageInfoList[];
}>(), {})

const isShowDialog = ref(false)
const txtContent = ref('')
const titleWord = ref('')
const txtTime = ref('')

const renderList = computed(() => {
  if (!props.messageList.length) return [];
  const tempList = [...props.messageList]
  return tempList.map((item) => {
    item.noticeContent = (item.noticeContent as string).replace(/\n/g, "<br>");
    item.isNotice = true;
    return item;
  });
})

const openDialog = (item: MsAPI.messageInfoList) => {
  isShowDialog.value = true;
  txtContent.value = item.noticeContent as string;
  titleWord.value = item.noticeTitle as string;
  txtTime.value = item.createTime as string;
};

</script>

<style lang="scss" scoped>
@import "../../css/TypeThree.scss"
</style>