import { api } from '@/api';
import { defineStore } from 'pinia'
import { StoreName } from './store-name'
import { destroyApp } from "wujie";
import { lang } from '@/i18n';

export const useUserState = defineStore(StoreName.USERSTATE, {
  state: (): StoreType.UserStateType => {
    return {
      token: '',
      userInfo: {} as API.userInfoType,
      nickNameInfo: {} as API.nickNameType,
      serUrl: '',
      //- 用户银行卡信息
      bankcardData: {
        rmb: [],
        crypto: [],
        alipay: [],
        otherpay: [],
        ecny: [],
        ePay: [],
      } as BankAPI.bankcardDataType,
      vipData: {} as VipAPI.vipInfoData,  //- 侧边栏及vip界面使用
      bankDifferentName: false, //- 添加不同姓名银行卡
      isRefresh: false, //- 刷新小图标的状态
      centerBalanceMoney: 0,
      unMessageCount: 0,//-用户未读取消息数量
      mailBoxMsg: false,
      crFlag: false,  //- 是否需要使用usdt
      ebPayWithdrawEnable: true,
      toPayWithdrawEnable: true,
      goPayWithdrawEnable: true,
      ecnyWithdrawEnable: true,
      cnyWithdrawEnable: true,
      eMoneyPayWithdrawEnable: true,
      alipayEnable: true,
      isShowService: false, //- 是否显示小额支付
      depositLen: {
        CrPay: 0,
        RmPay: 0,
        OtherPay: 0,
        ElectronicPay: 0,
      },
      sysConditions: {},
      regSetting: {     //- 用户注册项
        accWebRegister: true,
        addressisRequire: false,
        addressisVisible: false,
        captcharegisRequire: true,
        captcharegisVisible: true,
        mailCaptcharegisRequire: false,
        mailCaptcharegisVisible: false,
        emailisRequire: false,
        emailisVisible: false,
        loginNameisRequire: true,
        loginNameisVisible: true,
        loginPwdisRequire: true,
        loginPwdisVisible: true,
        mobileCaptcharegisRequire: false,
        mobileCaptcharegisVisible: false,
        mobileisRequire: false,
        mobileisVisible: false,
        qqisRequire: false,
        qqisVisible: false,
        reLoginPwdisRequire: true,
        reLoginPwdisVisible: true,
        realNameisRequire: false,
        realNameisVisible: false,
        deviceUuidisVisible: false,
        promotionisRequire: false,
        promotionisVisible: false,
        deviceUuidisRequire: false,
        loginIpisVisible: false,
        loginIpisRequire: false,
        registerMethod: '1',
        smsMobileCompelBindisRequire: false,
        weChatisRequire: false,
        weChatisVisible: false,
        whatsappisRequire: false,
        whatsappisVisible: false,
        telegramisRequire: false,
        telegramisVisible: false,
      },
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setSerUrl(serUrl: string) {
      this.serUrl = serUrl;
    },
    //- 中心钱包获取
    async _getCenterMoney() {
      this.set_is_refresh(true);
      try {
        const res = await api.user.getCenterBalance();
        if (res.code !== 0) return
        this.set_center_balance_money(res.balance);
        this.set_is_refresh(false);
      } catch (error) {
        this.set_is_refresh(false);
      }
    },
    //- 刷新中心钱包余额展示
    set_is_refresh(_: boolean) {
      this.isRefresh = _;
    },
    //-获取中心钱包余额
    set_center_balance_money(_: number) {
      this.centerBalanceMoney = _;
    },
    //- 保存用户未读消息数量
    set_un_read_message_count(_: number) {
      this.unMessageCount = _;
    },
    // -是有有未读收件箱
    set_mail_boxmsg(_: boolean) {
      this.mailBoxMsg = _;
    },
    //- 获取用户信息
    set_user_info(_: API.userInfoType) {
      const normalState = useNormalState()
      normalState.microGameUrlList.forEach(_ => destroyApp(_.depotCode))
      !this.token && normalState.set_micro_game_list([])
      this.userInfo = _;
    },
    //- 用户名相关
    set_nickname_info(_: API.nickNameInfo) {
      this.nickNameInfo = _;
    },
    //- 退出登录清空用户信息
    clear_user_info() {
      const normalState = useNormalState()
      normalState.microGameUrlList.forEach(_ => destroyApp(_.depotCode))
      normalState.set_micro_game_list([])
      this.token = '';
      this.unMessageCount = 0
      this.userInfo = {}
      this.nickNameInfo = {} as API.nickNameType
      this.bankcardData = {
        rmb: [], crypto: [], ecny: [], alipay: [],
        otherpay: [], ePay: [],
      }
      this.centerBalanceMoney = 0
    },

    //- 获取是否显示usdt
    async _searchCrFlagType() {
      const res = await api.user.searchCrFlagType();
      if (res.code) return
      this.set_cr_flag_type(res.crFlag);
    },
    set_cr_flag_type(_: boolean) {
      this.crFlag = _;
    },
    //- 设置用户注册配置项
    set_reg_setting(_: API.regSettingType) {
      this.regSetting = _;
    },
    //- 获取用户银行卡列表
    async _getBankCardList() {
      const res = await api.bank.getBankCardList();
      if (res.code !== 0) return
      this.bankcardData.rmb = res.bankCards;
      this.bankDifferentName = !!res.bankDifferentName;
    },
    //- 会员查询加密钱包列表
    async _getCryptoList() {
      const res = await api.bank.getCryptoList();
      if (res.code !== 0) return
      const leftside: BankAPI.CryptoCurrency[] = [], rightside: BankAPI.CryptoCurrency[] = [];

      res.cryptoCurrencies.forEach((item: BankAPI.CryptoCurrency) => {
        item.available === 1 ? leftside.push(item) : rightside.push(item)
      })

      leftside.forEach((item, index) => {
        if (item.currencyProtocol == 'TRC20') {
          leftside.splice(index, 1)
          leftside.unshift(item)
        }
      })
      this.bankcardData.crypto.length = 0;
      this.bankcardData.crypto.push(...leftside, ...rightside);
    },
    //- 支付宝列表数据获取
    async _getAlipayList() {
      const res = await api.bank.getZfbList();
      if (res.code !== 0) return;
      this.bankcardData.alipay = res.bankCards;
    },
    setVipInfo(_: VipAPI.vipInfoData) {
      this.vipData = _;
    },
    //- 获取其他支付列表
    async _getOtherPayAccountList() {
      const res = await api.bank.getOtherPayAccountList();
      if (res.code !== 0) return
      this.bankcardData.otherpay = res.otherPay;
    },
    //- 获取用户电子钱包列表
    async _getEMoneyList() {
      const res = await api.bank.getEMoneyList();
      if (res.code) return;
      this.bankcardData.ePay.length = 0;
      this.bankcardData.ePay.push(...res.eMoneyList);
    },
    //- 获取用户数字人民币列表
    async _getEcnyList() {
      const res = await api.bank.getEcnyList();
      if (res.code !== 0) return
      this.bankcardData.ecny = res.bankCards;
    },
    //- 是否开启人民币提款功能
    set_cnyWithdrawEnable_enable(_: boolean) {
      this.cnyWithdrawEnable = _;
    },
    //- 是否开启电子钱包提款功能
    set_eMoney_pay_withdraw_enable(_: boolean) {
      this.eMoneyPayWithdrawEnable = _;
    },
    //- 是否开启支付宝支付功能
    set_alipay_enable(_: boolean) {
      this.alipayEnable = _;
    },
    //- 是否需要显示小额支付
    async _getLineService() {
      const res = await api.deposit.getLineService();
      if (res.code !== 0) return;
      this.isShowService = res.data;
    },
    //- 小额支付点击统计
    async _getLineServiceCount() {
      await api.deposit.getLineServiceCount();
    },
    //- 修改充值类型通道长度
    modify_depositLen({ type, len }: { type: string; len: number }) {
      this.depositLen[type] = len
    },
    async checkUserConditions(type: string) {
      const { realName, mobile, email, isVerifyGoogle } = this.userInfo
      const data: any = await api.user.queryCondition()
      // depositSet 数组 1 实名， 2短信， 3邮箱，4 GOOGLE 存款条件
      // withdrawSet 数组 1 实名， 2短信， 3邮箱，4 GOOGLE 提款条件    
      const deposit = JSON.parse(data.depositSet)
      const withdraw = JSON.parse(data.withdrawSet)
      const o: any = { deposit, withdraw }
      const target = o[type]
      this.sysConditions = o
      return new Promise((resolve, reject) => {
        if (target.includes(1) && !realName) {
          return reject({ text: lang('为了您的资金安全，请先填写真实姓名！'), need: true })
        }
        if (target.includes(2) && !mobile) {
          return reject({ text: lang('为了您的资金安全，请您先操作绑定手机号！'), need: true })
        }
        if (target.includes(3) && !email) {
          return reject({ text: lang('为了您的资金安全，请您先操作绑定邮箱！'), need: true })
        }
        if (target.includes(4) && !isVerifyGoogle) {
          return reject({ text: lang('为了您的资金安全，请您先操作绑定谷歌验证！'), need: true })
        }
        return resolve({ need: false })
      })

      // if (target.includes(1) && !realName) {
      //   return {
      //     text: lang('为了您的资金安全，请先填写真实姓名！'),
      //     need: true,
      //   }
      // }
      // if (target.includes(2) && !mobile) {
      //   return {
      //     text: lang('为了您的资金安全，请您先操作绑定手机号！'),
      //     need: true,
      //   }
      // }
      // if (target.includes(3) && !email) {
      //   return {
      //     text: lang('为了您的资金安全，请您先操作绑定邮箱！'),
      //     need: true,
      //   }
      // }
      // if (target.includes(4) && !isVerifyGoogle) {
      //   return {
      //     text: lang('为了您的资金安全，请您先操作绑定谷歌验证！'),
      //     need: true,
      //   }
      // }
      // return { need: false }
    },
  },
  persist: {
    enabled: true
  }
})
