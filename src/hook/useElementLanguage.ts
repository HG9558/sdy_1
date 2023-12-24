// import { useGlobalState } from "@/stores";
import zh from 'element-plus/dist/locale/zh-cn.mjs'
import en from "element-plus/dist/locale/en";
import vi from "element-plus/dist/locale/vi";
// import ms from "element-plus/lib/locale/lang/ms";

export default () => {
  const globalState = useGlobalState();
  const langMap = { zh, en, vi };
  //- 当前element语言输出
  const currentElLanguage = langMap[globalState.language as keyof typeof langMap];
  return {
    currentElLanguage
  };
}