<template>
  <div ref="redEnvelopesRef" class="red_container" :style="style" v-if="isShow">
    <img class="close" :src="useImgPath('home/other/float_close_icon.png')" alt="" @click.stop="isShow = false" />
    <div class="red_main">
      <!-- <RedEnvelopeEntrance styleType="homeStyle" @goTargetPage="goTargetPage" @closeRedFloat="isShow = false" /> -->
      <NewRedEnvelopeEntrance styleType="homeStyle" @goTargetPage="goTargetPage" @closeRedFloat="isShow = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useImgPath } from '@/hook/usePath';
// import RedEnvelopeEntrance from 'commonComponent/RedEnvelopeEntrance/RedEnvelopeEntrance.vue';
import NewRedEnvelopeEntrance from 'pages/newRedEnvelopes/component/entry.vue';
import { useRouter } from 'vue-router';
// import { useUserState } from '@/stores';
const isGoNewPath = ref<boolean>(false);
const router = useRouter();
const userState = useUserState();
const isShow = ref<boolean>(true);
const redEnvelopesRef = ref(null) as Ref<HTMLElement | SVGElement | null | undefined>;

const { style } = useDraggable(redEnvelopesRef, {
  initialValue: { x: window.innerWidth - 220, y: 380 },
  onMove: data => {
    switch (true) {
      case data.x < 0 && data.y < 0:
        data.x = 0;
        data.y = 0;
        break;
      case data.x > window.innerWidth - 100 && data.y < 0:
        data.x = window.innerWidth - 100;
        data.y = 0;
        break;
      case data.x < 0 && data.y > window.innerHeight - 80:
        data.x = 0;
        data.y = window.innerHeight - 80;
        break;
      case data.x > window.innerWidth - 100 && data.y > window.innerHeight - 80:
        data.x = window.innerWidth - 100;
        data.y = window.innerHeight - 80;
        break;
      case data.x < 0:
        data.x = 0;
        break;
      case data.x > window.innerWidth - 100:
        data.x = window.innerWidth - 100;
        break;
      case data.y < 0:
        data.y = 0;
        break;
      case data.y > window.innerHeight - 80:
        data.y = window.innerHeight - 80;
    }
    isGoNewPath.value = true;
  },
});

const goTargetPage = (cb?: Function) => {
  if (isGoNewPath.value) return (isGoNewPath.value = false);
  if (cb) {
    cb();
  } else {
    router.push(!userState.token ? '/login' : '/red_envelope');
  }
};
</script>

<style lang="scss" scoped>
.red_container {
  position: fixed;
  cursor: pointer;
  z-index: 9999;
  img {
    -webkit-user-drag: none;
  }
  .close {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 0px;
    top: 0px;
  }
}
</style>
