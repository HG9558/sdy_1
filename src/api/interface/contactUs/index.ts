import ajax from '../../http.js'

export default {
  getMessageSend: (params: any): Promise<concatUsType.messageSendRes> => ajax({ url: '/opinion/messageSend', params, method: 'post', }),
  uploadPic: (params: any): Promise<concatUsType.messageSendRes1> => ajax({ url: '/user/uploadImage', params, method: 'post', }),
  depositNotreceived: (params: concatUsType.depositNotreceivedParams): Promise<concatUsType.messageSendRes2> => ajax({ url: '/user/depositNotreceived', params, method: 'post' }),
}