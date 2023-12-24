import ajax from '../../http.js'

export default {
  //- 获取帮助中心tab列表
  getHelpCategoryList: (): Promise<HelpCenterAPI.helpCategoryListRes> => ajax({ url: '/user/helpCategoryList' }),
  //- 获取帮助中心tab列表内容
  findTitleAndContent: (params: HelpCenterAPI.findTitleAndContentParams): Promise<HelpCenterAPI.findTitleAndContentRes> => ajax({ url: '/user/findTitleAndContent', params }),
}
