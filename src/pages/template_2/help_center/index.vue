<template>
  <div :class="['help-center-box', site]">
    <div class="help-center-content">
      <div class="tabs">
        <div class="tabs_container">
          <div
            class="tab-item"
            v-for="(item, index) in tabsList"
            :key="index"
            :class="isActive == index ? 'active' : ''"
            @click="choseItem(index)">
            <div class="tab-item-inner">
              <img
                class="icon_img"
                :src="useImgPath(`game_help/icon_help${isActive == index ? '_active' : ''}.png`)"
                alt="" />
              <span class="help-category-name">{{ item.helpCategoryName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="help-center-view">
        <div class="title">{{ actItem.helpCategoryName }}</div>
        <div class="hitem">
          <div
            :class="['citem', currentContentIndex === i && 'on']"
            v-for="(_, i) in categoryDetail"
            @click="navClick(i, _.titleName)"
            :key="i">
            {{ _.titleName }}
          </div>
        </div>
        <div class="sub" v-if="Object.keys(contentData).length">
          <h3><i>·</i>{{ contentData.titleName }}</h3>
          <div class="ssub" v-for="(_i, ii) in contentData.oprHelpContentList" :key="ii">
            <h4>{{ ii + 1 }}、{{ _i.contentTitle }}</h4>
            <p v-html="_i.helpContent"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const isActive = ref<number>(0);
const tabsList = reactive<HelpCenterAPI.CategoryList[]>([]);
const categoryDetail = reactive<HelpCenterAPI.CategoryDetail[]>([]);
const currentContentIndex = ref<number>(0);
const router = useRouter();
const site = useSite();

onMounted(() => {
  getTabs();
});

const contentData = computed(() => {
  return categoryDetail[currentContentIndex.value] || {};
});

const getTabs = async () => {
  const res = await api.helpCenter.getHelpCategoryList();
  if (res.code) return;
  tabsList.push(...res.categoryList);
  getTabContent();
};

const getTabContent = async () => {
  const res = await api.helpCenter.findTitleAndContent({ id: actItem.value.id });
  if (res.code) return;
  categoryDetail.length = 0;
  if (res.categoryDetail) {
    categoryDetail.push(...res.categoryDetail);
  }
};

const actItem = computed(() => {
  return tabsList[isActive.value] || {};
});

const navClick = (i: number, title: string) => {
  if (title === 'USDT购买教程' || title === 'USDT存款教程' || title === 'USDT充值教程') {
    return router.push('/usdt_teach');
  }
  currentContentIndex.value = i;
};

const choseItem = (_: number) => {
  isActive.value = _;
  getTabContent();
};
</script>

<style lang="scss" scoped>
.help-center-box {
  width: 100%;
  padding: 50px 0 0px;
  .help-center-content {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    padding: 0px 0 45px;
    @include flex(space-between, row, nowrap, inherit);
    .tabs {
      width: 200px;
      background-color: var(--hp_1);
      box-shadow: var(--hp_2);
      border-radius: 10px;
      padding-top: 20px;
      .tabs_container {
        width: 100%;
        @include flex(space-around, row, wrap);
      }
      .tab-item {
        width: 50%;
        font-size: 14px;
        color: var(--hp_3);
        cursor: pointer;
        margin-bottom: 40px;
        .tab-item-inner {
          @include flex(flex-start, column);
          padding: 0 5px;
        }
        .icon_img {
          width: 48px;
          height: 48px;
          margin-bottom: 10px;
        }
        .help-category-name {
          flex-grow: 1;
          text-align: center;
          white-space: nowrap;
          max-width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .active {
        span {
          color: var(--hp_4);
        }
      }
    }
    .help-center-view {
      width: 1060px;
      background: var(--hp_1);
      border-radius: 10px;
      box-shadow: var(--hp_2);

      .title {
        height: 72px;
        @include flex(flex-start);
        border-bottom: 1px solid var(--hp_5);
        padding-left: 20px;
        font-size: 24px;
        color: var(--hp_6);
        font-weight: 500;
      }
    }
    .hitem {
      width: 1020px;
      margin: 20px auto;
      @include flex(flex-start, row, wrap);
      background-color: var(--hp_7);
      padding: 40px 40px 20px;
      align-items: flex-start;

      > div {
        padding: 0 20px;
        height: 50px;
        background-color: var(--hp_10);
        cursor: pointer;
        @include flex(center);
        box-shadow: var(--hp_11);
        border-radius: 4px;
        font-size: 12px;
        color: var(--hp_8);
        margin: 0 40px 20px 0;
      }
    }
    .sub {
      width: 1020px;
      margin: 20px auto 16px;
      background-color: var(--hp_7);
      padding: 20px;
      border-radius: 5px;
      &:first-child {
        padding-top: 20px;
      }
      h3,
      h4 {
        color: var(--hp_6);
        font-size: 20px;
        padding: 0 20px;
        line-height: 40px;
        box-sizing: border-box;
        font-weight: normal;
        font-weight: bold;
      }

      i {
        font-weight: bold;
        font-size: 20px;
        font-style: normal;
        display: inline-block;
        padding-right: 5px;
      }

      h4 {
        line-height: 30px;
        font-size: 15px;
        padding-left: 40px;
        font-weight: normal;
      }

      p {
        color: var(--hp_9);
        line-height: 26px;
        white-space: pre-wrap;
        padding-left: 65px;
        font-size: 14px;
      }
    }
  }
}
//-002
.help-center-box {
  &.template_2_002 {
    .citem {
      background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
      font-size: 14px !important;
      font-weight: bold;
    }
  }
  &.template_2_003 {
    .help-center-view {
      background: rgba(246, 248, 254, 0.4);
      border: 5px solid #ffffff;
      box-shadow: 0px 4px 35px rgba(115, 121, 134, 0.12);
      backdrop-filter: blur(7px);
      .hitem {
        border-radius: 10px;
        .citem {
          border: 1px solid #132743;
          &.on {
            background: #132743;
            box-shadow: 0px 4px 18px rgba(207, 212, 225, 0.54);
            border-radius: 4px;
            color: #ffffff;
          }
        }
      }
      h3 {
        position: relative;
        i {
          position: absolute;
          font-size: 50px;
          left: -8px;
        }
      }
    }
  }
}
</style>
