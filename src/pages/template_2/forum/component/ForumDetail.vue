<template>
  <div :class="['detail-container', site]">
    <div class="detail-nav-container">
      <span>{{ $t_c('当前位置') }}：</span>
      <span class="c-r" @click="changeShowDetailStatus">{{ $t_c('首页') }}></span>
      <span class="orange">{{ $t_c('社区') }}</span>
    </div>

    <div class="content-detail">
      <div class="content">{{ contentDetail.content }}</div>
      <div class="img-container" v-if="contentDetail.picture">
        <img :src="contentDetail.picture" alt="" />
      </div>
      <div class="content-desc-container">
        <div class="content-desc_left">
          <span>{{ $t_c('发布时间') }}：</span>
          <span>{{ $filters.getPreviousTime(contentDetail.createTime) }}</span>
          <span class="ml-30">{{ $t_c('浏览量') }}：{{ contentDetail.readAmount + 1 }}</span>
        </div>
        <div class="content-desc_right" @click="goDownloadPage">
          <div class="start">
            <img class="mr-5" width="12" :src="useImgPath('forum/star.png')" alt="" />
            <span>{{ contentDetail.collectAmount }}</span>
          </div>
          <div class="like">
            <img class="mr-5" width="12" :src="useImgPath('forum/like.png')" alt="" />
            <span>{{ contentDetail.likeAmount }}</span>
          </div>
          <div class="message">
            <img class="mr-5" width="12" :src="useImgPath('forum/callback.png')" alt="" />
            <span>{{ contentDetail.commentAmount }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-container">
      <div class="comment-title">
        {{ $t_c('热门评论') }}
      </div>
      <div v-if="recommendList.length" class="comment-list-container">
        <div class="comment-list" v-for="item in recommendList" :key="item.id">
          <div class="comment-content">
            <img class="avatar" :src="item.logo" alt="" />
            <div class="user-profile">
              <div class="profile-title">
                <span class="user-name">{{ item.playerName }}</span>
                <span class="time">{{ $filters.getPreviousTime(item.createTime) }}</span>
              </div>
              <span class="comment-text">{{ item.content }}</span>
            </div>
          </div>
          <div class="callback-message c-r" @click="goDownloadPage">
            {{ $t_c('回复') }}
            <img class="ml-5" width="11" :src="useImgPath('forum/callback.png')" alt="" />
          </div>
        </div>
      </div>
      <emptyVue v-else :img-width="300"></emptyVue>
    </div>

    <div class="pagination-container">
      <PaginationComponent
        class="pagination-class"
        :pagination="paginationList"
        @change="handleCurrentChange"
        v-show="totalCount > 10" />
    </div>
    <div class="download-app">
      <div class="comment-title" v-if="site !== 'template_2_001'">
        {{ $t_c('发表评论') }}
      </div>
      <div class="download_app_wrapper">
        <span :class="['download_btn', globalState.language]" @click="goDownloadPage">{{ $t_c('下载APP') }}</span>
        <span> {{ $t_c('回复') }}... </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useGlobalState, useUserState } from '@/stores';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import emptyVue from 'commonComponent/empty/empty.vue';
import PaginationComponent from 'commonComponent/Pagination/index.vue';

const globalState = useGlobalState();
const site = useSite();
const userState = useUserState();
const props = defineProps<{
  isShowDetail: boolean;
  contentDetail: forumAPI.listPostList;
}>();

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const totalCount = ref<number>(10);
const recommendList = reactive<forumAPI.listPostCommentGuestList[]>([]);
const emits = defineEmits(['update:isShowDetail']);
const router = useRouter();
const paginationList = reactive({
  currentPage: pageNo.value,
  pageSize: pageSize.value,
  total: totalCount,
});

onMounted(() => {
  _getRecommendList();
});

const changeShowDetailStatus = () => {
  emits('update:isShowDetail', false);
};

const _getRecommendList = async () => {
  const res = await api.forum[userState.token ? 'listPostComment' : 'listPostCommentGuest']({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    postId: props.contentDetail.id,
  });
  if (res.code) return;
  recommendList.length = 0;
  recommendList.push(...res.data.list);
  totalCount.value = res.data.totalCount;
};

const handleCurrentChange = ({ current = 1 }) => {
  pageNo.value = current;
  _getRecommendList();
};

const goDownloadPage = () => {
  router.push('/download');
};
</script>

<style scoped lang="scss">
.detail-container {
  width: 1280px;
  margin: 30px auto;

  .detail-nav-container {
    color: var(--lt_9);
    font-size: 12px;

    .orange {
      color: var(--lt_16);
    }
  }

  .content-detail {
    margin: 20px 0 0;
    background: var(--lt_14);
    border-radius: 16px 16px 0 0;
    padding: 22px;
    box-sizing: border-box;
    color: var(--lt_15);

    .content {
      font-size: 14px;
      line-height: 20px;
    }

    .img-container {
      margin: 10px 0 0;
      max-width: 1000px;

      img {
        max-width: 100%;
        width: 30px;
      }
    }

    .content-desc-container {
      margin-top: 50px;
      @include flex();
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--lt_23);
        bottom: -20px;
      }

      .content-desc_left {
        color: var(--lt_17);
      }

      .content-desc_right {
        @include flex();
        cursor: pointer;

        & > div {
          @include flex();
          color: var(--lt_22);
          font-size: 14px;

          &:nth-child(2) {
            margin: 0 10px;
          }
        }

        .star {
          @include flex();
        }
      }
    }
  }

  .comment-container {
    background-color: var(--lt_14);
    padding: 30px;

    .comment-list-container {
      .comment-list {
        @include flex();
        border-bottom: 1px solid var(--lt_23);
        box-sizing: border-box;
        padding: 16px 0;

        .comment-content {
          @include flex();

          .avatar {
            width: 65px;
            border-radius: 50%;
          }

          .user-profile {
            margin-left: 10px;
            font-size: 12px;

            .profile-title {
              @include flex(flex-start);
              margin-bottom: 15px;

              .user-name {
                color: var(--lt_15);
                font-size: 16px;
                font-weight: bold;
              }

              .time {
                color: var(--lt_20);
                margin-left: 10px;
              }
            }

            .comment-text {
              color: var(--lt_15);
              font-size: 14px;
            }
          }
        }

        .callback-message {
          font-size: 12px;
          color: var(--lt_21);
          @include flex();
          margin-right: 20px;
        }
      }
    }
  }

  .pagination-container {
    background-color: var(--lt_7);
    padding-right: 30px;
  }
  .comment-title {
    color: var(--lt_17);
    font-size: 14px;
    font-weight: 600;
    position: relative;
    margin-bottom: 16px;
    @include flex(flex-start);

    &:before {
      content: '';
      width: 3px;
      height: 14px;
      display: block;
      margin-right: 4px;
      background: var(--lt_18);
    }
  }
  .download-app {
    background: var(--lt_14);
    padding: 20px 0 40px;
    border-radius: 0 0 16px 16px;
    .download_app_wrapper {
      width: 1220px;
      height: 200px;
      border: 1px solid var(--lt_24);
      margin: auto;
      border-radius: 8px;
      padding: 20px 0 0 20px;
      .download_btn {
        &:not(.zh, .zh_tw) {
          margin-right: 5px;
        }
      }
    }
    span:first-child {
      color: var(--lt_16);
      cursor: pointer;
    }
    span:last-child {
      color: var(--lt_25);
    }
    .comment-title {
      margin-left: 30px;
    }
  }
}
.detail-container {
  //-002
  &.template_2_002 {
    .comment-title {
      color: #fff;
    }
    .download-app {
      .download_app_wrapper {
        border: none !important;
        background-color: #161e2b !important;
        span:first-child {
          color: #23a8ff;
        }
      }
      .comment-title {
        margin-left: 30px;
      }
    }
  }
  //-003
  &.template_2_003 {
    .content-detail {
      background: rgba(246, 248, 254, 0.4);
      border: 5px solid #ffffff;
      border-bottom: none;
      backdrop-filter: blur(7px);
    }
    .comment-container {
      background: rgba(246, 248, 254, 0.4);
      border: 5px solid #ffffff;
      backdrop-filter: blur(7px);
      border-top: none;
      border-bottom: none;
    }
    .pagination-container {
      background: rgba(246, 248, 254, 0.4);
      border: 5px solid #ffffff;
      backdrop-filter: blur(7px);
      border-top: none;
      border-bottom: none;
    }
    .download-app {
      background: rgba(246, 248, 254, 0.4);
      border: 5px solid #ffffff;
      backdrop-filter: blur(7px);
      border-top: none;
      .comment-title {
        margin-left: 30px;
      }
      .download_app_wrapper {
        background-color: #fff;
        border: none;
      }
    }
  }
}
</style>
