<template>
  <div :class="['special-wrapper', site]">
    <div class="special-container">
      <div class="special-content">
        <div class="special-txt">
          <div class="special-txt_title">
            {{ renderData.zh_txt }}
          </div>
          <div v-if="globalState.language === 'zh'" :class="['special-txt_en', globalState.language]">
            {{ renderData?.en_txt }}
          </div>
          <div :class="['special-txt_sentence', globalState.language]">
            {{ renderData.sloginsData }}
          </div>
        </div>

        <div class="spacer-container">
          <slot name="spacer"></slot>
        </div>
        <div class="special-entry" @click="enterGame">
          {{ $t_c('进入游戏') }}
        </div>
        <div class="special-btns">
          <div
            class="special-btns-item"
            v-for="(item, index) in renderList"
            :key="item.id"
            @click="changeSelectIndex(index)">
            <img
              class="icon"
              :src="
                useImgPath(
                  `special/icon_${
                    currentSelectIndex === index
                      ? item.depotCode.toLowerCase() + '_active'
                      : item.depotCode.toLowerCase()
                  }.png`
                )
              "
              @error="($event: Event) => useErrorPath(`special/icon_default.png`, $event)" />
            <div :class="['title', currentSelectIndex === index && 'on']">
              {{ item[`${globalState.language}_txt`] }}
            </div>
            <GameStatusIcon :isTry="item.isTry" :availableWh="item.availableWh" iconType="_game" :hasIcon="false">
            </GameStatusIcon>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useErrorPath, useImgPath, useSite } from '@/hook/usePath';
// import { useGlobalState } from '@/stores';
import GameStatusIcon from '@/components/template_2/GameStatusIcon/GameStatusIcon.vue';

const emits = defineEmits(['update:currentSelectIndex', 'enterGame']);
const site = useSite();
const globalState = useGlobalState();
const props = defineProps<{
  currentSelectIndex: number;
  renderList: any[];
}>();

const changeSelectIndex = (index: number) => {
  emits('update:currentSelectIndex', index);
};
const enterGame = () => {
  emits('enterGame', renderData.value);
};
const renderData = computed(() => props.renderList[props.currentSelectIndex]);

const enterBtn = `url(${useImgPath('special/common_entry_button.png')})`;
</script>

<style lang="scss" scoped>
@import '../../../assets/style/fonts/font.scss';

.special-wrapper {
  position: relative;
  width: 100%;
  height: 780px;
  background-repeat: no-repeat;
  overflow: hidden;

  .special-container {
    box-sizing: border-box;
    padding: 0px 15px 0 25px;
    margin: 0 auto;
    @include flex(space-between, row, nowrap, flex-start);
    .special-content {
      padding: 60px 40px 0 0;
      min-height: 230px;
      .special-txt {
        min-height: 200px;
        .special-txt_title {
          color: var(--g_1);
          font-weight: 700;
          font-size: 75px;
          font-family: hy;
          white-space: nowrap;
        }
        .special-txt_en {
          font-weight: 600;
          font-size: 33px;
          color: var(--g_2);
          &:not(.zh, .zh_tw) {
            margin-top: 10px;
          }
        }
        .special-txt_sentence {
          width: 520px;
          line-height: 20px;
          color: var(--g_1);
          margin-top: 20px;
          font-weight: 500;
          font-size: 14px;
          min-height: 80px;
        }
      }

      .sport_icons {
        width: 100%;
      }
      .special-entry {
        width: 173px;
        height: 58px;
        cursor: pointer;
        background-image: v-bind(enterBtn);
        background-size: 100% 100%;
        @include flex(center);
        font-weight: 600;
        font-size: 20px;
        color: var(--g_3);
        padding-bottom: 5px;
      }
      .special-btns {
        margin-top: 40px;
        @include flex(flex-start, center, nowrap);
        align-items: flex-start;
        .special-btns-item {
          @include flex(center, column);
          margin: 10px 15px 0 0;
          position: relative;
          .icon {
            width: 85px;
            cursor: pointer;
          }
          .title {
            font-weight: 500;
            font-size: 16px;
            // white-space: nowrap;
            text-align: center;
            color: var(--g_2);
            &.on {
              color: var(--g_17);
            }
          }
          .icon-container {
            position: absolute;
            bottom: -35px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .special-main-pic {
      width: 590px;
    }
    .spacer-container {
      width: 498px;
      margin: 20px 0 40px;
      @include flex(center);
    }
  }
}
@media (min-width: 576px) {
  .special-container {
    width: 540px;
  }
}
@media (min-width: 768px) {
  .special-container {
    width: 720px;
  }
}

@media (min-width: 992px) {
  .special-container {
    width: 960px;
  }
}

@media (min-width: 1200px) {
  .special-container {
    width: 1200px;
  }
}

//-002
.special-wrapper.template_2_002 {
  .special-btns-item {
    .title {
      color: #878ea6;
      &.on {
        color: #ff00f3 !important;
      }
    }
  }
}
</style>
