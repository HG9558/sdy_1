import { defineStore } from 'pinia'
import { StoreName } from './store-name'

export const useNormalState = defineStore(StoreName.NORMALSTATE, {
  state: () => {
    return {
      isI18n: 0,
      language: import.meta.env.VITE_LANGUAGE as "zh" | "en" | "vi" | "ms",
      mobileAreaCodes: [] as API.MobileAreaCode[],
      discountType: "",  // - 优惠类型
      scrollTop: 0, //- 设置初始化的滚动距离
      renderSlotGame: false,  //- 渲电子游戏
      renderPokerGame: false, //- 渲染棋牌 
      renderLotteryGame: false,
      renderFishGame: false,
      renderRealGame: false,  //- 真人
      agentInfoData: {} as API.mbrRebateAgentInfoData, //- 全民代理基础信息
      timCreateSuccess: false,
      mobileAreaCode: import.meta.env.VITE_AREA_CODE,//-手机号国家代码
      linkData: {} as HOMEAPI.linkDataType,   //- 从banner界面或弹窗进行跳转过来的   
      recommendedStr: "Recommend",
      microGameUrlList: [] as StoreType.microDataType[]
    }
  },
  actions: {
    setMobileAreaCodes(mobileAreaCodes: API.MobileAreaCode[]) {
      this.mobileAreaCodes = mobileAreaCodes;
    },
    setMobileAreaCode(code: string) {
      this.mobileAreaCode = code;
    },
    //- 当列表渲染完成请求老虎机游戏内容
    set_renderSlotGame(val: boolean) {
      this.renderSlotGame = val
    },
    //- 当列表渲染完成请求棋牌游戏内容
    set_renderPokerGame(val: boolean) {
      this.renderPokerGame = val
    },
    //- 当列表渲染完成请求棋牌游戏内容
    set_renderLotteryGame(val: boolean) {
      this.renderLotteryGame = val
    },
    //- 当列表渲染完成请求真人游戏内容
    set_renderRealGame(val: boolean) {
      this.renderRealGame = val
    },
    set_renderFishGame(_: boolean) {
      this.renderFishGame = _;
    },
    //- 优惠类型 discountType
    set_discount_type(_: string) {
      this.discountType = _;
    },
    set_scroll_top(_: number) {
      this.scrollTop = _;
    },
    //- 从首页面或者用户中心进行跳转过来的内容
    set_link_data(_: HOMEAPI.linkDataType) {
      this.linkData = _;
    },
    //- 设置全民代理
    set_agent_Info(_: API.mbrRebateAgentInfoData) {
      Object.assign(this.agentInfoData, _);
    },
    //- 设置好友推荐显示组件名称
    set_recommended_str(_: string) {
      this.recommendedStr = _;
    },
    //- 设置microgame列表
    set_micro_game_list(_: StoreType.microDataType[]) {
      this.microGameUrlList.length = 0;
      this.microGameUrlList.push(..._);
    },
  },
})
