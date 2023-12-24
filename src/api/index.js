//- 导出所有模块内的api方法
const requireApi = require.context('./interface', true, /.js$/);
const module1 = {};  //- 收集api

requireApi.keys().forEach((key, index) => {
  if (key === './index.js') return
  Object.assign(module1, requireApi(key))
})

export default module1