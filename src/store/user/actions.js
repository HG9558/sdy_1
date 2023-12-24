import $http from '../../api'

export default {
  //- 获取是否显示usdt
  async _searchCrFlagType ({ commit }) {
    const res = await $http.searchCrFlagType();
    if (res.data.code) return
    commit('set_cr_flag_type', res.data.crFlag)
  },
  //- 中心钱包获取
  async _getCenterMoney ({ commit }) {
    commit('set_is_refresh', true);
    try {
      const res = await $http.getCenterBalance();
      if (res.data.code !== 0) return
      commit('set_center_balance_money', res.data.balance)
      commit('set_is_refresh', false);//- 钱包图标状态调整
    } catch (error) {
      commit('set_is_refresh', false);
    }
  },
  //- 获取用户银行卡列表
  async _getBankCardList ({ commit }) {
    const res = await $http.getBankCardList();
    if (res.data.code !== 0) return
    commit('set_user_bank_card_list', res.data.bankCards)
    commit('set_bank_different_name', res.data.bankDifferentName === 0 ? false : true)
  },
  //- 获取电子钱包绑定列表
  async _getElecList ({ commit }) {
    const res = await $http.getElecList();
    if (res.data.code !== 0) return
    commit('set_user_elec_pay_list', res.data.eMoneyList)
    commit('set_bank_different_name', res.data.bankDifferentName === 0 ? false : true)
  },
  //- 获取其他支付列表
  async _getOtherPayAccountList ({ commit }) {
    const res = await $http.getOtherPayAccountList();
    if (res.data.code !== 0) return
    commit('set_user_other_pay_list', res.data.otherPay)
  },
  // //- 获取用户数字人民币列表
  async _getEcnyList ({ commit }) {
    const res = await $http.getEcnyList();
    if (res.data.code !== 0) return
    commit('set_user_ecny_pay_list', res.data.bankCards)
  },
  // //- 获取用户银行卡列表
  async _getCryptoList ({ commit }) {
    const res = await $http.getCryptoList();
    if (res.data.code !== 0) return
    commit('set_user_cry_card_list', res.data.cryptoCurrencies)
  },
   // 支付宝列表数据获取
  async _getAlipayList({ commit }) {
    const res = await $http.getZfbList();
    if(res.data.code !== 0) return;
    commit('set_user_alipay_card_list', res.data.bankCards);
  },
  //- 是否需要显示小额支付
  async _getLineService ({ commit }) {
    const res = await $http.getLineService();
    if(res.data.code !== 0) return;
    commit('set_show_service', res.data.data)
  },
  //- 小额支付点击统计
  async _getLineServiceCount ({ commit }) {
    const res = await $http.getLineServiceCount();
  },
}
