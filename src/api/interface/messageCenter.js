import ajax from '../http.js'

//- 获取消息中心 通知 数据列表 msgType 1 收件箱 2 通知
// isRead 是否查询的同时设置会员已读 0 处理会员已读 1 不处理
// mbrisRead 1 查询会员未读的消息(收件箱+通知) 0/不送 查询会员已读+未读
export const getMessageInfoList = (params) => ajax({url: '/user/messageInfo', params})

//- 获取消息中心 公告 数据列表
export const getNoticeList = ({ pageSize, pageNo, showType }) => ajax({ url: `/sys/noticeList?pageSize=${pageSize}&pageNo=${pageNo}&showType=${showType}` })


//- 删除公告
export const deleteNotice = params => ajax({ url: `/user/deleteMessageInfoById?id=${params.id}`, params, type: 'post' })

//- 设置通知会员已读
export const setMessageMbrRead = ({ id, setReadType }) => ajax({ url: '/user/setMessageMbrRead', params: { id, setReadType} })

//- 发送消息
export const getMessageCenterSend = params => ajax({ url: '/user/messageSend', params, type: 'post' })

//- 人名币银行卡取款
export const withdrawal = params => ajax({ url: '/user/withdrawal', params, type: 'post' })
