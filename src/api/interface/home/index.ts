import ajax from '../../http.js'

export default {
  //- 获取首页面通知 + banner数据
  getIndexadvListData: (params: HOMEAPI.indexNoticeAndAdvParams): Promise<HOMEAPI.indexNoticeAndAdvType> => ajax({ url: '/sys/indexNoticeAndAdv', params }),
  //- 社区配置接口
  getAppSpecifyList: (): Promise<HOMEAPI.getAppSpecifyListType> => ajax({ url: '/splive/app/sp/config/getAppSpecifyList' }),
  //- 实时投注接口
  getWinUserList: (): Promise<HOMEAPI.getWinUserListRes> => ajax({ url: '/user/getWinUserList?terminal=1' })
}
