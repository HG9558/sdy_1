import { defineStore } from 'pinia'
import { StoreName } from './store-name'


export const useDiscountState = defineStore(StoreName.DISCOUNTSTATE, {
  state: () => {
    return {
      discountData: {} as DiscountType.discountDataType,  //- 优惠数据
      redEnvelopeOpenCountDown: sessionStorage.getItem('redEnvelopeOpenCountDown') || 0,  //-  红包雨相关
      newRedEnvelopeState: {} as { currentHour: string | number }
    }
  },
  actions: {
    //- 优惠数据 discountData
    set_discount_data(_: DiscountType.discountDataType) {
      this.discountData = _;
    },
    /** 红包雨相关 */
    set_redenvelopeopencountdown(_: number | string) {
      this.redEnvelopeOpenCountDown = _;
      sessionStorage.setItem('redEnvelopeOpenCountDown', _.toString())
    },
    set_newRedEnvelopeState(_: { currentHour: string | number }) {
      this.newRedEnvelopeState = _;
    }
  },
  persist: {
    enabled: true
  }
})
