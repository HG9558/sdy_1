<template>
  <div v-show="clickShow" class="verify-mask">
    <div
      :class="['verifybox', site]"
      :style="{ 'max-width': parseInt(imgSize.width) + 10 + 'px' }"
    >
      <div class="verifybox-top">
        {{ $t_c('请完成安全验证') }}
        <el-icon class="verifybox-close" @click="closeBox">
          <Close />
        </el-icon>
      </div>
      <div class="verifybox-bottom">
        <!-- 验证码容器 -->
        <VerifySlide ref="instance" @closeBox="closeBox"></VerifySlide>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import VerifySlide from './components/VerifySlide.vue'
import { onMounted, reactive, ref } from 'vue'
import { useSite } from '@/hook/usePath'

const clickShow = ref(false)
const instance = ref()
const site = useSite()

const imgSize = reactive({
  width: '370px',
  height: '200px',
})

const closeBox = () => {
  clickShow.value = false
  refresh()
}

const show = () => {
  clickShow.value = true
}

onMounted(() => {
  uuid()
})

const refresh = () => {
  instance?.value.refresh()
}

const uuid = () => {
  let s: any[] = []
  let hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  let slider = 'slider' + '-' + s.join('')
  let point = 'point' + '-' + s.join('')
  // 判断下是否存在 slider
  if (!localStorage.getItem('slider')) {
    localStorage.setItem('slider', slider)
  }
  if (!localStorage.getItem('point')) {
    localStorage.setItem('point', point)
  }
}

defineExpose({
  show,
})
</script>
<style lang="scss" scoped>
@import './css/index.scss';
</style>
