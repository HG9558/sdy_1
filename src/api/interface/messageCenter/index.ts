import ajax from '../../http.js'

export default {
  //- 获取消息中心 通知 数据列表 msgType 1 收件箱 2 通知
  // isRead 是否查询的同时设置会员已读 0 处理会员已读 1 不处理
  // mbrisRead 1 查询会员未读的消息(收件箱+通知) 0/不送 查询会员已读+未读
  getMessageInfoList: (params: MsAPI.messageInfoParams): Promise<MsAPI.messageInfoResType> => ajax({ url: '/user/messageInfo', params }),

  //- 获取消息中心 公告 数据列表
  getNoticeList: ({ pageSize, pageNo, showType }: MsAPI.NoticeParams): Promise<MsAPI.NoticeResType> => ajax({ url: `/sys/noticeList?pageSize=${pageSize}&pageNo=${pageNo}&showType=${showType}` }),

  //- 删除公告
  deleteNotice: (params: MsAPI.deleteNoticeParams): Promise<MsAPI.ResType> => ajax({ url: `/user/deleteMessageInfoById?id=${params.id}`, params, method: 'post' }),

  //- 设置通知会员已读
  setMessageMbrRead: ({ id, setReadType }: MsAPI.mbReadParams): Promise<MsAPI.ResType> => ajax({ url: '/user/setMessageMbrRead', params: { id, setReadType } }),

  //- 发送消息
  // getMessageCenterSend: params => ajax({ url: '/user/messageSend', params, method: 'post' }),

  //- 人名币银行卡取款
  // withdrawal: params => ajax({ url: '/user/withdrawal', params, method: 'post' })
}
