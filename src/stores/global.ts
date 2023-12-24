// import { useEnvState } from '@/stores';
// import { useUserState } from './user';
import { useDiscountState } from './discount';
import { defineStore } from 'pinia'
import { StoreName } from './store-name'
import i18n from '@/i18n'
import { api } from '@/api'

export const useGlobalState = defineStore(StoreName.GLOBALSTATE, {
  state: () => {
    return {
      equipmentId: '',
      isRecoverShow: false,
      language: import.meta.env.VITE_LANGUAGE as "zh" | "en" | "vi" | "ms" | "zh_tw",
      stationSetting: {} as API.queryStationSetData,
      codeId: '',
      subLoginName: '',
      mobileAreaCode: '',
      languageList: [],
      currencyData: JSON.parse(import.meta.env.VITE_CURRENCY_MAP) as API.CurrencyMapType,
      isNeedVfySms: 0,
      isZaloOpen: false,
      isNeedVfyEMail: 0,
      isNeedGoogle: 0,
    }
  },
  getters: {
    currencyMap(): API.CurrencyMapType {
      if (this.currencyData.type === 'AUD') {
        this.currencyData.symbol = this.currencyData.symbol.replace(/\\/g, '');
      } else if (this.currencyData.type === 'RMB' && this.language !== 'zh') {
        this.currencyData.value = 'RMB';
      }
      return this.currencyData;
    },
    isZaloShow() : boolean {
      return this.mobileAreaCode === '84' && this.isZaloOpen && !!this.isNeedVfySms
    }
  },
  actions: {
    //- 是否允许前端进行注册
    async _stationSettingWithCache() {
      const res = await api.common.getQueryStationSe()
      this.stationSetting = res.data;
    },
    setEquipmentId(equipmentId: string) {
      this.equipmentId = equipmentId;
    },
    //- 余额回转提示框
    set_recover_dialog(isRecoverShow: boolean) {
      this.isRecoverShow = isRecoverShow
    },
    set_language(val: "zh" | "en" | "vi" | "ms" | 'zh_tw') {
      const envState = useEnvState();
      localStorage.setItem('language', val)
      const discountState = useDiscountState()
      const userState = useUserState()
      envState.updateEnvState(val, 'vite_language')
      setTimeout(async () => {
        const timer = discountState.newRedEnvelopeState.currentHour;
        this.language = val
        i18n.global.locale = val
        /**
         * @title
         *  todos
         *  临时删除游戏更新
         * @description 
         */
        // gameState.$reset();
        discountState.$reset();
        if (userState.token) {
          const res = await api.vip.getVipInfo();
          userState.setVipInfo(res.data);
          discountState.set_newRedEnvelopeState({ currentHour: timer })
        }
        window.location.reload()
      }, 300)
    },
    set_language_list(_: []) {
      this.languageList.length = 0;
      this.languageList.push(..._);
    },
    //- 获取当前用户注册表单选项
    set_station_setting(obj: API.queryStationSetData) {
      this.stationSetting = obj
    },
    //- 保存好友推荐状态
    save_code_id(_: string) {
      this.codeId = _;
    },
    //- 保存跳转好友名称
    set_sub_login_name(str: string) {
      this.subLoginName = str
    },
    set_currencyMap(_: API.CurrencyMapType) {
      this.currencyData = _;
    },
    set_isZaloOpen(bool: boolean) {
      this.isZaloOpen = bool
    },
    set_mobileAreaCode(code: string) {
      this.mobileAreaCode = code
    }
  },
  persist: {
    enabled: true
  }
})
