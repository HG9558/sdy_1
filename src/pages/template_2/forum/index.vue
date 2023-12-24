<template>
  <div :class="['forum-container', site]">
    <div class="forum-main">
      <div :class="['forum-nav-wrapper', globalState.language]">
        <div
          :class="['forum_nav_item', circle === item.circle && 'on', globalState.language]"
          v-for="(item, index) in classifyList"
          :key="index"
          @click="changeClassify(item, index)">
          <img
            class="nav-icon"
            :src="useImgPath(`forum/${item.type}${circle === item.circle ? '_on' : ''}.png`)"
            alt="" />
          <span class="text">{{ item.name }}</span>
        </div>
      </div>
      <!-- 评论列表组件 -->
      <forum-list
        v-if="forumList.length && !isShowDetail"
        :forumList="forumList"
        :currentTitle="classifyList[currentIndex].name"
        :classifyList="classifyList"
        :pageNo="pageNo"
        :listTotal="listTotal"
        @changePage="changePage"
        @goDetail="goDetail">
      </forum-list>
      <!-- 评论详情组件 -->
      <forum-detail
        v-model:isShowDetail="isShowDetail"
        v-else-if="isShowDetail"
        :contentDetail="contentDetail"
        :isLogin="userState.token">
      </forum-detail>

      <template v-else>
        <SelfLoading :showLoading="loading" />
        <img v-if="!loading" class="no-data-img" :src="useImgPath('base/no_data.png')" />
      </template>
    </div>
  </div>
</template>

<route>
 {
    meta: {bg: 'bg_3'}
  }
</route>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { api } from '@/api';
// import { useGlobalState, useUserState } from '@/stores';
import { useImgPath, useSite } from '@/hook/usePath';
import ForumList from './component/ForumList.vue';
import ForumDetail from './component/ForumDetail.vue';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import { lang } from '@/i18n';

const site = useSite();
const loading = ref<boolean>(false);
const userState = useUserState();
const circle = ref<number | null>(null);
const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const listTotal = ref<number>(0);
const forumList = reactive<forumAPI.listPostList[]>([]);
const isShowDetail = ref<boolean>(false);
const currentIndex = ref<number>(0);
const contentDetail = reactive<forumAPI.listPostList>({} as forumAPI.listPostList);
const globalState = useGlobalState();

const classifyList = reactive<forumAPI.listCircleData[]>([
  { type: 'football', name: lang('篮球圈'), matchType: '篮球圈' },
  { type: 'basketball', name: lang('足球圈'), matchType: '足球圈' },
  { type: 'guess', name: lang('竞猜圈'), matchType: '竞猜圈' },
  { type: 'gaming', name: lang('电竞圈'), matchType: '电竞圈' },
  { type: 'hodgepodge', name: lang('大杂烩'), matchType: '大杂烩' },
  { type: 'feedback', name: lang('意见反馈'), matchType: '意见反馈' },
]);

onMounted(() => init());

const init = async () => {
  loading.value = true;
  const res = await api.forum.listCircle({ terminal: 1 });
  if (res.code) return;
  const tempArr = classifyList.filter(item => {
    for (let reqItem of res.data) {
      if (reqItem.name === item.matchType) {
        item = Object.assign(item, reqItem, {
          isExit: true,
          circle: reqItem.id,
          name: item.name,
        });
        break;
      }
    }
    return item.isExit;
  });
  classifyList.length = 0;
  classifyList.push({ type: 'hot', name: lang('热门圈子'), circle: null, matchType: '热门圈子' }, ...tempArr);
  _getList();
};

const _getList = async () => {
  loading.value = true;
  const res = await api.forum[userState.token ? 'listPost' : 'listPostGuest']({
    circle: circle.value,
    listType: 0,
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  });
  loading.value = false;
  if (res.code) return;
  forumList.length = 0;
  forumList.push(...res.data.list);
  listTotal.value = res.data.totalCount;
};

//- 切换当前界面
const changePage = (_: number) => {
  pageNo.value = _;
  _getList();
};

//- 切换分类获取不同列表内容
const changeClassify = (item: forumAPI.listCircleData, index: number) => {
  isShowDetail.value = false;
  currentIndex.value = index;
  circle.value = item.circle as number | null;
  forumList.length = 0;
  listTotal.value = 0;
  pageNo.value = 1;
  _getList();
};

//- 跳转详情界面
const goDetail = (item: forumAPI.listPostList) => {
  _addReadAmount(item.id);
  isShowDetail.value = true;
  Object.assign(contentDetail, item);
};

//- 添加当前访问量
const _addReadAmount = async (postId: number) => {
  let res = await api.forum[userState.token ? 'PostRead' : 'PostReadGuest']({
    postId,
    terminal: 1,
  });
  if (res.code) return;
  _getList();
};
</script>

<style scoped lang="scss">
.forum-container {
  background-size: contain;
  min-height: 500px;

  .forum-main {
    width: 1280px;
    margin: 0 auto;
    padding: 30px 0;
    position: relative;

    .forum-nav-wrapper {
      @include flex(flex-start);
      background: var(--lt_1);
      box-shadow: var(--lt_2);
      border-radius: 10px;
      margin-bottom: 30px;
      height: 80px;

      .forum_nav_item {
        @include flex(center, column);
        width: 100px;
        height: 100%;
        cursor: pointer;
        font-size: 16px;
        &:not(.zh, .zh_tw) {
          width: auto;
          padding: 0 10px;
        }
        .nav-icon {
          width: 32px;
        }
        .text {
          color: var(--lt_3);
          margin-top: 2px;
        }
        &.on {
          background: var(--lt_4);
          border-radius: 8px;
          font-weight: 600;

          .text {
            color: var(--lt_5);
          }
        }
      }
    }
  }

  .no-data-img {
    display: block;
    margin: 0 auto;
    width: 600px;
  }
}
//-002
.forum-container {
  &.template_2_002 {
    .nav-item {
      &.on {
        .text {
          color: #fff !important;
        }
      }
      .text {
        color: #b1b7ca !important;
      }
    }
  }
  //- 003
  &.template_2_003 {
    .forum-nav-wrapper {
      background: rgba(246, 248, 254, 0.4);
      border: 3px solid #ffffff;
      box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
      backdrop-filter: blur(7px);
      .nav-item {
        &.on {
          height: 107%;
        }
      }
    }
  }
}
</style>
