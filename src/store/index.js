import Vue from 'vue'
import Vuex from 'vuex'

/*
 * @modules 模块化加载
 */

import global from './global'
import user from './user'
import game from './game'
import home from './home'
import discount from './discount'
import normal from './normal'  //- 不需要sessionStorage缓存

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    global,
    user,
    game,
    home,
    discount,
    normal
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer:data=> {
      const saveData = JSON.parse(JSON.stringify(data))
      delete saveData.normal   //- 不进行session存储
      delete saveData.global
      delete saveData.game
      return saveData
    }
  })]
})
