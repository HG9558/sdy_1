import ajax from '../http.js'


//- 获取帮助中心tab列表
export const getHelpCategoryList = () => ajax({ url: '/user/helpCategoryList' })

//- 获取帮助中心tab列表内容
export const findTitleAndContent = params => ajax({ url: '/user/findTitleAndContent', params })
