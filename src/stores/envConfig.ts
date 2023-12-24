import { defineStore } from 'pinia'
import { StoreName } from './store-name'
import axios from 'axios';
// import { useNormalState, useGlobalState, useGameState } from '@/stores';

export const useEnvState = defineStore(StoreName.ENVSTATE, {
  state: (): EnvStoreType.IEnvState => {
    return {
      envConfig: {},
    }
  },
  getters: {
    vite_app_app_api_url: (state: EnvStoreType.IEnvState) => state.envConfig.vite_app_app_api_url ?? import.meta.env.VITE_APP_APP_API_URL,

    vite_agt_url: (state: EnvStoreType.IEnvState) => state.envConfig.vite_agt_url ?? import.meta.env.VITE_AGT_URL,

    vite_app_code: (state: EnvStoreType.IEnvState) => state.envConfig.vite_app_code ?? import.meta.env.VITE_APP_CODE,

    vite_theme: (state: EnvStoreType.IEnvState) => state.envConfig.vite_theme ?? import.meta.env.VITE_THEME,

    vite_game_sort_map: (state: EnvStoreType.IEnvState) => state.envConfig.vite_game_sort_map ?? JSON.parse(import.meta.env.VITE_GAME_SORT_MAP),

    vite_template: (state: EnvStoreType.IEnvState) => state.envConfig.vite_template ?? import.meta.env.VITE_TEMPLATE,

    vite_current_site: (state: EnvStoreType.IEnvState) => state.envConfig.vite_current_site ?? import.meta.env.VITE_CURRENT_SITE,

    vite_show_deposit_tip_dialog: (state: EnvStoreType.IEnvState) => state.envConfig.vite_show_deposit_tip_dialog ?? import.meta.env.VITE_SHOW_DEPOSIT_TIP_DIALOG === 'true',

    vite_home_hot_game_list: (state: EnvStoreType.IEnvState) => state.envConfig.vite_home_hot_game_list ?? JSON.parse(import.meta.env.VITE_HOME_HOT_GAME_LIST),

    vite_deposit_type_sort_map: (state: EnvStoreType.IEnvState) => state.envConfig.vite_deposit_type_sort_map ?? JSON.parse(import.meta.env.VITE_DEPOSIT_TYPE_SORT_MAP),

    vite_language_list: (state: EnvStoreType.IEnvState): EnvStoreType.LanguageListType[] => {
      const tempList = state.envConfig.vite_language_list ?? JSON.parse(import.meta.env.VITE_LANGUAGE_LIST);
      tempList.forEach((item: EnvStoreType.LanguageListType) => {
        item.showText = { zh: '中文', en: 'English', vi: 'tiếng Việt', ms: 'Malay', zh_tw: '繁体中文' }[item.languageType];
      });
      return tempList;
    },
    vite_show_return_water: (state: EnvStoreType.IEnvState) => state.envConfig.vite_show_return_water ?? (import.meta.env.VITE_SHOW_RETURN_WATER === 'true'),
    vite_currency_map: (state: EnvStoreType.IEnvState) => {
      const currencyData = state.envConfig.vite_currency_map ?? JSON.parse(import.meta.env.VITE_CURRENCY_MAP);
      const globalState = useGlobalState();
      if (currencyData.type === 'AUD') {
        currencyData.symbol = currencyData.symbol.replace(/\\/g, '');
      } else if (currencyData.type === 'RMB' && globalState.language !== 'zh') {
        currencyData.value = 'RMB';
      }
      return currencyData;
    },
    vite_show_history_sponsor: (state: EnvStoreType.IEnvState) => state.envConfig.vite_show_history_sponsor ?? import.meta.env.VITE_SHOW_HISTORY_SPONSOR === 'true',
    vite_is_auto_config: (state: EnvStoreType.IEnvState) => state.envConfig.vite_is_auto_config || import.meta.env.VITE_IS_AUTO_CONFIG === 'true',
    vite_site_code: (state: EnvStoreType.IEnvState) => state.envConfig.vite_site_code ?? import.meta.env.VITE_SITE_CODE,
    vite_default_sptvtoken: (state: EnvStoreType.IEnvState) => state.envConfig.vite_default_sptvtoken ?? import.meta.env.VITE_DEFAULT_SPTVTOKEN,
    vite_defaultstoken: (state: EnvStoreType.IEnvState) => state.envConfig.vite_defaultstoken ?? import.meta.env.VITE_DEFAULTSTOKEN,
    vite_default_domain: (state: EnvStoreType.IEnvState) => state.envConfig.vite_default_domain ?? import.meta.env.VITE_DEFAULT_DOMAIN,
    cur_lang: (state: EnvStoreType.IEnvState) => state.envConfig.vite_language ?? import.meta.env.VITE_LANGUAGE,
    vite_area_code: (state: EnvStoreType.IEnvState) => state.envConfig.vite_area_code ?? import.meta.env.VITE_AREA_CODE,
    vite_show_vip_info: (state: EnvStoreType.IEnvState) => state.envConfig.vite_show_vip_info ?? JSON.parse(import.meta.env.VITE_SHOW_VIP_INFO ?? "true"),
    vite_avatar_show_vip: (state: EnvStoreType.IEnvState) => state.envConfig.vite_avatar_show_vip ?? JSON.parse(import.meta.env.VITE_AVATAR_SHOW_VIP ?? "true"),
    vite_show_partner: (state: EnvStoreType.IEnvState) => state.envConfig.vite_show_partner ?? JSON.parse(import.meta.env.VITE_SHOW_PARTNER ?? "true"),
  },
  actions: {
    async setEnvConfig() {
      if (this.vite_is_auto_config) {
        axios
          .get(`https://strapi-web.wsdy.net/api/fastwww-${import.meta.env.VITE_APP_CODE.substring(1, 2)}-settings?filters[appcode]=${import.meta.env.VITE_APP_CODE}&populate=*`)
          .then(async res => {
            const oldStyle = sessionStorage.VITE_THEME;
            const oldAppSite = sessionStorage.VITE_CURRENT_SITE;
            const oldSiteCode = sessionStorage.VITE_SITE_CODE;
            const data = res.data.data[0].attributes;

            if (!data.is_auto_config) return this.envConfig.vite_is_auto_config = data.is_auto_config;

            const languageListArr = data.languages.data.map(
              (_: { attributes: { languageType: any; languageList: any[] } }) => ({
                languageType: _.attributes.languageType,
                languageList: _.attributes.languageList,
              })
            )
            Object.assign(this.envConfig, {
              vite_theme: data.theme.substr(2),
              vite_current_site: data.logo_info,
              vite_language_list: languageListArr,
              vite_currency_map: data.currency_map.data.attributes,
              vite_is_auto_config: data.is_auto_config,
              vite_template: data.template,
              vite_site_code: data.sitecode.data.attributes.site,
              vite_default_sptvtoken: data.sitecode.data.attributes.default_sptvtoken,
              vite_defaultstoken: data.sitecode.data.attributes.default_token,
              vite_default_domain: data.default_domain,
              vite_agt_url: data.sitecode.data.attributes.agt_url,
              vite_app_code: data.appcode,
              // vite_home_hot_game_list: data.home_hot_game_list,
              vite_app_app_api_url: data.sitecode.data.attributes.url_data,
              vite_area_code: data.sitecode.data.attributes.area_code,
              vite_show_return_water: data.showReturnWater,
              vite_show_history_sponsor: data.showHistorySponsor,
              vite_show_deposit_tip_dialog: data.showDepositTipDialog,
              vite_deposit_type_sort_map: data.deposit_type_sort_map,
              vite_show_vip_info: data.show_vip_info,
              vite_avatar_show_vip: data.avatar_show_vip,
              vite_show_partner: data.show_partner
            })

            Object.assign(sessionStorage, {
              VITE_LANGUAGE_LIST: JSON.stringify(this.envConfig.vite_language_list),
              VITE_THEME: this.envConfig.vite_theme,
              VITE_TEMPLATE: this.envConfig.vite_template,
              VITE_CURRENT_SITE: this.envConfig.vite_current_site,
              VITE_IS_AUTO_CONFIG: this.envConfig.vite_is_auto_config,
              VITE_APP_APP_API_URL: JSON.stringify(data.sitecode.data.attributes.url_data),
              VITE_SITE_CODE: this.envConfig.vite_site_code,
            })
            const gameState = useGameState();
            const normalState = useNormalState()
            normalState.setMobileAreaCode(this.envConfig.vite_area_code as string);
            await gameState.set_fetch_game_list(this.envConfig.vite_site_code as string);
            document.body.classList.add(`${data.template}_${this.envConfig.vite_theme}`);

            if (oldStyle !== sessionStorage.VITE_THEME || oldAppSite !== sessionStorage.VITE_CURRENT_SITE || oldSiteCode !== sessionStorage.VITE_SITE_CODE) {
              window.location.reload()
            };
          });
      } else {
        sessionStorage.setItem('VITE_LANGUAGE_LIST', import.meta.env.VITE_LANGUAGE_LIST);
        sessionStorage.setItem('VITE_APP_APP_API_URL', import.meta.env.VITE_APP_APP_API_URL);
        Object.keys(import.meta.env).forEach((key: String) => {
          let _;
          try {
            _ = JSON.parse(import.meta.env[key as string])
          } catch (error) {
            _ = import.meta.env[key as string];
          }
          this.envConfig[key.toLowerCase() as keyof EnvStoreType.EnvConfigDataType] = _;
        })
      }
    },
    updateEnvState(val: any, key: string) {
      this.envConfig[key] = val;
    }
  },
  persist: {
    enabled: true
  },
})
