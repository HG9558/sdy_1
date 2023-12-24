import Vue from "vue";
import VueI18n from "vue-i18n";
import state from "../store/global/state";
import messages from "./messages";
const { crc32 } = require("crc");
Vue.use(VueI18n);

export const { language } = state

localStorage.setItem('language', language)

const i18n = new VueI18n({
  locale: language,
  fallbackLocale: language,
  messages,
});

export function lang(key) {
  let hashKey = `k${crc32(key).toString(16)}`;
  let words = i18n.t(hashKey);
  if (words === hashKey) {
    words = key;
    console.log(key, "-未翻译");
  }
  return words;
}

// 单独声明一个函数用于格式化翻译 不进行扫描
export function _lang(key, values) {
  return i18n.t(key, values);
}

export default i18n;
