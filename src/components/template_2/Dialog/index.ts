import { createVNode, render, type App, type VNode, } from 'vue';
import Dialog from './Dialog.vue'
import Tip from './Tip.vue';
import emptyVue from '../empty/empty.vue';

export default {
  install(app: App) {
    app.component('empty-container', emptyVue)
    app.config.globalProperties.$_dialog = {
      show: (data) => {
        const vnode: VNode = createVNode(Dialog, { ...data, isAttributeUse: true }, () => data.content)
        render(vnode, document.body)
        vnode.component?.exposed?.show();
      },
    }
    app.config.globalProperties.$_tip = {
      show: (data) => {
        const vnode: VNode = createVNode(Tip, { ...data })
        render(vnode, document.body)
        vnode.component?.exposed?.show();
      },
    }
  }
}