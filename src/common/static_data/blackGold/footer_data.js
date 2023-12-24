import { lang } from "@/i18n"

const { VUE_APP_APP_SIGN } = process.env

let linkUrlListDefault = [
  { value: lang('游戏帮助'), url: "/game_help?index=0" },
  { value: lang('博彩责任'), url: "/game_help?index=1" },
  { value: lang('隐私保护'), url: "/game_help?index=2" },
  { value: lang('规则与条款'), url: "/game_help?index=3" },
  { value: lang('联系我们'), url: "/contact_us" },
  { value: lang('加入合营'), url: "/partner" },
]

export const linkUrlList = (function () {
  return linkUrlListDefault
})()

export const branchList = [lang('英国GC监督委员会'), lang('马耳他牌照(MGA)认证'), lang('英属维尔京群岛(BVI)认证'), lang('菲律宾(PAGCOR)认证')]
