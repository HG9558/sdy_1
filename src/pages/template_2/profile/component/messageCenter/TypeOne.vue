<template>
  <div :class="['chat-container', site]">
    <div class="info-chat-wrap">
      <div infinite-scroll-delay="500" ref="scroller" class="info-chat-inner">
        <div class="chat-item" v-for="(item, index) in formatList" :key="index">
          <div v-if="item.createTime" class="info-chat-time">
            {{ item.createTime.split(' ')[0] }}
          </div>
          <div v-show="item.isSign === 1" class="info-chat-left">
            <img
              class="avator"
              :src="useSiteImgPath(`logo/${envState.vite_current_site}/${envState.vite_theme}_logo_2.png`)" />
            <div class="triangle"></div>
            <span class="left-text" v-show="item.textContent" v-html="item.textContent"></span>
            <img class="image-url" v-show="item.imageUrl" :src="item.imageUrl" />
            <div class="read">{{ item.isRead === 1 ? $t_c('已读') : $t_c('未读') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, computed, onDeactivated } from 'vue';
import { useSite, useSiteImgPath } from '@/hook/usePath';
// import { useEnvState } from '@/stores';
const site = useSite();
const envState = useEnvState();

const props = withDefaults(
  defineProps<{
    messageList: MsAPI.messageInfoList[];
    unReadCount: number;
    pageLen: number;
    currentPage: number;
  }>(),
  {}
);

const isGetMore = ref(false);

watch(
  () => props.messageList,
  val => {
    if (val.length && !isGetMore.value) {
      nextTick(() => {
        // this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight;
      });
    }
  }
);

const formatList = computed(() => {
  let tempList = JSON.parse(JSON.stringify(props.messageList));
  if (tempList.length) {
    return tempList
      .reduce((prev: any, next: any, index: number) => {
        if (index && prev[prev.length - 1].createTime.split(' ')[0] === next.createTime.split(' ')[0]) {
          delete prev[prev.length - 1].createTime;
        }
        return prev.concat(next);
      }, [])
      .reverse();
  }
  return [];
});

// const load = () => {
//   if (props.pageLen === props.currentPage) return;
//   isGetMore.value = true;
//   emit('changeCurrentPage', props.currentPage + 1);
//   emit('triggerSelectClick', {
//     type: 1,
//     currentType: 'TypeOne',
//     noLoading: true,
//     getMore: true,
//   });
// };
onDeactivated(() => {
  isGetMore.value = false;
});
</script>

<style scoped lang="scss">
.chat-container {
  .info-chat-wrap {
    width: 100%;
    .info-chat-inner {
      height: 700px;
      background: var(--u_msg_3);
      padding: 30px 15px 20px;
      overflow: auto;
      border-radius: 10px;
      .chat-item {
        .info-chat-time {
          text-align: center;
          color: var(--u_msg_1);
        }
        .info-chat-left {
          margin: 21px 0;
          @include flex(flex-start);
          position: relative;
          .avator {
            display: inline-block;
            width: 44px;
            margin: 0 15px;
            vertical-align: top;
            margin-top: 5px;
          }
          .triangle {
            display: inline-block;
            width: 0;
            height: 0;
            border: 7px solid transparent;
            border-right-color: var(--u_msg_6);
            position: absolute;
            top: 13px;
            left: 60px;
          }
          .left-text {
            color: var(--u_msg_5);
            display: inline-block;
            max-width: 401px;
            background-color: var(--u_msg_6);
            font-size: 14px;
            padding: 8px;
            border-radius: 5px;
            word-break: break-all;
          }
          .image-url {
            width: 250px;
            height: 80px;
            vertical-align: middle;
            margin-right: 10px;
          }
          .read {
            position: relative;
            right: -20px;
            top: 0px;
            color: rgb(200, 200, 200);
            display: inline-block;
          }
        }
      }
      &::-webkit-scrollbar {
        width: 20px;
      }
    }
  }
}
</style>
