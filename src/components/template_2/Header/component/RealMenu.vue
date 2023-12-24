<template>
  <Layout :length="gameState.real.length" :num="4">
    <div @click="$emit('enterGame', item)" v-for="(item, index) in gameState.real" :key="index" class="real-item-outer">
      <div :class="['real-item', globalState.language]">
        <img
          class="bg-img"
          :src="useImgPath(`base/header_real_${item.depotCode.toLowerCase()}.png`)"
          @error="$event => useErrorPath('base/header_real_default.png', $event)" />
				<div :class="['desc-txt', globalState.language, globalState.language === 'en' && 'single-txt']">
					<span v-if="globalState.language.startsWith('zh')" class="zh-txt">{{
						item[`${globalState.language}_txt` as keyof API.normalGameType]
					}}</span>
					<span :class="['en-txt', globalState.language]">{{ item.en_txt }}</span>
				</div>
        <GameStatusIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatusIcon>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { useErrorPath, useImgPath } from '@/hook/usePath';
// import { useGameState, useGlobalState } from '@/stores';
import GameStatusIcon from '@/components/template_2/GameStatusIcon/GameStatusIcon.vue';
import Layout from './ScrollLayout.vue';

const gameState = useGameState();
const globalState = useGlobalState();
</script>

<style lang="scss" scoped>
.real-item-outer {
  width: 25%;
  min-width: 25%;
  @include flex(center);
  .real-item {
    font-weight: 600;
    font-size: 16px;
    position: relative;
    width: 156px;
    height: 226px;
    cursor: pointer;
    .bg-img {
      width: 100%;
      height: 100%;
    }
    &.en,
    &.ms {
      .icon-container {
        right: -44px;
      }
    }
    &.vi {
      .icon-container {
        right: -30px;
      }
    }
    .icon-container {
      right: -14px;
      bottom: 4px;
      position: absolute;
    }
  }
  .real-context {
    position: absolute;
    top: 12px;
    left: 75px;
  }
  .desc-txt {
    position: absolute;
    top: 5px;
    left: 60px;
    color: var(--h_7);
		@include flex(flex-start, column);
		align-items: flex-start;
		.en-txt.zh {
			font-size: 12px;
		}
		&.single-txt {
			top: 12px;
			.en-txt {
				font-size: 16px;
			}
		}
		.en-txt {
			white-space: nowrap;
			&.ms,
			&.vi {
				margin-top: 8px;
			}
		}
  }
}
</style>
