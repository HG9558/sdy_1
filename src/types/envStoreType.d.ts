declare namespace EnvStoreType {
  type LanguageType = "zh" | "vi" | "en" | "ms" | "zh_tw";

  type LanguageList = {
    drx: string;
    jvi: string;
    mad: string;
    mgm: string;
    rng: string;
    sbg: string;
    sdy: string;
    ysz: string;
    zio: string;
    [key: string]: string;
  };

  type LanguageListType = {
    languageType: LanguageType;
    languageList: LanguageList;
    showText: string;
  }

  type CurrencyMapType = {
    type: string;
    label: string;
    wap_label: string;
    value: string;
    symbol: string;
    zh_label: string;
    en_label: string;
    wap_zh_label?: string;
    ms_label: string;
    vi_label: string;
  }

  type GameSportMap = {
    [key: string]: {
      type: string;
      sort: number;
      [key: string]: any
    }
  }

  type EnvConfigDataType = {
    base_url: string;
    dev: boolean;
    mode: string;
    prod: boolean;
    ssr: boolean;
    vite_agt_url: string;
    vite_app_app_api_url: string;
    vite_app_code: string;
    vite_show_history_sponsor: boolean | string;
    vite_app_title: string;
    vite_currency_map: CurrencyMapType;
    vite_current_site: string;
    vite_defaultstoken: string;
    vite_default_domain: string;
    vite_default_sptvtoken: string;
    vite_is_auto_config: boolean;
    vite_language: string;
    vite_language_list: LanguageListType[];
    vite_site_code: string;
    vite_template: string;
    vite_theme: string;
    vite_show_return_water: boolean;
    vite_show_deposit_tip_dialog: boolean;
    vite_game_sort_map: GameSportMap[];
    vite_deposit_type_sort_map: GameSportMap[];
    vite_area_code: string;
    [key: string]: any;
  }

  type IEnvState = {
    envConfig: Partial<EnvConfigDataType>;
  }
}