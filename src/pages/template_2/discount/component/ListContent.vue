<template>
  <div :class="['discount-main', site]">
    <div
      class="discount-item-box animate__animated animate__fadeInRight"
      v-for="item in list"
      :key="item.id"
      @click="openDetail(item)"
      :class="{
        'out-date': +new Date(item.useEnd.split(' ')[0]) - Date.now() <= 0,
      }">
      <img class="discount-item-img" :src="item.pcLogoUrl + '?imageslim'" alt="" />
      <div class="mark">
        <img v-if="item.labelId" :src="useImgPath(`discount/mark_${item.labelId}.png`)" alt="" />
        <span
          :class="[
            'mark_text',
            globalState.language,
            globalState.language !== 'zh' && 'small_txt',
            'id_' + item.labelId,
          ]"
          >{{ getMarkName(item.labelId) }}</span
        >
      </div>
      <div class="notice-mark">
        <img class="watch" :src="useImgPath('discount/watch.png')" alt="" />
        {{ $filters.formatDiscountTime(item) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useGlobalState } from '@/stores';

const emits = defineEmits(['openDetail']);
const site = useSite();
const globalState = useGlobalState();

defineProps<{
  list: DiscountType.ActivityListResPageList[];
}>();

const openDetail = (item: DiscountType.ActivityListResPageList) => {
  emits('openDetail', item);
};

const getMarkName = (id: number) => {
  switch (id) {
    case 1:
      return lang('最新');
    case 2:
      return lang('每日');
    case 3:
      return lang('新人');
    case 4:
      return 'VIP';
    default:
      return '';
  }
};
</script>

<style scoped lang="scss">
.discount-main {
  @include flex(space-between, row, wrap, flex-start);
  width: 1060px;
  // background: var(--d_4);
  border-radius: 10px;
  // margin-left: 20px;
  padding: 20px;
  min-height: 500px;
  align-content: flex-start;

  .out-date {
    .notice-mark {
      filter: grayscale(100%);
    }

    &:last-child {
      margin-bottom: 0px;
    }
  }

  .discount-item-box {
    width: 500px;
    height: 245px;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;

    .discount-item-img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      box-shadow: var(--d_5);
    }

    .mark {
      width: 56px;
      height: 56px;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
      .mark_text {
        position: absolute;
        color: var(--d_13);
        position: absolute;
        left: 5px;
        top: 8px;
        transform: rotate(-45deg);
        &.small_txt {
          font-size: 12px;
          left: 2px;
          top: 16px;
        }
        &.vi {
          left: -10px;
          transform: rotate(-45deg) scale(0.8);
          white-space: nowrap;
        }
      }
    }

    .notice-mark {
      position: absolute;
      left: 0;
      bottom: 0;
      padding-right: 12px;
      height: 28px;
      @include flex(flex-start);
      font-size: 12px;
      padding-left: 10px;
      color: #fefefe;
      background: var(--d_6);
      border-radius: 16px 16px 16px 0px;
      border: 0.5px solid var(--d_7);
      box-shadow: var(--d_8);

      .watch {
        margin-right: 4px;
        width: 12px;
      }
    }
  }
}
</style>
