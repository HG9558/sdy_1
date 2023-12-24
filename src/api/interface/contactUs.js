import ajax from '../http.js'

//- 发送结果检测
export const getMessageSend = params => ajax({ url: '/opinion/messageSend', params, type: 'post', })