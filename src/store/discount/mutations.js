
export default {
  //- 优惠数据 discountData
  set_discount_data: (state, val) => {
    state.discountData = val
  },
  /** 红包雨相关 */
  set_redenvelopeopencountdown (state, payload) {
    state.redEnvelopeOpenCountDown = payload
    sessionStorage.setItem('redEnvelopeOpenCountDown', payload)
  },
  /** 新红包雨相关 */
  set_newRedEnvelopeState (state, payload) {
    state.newRedEnvelopeState = payload
  },
}
