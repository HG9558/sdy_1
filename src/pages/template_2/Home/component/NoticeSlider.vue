<template>
  <div :class="['notice', site]">
    <img class="notice-icon" :src="useImgPath('home/other/notice_icon.png')" alt="" />
    <div class="notice-label">{{ $t_c('最新消息：') }}</div>
    <div class="notice-content" @click="openDialog($event)">
      <vue3-seamless-scroll
        v-if="newNoticeList.length"
        ref="seamlessScroll"
        class="notice_scroll_container"
        :hover="true"
        :list="newNoticeList"
        :step="0.5"
        direction="left"
        :limitScrollNum="1"
        :singleLine="true">
        <div class="notice-item" v-for="(item, index) in newNoticeList" :key="index">
          <span :id="item.id.toString()" class="notice-title">{{ item.noticeTitle }}:</span>
          <span :id="item.id.toString()" class="notice-text" v-html="item.noticeContent"></span>
        </div>
      </vue3-seamless-scroll>
      <div v-else>{{ $t_c('暂时还没有系统公告哦！') }}</div>
    </div>

    <self-dialog
      v-model:isShow="isShow"
      :dialogTitle="$t_c('消息公告')"
      :confirmTxt="$t_c('我知道了')"
      :showCancel="false"
      :append-to-body="true"
      customClass="home_notice_dialog"
      @confirmCallback="isShow = false">
      <div class="notice-dialog-cont">
        <img
          v-if="dialogContent.showType !== '0' && dialogContent.pcPath"
          class="notice-dialog-img"
          :src="dialogContent.pcPath" />
        <div :class="['dialog-notice-title', !(dialogContent.showType !== '0' && dialogContent.pcPath) && 'mt-15']">
          {{ dialogContent.noticeTitle }}
        </div>
        <div class="noticec-dialog-text" v-html="dialogContent.noticeContent"></div>
      </div>
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath, useSite } from '@/hook/usePath';
// import { useHomeState, useUserState } from '@/stores';
import { computed, onMounted, reactive, ref } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import { api } from '@/api';
import { lang } from '@/i18n';

const site = useSite();
const homeState = useHomeState();
const isShow = ref<boolean>(false);
const dialogContent = reactive({}) as HOMEAPI.HomeList;
const redMsgList = reactive<{ noticeTitle: string; noticeContent: string; id: number }[]>([]);
const userState = useUserState();

onMounted(() => {
  userState.token && _getRedRecordList();
});

const _getRedRecordList = async () => {
  const res = await api.redPacketRain.redEnvelopeRecord();
  if (res.code) return;
  res.data.newRedEnvelopeRewardDtoList.slice(0, 2).forEach((item, index) => {
    redMsgList.push({
      id: index - 1,
      noticeTitle: lang('红包雨'),
      noticeContent: `${lang('恭喜会员')} ${item.loginName.substring(0, item.loginName.length - 4)}***** ${lang(
        '在红包雨活动中抢到了'
      )} ${item.amount} ${lang('大红包')}`,
    });
  });
};

const openDialog = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.id) return;
  const item = homeState.noticeList.concat(redMsgList).find(obj => obj.id === +target.id);
  Object.keys(dialogContent).forEach(key => delete dialogContent[key as keyof typeof dialogContent]);
  Object.assign(dialogContent, item);
  dialogContent.noticeContent = dialogContent.noticeContent?.replace(/\n/g, '<br/>');
  isShow.value = true;
};
const newNoticeList = computed(() => {
  if (redMsgList.length) {
    return homeState.noticeList.filter(item => item.showType != 1).concat(redMsgList);
  } else {
    return homeState.noticeList.filter(item => item.showType != 1);
  }
});
</script>

<style lang="scss" scoped>
.notice {
  width: 1280px;
  height: 40px;
  overflow: hidden;
  @include flex();
  padding: 0 0 0 20px;
  margin: 20px auto;
  color: var(--home_7);
  background: var(--home_8);
  box-shadow: var(--home_9);
  border-radius: 20px;

  .notice-icon {
    padding-top: 4px;
    margin: -6px 15px 0;
    width: 16px;
  }

  .notice-label {
    white-space: nowrap;
  }

  .notice-content {
    padding-right: 35px;
    box-sizing: border-box;
    width: 100%;
    height: 18px;
    overflow: hidden;
    font-weight: 400;

    .notice-item {
      float: left;
      cursor: pointer;
      @include flex(flex-start);
      margin-right: 120px;
      text-align-last: left;
    }

    .notice-title {
      font-weight: 500;
      flex-shrink: 0;
    }

    .notice-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .notice-dialog {
    .notice-dialog-img {
      display: block;
      margin: 0 auto 5px;
      max-width: 500px;
    }

    .noticec-dialog-text {
      text-align: center;
      font-size: 20px;
      padding: 10px 0 0 0;
    }
  }
}
/* 二号皮肤 */

.notice.template_2_002 {
  box-shadow: none;
}

//003
.notice.template_2_003 {
  background: rgba(246, 248, 254, 0.4);
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
  backdrop-filter: blur(7px);
}
</style>
<style lang="scss">
.notice .notice_scroll_container {
  overflow: hidden;
}

.notice-content .notice_scroll_container > div {
  width: 29999px !important;
}

.notice-dialog .el-dialog__body {
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: var(--home_12);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--home_13);
  }
}

.notice-dialog {
  .notice-dialog-img {
    display: block;
    margin: 0 auto 5px;
    max-width: 100%;
    max-height: 400px;
  }

  .noticec-dialog-text {
    text-align: center;
    font-size: 20px;
    padding: 10px 0 0 0;
  }
}

.notice-dialog-cont {
  font-size: 16px;
  font-weight: 500;
  .dialog-notice-title {
    color: var(--home_10);
  }

  .noticec-dialog-text {
    text-align: center;
    color: var(--home_11);
    padding: 0 30px;
  }
}

.notice.template_2_003 {
  .notice-dialog-cont {
    background: rgba(246, 248, 254, 0.8);
    border: 3px solid #ffffff;
    box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
    border-bottom: none;
    backdrop-filter: blur(7px);
  }
}
</style>
