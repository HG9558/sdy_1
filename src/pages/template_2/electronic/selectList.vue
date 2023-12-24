<template>
  <div :class="['electronic-partList-wrapper', site]">
    <div class="list-wrapper select-list-wrapper">
      <div class="game-type">
        <div class="game-classify">
          <div class="title-box">
            <img
              class="go-back"
              @click="$router.push('/electronic')"
              :src="useImgPath('electronic/goback.png')"
              alt="" />
            <img
              class="logo"
              :src="useImgPath(`electronic/logo_${renderData.depotCode}.png`)"
              @error="($event:Event)=> useErrorPath('electronic/logo_default.png',$event)" />
            <div class="title">
              <div>{{ renderData[`${globalState.language}_txt`] }}</div>
              <div class="en-title" v-if="globalState.language === 'zh'">{{ renderData.en_txt }}</div>
            </div>
          </div>
          <div :class="['select-input', globalState.language]">
            <input type="text" :placeholder="$t_c('请输入游戏名称')" v-model="gameVal" />
            <img :src="useImgPath('electronic/search.png')" alt="" @click="inputSelect" />
          </div>
        </div>
        <div class="game-list select-list" v-if="renderData.renderList?.length">
          <div
            :key="index"
            class="game-item-wrap select-list-wrap"
            v-for="(dataItem, index) in renderData.renderList"
            @click="$emit('enterGame', { ...dataItem, availableWh: renderData.availableWh })">
            <img class="game-pic" :src="dataItem.logo" alt="图片加载失败" />
            <div class="masker animate__fadeIn animate__animated">
              <div class="game-name">
                <div class="game-title">{{ dataItem.gameName }}</div>
                <div :class="['game-context', globalState.language]">
                  {{ $t_c('丰富的游戏类型，让您尽情享受。') }}
                </div>
              </div>
              <span class="enter-btn">
                <span>{{ $t_c('进入游戏') }}</span>
              </span>
            </div>
            <div class="try" v-if="dataItem.isTry == 1 && !userState.token">
              <span>{{ $t_c('可试玩') }}</span>
              <img class="try_img" :src="useImgPath('electronic/entry_try.png')" />
            </div>
          </div>
        </div>
        <div class="game-list-no-data" v-else>
          <img :src="useImgPath('base/no_data.png')" alt="" />
          <div class="gameText">{{ $t_c('无搜索结果') }}</div>
        </div>
      </div>
    </div>
    <div v-if="renderData.totalCount > 15" class="electronic-pages">
      <PaginationComponent
        class="pagination-class"
        :pagination="{
          currentPage: pageNo,
          pageSize: 15,
          total: renderData.totalCount,
        }"
        className="game_page"
        @change="_handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useErrorPath, useImgPath, useSite } from '@/hook/usePath';
// import { useGameState, useGlobalState, useUserState } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PaginationComponent from 'commonComponent/Pagination/index.vue';

const gameState = useGameState();
const userState = useUserState();
const globalState = useGlobalState();
const router = useRouter();
const pageNo = ref<number>(1);
const gameVal = ref<string>('');
const site = useSite();

onMounted(() => {
  !gameState.selectElectronicDepotCode && router.push('/electronic');
});

const renderData = computed(() => {
  return gameState.electronic.filter(item => item.depotCode === gameState.selectElectronicDepotCode)[0];
});

const _handleCurrentChange = ({ current }: { current: number }) => {
  pageNo.value = current;
  const params = { depotId: renderData.value.id, page: current };
  getGameList(params);
};

const getGameList = async (params: API.fishParams | API.gameListParams) => {
  const isFish = !params.depotId;
  const res = isFish
    ? await api.game.getFishList(params as API.fishParams)
    : await api.game.getEleDataList(params as API.gameListParams);
  const { list, totalCount } = res.page;
  Object.assign(renderData.value, { renderList: list, totalCount });
};

const inputSelect = () => {
  pageNo.value = 1;
  const params = {
    depotId: renderData.value.id,
    lableName: gameVal.value,
  };
  getGameList(params);
};

const enterbtnBg = `url(${useImgPath('electronic/entry_btn.png')})`;
const enterbtnHoverBg = `url(${useImgPath('electronic/entry_btn_active.png')})`;
</script>

<style lang="scss" scoped>
@import './css/selectList.scss';
.enter-btn {
  background: v-bind(enterbtnBg);
  &:hover {
    background: v-bind(enterbtnHoverBg);
  }
}
</style>
