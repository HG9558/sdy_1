<template>
  <div :class="['dialog-content-container', site]">
    <div class="discount-dialog_content">
      <img class="discount-dialog_content_img" :src="`${detailData.pcLogoUrl}?imageslim`" :alt="$t_c('图片加载失败')" />
    </div>
    <div class="dialog-content" v-html="detailData.content"></div>
    <div
      v-if="token && btnType"
      class="discount-dialog_content_btn"
      :class="{ finished: btnType === '已结束' }"
      @click="btnClick">
      <div class="btn-inner">{{ btnType }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useDialog from '@/hook/useDialog';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const site = useSite();
onMounted(() => {
  document
    .querySelectorAll('.dialog-content img')
    .forEach(item => ((item as HTMLImageElement).style.maxWidth = '100%'));
});

const { messageTip } = useDialog();
const router = useRouter();

const props = defineProps<{
  detailData: DiscountType.ActivityListResPageList;
  token: string;
}>();

const btnClick = () => {
  if (props.detailData.catId === 40) {
    return router.replace('/luckActivity');
  }
  if (btnType.value === '已结束') {
    messageTip({ message: lang('活动已结束'), duration: 1000 });
    return;
  }
  router.push(`/profile/coupons?id=${props.detailData.id}`);
};

// const goCj = () => {
//   window.localStorage.setItem('cjContent', props.detailData.content || '');
//   router.push(`/luckActivity`);
// };

const btnType = computed(() => {
  if (props.detailData.catId === 40) {
    return lang('抽奖活动');
  }
  if (props.detailData.tmplCode === 'AQ0000025') return '';

  switch (props.detailData.buttonShow) {
    case 0:
      return lang('已结束');
    case 1:
    case 2:
      return lang('立即领取');
    case 3:
      return lang('已领取');
    default:
      return '';
  }
});
</script>

<style lang="scss" scoped>
.dialog-content-container {
  max-height: 75vh;
  overflow-y: auto;
  font-size: 14px;
  padding-bottom: 80px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px; //滚动条的宽度设置
    height: 13px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--d_9);
    background-clip: padding-box;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    min-height: 28px;
  }

  .discount-dialog_content_btn {
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    margin: auto;
    @include flex(center);
    padding: 20px 0 30px;
    cursor: pointer;

    &.finished {
      filter: grayscale(100%);
    }

    .btn-inner {
      // width: 160px;
      padding: 0 10px;
      height: 48px;
      line-height: 48px;
      background: var(--d_10);
      border-radius: 8px;
      color: var(--d_11);
      font-size: 18px;
      text-align: center;
      cursor: pointer;
    }
  }
}

.discount-dialog_content {
  position: relative;
  overflow: hidden;
  width: 100%;

  .discount-dialog_content_img {
    width: 100%;
    height: 359px;
  }
}

.dialog-content {
  padding: 20px;
  color: var(--d_12);
  font-weight: 500;
}

//- 002
.dialog-content-container {
  &.template_2_002 {
    .finished {
      filter: none;
      .btn-inner {
        background: #3d5477;
      }
    }
  }
}
//- 003
.dialog-content-container {
  &.template_2_003 {
    .discount-dialog_content {
      background: rgba(246, 248, 254, 0.8);
      box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
      backdrop-filter: blur(7px);
    }
  }
}
</style>

<style lang="scss">
.dialog-content {
  img {
    max-width: 100%;
  }
}
</style>
