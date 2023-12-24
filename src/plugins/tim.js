import Vue from 'vue'
import TIM from 'tim-js-sdk'
import tim from '@/utils/tim'
import store from '@/store'


(async () => {
  const res = await tim()
  Vue.prototype.$tim = res
  window.tim = res
  Vue.prototype.$TIM = TIM
  window.TIM = TIM
  store.commit('normal/set_timcreatesuccess', true)
})()
