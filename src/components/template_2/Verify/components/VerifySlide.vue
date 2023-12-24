<template>
  <div style="position: relative" ref="verifySlide" :class="site">
    <div class="verify-img-out" :style="{ height: parseInt(setSize.imgHeight) + 5 + 'px' }">
      <div
        class="verify-img-panel"
        :style="{
          width: '100%',
          height: setSize.imgHeight,
        }">
        <div class="verify-loading" v-show="loading">
          <img :src="useImgPath('verify/80-80.gif')" />
        </div>
        <img
          :src="backImgBase ? backImgBase : useImgPath('verify/default.png')"
          alt=""
          style="width: 100%; height: 100%; display: block" />
        <div v-show="showRefresh" class="verify-refresh" @click="refresh">
          <el-icon class="iconfont icon-refresh">
            <Refresh />
          </el-icon>
        </div>
        <transition name="tips">
          <span v-if="tipWords" class="verify-tips" :class="passFlag ? 'suc-bg' : 'err-bg'">{{ tipWords }}</span>
        </transition>
      </div>
    </div>
    <!-- 公共部分 -->
    <div
      class="verify-bar-area"
      ref="verifyBarAreaRef"
      :style="{
        width: setSize.imgWidth,
        height: barSize.height,
        'line-height': barSize.height,
      }">
      <span class="verify-msg" v-text="text" />
      <div
        class="verify-left-bar"
        :style="{
          width: leftBarWidth !== '' ? leftBarWidth : getNum(barSize.height) * 1.5 + 'px',
          height: getNum(barSize.height) - 4 + 'px',
          'border-color': leftBarBorderColor,
          transition: transitionWidth,
        }">
        <span class="verify-msg" v-text="finishText" />
        <div
          class="verify-move-block"
          :style="{
            width: getNum(barSize.height) * 1.5 + 'px',
            height: getNum(barSize.height) - 4 + 'px',
            left: moveBlockLeft,
            transition: transitionLeft,
          }"
          @mousedown="start">
          <img v-if="authSuccessShow" class="verify-icon" :src="useImgPath('verify/yes.png')" alt="" />
          <el-icon v-else class="verify-icon-arrow iconfont" :style="{ color: iconColor }">
            <Check v-if="iconClass === 'icon-check'" />
            <Close v-if="iconClass === 'icon-close'" />
            <DArrowRight v-if="iconClass === 'icon-right'" />
          </el-icon>

          <div
            v-if="blockBackImgBase"
            class="verify-sub-block"
            :style="{
              width: Math.floor((parseInt(setSize.imgWidth) * 47) / 310) + 'px',
              height: setSize.imgHeight,
              top: '-' + (parseInt(setSize.imgHeight) + 5) + 'px',
              'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
              'pointer-events': 'none',
            }">
            <img
              :src="'data:image/png;base64,' + blockBackImgBase"
              alt=""
              style="width: 100%; height: 100%; display: block" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick, inject, onMounted } from 'vue';
import { useImgPath, useSite } from '@/hook/usePath';
import { api } from '@/api';
import { aesEncrypt } from '../utils/ase';
import { resetSize } from '../utils/util';
import { lang } from '@/i18n';

const success = inject<Function>('success');
const site = useSite();
const setSize = reactive({
  imgHeight: '0',
  imgWidth: '0',
  barHeight: '0',
  barWidth: '0',
});

const loading = ref(false);
const blockBackImgBase = ref('');
const backImgBase = ref('');
const backToken = ref('');
const secretKey = ref('');
const tipWords = ref('');
const showRefresh = ref(true);
const authSuccessShow = ref(false);
const finishText = ref('');
const transitionLeft = ref('');
const moveBlockLeft = ref('');
const leftBarWidth = ref('');
const transitionWidth = ref('');
const leftBarBorderColor = ref('#ddd');
const moveBlockBackgroundColor = ref('');
const iconColor = ref('');
const iconClass = ref('icon-right');
const isEnd = ref(false);
const status = ref(false);
const text = ref(lang('向右滑动完成验证'));
const passFlag = ref(false);
const startMoveTime = ref(0);
const barSize = { width: '310px', height: '40px' };
const imgSize = { width: '370px', height: '200px' };
const blockSize = reactive({ width: '50px', height: '50px' });
const startLeft = ref(0);
const endMovetime = ref(0);
const captchaType = ref('blockPuzzle');
const verifySlide = ref();
const verifyBarAreaRef = ref();
const emits = defineEmits(['closeBox']);

const init = () => {
  nextTick(() => {
    const sizeMap = resetSize(barSize, imgSize); // 重新设置宽度高度
    for (let key in sizeMap) {
      setSize[key as keyof typeof setSize] = sizeMap[key as keyof typeof sizeMap];
    }
  });

  window.removeEventListener('mousemove', function (e) {
    move(e);
  });

  window.removeEventListener('mouseup', end);

  window.addEventListener('mousemove', function (e) {
    move(e);
  });
  window.addEventListener('mouseup', end);
};

onMounted(() => {
  init();
  // 禁止拖拽
  verifySlide.value.onselectstart = function () {
    return false;
  };
});

// 请求背景图片和验证图片
const getPictrue = () => {
  const data = {
    captchaType: captchaType.value,
    clientUid: localStorage.getItem('slider'),
    ts: Date.now(), // 现在的时间戳
  };
  loading.value = true;
  blockBackImgBase.value = '';
  api.user
    .reqGet(data)
    .then(res => {
      if (res.repCode == '0000') {
        backImgBase.value = 'data:image/png;base64,' + res.repData.originalImageBase64;
        blockBackImgBase.value = res.repData.jigsawImageBase64;
        backToken.value = res.repData.token;
        secretKey.value = res.repData.secretKey;
      } else {
        tipWords.value = res.repMsg;
      }
      // 判断接口请求次数是否失效
      if (res.repCode == '6201') {
        backImgBase.value = '';
        blockBackImgBase.value = '';
      }
    })
    .catch(() => {
      blockBackImgBase.value = '';
      backImgBase.value = useImgPath('verify/error.jpg');
    })
    .finally(() => {
      loading.value = false;
    });
};
getPictrue();

const getNum = (str: string) => {
  const num = str.split('p')[0];
  return parseInt(num);
};
// 鼠标按下
const start = (e: MouseEvent) => {
  e = e || window.event;
  let x = e.clientX;
  startLeft.value = Math.floor(x - verifyBarAreaRef.value.getBoundingClientRect().left);

  startMoveTime.value = +new Date(); // 开始滑动的时间
  if (isEnd.value == false) {
    text.value = '';
    moveBlockBackgroundColor.value = '#c6ba9d';
    leftBarBorderColor.value = '#303030';
    iconColor.value = '$c-f';
    e.stopPropagation();
    status.value = true;
  }
};
// 鼠标移动
const move = (e: MouseEvent) => {
  e = e || window.event;
  if (status.value && isEnd.value == false) {
    let x = e.clientX;
    let bar_area_left = verifyBarAreaRef.value.getBoundingClientRect().left;
    let move_block_left = x - bar_area_left; // 小方块相对于父元素的left值
    if (
      move_block_left >=
      verifyBarAreaRef.value.offsetWidth - parseInt((parseInt(blockSize.width) / 2).toString()) - 2
    ) {
      move_block_left = verifyBarAreaRef.value.offsetWidth - parseInt((parseInt(blockSize.width) / 2).toString()) - 2;
    }
    if (move_block_left <= 0) {
      move_block_left = parseInt((parseInt(blockSize.width) / 2).toString());
    }
    // 拖动后小方块的left值
    moveBlockLeft.value = move_block_left - startLeft.value + 'px';
    leftBarWidth.value = move_block_left - startLeft.value + 'px';
  }
};

// 鼠标松开
const end = () => {
  endMovetime.value = +new Date();
  if (status.value && isEnd.value == false) {
    var moveLeftDistance = parseInt((moveBlockLeft.value || '').replace('px', ''));
    moveLeftDistance = (moveLeftDistance * 310) / parseInt(setSize.imgWidth);
    const data = {
      captchaType: captchaType.value,
      pointJson: secretKey.value
        ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value)
        : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
      token: backToken.value,
    };

    api.user.reqCheck(data).then(res => {
      if (res.repCode == '0000') {
        authSuccessShow.value = true;
        moveBlockBackgroundColor.value = '#5cb85c';
        leftBarBorderColor.value = '#5cb85c';
        iconColor.value = '$c-f';
        iconClass.value = 'icon-check';
        showRefresh.value = false;
        isEnd.value = true;
        setTimeout(() => {
          emits('closeBox');
          refresh();
        }, 1500);
        passFlag.value = true;
        tipWords.value = `${((endMovetime.value - startMoveTime.value) / 1000).toFixed(2)}s${lang('验证成功')}`;
        var captchaVerification = secretKey.value
          ? aesEncrypt(backToken.value + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value)
          : backToken.value + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 });
        setTimeout(() => {
          tipWords.value = '';
          emits('closeBox');
          (success as Function)({ captchaVerification });
        }, 1000);
      } else {
        authSuccessShow.value = false;
        moveBlockBackgroundColor.value = '#d9534f';
        leftBarBorderColor.value = '#5cb85c';
        iconColor.value = '$c-f';
        iconClass.value = 'icon-close';
        passFlag.value = false;
        setTimeout(function () {
          refresh();
        }, 1000);
        tipWords.value = lang('验证失败，请重试');
        setTimeout(() => {
          tipWords.value = '';
        }, 1000);
      }
    });
    status.value = false;
  }
};
const refresh = () => {
  showRefresh.value = true;
  authSuccessShow.value = false;
  finishText.value = '';

  transitionLeft.value = 'left .3s';
  moveBlockLeft.value = '0';

  leftBarWidth.value = '';
  transitionWidth.value = 'width .3s';

  leftBarBorderColor.value = '#ddd';
  moveBlockBackgroundColor.value = '#c6ba9d';
  iconColor.value = '#000';
  iconClass.value = 'icon-right';
  isEnd.value = false;
  getPictrue();
  setTimeout(() => {
    transitionWidth.value = '';
    transitionLeft.value = '';
    text.value = lang('向右滑动完成验证');
  }, 300);
};

defineExpose({
  refresh,
});

const refreshImg = `url(${useImgPath('verify/verify-refresh.png')})`;
</script>

<style lang="scss" scoped>
.verifybox {
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: var(--l_1);
  box-shadow: var(--l_8);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.verifybox-top {
  padding: 0 15px;
  height: 58px;
  line-height: 58px;
  text-align: left;
  font-size: 17px;
  color: var(--l_34);
  box-sizing: border-box;
  position: relative;
}

.verifybox-bottom {
  padding: 5px;
  box-sizing: border-box;
}

.verifybox-close {
  position: absolute;
  right: 9px;
  font-size: 28px;
  text-align: center;
  cursor: pointer;
  line-height: 58px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.verify-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
}

.verify-tips {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: var(--l_1);
  z-index: 9;
  text-align: center;
}

.suc-bg {
  background-color: var(--l_9);
  color: var(--l_10);
}

.err-bg {
  background-color: var(--l_11);
  color: var(--l_10);
}

/*滑动验证码*/

.verify-bar-area {
  position: relative;
  text-align: center;
  box-sizing: content-box;
  border-radius: 4px;
  background-color: var(--l_18);
}

.verify-bar-area .verify-move-block {
  position: absolute;
  background: var(--l_12) !important;
  cursor: pointer;
  box-sizing: content-box;
  box-shadow: 0 0 2px var(--l_13);
  border-radius: 1px;
}

.verify-bar-area .verify-move-block:hover {
  background-color: var(--l_14);
}

.verify-bar-area .verify-left-bar {
  position: absolute;
  top: 1px;
  left: 1px;
  background: var(--l_15);
  cursor: pointer;
  box-sizing: content-box;
}

.verify-img-panel {
  margin: 0;
  box-sizing: content-box;
  border-radius: 3px;
  position: relative;
}

.verify-img-panel .verify-refresh {
  width: 25px;
  height: 25px;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.verify-img-panel .icon-refresh {
  font-size: 20px;
  color: var(--l_1);
}

.verify-img-panel .verify-gap {
  background-color: var(--l_1);
  position: relative;
  z-index: 2;
  border: 1px solid var(--l_1);
}

.verify-bar-area .verify-move-block .verify-sub-block {
  position: absolute;
  text-align: center;
  z-index: 3;
}

.verify-bar-area .verify-move-block .verify-icon {
  width: 20px;
  color: var(--l_1) !important;
}

.verify-bar-area .verify-move-block .verify-icon-arrow {
  font-size: 18px;
  color: var(--l_1) !important;
}

.verify-bar-area .verify-msg {
  z-index: 3;
  color: var(--l_17) !important;
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
}

.icon-refresh:before {
  content: ' ';
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-size: contain;
}

.verify-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 9;
}

.icon-refresh:before {
  background-image: v-bind(refreshImg);
}

//- 2号皮肤
.template_2_002 {
  .verify-bar-area {
    background: #273546 !important;
    .verify-left-bar {
      border: none !important;
      background: linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%) !important;
      border-radius: 4px;
    }
  }
  .verify-move-block {
    background: linear-gradient(90deg, #ff00ff 0%, #003fff 100%) !important;
    border-radius: 4px;
    .verify-icon-arrow {
      color: #fff !important;
    }
  }
}
//- 3号皮肤
.template_2_003 {
  .verifybox-top {
    background-color: #fff;
  }
  .verify-bar-area {
    background: #f3f5f9 !important;
    .verify-left-bar {
      border: none !important;
      background: #dbf2ff !important;
      border-radius: 4px;
    }
  }
  .verify-move-block {
    background: linear-gradient(180deg, #314f78 0%, #151435 98.1%) !important;
    border-radius: 4px;
    .verify-icon-arrow {
      color: #fff !important;
    }
  }
}
</style>
