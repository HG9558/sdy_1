export default {
  //- 设置用户登录token
  set_user_token (state, str) {
    state.token = str
  },
  //- 保存用户未读消息数量
  set_un_read_message_count (state, num) {
    state.unMessageCount = num
  },
  //- 设置用户注册配置项
  set_reg_setting (state, obj) {
    state.regSetting = obj
  },
  //- 获取用户信息
  set_user_info (state, obj) {
    state.userInfo = obj
  },
  //- 用户名相关
  set_nickname_info (state, obj) {
    state.nickNameInfo = obj
  },
  //- 设置客服地址
  set_server_data (state, str) {
    state.serUrl = str;
  },
  //- 是否需要数字钱包
  set_cr_flag_type (state, bol) {
    state.crFlag = bol
  },
  //-获取中心钱包余额
  set_center_balance_money (state, num) {
    state.centerBalanceMoney = num
  },
  //- 刷新中心钱包余额展示
  set_is_refresh (state, bol) {
    state.isRefresh = bol
  },
  //- 退出登录清空用户信息
  clear_user_info (state) {
    state.token = '';
    state.unMessageCount = 0
    state.userInfo = {}
    state.nickNameInfo = {}
    state.bankcardData = { rmb: [], crypto: [], ecny:[], elec: [] }
    state.centerBalanceMoney = '0.00'
    // state.serUrl = ''
  },
  //- 是否开启人民币提款功能
  set_cnyWithdrawEnable_enable (state, bol) {
    state.cnyWithdrawEnable = bol;
  },
  //- 是否开启数字人民币支付功能
  set_ecny_enable (state, bol) {
    state.ecnyWithdrawEnable = bol;
  },
  //- 是否开启支付宝支付功能
  set_alipay_enable (state, bol) {
    state.alipayEnable = bol;
  },
  //- 是否开启电子钱包支付功能
  set_elecpay_enable (state, bol) {
    state.eMoneyPayWithdrawEnable = bol;
  },
  //- 是否开启ebpay支付功能
  set_ebpay_enable (state, bol) {
    state.ebPayWithdrawEnable = bol;
  },
  //- 是否开启topayh支付功能
  set_topay_enable (state, bol) {
    state.toPayWithdrawEnable = bol;
  },
  //- 用户银行卡列表
  set_user_bank_card_list (state, arr) {
    state.bankcardData.rmb = arr
  },
  //- 用户其他钱包列表
  set_user_other_pay_list (state, arr) {
    state.bankcardData.otherpay = arr
  },
  //- 用户数字人民币钱包列表
  set_user_ecny_pay_list (state, arr) {
    state.bankcardData.ecny = arr
  },
  //- 用户电子钱包列表
  set_user_elec_pay_list (state, arr) {
    state.bankcardData.elec = arr
  },
  //- 虚拟币列表
  set_user_cry_card_list (state, arr) {
    const leftside = [], rightside = [];
    arr.forEach((item) => {
      item.available === 1 ? leftside.push(item) : rightside.push(item)
    })
    leftside.forEach((item, index) => {
      if (item.currencyProtocol == 'TRC20') {
        leftside.splice(index, 1)
        leftside.unshift(item)
      }
    })
    state.bankcardData.crypto = [...leftside, ...rightside]
  },
  //- 用户支付宝列表
  set_user_alipay_card_list (state, arr) {
    state.bankcardData.alipay = arr;
  },
  // -是有有未读收件箱
  set_mail_boxmsg (state, val) {
    state.mailBoxMsg = val
  },
  // 是否可以添加不同姓名银行卡
  set_bank_different_name (state, bol) {
    state.bankDifferentName = bol
  },
  // 是否显示小额支付
  set_show_service (state, val) {
    state.isShowService = val
  },
}
