import ajax from '../http.js'

//- 获取首页面通知 + banner数据
export const getIndexadvListData = params => ajax({ url: '/sys/indexNoticeAndAdv', params })

//- 社区配置接口
export const getAppSpecifyList = params => ajax({ url: '/splive/app/sp/config/getAppSpecifyList', params })