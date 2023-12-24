
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CODE: string;
  readonly VITE_APP_URL: string;
  readonly VITE_CURRENT_SITE: string;   /// 项目名称
  readonly VITE_APP_TITLE: string;
  readonly VITE_TEMPLATE: string;
  readonly VITE_THEME: string;
  readonly VITE_APP_ICON: string;
  readonly VITE_SITE_CODE: string;
  readonly VITE_DEFAULT_DOMAIN: string;
  readonly VITE_DEFAULT_SPTVTOKEN: string;
  readonly VITE_AGT_URL: string;
  readonly VITE_DEFAULTSTOKEN: string;
  readonly VITE_APP_APP_API_URL: string;
  readonly VITE_LANGUAGE: string;
  readonly VITE_LANGUAGE: string;
  readonly VITE_SHOW_HISTORY_SPONSOR: string;
  readonly VITE_SHOW_DEPOSIT_TIP_DIALOG: string;
  readonly VITE_SHOW_RETURN_WATER: string;
  readonly VITE_LANGUAGE_LIST: string;
  readonly VITE_CURRENCY_MAP: string;
  readonly VITE_IS_AUTO_CONFIG: string;
  readonly VITE_GAME_SORT_MAP: string;
  readonly VITE_DEPOSIT_TYPE_SORT_MAP: string;
  readonly VITE_HOME_HOT_GAME_LIST: string;
  readonly VITE_AREA_CODE: string;
  readonly VITE_MICRO_GAME_LIST: string;
  readonly VITE_SHOW_VIP_INFO: string;
  readonly VITE_AVATAR_SHOW_VIP: string;
  readonly VITE_SHOW_PARTNER: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vue-qr/src/packages/vue-qr.vue';

declare module 'bankcardinfo' {
  namespace getBankcardInfo {
    function getBankBin(cardNo: string, cbf?: Function): void;
  }
  export = getBankcardInfo;
}

declare module 'vue-matomo';

declare interface Window {
  _paq: any;
  offsetWidth: number;
  offsetHeight: number;
}

// declare module 'bankcardinfo';
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
