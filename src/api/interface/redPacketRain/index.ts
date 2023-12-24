import ajax from '../../http.js'

export default {
  //- 红包雨详情
  redPacketRainInfo: (): Promise<RedEnvelopeEntranceAPI.redPacketRainInfoType> => ajax({ url: '/sdyactivity/redPacketRainInfo' }),
  /* ****
  - 新版红包雨
  **** */
  //- 红包雨详情
  newRedPacketRainInfo: (): Promise<RedEnvelopeEntranceAPI.newRedPacketRainInfoType> => ajax({ url: '/activity/redNewEnvelope/getRedEnvelopeActivityTimeInfo' }),
  redPacketClick: (): Promise<RedEnvelopeEntranceAPI.sdyactivityType> => ajax({ url: '/sdyactivity/redPacketClick' }),
  redEnvelopeRecord: (): Promise<RedEnvelopeEntranceAPI.redEnvelopeRecordRes> => ajax({ url: '/activity/redNewEnvelope/getRedEnvelopeActivityRankingInfo' }),
  //- 领取红包
  applyNewRedEnvelope: (): Promise<RedEnvelopeEntranceAPI.applyNewRedEnvelopeRes> => ajax({ url: '/activity/redNewEnvelope/applyNewRedEnvelope' })
}
