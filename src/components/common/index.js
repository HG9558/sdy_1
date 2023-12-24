import GDialog from './Dialog';
import BogLoading from '../bog/Loading/index.vue'
import Bt8Loading from '../bt8/Loading/index.vue'
import SdyLoading from '../sdy/Loading/index.vue'
import JbLoading from '../jun/Loading/index.vue'
import MgmLoading from '../mgm/Loading/index.vue'
import YboLoading from '../ybo/Loading/index.vue'
import AobLoading from '../ab8/Loading/index.vue'
import ObLoading from '../ob8/Loading/index.vue'
import YSZLoading from '../ysz/Loading/index.vue'
import HbxLoading from '../hbx/Loading/index.vue'
import M88xLoading from '../mbs/Loading/index.vue'
import bw1Loading from '../bw1/Loading/index.vue'
import ywbLoading from '../ywb/Loading/index.vue'
import darkGreenLoading from '../darkGreen/Loading/index.vue'
import blackGoldLoading from '../blackGold/Loading/index.vue'
//- 根据当前平台进行全局Loading添加
const LoadingList = { 'bog': BogLoading, 'bt8': Bt8Loading, 'sdy': SdyLoading, 'jun': JbLoading, 'ysz': YSZLoading, 'ab8': AobLoading, 'ybo': YboLoading, 'hbx': HbxLoading, 'ob8': ObLoading, 'mbs': M88xLoading, 'bw1': bw1Loading, 'ywb': ywbLoading, 'mgm': MgmLoading, 'darkGreen': darkGreenLoading, 'blackGold': blackGoldLoading };
const common = {
  install: (Vue) => {
    Vue.component('GlobalDialog', GDialog)
    Vue.component('Loading', LoadingList[process.env.VUE_APP_APP_TEMPLATE])
  }
}
export default common
