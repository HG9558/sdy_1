<template>
  <el-config-provider :locale="currentElLanguage">
    <div :class="['main-container']">
      <Header></Header>
      <div :class="['main-router', site, style2Class, route.name]">
        <router-view />
      </div>
      <SideBar></SideBar>
      <Footer></Footer>
      <iframe style="display: none" ref="iframe" :src="frameUrl" />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import Header from 'header/Header.vue';
import SideBar from 'sideBar/sideBar.vue';
import Footer from 'footer/Footer.vue';
import { RouterView, useRoute } from 'vue-router';
import { api } from './api';
import useElementLanguage from '@/hook/useElementLanguage';
// import { useEnvState, useGlobalState, useNormalState, useUserState } from '@/stores';
import { preLoadImg, useSite } from '@/hook/usePath';

const iframe = ref<HTMLIFrameElement>();
const frameUrl: string = 'https://download.injiepor.com/dr/index.html';
const mainState = useNormalState();
const userState = useUserState();
const { currentElLanguage } = useElementLanguage();
const route = useRoute();
const globalState = useGlobalState();
const site = useSite();
const envState = useEnvState();

onBeforeMount(() => {
  document.body.classList.add(`${sessionStorage.VITE_TEMPLATE}_${sessionStorage.VITE_THEME}`);
  if (import.meta.env.MODE !== 'skin') envState.setEnvConfig();
  saveLan();
});


//- 微前端使用
const saveLan = () => {
  try {
    const mapData = {
      zh: 1,
      en: 2,
      zh_tw: 3,
      vi: 4,
      ms: 5,
    };
    localStorage.language &&
      localStorage.setItem('lang', mapData[localStorage.language as keyof typeof mapData].toString());
  } catch (e) {
    console.log('54行打印：============:', e);
  }
};

onMounted(async () => {
  _initData();
  window.addEventListener('message', getIframeKey);
  loadImages();
  //- 在线注册
  const res = await api.common.getIsNeedVfySecurity();
  globalState.$patch(state => {
    state.isNeedVfySms = res.isNeedSms;
    state.isNeedVfyEMail = res.isNeedMail;
    state.isNeedGoogle = res.isNeedGoogle;
  });
  if (res.code) return;
});

// 预加载图片处理
const images = ref([] as string[]);
// const loadedImages = ref([] as HTMLImageElement[]);
// let isIdle = true;

const loadImages = async () => {
  try {
    const jsonData = await import(
      `./assets/wsdy-fastsub/pc/${envState.vite_template}/${envState.vite_theme}/${envState.vite_theme}.json`
    );
    images.value = jsonData.default[envState.vite_theme];
    // scheduleLoadImages(images.value);
    preLoadImg(images.value);
  } catch (error) {}
};

const getZalo = async () => {
  const res = (await api.user.getZalo()) as any;
  if (res && res.code === 0) {
    globalState.set_isZaloOpen(res.isOpen);
  }
};

const _initData = async () => {
  let getMobileAreaCodes = await api.common.getMobileAreaCodes();
  if (getMobileAreaCodes.code !== 0) return;
  mainState.setMobileAreaCodes(getMobileAreaCodes.mobileAreaCodes);

  const charResponse = await api.common.getServicerUrl({ terminal: 0 });
  if (charResponse.code !== 0) return;
  userState.setSerUrl(charResponse.data);
  getZalo();
};

const getIframeKey = (_: MessageEvent) => {
  if (_.data === 'success') sendMessage();
  else _.data && typeof _.data === 'string' && globalState.setEquipmentId(_.data);
};

const sendMessage = () => {
  iframe.value?.contentWindow?.postMessage(JSON.stringify({ type: 'GET', key: 'onlyKey' }), frameUrl);
};

const style2Class = computed(() => {
  return route.meta.bg ?? '';
});
</script>

<style lang="scss" scoped>
.main-router {
  background-color: var(--m_1);
  min-height: calc(100vh - 420px);
}
</style>
