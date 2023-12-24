import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
import $http from './api'
import LlScrollbar from '@/components/common/scrollbar/scrollbar'
import '@/components/common/scrollbar/scrollbar.css'
import '@/common/style/index.scss';
import animated from 'animate.css'; // npm install animate.css --save安装，在引入
import(`@/common/style/${process.env.VUE_APP_APP_TEMPLATE}_resetElement.scss`)
import './plugins/element.js'
import i18n, { lang, _lang } from './i18n'

import LuckDraw from 'vue-luck-draw'
import commonComponents from './components/common' // 公共组件
import VueClipboard from 'vue-clipboard2' //复制插件
import './plugins/tim'

//- todo filter组件引入
import filterData from './common/js/filter'
Object.keys(filterData).forEach(key => Vue.filter(key, filterData[key]));

//- 全局mixin使用
import CommonMixin from './mixins/commonMixin.js'
Vue.mixin(CommonMixin)

Vue.use(LuckDraw)
Vue.use(VueClipboard)
Vue.use(LlScrollbar)
Vue.use(animated)
Vue.use(commonComponents)
//- 全局挂载api请求。导出所有的interface文件夹下面的方法
Vue.prototype.$http = $http;
Vue.prototype.$t = lang;
Vue.prototype.$tt = _lang;

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
