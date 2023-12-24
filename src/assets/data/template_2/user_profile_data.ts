import { lang } from "@/i18n";
import { reactive } from "vue";

export const sideBarList = reactive([
  {
    icon: "user",
    name: lang("个人资料"),
    path: "/profile/baseInfo",
  },
  {
    icon: "vip",
    name: lang("VIP尊享"),
    path: "/profile/vip",
  },
  {
    icon: "wallet",
    name: lang("我的钱包"),
    path: "/profile/wallet",
  },
  {
    icon: "trade",
    name: lang("交易记录"),
    path: "/profile/transaction",
  },
  {
    icon: "bet",
    name: lang("投注记录"),
    path: "/profile/bettingRecord",
  },
  {
    icon: "message",
    name: lang("消息中心"),
    path: "/profile/messageCenter",
  },
  {
    icon: "suggest",
    name: lang("意见反馈"),
    path: "/profile/feedback",
  },
  {
    icon: "discount",
    name: lang("我的优惠"),
    path: "/profile/coupons",
  },
  {
    icon: "share",
    name: lang("晒单记录"),
    path: "/profile/shareRecode",
  },
])
