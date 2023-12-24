<template>
  <div :class="['message-wrapper', site]">
    <div class="nav-item-container">
      <div
        :class="{ 'nav-item': true, on: componentName.name === item.name }"
        v-for="item in tabList"
        :key="item.icon"
        @click="selectClick(item)">
        <div
          :class="[
            'nav-item-content',
            userState.unMessageCount && item.currentType === 'TypeTwo' && 'un-read-count',
            globalState.language,
          ]">
          <img
            class="icon"
            :src="useImgPath(`profile/${item.icon}${currentType === item.currentType ? '_active' : ''}.png`)"
            alt="" />
          <span class="vertical-line">|</span>
          <span :class="['tab-name', globalState.language]">{{ $t_c(item.val) }}</span>
        </div>
      </div>
    </div>
    <div class="message_main_container">
      <!-- 各个组件相关 -->
      <keep-alive>
        <component
          :is="componentName.name"
          :messageList="messageList"
          @triggerSelectClick="selectClick"
          :pageLen="pageLen"
          :currentPage="reqData.pageNo"
          @changeCurrentPage="changeCurrentPage"
          :unReadCount.sync="userState.unMessageCount"></component>
      </keep-alive>

      <!-- 弹窗组件 -->
      <SelfLoading class="message-load" :showLoading="showLoading" />

      <!-- 没有数据 -->
      <div class="no-data-img" v-if="pageTotal === 0 && !showLoading">
        <emptyVue :imgWidth="300"></emptyVue>
        <div>{{ $t_c('暂无数据') }}</div>
      </div>

      <!-- 分页使用 -->
      <PaginationComponent
        class="pagination-class"
        v-if="componentName.name !== markRaw(componentMap.TypeOne) && pageTotal !== 0"
        :pagination="paginationList"
        @change="switchNextList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed, defineAsyncComponent, markRaw } from 'vue';
import { api } from '@/api';
// import { useGlobalState, useUserState } from '@/stores';
import { useImgPath, useSite } from '@/hook/usePath';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import emptyVue from 'commonComponent/empty/empty.vue';
import PaginationComponent from 'commonComponent/Pagination/index.vue';
import { lang } from '@/i18n';

interface selectType {
  val: string;
  type: number;
  icon: string;
  currentType: string;
  name: any;
  unReadCount?: number;
  getMore?: any;
  noLoading?: any;
}

const site = useSite();
const componentMap = {
  TypeOne: defineAsyncComponent(() => import('./component/messageCenter/TypeOne.vue')),
  TypeTwo: defineAsyncComponent(() => import('./component/messageCenter/TypeTwo.vue')),
  TypeThree: defineAsyncComponent(() => import('./component/messageCenter/TypeThree.vue')),
};
const userState = useUserState();
const tabList = ref<selectType[]>([
  { val: lang('收件箱'), type: 1, icon: 'message', currentType: 'TypeOne', name: markRaw(componentMap.TypeOne) },
  { val: lang('通知'), type: 2, icon: 'message_inform', currentType: 'TypeTwo', name: markRaw(componentMap.TypeTwo) },
  {
    val: lang('公告'),
    type: 0,
    icon: 'message_notice',
    currentType: 'TypeThree',
    name: markRaw(componentMap.TypeThree),
  },
]);

const componentName = reactive<HeaderType.curType>({
  name: markRaw(componentMap.TypeOne),
});

const showLoading = ref(false);
const messageList = ref([] as MsAPI.messageInfoList[]);
const pageTotal = ref(0);
const pageLen = ref(0);
const currentType = ref('TypeOne');
const globalState = useGlobalState();
const reqData = reactive({
  key: '',
  pageNo: 1,
  pageSize: 10,
  msgType: 1,
  isRead: 0,
  mbrIsRead: 0,
});

onMounted(() => {
  getAllUnReadCount();
  _initMessageData();
});

const paginationList = computed(() => {
  return {
    currentPage: reqData.pageNo,
    pageSize: reqData.pageSize,
    total: pageTotal.value,
  };
});

const getUnReadApi = (msgType: number) => {
  return api.user.getMessageUnread({
    msgType,
  });
};
const getAllUnReadCount = async () => {
  let arr = [];
  for (let item of tabList.value) {
    if (item.type !== 0) {
      let res = await getUnReadApi(item.type);
      item['unReadCount'] = res.count;
    }
    arr.push(item);
  }
  tabList.value = arr;
};
const _getUnReadCount = async () => {
  const res = await getUnReadApi(reqData.msgType);
  if (res.code) return;
  userState.set_un_read_message_count(res.count);
};
//- 获取1，2数据
const _initMessageData = async <T, U>(noLoading?: T, getMore?: U) => {
  showLoading.value = noLoading ? false : true;
  try {
    const res = await api.messageCenter.getMessageInfoList(reqData);
    showLoading.value = false;
    if (res.code) return;
    getMore
      ? (messageList.value.push(...res.data.list) as MsAPI.messageInfoList)
      : (messageList.value = res.data.list as MsAPI.messageInfoList[]);
    pageTotal.value = res.data.totalCount;
    pageLen.value = res.data.totalPage;
  } catch (error) {
    getMore && reqData.pageNo--;
    showLoading.value = false;
  }
};
// 切换标题
const selectClick = (item: selectType) => {
  if (!item.name) {
    if (item.currentType === 'TypeTwo') {
      componentName.name = markRaw(componentMap.TypeTwo);
    }
  } else {
    componentName.name = item.name;
  }
  currentType.value = item.currentType;
  pageTotal.value = 0;
  reqData.msgType = item.type;
  !item.getMore && (reqData.pageNo = 1);
  item.type !== 1 && (messageList.value = []);

  switch (item.type) {
    case 0:
      return _getNoticeData();
    case 2:
      reqData.isRead = 1;
      _getUnReadCount();
      getAllUnReadCount();
      break;
    case 1:
      reqData.isRead = 0;
      break;
  }
  _initMessageData(item.noLoading, item.getMore);
};

const _getNoticeData = async () => {
  showLoading.value = true;
  try {
    const res = await api.messageCenter.getNoticeList({
      pageSize: reqData.pageSize,
      pageNo: reqData.pageNo,
      showType: 2,
    });
    showLoading.value = false;
    if (res.code) return;
    messageList.value = res.page.list;
    pageTotal.value = res.page.totalCount;
  } catch (error) {
    showLoading.value = false;
  }
};

const changeCurrentPage = (currentPage: number) => {
  reqData.pageNo = currentPage;
};

const switchNextList = (data: { current: number; size: number }) => {
  if (reqData.pageNo === data.current) return;
  reqData.pageNo = data.current;
  if (componentName.name === markRaw(componentMap.TypeThree)) {
    _getNoticeData();
    return;
  }
  _initMessageData();
};
</script>

<style scoped lang="scss">
.message-wrapper {
  background: var(--u_msg_6);
  min-height: 690px;
  .nav-item-container {
    @include flex();
    padding-top: 28px;
    .nav-item {
      cursor: pointer;
      .nav-item-content {
        width: 230px;
        height: 40px;
        @include flex(center);
        color: var(--u_msg_1);
        &.un-read-count {
          position: relative;
          &:not(.zh, .zh_tw) {
            &:after {
              right: 25px;
            }
          }
          .tab-name {
            position: relative;
            &:after {
              position: absolute;
              content: '';
              background: var(--u_msg_7);
              width: 10px;
              height: 10px;
              right: -15px;
              top: 50%;
              transform: translateY(-50%);
              border-radius: 50%;
            }
          }
        }
        .icon {
          transform: scale(0.5);
        }
        .vertical-line {
          margin-right: 8px;
          margin-bottom: 4px;
        }
      }
      &.on {
        position: relative;
        .nav-item-content {
          color: var(--u_msg_2);
        }
        &:after {
          display: flex;
          content: '';
          width: 96px;
          height: 3px;
          position: absolute;
          bottom: 0;
          left: 52%;
          transform: translateX(-50%);
          border-radius: 6px 6px 0 0;
          background: var(--u_msg_7);
        }
      }
    }
  }
  .message_main_container {
    padding: 0px 20px;
    box-sizing: border-box;
    position: relative;
    background: var(--u_msg_3);
    border-radius: 10px;
    padding-bottom: 10px;
    height: 700px;
    margin: 0 20px;
    .no-data-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--u_msg_1);
      @include flex(center, column);
    }
    .message-load {
      position: absolute;
      margin-top: 0px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-height: auto;
    }
  }
}

//-2号模板差异
.message-wrapper {
  &.template_2_002 {
    .nav-item-container {
      .nav-item {
        &.on {
          .nav-item-content {
            @include text_clip(linear-gradient(135deg, #33d6fc 0%, #127dfe 100%), 500);
            .tab-name {
              @include text_clip(linear-gradient(135deg, #33d6fc 0%, #127dfe 100%), 500);
            }
          }
          &:after {
            background: linear-gradient(135deg, #33d6fc 0%, #127dfe 100%);
          }
        }
      }
    }
    .no-data-img {
      color: var(--u_msg_9);
    }
  }
  &.template_2_003 {
    background: rgba(246, 248, 254, 0.4);
  }
}
</style>
