<template>
  <div :class="['banner-container', site]">
    <div class="banner_box_loading_img" v-if="!homeState.bannerList.length">
      <img class="banner_empty_bg" :src="useImgPath('home/default_banner.jpg')" alt="" />
      <img class="banner_logo" :src="useLogoPath(`logo_1_${globalState.language}.png`)" alt="" />
    </div>
    <el-carousel
      v-else
      height="460px"
      direction="vertical"
      :autoplay="true"
      indicator-position="outside"
      @change="onPicChange"
      ref="Carousel">
      <el-carousel-item v-for="item in homeState.bannerList" :key="item">
        <img class="bg-img" @click="goDetailPage(item)" :src="item.picPcPath" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="home_banner_controller_container">
      <template v-if="homeState.bannerList.length">
        <div
          :class="['item-list', currentIndex === index && 'on']"
          v-for="(item, index) in homeState.bannerList"
          :key="index"
          @mouseenter="changePicIndex(index)">
          <div class="small-img" :style="{ backgroundImage: `url(${item.picPcPath})` }"></div>
          <div class="txt">{{ item.title }}</div>
        </div>
      </template>
      <empty-container v-else :txt="$t_c('暂无数据')"></empty-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImgPath, useLogoPath, useSite } from '@/hook/usePath';
// import { useGlobalState, useHomeState, useNormalState } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const site = useSite();
const currentIndex = ref<number>(0);
const homeState = useHomeState();
const router = useRouter();
const normalState = useNormalState();
const Carousel = ref();
const globalState = useGlobalState();
const onPicChange = (_: number) => {
  currentIndex.value = _;
};

const changePicIndex = (_: number) => {
  Carousel.value.setActiveItem(_);
};

const goDetailPage = (item: HOMEAPI.Page) => {
  if (item.picTarget === 2) return;
  // picTarget 2 不跳转 1 外链 0 优惠详情 activityId 这个是否为null来判断 是否跳转详情，不为null跳转优惠分类
  if (item.picTarget === 1) {
    window.open(item.outStation);
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

const headerNavDotted = `url(${useImgPath('base/header_nav_dotted.gif')})`;
</script>

<style lang="scss" scoped>
.banner-container {
  @include flex();
  align-items: flex-start;

  .banner_box_loading_img {
    height: 460px;
    position: relative;
    .banner_empty_bg {
      width: 100%;
      height: 100%;
    }
    .banner_logo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 290px;
    }
  }

  .home_banner_controller_container {
    flex-grow: 1;
    background-color: var(--home_2);
    height: 460px;
    padding: 16px 16px 16px 0;
    @include flex(space-around, column);
    .item-list {
      width: 260px;
      height: 70px;
      background: var(--home_3);
      border-radius: 10px;
      box-shadow: var(--home_4);
      @include flex();
      border: 1px solid transparent;
      cursor: pointer;
      overflow: hidden;

      &.on {
        border: 1px solid var(--home_5);

        .txt {
          color: var(--home_5);
        }
      }

      .small-img {
        width: 70px;
        height: 70px;
        font-size: 0;
        background-size: cover;
        background-position: center;
        flex-shrink: 0;
      }

      .txt {
        flex-grow: 1;
        margin-left: 10px;
        font-weight: 500;
        font-size: 18px;
        color: var(--home_6);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .bg-img {
    width: 100%;
    min-height: 100%;
  }
  //- 动画效果
  &:deep() {
    .el-carousel__indicator--vertical {
      width: 30px !important;
      height: 30px !important;
      @include flex(center);
      &.is-active {
        border: none !important;
        background-image: v-bind(headerNavDotted);
        background-size: 100% 100%;
        .el-carousel__button {
          background-color: transparent !important;
        }
      }
    }
  }
}

//- 二皮肤版差异
.banner-container {
  &.template_2_002 {
    .item-list.on {
      .txt {
        color: #fff !important;
        transition: all 0.3s;
      }
    }
  }
}
//-003
.banner-container {
  &.template_2_003 {
    .item-list {
      border: 2px solid #ffffff;
      &.on {
        border-width: 2px;
      }
    }
  }
}
</style>
