<template>
  <self-dialog
    :dialogTitle="$t_c('消息栏')"
    v-model:isShow="showDialog"
    :width="800"
    :hasSelfFooter="true"
    :showCancel="false"
    :showConfirm="false"
    customClass="first-enter_dialog"
    class="self-dialog-body unbing-dialog">
    <div :class="['notice_dialog_main', site]">
      <el-tabs tab-position="left">
        <el-tab-pane :label="item.title" v-for="item in homeState.popUpList" :key="item.title">
          <div class="notice-content">
            <img :src="item.picPcPath" alt="" />
            <el-button
              v-if="item.outStation || item.activityId"
              @click="goTargetLink(item)"
              class="first_enter_detail_btn"
              type="default"
              >{{ $t_c('查看详情') }}</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane :label="item.noticeTitle" v-for="(item, index) in newNoticeList" :key="index">
          <div class="notice-content">
            <img v-if="item.pcPath" class="notice-img" :src="item.pcPath" alt="" />
            <div class="notice-detail" v-html="item.noticeContent"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </self-dialog>
</template>

<script setup lang="ts">
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import { computed } from 'vue';
// import { useHomeState, useNormalState } from '@/stores';
import { useRouter } from 'vue-router';
import { useSite } from '@/hook/usePath';
const homeState = useHomeState();
const normalState = useNormalState();
const { set_link_data } = normalState;
const router = useRouter();
const site = useSite();

const newNoticeList = computed(() => {
  let tempArr = JSON.parse(JSON.stringify(homeState.noticeList));
  tempArr.map(
    (item: HOMEAPI.HomeList) => (item.noticeContent = (item.noticeContent as string).replace(/\n/g, '<br/>'))
  );
  tempArr = tempArr.filter((item: HOMEAPI.HomeList) => item.showType != 0);
  return tempArr;
});

const showDialog = computed({
  get() {
    return (
      (!!newNoticeList.value.length && homeState.firstOpen) || (!!homeState.popUpList.length && homeState.firstOpen)
    );
  },
  set() {
    homeState.set_first_open(false);
  },
});

const goTargetLink = (item: any) => {
  if (item.activityId) {
    set_link_data({
      bannerLink: true,
      id: item.actId,
      activityId: item.activityId,
    });
    router.push('/discount');
  } else {
    window.open(item.outStation.startsWith('http') ? item.outStation : '//' + item.outStation);
  }
};
</script>

<style lang="scss">
.unbing-dialog {
  .el-dialog__title {
    font-size: 24px;
    font-weight: 700;
  }
  .el-dialog__body {
    padding: 0 !important;
    .notice_dialog_main {
      .el-tabs {
        .el-tabs__nav {
          width: 100%;
        }
        .el-tabs__header {
          padding-top: 20px;
          width: 210px;
          margin: 0;
          background: var(--home_14);
          .el-tabs__nav-wrap {
            overflow: unset;
            &::after {
              height: 1000px;
              background-color: transparent;
            }
          }
          .el-tabs__item {
            text-align: center;
            color: var(--home_15);
            justify-content: flex-start;
            &.is-active {
              background: var(--home_16);
              color: var(--home_17);
            }
          }
          .el-tabs__active-bar {
            display: none;
          }
        }
        .el-tabs__content {
          padding: 20px;
          .notice-content {
            font-size: 14px;
            color: var(--home_18);
            min-height: 350px;
            overflow: hidden auto;
            max-height: 550px;
            @include flex(flex-start, column, nowrap, flex-start);
            &::-webkit-scrollbar {
              width: 5px;
            }
            &::-webkit-scrollbar-thumb {
              background: var(--home_19);
            }
            .notice-title {
              text-align: center;
            }
            .notice-detail {
              margin-bottom: 15px;
              text-align: justify;
              padding: 10px 15px;
              width: 450px;
              color: var(--home_20);
              line-height: 24px;
            }
            img {
              width: 100%;
              cursor: pointer;
              margin-bottom: 5px;
            }
            .first_enter_detail_btn {
              margin-top: auto;
              align-self: center;
              width: 154px;
              height: 42px;
              background: var(--home_21);
              border-radius: 34px;
              color: var(--home_17);
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .el-dialog__footer {
    display: none;
  }
}
</style>
