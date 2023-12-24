import { createI18n } from "vue-i18n";
import messages from "./messages";
import { CRC32 as crc32 } from 'crc_32_ts';

export const language = !sessionStorage.getItem('GLOBALSTATE') ? import.meta.env.VITE_LANGUAGE : JSON.parse(sessionStorage.getItem('GLOBALSTATE') as string).language;
if (!localStorage.language) localStorage.setItem('language', language);
const i18n = createI18n({
  locale: language,
  fallbackLocale: language,
  messages,
})

export function lang(key: string) {
  let hashKey = `k${crc32.str(key).toString(16)}`;
  let words = i18n.global.t(hashKey);
  if (words === hashKey) {
    words = key;
    console.log(key, "-未翻译");
  }
  return words;
}

//- 单独声明一个函数用于格式化翻译 不进行扫描
export function _lang(key: string, values?: any) {
  return i18n.global.t(key, values);
}

export default i18n;
