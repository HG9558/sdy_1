import { defineStore } from 'pinia'
import { StoreName } from './store-name'

export const useHomeState = defineStore(StoreName.HOMESTATE, {
  state: () => {
    return {
      firstOpen: true,   //- 用户是否为第一次打开界面
      noticeList: [] as HOMEAPI.HomeList[],
      bannerList: [] as HOMEAPI.Page[],
      popUpList: [] as any,     //- 专题页Tab
      topicPageActiveTab: 67, //- 67欧洲杯
      topicPageActiveInnerTab: 0
    }
  },
  actions: {
    //- 用户第一次打开界面
    set_first_open(_: boolean) {
      this.firstOpen = _
    },
    //- 通知弹窗
    set_notice_list(arr: HOMEAPI.HomeList[]) {
      this.noticeList = arr
    },
    //- banner轮播图
    set_banner_list(arr: HOMEAPI.Page[]) {
      this.bannerList = arr
    },
    //- 公告栏信息
    set_popup_list(arr: any[]) {
      this.popUpList = arr
    }
  },
  persist: {
    enabled: true
  }
})
