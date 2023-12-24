<template>
  <div :class="['discount-wrapper', site]">
    <div class="discount-banner" v-if="!bannerlist.length">
      <img class="banner_logo" :src="useLogoPath(`logo_1_${globalState.language}.png`)" alt="" />
    </div>
    <el-carousel v-else arrow="never" class="discount-banner" indicator-position="none" autoplay="false">
      <el-carousel-item v-for="(_, i) in bannerlist" :key="i" height="598px">
        <img class="banner_img" @click="goDetailPage(_)" :src="_.picPcPath" />
      </el-carousel-item>
    </el-carousel>

    <div class="discount-content">
      <el-tabs
        :class="['discount-tabs', globalState.language]"
        v-model="activeName"
        tab-position="left"
        @tab-click="changeType">
        <el-tab-pane
          v-for="(item, index) in Object.values(discountState.discountData)"
          :name="item.catName"
          :key="item.id">
          <template #label>
            <div class="icon-catName" slot="label" v-if="item.disable === '1'">
              <img
                class="icon"
                :src="useImgPath(`discount/icon_${index + 1}${activeName === item.catName ? `_active` : ''}.png`)"
                @error="$event => useErrorPath(`discount/icon_12${activeName === item.catName ? `_active` : ''}.png`, $event)"
              />
              <span :class="['cat-name', activeName === item.catName && 'on']"> {{ item.catName }} </span>
            </div>
          </template>
          <list-content
            @openDetail="openDetail"
            :list="discountState.discountData[activeName]?.list ?? []"></list-content>
        </el-tab-pane>
      </el-tabs>

      <div class="no-data" v-show="shwoNodata">
        <img class="no-data-img" :src="useImgPath('base/no_data.png')" alt="" />
      </div>
      <SelfLoading :showLoading="showLoading" :className="'discount'" />
    </div>
    <!-- !- 红包雨 根据条件进行展示-->
    <!-- <RedEnvelopeEntrance /> -->
    <self-dialog
      :dialogTitle="$t_c('优惠详情')"
      v-model:isShow="showDialog"
      :width="700"
      :hasSelfFooter="true"
      :showCancel="false"
      :showConfirm="false"
      customClass="discount"
      class="self-dialog-body">
      <discount-detail-dialog ref="dialog" :token="userState.token" :detailData="detailData"></discount-detail-dialog>
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
// import RedEnvelopeEntrance from 'commonComponent/RedEnvelopeEntrance/RedEnvelopeEntrance.vue';
import ListContent from './component/ListContent.vue';
import DiscountDetailDialog from './component/DiscountDetailDialog.vue';
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
// import { useNormalState, useDiscountState, useUserState, useGlobalState } from '@/stores';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import type { TabsPaneContext } from 'element-plus';
import { useRouter } from 'vue-router';
import { useImgPath, useErrorPath, useLogoPath, useSite } from '@/hook/usePath';

const site = useSite();
const normalState = useNormalState();
const discountState = useDiscountState();
const userState = useUserState();
const shwoNodata = ref<boolean>(false);
const showLoading = ref<boolean>(false);
const showDialog = ref<boolean>(false);
const { messageTip } = useDialog();
const bannerlist = reactive<DiscountType.bannerType[]>([]);
const detailData = reactive<DiscountType.ActivityListResPageList>({} as DiscountType.ActivityListResPageList);
const router = useRouter();
const globalState = useGlobalState();

const activeName = computed({
  get() {
    return (
      (discountState.discountData[normalState.discountType] && normalState.discountType) ||
      Object.keys(discountState.discountData)[0]
    );
  },
  set() {},
});

const _getDataList = async () => {
  shwoNodata.value = false;
  try {
    showLoading.value = !discountState.discountData[activeName.value].list.length;
    const requestMethods = userState.token ? api.discount.getDiscountDataList : api.discount.getNoTokenDiscountDataList;
    const res = await requestMethods(discountState.discountData[activeName.value].id);
    if (res.code) return messageTip({ message: res.msg, duration: 1000 });

    res.data.youhuiBanners.length && bannerlist.push(...res.data.youhuiBanners);
    const tempObj = JSON.parse(JSON.stringify(discountState.discountData));
    Object.keys(tempObj).forEach(key => {
      if (tempObj[key].id === discountState.discountData[activeName.value].id) {
        tempObj[key].list = res.page.list;
      }
    });
    discountState.set_discount_data(tempObj);
    shwoNodata.value = !discountState.discountData[activeName.value].list.length;
    showLoading.value = false;
    if (normalState.linkData.activityId) {
      const targetItem = discountState.discountData[activeName.value].list.find(
        item => item.id == normalState.linkData.activityId
      );
      targetItem && openDetail(targetItem);
      normalState.set_link_data({} as HOMEAPI.linkDataType);
    }
  } catch (error) {
    console.log('102行打印：============:', error);
    showLoading.value && (showLoading.value = false);
    shwoNodata.value = false;
  }
};

onMounted(() => {
  if (Object.keys(discountState.discountData).length) {
    !discountState.discountData[normalState.discountType] &&
      normalState.set_discount_type(Object.keys(discountState.discountData)[0]);
    _getDataList();
  } else {
    _getDiscountTypeList();
  }
});

watch(
  () => normalState.linkData,
  obj => {
    if (obj.bannerLink) {
      if (Object.keys(discountState.discountData).length) {
        const key = Object.values(discountState.discountData).find(item => {
          return item.id === obj.id;
        })?.catName;
        key && normalState.set_discount_type(key);
        _getDataList();
      } else {
        _getDiscountTypeList();
      }
    }
  },
  { immediate: true }
);

watch(
  () => normalState.scrollTop,
  (_: number) => {
    nextTick(() => {
      if (!_) return;
      document.documentElement.scrollTop = _;
      normalState.set_scroll_top(0);
    });
  },
  { immediate: true }
);

const _getDiscountTypeList = async () => {
  const res = await api.discount.getDiscountTypeList();
  if (res.code) return;
  const tempObj = JSON.parse(JSON.stringify(discountState.discountData));
  res.page.forEach(item => {
    item.catName.includes('全部') && (item.catName = '全部优惠');
    !tempObj[item.catName] && (tempObj[item.catName] = { ...item, list: [] });
  });
  discountState.set_discount_data(tempObj);
  _getDataList();
};

const openDetail = (item: DiscountType.ActivityListResPageList) => {
  Object.assign(detailData, item);
  showDialog.value = true;
};

const changeType = (pane: TabsPaneContext) => {
  if (normalState.discountType === pane.paneName) return;
  normalState.set_discount_type(pane.paneName as string);
  _getDataList();
};

const goDetailPage = (item: DiscountType.bannerType) => {
  if (item.picTarget === 2) return;
  // picTarget 2 不跳转 1 外链 0 优惠详情 activityId 这个是否为null来判断 是否跳转详情，不为null跳转优惠分类
  if (item.picTarget === 1) {
    window.open(item.outStation.startsWith('http') ? item.outStation : 'https://' + item.outStation);
  } else {
    router.push('/discount');
    if (!item.activityId) {
      normalState.set_link_data({ bannerLink: true });
    } else {
      normalState.set_link_data({
        bannerLink: true,
        id: item.actId,
        activityId: item.activityId,
      });
    }
  }
};

onBeforeUnmount(() => {
  normalState.set_link_data({} as HOMEAPI.linkDataType);
  normalState.set_discount_type('');
  normalState.set_scroll_top(0);
});

const bannerListImg = `url(${useImgPath('home/default_banner.jpg')})`;
</script>

<style lang="scss" scoped>
.discount-wrapper {
  width: 100%;
  .discount-banner {
    width: 100%;
    height: 598px;
    background: v-bind(bannerListImg) no-repeat center center;
    background-size: cover;
    @include flex(center);
    &:deep(.el-carousel__container) {
      height: 598px;
      width: 100%;
    }

    .banner_logo {
      width: 290px;
    }

    .banner_img {
      height: 598px;
      width: 1920px;
      position: relative;
      left: 50%;
      margin-left: -960px;
      cursor: pointer;
    }
  }

  .discount-content {
    width: 1300px;
    height: 100%;
    margin: 0 auto;
    padding: 37px 0 45px;
    position: relative;

    .discount-tabs {
      display: flex;
      &.vi {
        :deep() {
          .el-tabs__nav {
            padding: 20px 10px !important;
          }
          .el-tabs__item {
            justify-content: center;
            text-align: center;
          }
          .cat-name {
            font-size: 12px !important;
            min-height: 40px;
          }
        }
      }
      &:deep(.el-tabs__header) {
        padding-top: 20px;
        background: var(--d_1);
        border-radius: 8px;
        width: 200px;
        .el-tabs__nav-wrap::after,
        .el-tabs__active-bar {
          display: none;
        }

        .el-tabs__nav {
          @include flex(flex-start, row, wrap, flex-start);
          padding: 0 20px;
        }

        .el-tabs__item {
          width: 50%;
          font-size: 14px;
          color: var(--d_2);
          flex-shrink: 0;
          padding: 0;
          margin-bottom: 40px;
          height: auto;

          &.is-active {
            .cat-name {
              color: var(--d_3);
            }
          }
        }

        .icon-catName {
          @include flex(flex-start, column);
          width: 80px;

          .icon {
            width: 56px;
            height: 56px;
          }

          .cat-name {
            // width: 80px;
            white-space: break-spaces;

            text-align: center;
            // overflow: hidden;
            // text-overflow: ellipsis;
            line-height: 20px;
          }

          .right-arrow {
            width: 17px;
          }

          .icon,
          .right-arrow {
            flex-shrink: 0;
          }
        }
      }
      :deep(.el-tabs__content) {
        background-color: var(--d_14);
        margin-left: 20px;
        border-radius: 10px;
      }
    }

    .no-data {
      @include flex(center, column);
      text-align: center;
      position: absolute;
      top: 44.5%;
      transform: translateY(-50%);
      width: calc(100% - 200px);
      left: 220px;
      border-radius: 10px;
      .no-data-img {
        width: 500px;
      }
      .load {
        width: 400px;
      }
    }
  }
}

.discount-wrapper {
  //- 002
  &.template_2_002 {
    .cat-name {
      margin-top: 5px;
    }
    .icon-catName .icon {
      width: 48px !important;
      height: 48px !important;
    }
  }
  //003
  &.template_2_003 {
    :deep(.el-dialog__body) {
      background: rgba(246, 248, 254, 0.8) !important;
      border: 3px solid #ffffff;
      box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
      backdrop-filter: blur(7px);
      padding: 0;
      .dialog-content {
        background: transparent !important;
        border: none;
        box-shadow: none;
        backdrop-filter: blur(0px);
      }
    }
    :deep(.el-tabs__header) {
      position: relative;
      background-color: transparent !important;
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(246, 248, 254, 0.4);
        box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
        backdrop-filter: blur(40.5px);
        border-radius: 10px;
      }
    }
  }
}
</style>
