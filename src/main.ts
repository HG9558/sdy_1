import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import i18n, { lang, _lang } from './i18n'
import Dialog from '@/components/template_2/Dialog';
import 'animate.css'
import 'animate.css/animate.compat.css'
import './assets/style/index.scss'
import(`./assets/wsdy-fastsub/pc/${sessionStorage.VITE_TEMPLATE}/css_import.scss`);
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as formatData from 'utils/date';
import { matomoConfigFn } from 'utils/matomo-init';

const store = createPinia()
store.use(piniaPluginPersist)

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

type FilterType = {
  formatDiscountTime(item: DiscountType.ActivityListResPageList): string
  getPreviousTime(_: string): string
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t_c: (key: string) => string;
    $t_t: (key: string) => string;
    $_dialog: {
      show: (data: DialogData.params) => void,
    };
    $_tip: {
      show: (data: DialogData.TipParams) => void;
    }
    $filters: FilterType
  }
}
app.config.globalProperties.$t_t = _lang;
app.config.globalProperties.$t_c = lang;
app.config.globalProperties.$filters = {
  formatDiscountTime: formatData.formatDiscountTime,
  getPreviousTime: formatData.getPreviousTime
};

app.config.errorHandler = (err, vm, info) => {
  console.log('全局错误============:', err, vm, info);
}

matomoConfigFn(app);

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(Dialog)
  .mount('#app')