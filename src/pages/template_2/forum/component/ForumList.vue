<template>
  <div :class="['forum-list-container', site]">
    <div class="list-title">
      <div class="title-icon"></div>
      <span class="title-text">{{ currentTitle }}</span>
    </div>
    <div class="forum-item-wrapper">
      <div class="forum_list_item" v-for="(item, index) in renderList" :key="index">
        <div class="item-title-container">
          <div class="user-profile">
            <img :src="item.logo" class="user-icon" alt="" />
            <div class="user-name">{{ item.playerName }}</div>
          </div>
          <div class="forum-desc">
            <div class="time">
              {{ $filters.getPreviousTime(item.updateTime) }}
            </div>
            <div class="like-num" @click="goDownloadPage">
              <img :src="useImgPath('forum/like.png')" class="like-icon" alt="" />
              <span>{{ item.likeAmount }}</span>
            </div>
            <div class="rating-num" @click="goDownloadPage">
              <img class="rating-img" :src="useImgPath('forum/rating.png')" alt="" />
              <span>{{ item.commentAmount }}</span>
            </div>
          </div>
        </div>
        <div :class="['forum_item_container', globalState.language]" @click="$emit('goDetail', item)">
          <div class="content-main">
            <div class="content">
              {{ item.title || item.content }}
            </div>
            <div :class="['classify-tag', globalState.language]">
              <span>{{ item.type || $t_c('暂无') }}</span>
            </div>
          </div>
          <img :src="item.picture" class="user-send-img" alt="" />
        </div>
      </div>

      <PaginationComponent
        class="pagination-class"
        :pagination="paginationList"
        @change="handleCurrentChange"
        v-if="listTotal > 10" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath, useSite } from '@/hook/usePath';
import { computed, reactive, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import PaginationComponent from 'commonComponent/Pagination/index.vue';
// import { useGlobalState } from '@/stores';

const site = useSite();
const globalState = useGlobalState();
const props = defineProps<{
  forumList: forumAPI.listPostList[];
  currentTitle: string;
  classifyList: forumAPI.listCircleData[];
  pageNo: number;
  listTotal: number;
}>();

const router = useRouter();
const emits = defineEmits(['changePage']);
const handleCurrentChange = (page: { current: number; size: number }) => {
  emits('changePage', page.current);
};
const goDownloadPage = () => {
  router.push('/download');
};

const paginationList = reactive({
  currentPage: props.pageNo,
  pageSize: 10,
  total: props.listTotal,
});

const renderList: ComputedRef<forumAPI.listPostList[]> = computed(() => {
  const tempArr = JSON.parse(JSON.stringify(props.forumList));
  tempArr
    .sort(
      (a: forumAPI.listPostList, b: forumAPI.listPostList) =>
        new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
    )
    .forEach((item: forumAPI.listPostList) => {
      props.classifyList.forEach(classifyItem => {
        classifyItem.id === item.circle && (item.type = classifyItem.name);
      });
    });
  return tempArr;
});

const titleIcon = `url(${useImgPath('forum/list_title_icon.png')})`;
</script>

<style scoped lang="scss">
.forum-list-container {
  .list-title {
    @include flex(flex-start);
    margin-bottom: 20px;

    .title-icon {
      width: 25px;
      height: 25px;
      background-size: 100% 100%;
      margin-top: 4px;
      background-image: v-bind(titleIcon);
    }

    .title-text {
      color: var(--lt_6);
      font-weight: 500;
      font-size: 24px;
      margin-left: 9px;
    }
  }

  .forum-item-wrapper {
    background: var(--lt_7);
    border-radius: 16px;
    padding: 31px 30px;
    font-size: 14px;
    box-sizing: border-box;

    .forum_list_item {
      margin-bottom: 28px;
      cursor: pointer;

      .item-title-container {
        @include flex();

        .user-profile {
          @include flex(flex-start);

          .user-icon {
            width: 26px;
            border-radius: 50%;
            background: var(--lt_8);
          }

          .user-name {
            font-weight: bold;
            color: var(--lt_9);
            margin-left: 10px;
          }
        }

        .forum-desc {
          @include flex(flex-start);
          color: var(--lt_9);
        }

        .like-num,
        .rating-num {
          @include flex(flex-start);
        }

        .like-icon,
        .rating-img {
          height: 15px;
          margin-right: 5px;
        }

        .like-num {
          margin: 0 20px;
        }
      }
      .forum_item_container {
        border-radius: 8px;
        margin-top: 10px;
        padding-left: 20px;
        background-color: var(--lt_10);
        @include flex();
        .content-main {
          height: 100%;
          align-self: flex-start;
          padding-top: 12px;
          .content {
            color: var(--lt_9);
          }
          .classify-tag {
            height: 20px;
            color: var(--lt_26);
            font-size: 12px;
            @include flex(flex-start);
            margin: 14px 0;
            span {
              background: var(--lt_27);
              border-radius: 0px 10px 0 10px;
              padding: 3px 15px;
              min-width: 60px;
              text-align: center;
              box-sizing: border-box;
            }
          }
        }
        .user-send-img {
          max-width: 250px;
          max-height: 120px;
          flex-shrink: 0;
          margin-left: 20px;
          border-radius: 10px;
        }
      }
    }
  }
}

//-002
.forum-list-container {
  &.template_2_002 {
    .forum-desc {
      color: #878ea6 !important;
    }
    .classify-tag {
      color: #fff !important;
    }
  }
  //-003
  &.template_2_003 {
    .forum-item-wrapper {
      background: rgba(246, 248, 254, 0.4);
      border: 5px solid #ffffff;
      box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
      backdrop-filter: blur(7px);
      border-radius: 10px;
    }
  }
}
</style>
